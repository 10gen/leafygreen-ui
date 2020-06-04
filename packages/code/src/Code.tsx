import React, {
  useMemo,
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import Syntax, {
  SyntaxProps,
  Variant,
  Language,
  variantColors,
} from '@leafygreen-ui/syntax';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import CopyIcon from '@leafygreen-ui/icon/dist/Copy';
import IconButton from '@leafygreen-ui/icon-button';
import WindowChrome from './WindowChrome';
import debounce from 'lodash/debounce';
import { uiColors } from '@leafygreen-ui/palette';
import ClipboardJS from 'clipboard';

function stringFragmentIsBlank(str: string): str is '' | ' ' {
  return str === '' || str === ' ';
}

interface ProcessedCodeSnippet {
  /**
   * A processed string where any line breaks at the beginning or end
   * of the string are trimmed.
   */
  content: string;

  /**
   * A count of the number of separate lines in a given string.
   */
  lineCount: number;
}

function useProcessedCodeSnippet(snippet: string): ProcessedCodeSnippet {
  return useMemo(() => {
    const splitString = snippet.split(/\r|\n/);

    // If first line is blank, remove the first line.
    // This is likely to be common when someone assigns a template literal
    // string to a variable, and doesn't add an '\' escape character after
    // breaking to a new line before the first line of code.
    while (stringFragmentIsBlank(splitString[0])) {
      splitString.shift();
    }

    // If the last line is blank, remove the last line of code.
    // This is a similar issue to the one above.
    while (stringFragmentIsBlank(splitString[splitString.length - 1])) {
      splitString.pop();
    }

    return {
      content: splitString.join('\n'),
      lineCount: splitString.length,
    };
  }, [snippet]);
}

const whiteSpace = 12;

const codeWrapperStyle = css`
  overflow-x: auto;
  border-left: 2px solid;
  padding: ${whiteSpace}px;
  margin: 0;
  position: relative;
  flex-grow: 1;
`;

const codeWrapperStyleWithWindowChrome = css`
  border-left: 0;
`;

const copyStyle = css`
  width: 38px;
  border-left: solid 1px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding-top: 6px;
`;

const singleLineCopyStyle = css`
  padding: 10px;
`;

function getWrapperVariantStyle(variant: Variant): string {
  const colors = variantColors[variant] ?? variantColors[Variant.Light];

  return css`
    border-color: ${colors[1]};
    background-color: ${colors[0]};
    color: ${colors[3]};
  `;
}

function getSidebarVariantStyle(variant: Variant): string {
  const colors = variantColors[variant] ?? variantColors[Variant.Light];

  switch (variant) {
    case Variant.Light:
      return css`
        border-color: ${colors[1]};
        background-color: white;
      `;
    case Variant.Dark:
      return css`
        border-color: ${colors[1]};
        background-color: ${colors[1]};
      `;
  }
}

function getCopyButtonStyle(variant: Variant, copied: boolean): string {
  const baseStyle = css`
    align-self: center;
    color: ${uiColors.gray.base};
  `;

  if (copied) {
    return cx(
      baseStyle,
      css`
        color: ${uiColors.white};
        background-color: ${uiColors.green.base};
        &:focus {
          color: ${uiColors.white};
          &:before {
            background-color: ${uiColors.green.base};
          }
        }
        &:hover {
          color: ${uiColors.white};
          &:before {
            background-color: ${uiColors.green.base};
          }
        }
      `,
    );
  }

  if (variant === Variant.Dark) {
    return cx(
      baseStyle,
      css`
        background-color: ${uiColors.gray.dark3};
      `,
    );
  }

  return baseStyle;
}

const ScrollState = {
  None: 'none',
  Left: 'left',
  Right: 'right',
  Both: 'both',
} as const;

type ScrollState = typeof ScrollState[keyof typeof ScrollState];

function getScrollShadowStyle(
  scrollState: ScrollState,
  variant: Variant,
): string {
  const colors = variantColors[variant];
  const shadowColor =
    variant === Variant.Light ? 'rgba(93,108,116,0.3)' : 'rgba(0,0,0,0.35)';

  if (scrollState === ScrollState.Both) {
    return css`
      box-shadow: inset 6px 0 6px -6px ${shadowColor},
        inset -6px 0 6px -6px ${shadowColor}, inset 0 6px 6px -6px ${colors[0]},
        inset 0 -6px 6px -6px ${colors[0]};
    `;
  }

  if (scrollState === ScrollState.Left) {
    return css`
      box-shadow: inset 6px 0 6px -6px ${shadowColor};
    `;
  }

  if (scrollState === ScrollState.Right) {
    return css`
      box-shadow: inset -6px 0 6px -6px ${shadowColor};
    `;
  }

  return '';
}

interface CodeProps extends SyntaxProps {
  /**
   * Shows line numbers in preformatted code blocks.
   *
   * default: `false`
   */
  showLineNumbers?: boolean;

  /**
   * Shows window chrome for code block;
   *
   * default: `false`
   */
  showWindowChrome?: boolean;

  /**
   * Renders a file name or other descriptor for a block of code
   */
  chromeTitle?: string;

  /**
   * When true, whitespace and line breaks will be preserved.
   *
   * default: `true`
   * */
  multiline?: boolean;

  /**
   * When true, allows the code block to be copied to the user's clipboard
   *
   * default: `true`
   */
  copyable?: boolean;
}

type DetailedElementProps<T> = React.DetailedHTMLProps<
  React.HTMLAttributes<T>,
  T
>;

/**
 * # Code
 *
 * React Component that outputs single-line and multi-line code blocks.
 *
 * ```
<Code>Hello world!</Code>
	```
 * ---
 * @param props.children The string to be formatted.
 * @param props.className An additional CSS class added to the root element of Code.
 * @param props.multiline When true, whitespace and line breaks will be preserved. Default: `true`
 * @param props.lang The language used for syntax highlighing. Default: `auto`
 * @param props.variant Determines if the code block is rendered with a dark or light background. Default: 'light'
 * @param props.showLineNumbers When true, shows line numbers in preformatted code blocks. Default: `false`
 */
function Code({
  children = '',
  className,
  multiline = true,
  language,
  variant = Variant.Light,
  showLineNumbers = false,
  showWindowChrome = false,
  chromeTitle = '',
  copyable = true,
  ...rest
}: CodeProps) {
  const scrollableMultiLine = useRef<HTMLPreElement>(null);
  const scrollableSingleLine = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState<ScrollState>(ScrollState.None);
  const [copied, setCopied] = useState(false);
  const showCopyBar = !showWindowChrome && copyable;

  useEffect(() => {
    let timeoutId: any;
    const clipboard = new ClipboardJS('.copy-btn');

    if (copied) {
      timeoutId = setTimeout(() => {
        setCopied(false);
        clipboard.destroy();
      }, 1500);
    }

    return () => clearTimeout(timeoutId);
  }, [copied]);

  useLayoutEffect(() => {
    if (multiline) {
      const multilineEl = scrollableMultiLine.current;

      if (
        multilineEl != null &&
        multilineEl.scrollWidth > multilineEl.clientWidth
      ) {
        setScrollState(ScrollState.Right);
      }
    } else {
      const singlelineEl = scrollableSingleLine.current;

      if (
        singlelineEl != null &&
        singlelineEl.scrollWidth > singlelineEl.clientWidth
      ) {
        setScrollState(ScrollState.Right);
      }
    }
  }, []);

  const wrapperStyle = css`
    border: 1px solid ${variantColors[variant][1]};
    border-radius: 4px;
    overflow: hidden;
  `;

  const wrapperClassName = cx(
    codeWrapperStyle,
    getWrapperVariantStyle(variant),
    {
      [codeWrapperStyleWithWindowChrome]: showWindowChrome,
    },
    className,
    getScrollShadowStyle(scrollState, variant),
  );

  const { content, lineCount } = useProcessedCodeSnippet(children);

  const renderedWindowChrome = showWindowChrome && (
    <WindowChrome chromeTitle={chromeTitle} variant={variant} />
  );

  const renderedSyntaxComponent = (
    <Syntax showLineNumbers={showLineNumbers} variant={variant} language={language}>
      {content}
    </Syntax>
  );

  function handleScroll(e: React.UIEvent) {
    const { scrollWidth, clientWidth: elementWidth } = e.target as HTMLElement;
    const isScrollable = scrollWidth > elementWidth;

    if (isScrollable) {
      const scrollPosition = (e.target as HTMLElement).scrollLeft;
      const maxPosition = scrollWidth - elementWidth;

      if (scrollPosition > 0 && scrollPosition < maxPosition) {
        setScrollState(ScrollState.Both);
      } else if (scrollPosition > 0) {
        setScrollState(ScrollState.Left);
      } else if (scrollPosition < maxPosition) {
        setScrollState(ScrollState.Right);
      }
    }
  }

  const debounceScroll = debounce(handleScroll, 50, { leading: true });

  if (!multiline) {
    return (
      <div className={wrapperStyle}>
        {renderedWindowChrome}

        <div
          className={css`
            display: flex;
          `}
        >
          <div
            {...(rest as DetailedElementProps<HTMLDivElement>)}
            className={wrapperClassName}
            onScroll={e => {
              e.persist();
              debounceScroll(e);
            }}
            ref={scrollableSingleLine}
          >
            {renderedSyntaxComponent}
          </div>

          {showCopyBar && (
            <div
              className={cx(
                copyStyle,
                singleLineCopyStyle,
                getSidebarVariantStyle(variant),
              )}
            >
              <IconButton
                variant={variant}
                aria-label="Copy"
                className={cx(getCopyButtonStyle(variant, copied), 'copy-btn')}
                onClick={() => {
                  setCopied(true);
                }}
                data-clipboard-text={content}
              >
                {copied ? <CheckmarkIcon /> : <CopyIcon />}
              </IconButton>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperStyle}>
      {renderedWindowChrome}
      <div
        className={css`
          display: flex;
        `}
      >
        <pre
          {...(rest as DetailedElementProps<HTMLPreElement>)}
          className={wrapperClassName}
          onScroll={e => {
            e.persist();
            debounceScroll(e);
          }}
          ref={scrollableMultiLine}
        >
          {renderedSyntaxComponent}
        </pre>

        {showCopyBar && (
          <div className={cx(copyStyle, getSidebarVariantStyle(variant))}>
            <IconButton
              variant={variant}
              aria-label="Copy"
              className={cx(getCopyButtonStyle(variant, copied), 'copy-btn')}
              onClick={() => {
                setCopied(true);
              }}
              data-clipboard-text={content}
            >
              {copied ? <CheckmarkIcon /> : <CopyIcon />}
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
}

Code.displayName = 'Code';

Code.propTypes = {
  children: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  language: PropTypes.oneOf(Object.values(Language)),
  variant: PropTypes.oneOf(Object.values(Variant)),
  className: PropTypes.string,
  showLineNumbers: PropTypes.bool,
  showWindowChrome: PropTypes.bool,
  chromeTitle: PropTypes.string,
};

export default Code;
