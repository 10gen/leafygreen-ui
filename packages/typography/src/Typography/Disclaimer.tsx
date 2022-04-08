import React from 'react';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { baseTypographyStyles } from '../styles';
import { CommonTypographyProps, Mode } from '../types';
import { palette } from '@leafygreen-ui/palette';
import { modes } from 'react-transition-group/SwitchTransition';

/**
 * Disclaimer
 */
const disclaimer = css`
  display: block;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0px;
`;

const disclaimerColor: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${palette.black};
  `,
  [Mode.Dark]: css`
    color: ${palette.gray.light2};
  `,
};

type DisclaimerProps = HTMLElementProps<'small'> & CommonTypographyProps;

export function Disclaimer({
  darkMode,
  children,
  className,
  ...rest
}: DisclaimerProps) {
  // TODO: Replace with context
  const mode = darkMode ? Mode.Dark : Mode.Light;
  return (
    <small
      {...rest}
      className={cx(
        baseTypographyStyles,
        disclaimer,
        disclaimerColor[mode],
        className,
      )}
    >
      {children}
    </small>
  );
}

Disclaimer.displayName = 'Disclaimer';
