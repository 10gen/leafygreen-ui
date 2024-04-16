import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  BaseFontSize,
  color,
  Size,
  spacing,
  typeScales,
} from '@leafygreen-ui/tokens';

export const getFontSize = ({
  baseFontSize,
  size,
}: {
  baseFontSize: BaseFontSize;
  size: Size;
}) => {
  if (size === Size.XSmall || size === Size.Small) {
    return css`
      font-size: ${typeScales.body1.fontSize}px;
      line-height: ${typeScales.body1.lineHeight}px;
    `;
  }

  if (size === Size.Default) {
    return css`
      font-size: ${baseFontSize}px;
      line-height: ${typeScales.body1.lineHeight}px;
    `;
  }

  if (size === Size.Large) {
    return css`
      font-size: 18px;
      line-height: 24px;
    `;
  }
};

export const textContainerStyle = css`
  display: flex;
  flex-direction: column;
`;

export const marginBottom = css`
  margin-bottom: ${spacing[100]}px;
`;

export const stateFeedbackContainerStyle = css`
  margin-top: ${spacing[100]}px;
  display: flex;
  align-items: center;
  gap: ${spacing[100]}px;
`;

export const errorIconStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${color.light.icon.error.default};
  `,
  [Theme.Dark]: css`
    color: ${color.dark.icon.error.default};
  `,
};

export const validIconStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${color.light.icon.success.default};
  `,
  [Theme.Dark]: css`
    color: ${color.dark.icon.success.default};
  `,
};
