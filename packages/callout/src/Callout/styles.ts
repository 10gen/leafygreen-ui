import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { color, fontFamilies, spacing } from '@leafygreen-ui/tokens';

import { Variant } from './types';

export const headerLabels: Record<Variant, string> = {
  [Variant.Note]: 'Note',
  [Variant.Tip]: 'Tip',
  [Variant.Important]: 'Important',
  [Variant.Warning]: 'Warning',
  [Variant.Example]: 'Example',
} as const;

export const getBaseStyles = (theme: Theme, variant: Variant) =>
  cx(
    css`
      font-family: ${fontFamilies.default};
      position: relative;
      color: ${color[theme].text.primary.default};
      padding-inline-start: 10px; // 3px border + 7px between border and text

      &:after {
        content: '';
        position: absolute;
        width: 3px;
        top: 0px;
        bottom: 0px;
        left: 0;
        border-radius: 2px;
        background-color: ${calloutColor[theme][variant].bar};
      }
    `,
  );

export const getHeaderStyles = (theme: Theme, variant: Variant) =>
  css`
    margin-block-end: ${spacing[100]}px;
    width: 100%;
    color: ${calloutColor[theme][variant].headerText};
  `;

export const titleStyle = css`
  font-weight: 600;
  letter-spacing: inherit;
  color: inherit;
`;

interface ColorSet {
  headerText: string;
  bar: string;
}

export const calloutColor: Record<Theme, Record<Variant, ColorSet>> = {
  [Theme.Dark]: {
    [Variant.Note]: {
      headerText: palette.blue.light2,
      bar: palette.blue.dark1,
    },
    [Variant.Tip]: {
      headerText: palette.purple.light2,
      bar: palette.purple.dark2,
    },
    [Variant.Important]: {
      headerText: palette.yellow.light2,
      bar: palette.yellow.dark2,
    },
    [Variant.Warning]: {
      headerText: palette.red.light2,
      bar: palette.red.dark2,
    },
    [Variant.Example]: {
      headerText: palette.gray.light2,
      bar: palette.gray.dark1,
    },
  },
  [Theme.Light]: {
    [Variant.Note]: {
      headerText: palette.blue.dark1,
      bar: palette.blue.base,
    },
    [Variant.Tip]: {
      headerText: palette.purple.dark2,
      bar: palette.purple.base,
    },
    [Variant.Important]: {
      headerText: palette.yellow.dark2,
      bar: palette.yellow.base,
    },
    [Variant.Warning]: {
      headerText: palette.red.dark2,
      bar: palette.red.base,
    },
    [Variant.Example]: {
      headerText: palette.gray.dark2,
      bar: palette.gray.dark1,
    },
  },
};
