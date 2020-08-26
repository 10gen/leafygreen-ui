import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { useBaseFontSize } from '@leafygreen-ui/leafygreen-provider';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { typeScale1, typeScale2 } from './styles';

const sharedStyles = css`
  margin: unset;
  font-family: Akzidenz, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: ${uiColors.gray.dark2};
`;

const h1 = css`
  font-weight: 500;
  font-size: 60px;
  line-height: 68px;
  letter-spacing: -0.3px;
`;

type H1Props = HTMLElementProps<'h1'>;

function H1({ children, className, ...rest }: H1Props) {
  return (
    <h1 {...rest} className={cx(sharedStyles, h1, className)}>
      {children}
    </h1>
  );
}

const h2 = css`
  font-size: 32px;
  line-height: 40px;
  letter-spacing: 0px;
`;

type H2Props = HTMLElementProps<'h2'>;

function H2({ children, className, ...rest }: H2Props) {
  return (
    <h2 {...rest} className={cx(sharedStyles, h2, className)}>
      {children}
    </h2>
  );
}

const subtitle = css`
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0px;
`;

type SubtitleProps = HTMLElementProps<'h6'>;

function Subtitle({ children, className, ...rest }: SubtitleProps) {
  return (
    <h6 {...rest} className={cx(sharedStyles, subtitle, className)}>
      {children}
    </h6>
  );
}

type BodyProps = HTMLElementProps<'p'> & {
  /**
   * font-weight applied to typography element
   * default: `regular`
   */
  weight?: 'regular' | 'medium';
};

function Body({ children, className, weight = 'regular', ...rest }: BodyProps) {
  const size = useBaseFontSize();
  const body = size === 16 ? typeScale2 : typeScale1;

  const fontWeight = css`
    font-weight: ${weight !== 'regular' ? 600 : 400};
  `;

  return (
    <p {...rest} className={cx(sharedStyles, body, fontWeight, className)}>
      {children}
    </p>
  );
}

const code = css`
  font-family: 'Source Code Pro', monospace;
  background-color: ${uiColors.gray.light3};
  border: 1px solid ${uiColors.gray.light1};
  border-radius: 3px;
`;

const codeLink = css`
  text-decoration: none;
  border-radius: 5px;
  border: 3px solid transparent;
  margin: -3px;
  transition: border-color 150ms ease-in-out;

  &:hover {
    border-color: ${uiColors.gray.light2};
  }

  &:focus {
    outline: none;
    border-color: ${uiColors.blue.light2};
  }
`;

const nowrap = css`
  white-space: nowrap;
`;

const normal = css`
  white-space: normal;
`;

const colorBlue = css`
  color: ${uiColors.blue.base};
`;

// Brooke be clever
type InlineCodeProps = HTMLElementProps<'code'> & HTMLElementProps<'a'>;

// change code height based on type scale
function InlineCode({ children, className, ...rest }: InlineCodeProps) {
  const size = useBaseFontSize();
  const fontSize = size === 16 ? typeScale2 : typeScale1;
  const whiteSpace =
    typeof children === 'string' && children.length <= 30 ? nowrap : normal;
  const isAnchor = rest.href || rest.onClick;

  const renderedInlineCode = (isAnchor = false) => (
    <code className={cx(fontSize, code, whiteSpace, { [colorBlue]: isAnchor })}>
      {children}
    </code>
  );

  if (isAnchor) {
    return (
      <a className={cx(codeLink, className)} {...rest}>
        {renderedInlineCode(true)}
      </a>
    );
  }

  return renderedInlineCode();
}

const disclaimer = css`
  display: block;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.2px;
`;

type DisclaimerProps = HTMLElementProps<'small'>;

function Disclaimer({ children, className, ...rest }: DisclaimerProps) {
  return (
    <small {...rest} className={cx(sharedStyles, disclaimer, className)}>
      {children}
    </small>
  );
}

const overline = css`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 16px;
  letter-spacing: 0.4px;
`;

const Overline: ExtendableBox<{
  className?: string;
}> = ({ className, ...rest }: { className?: string }) => {
  return <Box className={cx(sharedStyles, overline, className)} {...rest} />;
};

export { H1, H2, Subtitle, Body, InlineCode, Disclaimer, Overline };
