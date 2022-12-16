import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const searchResultLabelStyle: Record<Theme, string> = {
  [Theme.Light]: css`
  color: ${palette.gray.dark1};
  `,
  [Theme.Dark]: css`
  color: ${palette.gray.base};
  `
}