import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  BaseFontSize,
  color,
  fontFamilies,
  fontWeights,
  typeScales,
} from '@leafygreen-ui/tokens';

export const errorMessageStyle = css`
  font-family: ${fontFamilies.default};
  font-weight: ${fontWeights.regular};
  font-size: inherit;
  line-height: inherit;

  // Unsets browser default margins
  margin-block-start: 0;
  margin-block-end: 0;
`;

export const errorMessageModeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${color.light.text.error.default};
  `,
  [Theme.Dark]: css`
    color: ${color.dark.text.error.default};
  `,
};

export const errorMessageTypeScaleStyles: Record<BaseFontSize, string> = {
  [BaseFontSize.Body1]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
  `,
  [BaseFontSize.Body2]: css`
    font-size: ${typeScales.body2.fontSize}px;
    line-height: 20px; // Hardcoding because it does not match body2 lineHeight
  `,
};
