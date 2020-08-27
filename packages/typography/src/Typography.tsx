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
  display: inline-block;
`;

type InlineCodeProps = HTMLElementProps<'code'>;

function InlineCode({ children, className, ...rest }: InlineCodeProps) {
  const size = useBaseFontSize();
  const body = size === 16 ? typeScale2 : typeScale1;

  return (
    <code {...rest} className={cx(sharedStyles, code, body, className)}>
      {children}
    </code>
  );
}

type InlineKeyCodeProps = HTMLElementProps<'code'> & {
  keys: Array<string> | string
}

const inlineKeyCodeFont = css`
  font-family: 'Source Code Pro', monospace;
  // display: inline-block;
  color: ${uiColors.gray.dark3};
`

const inlineKeyCode = css`
  border: 1px solid ${uiColors.gray.dark3};
  border-radius: 3px;
  padding-left: 2px;
  padding-right: 2px;
`;

function InlineKeyCode({keys}: InlineKeyCodeProps) {
  const size = useBaseFontSize();
  const body = size === 16 ? typeScale2 : typeScale1;

  const renderKeys = () => {
    return keys.map((arr, index) => {
      if ((index + 1) < keys.length) {
        return (
          <span key={index}>
            <span className={inlineKeyCode}>{arr}</span>
            <span className={css`padding-left: 2px; padding-right: 2px;`}>+</span>
          </span>
        )
      }

      return <span key={index} className={inlineKeyCode}>{arr}</span>
    })
  }

  if (Array.isArray(keys)) {
    return <code className={cx(inlineKeyCodeFont, body)}>{renderKeys()}</code>
  }

  return (
    <code className={cx(inlineKeyCode, inlineKeyCodeFont, body)}>{keys}</code>
  )
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

export { H1, H2, Subtitle, Body, InlineCode, InlineKeyCode, Disclaimer, Overline };
