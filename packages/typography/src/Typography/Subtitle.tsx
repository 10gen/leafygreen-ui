import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { baseTypographyStyles } from '../styles';
import { CommonTypographyProps } from '../types';

/**
 * Subtitle
 */
const subtitle = css`
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.3px;
  font-weight: 700;
`;

type SubtitleProps = HTMLElementProps<'h6'> & CommonTypographyProps;

export const Subtitle: ExtendableBox<SubtitleProps, 'h6'> = ({
  className,
  ...rest
}: SubtitleProps) => {
  return (
    <Box
      as="h6"
      className={cx(baseTypographyStyles, subtitle, className)}
      {...rest}
    />
  );
};

Subtitle.displayName = 'Subtitle';
