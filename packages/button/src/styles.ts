import { mix, transparentize } from 'polished';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { Size, Variant, Mode, ButtonProps, FontSize } from './types';
import { fontFamilies, typeScales } from '@leafygreen-ui/tokens';
import { createDataProp } from '@leafygreen-ui/lib';

const focusBoxShadow = (color: string) => `
    0 0 0 2px ${color}, 
    0 0 0 4px ${palette.blue.light1};
`;

const baseButtonStyles = css`
  // unset browser default
  appearance: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: 1px solid transparent;
  display: inline-flex;
  align-items: stretch;
  transition: all 150ms ease-in-out;
  position: relative;
  text-decoration: none;
  cursor: pointer;
  z-index: 0;
  font-family: ${fontFamilies.default};
  border-radius: 6px;

  &:focus {
    outline: none;
  }

  &:disabled {
    pointer-events: none;
  }

  &:active,
  &:focus,
  &:hover {
    text-decoration: none;
  }
`;

const colorSet: Record<Mode, Record<Variant, string>> = {
  [Mode.Light]: {
    [Variant.Default]: css`
      background-color: ${palette.gray.light3};
      border-color: ${palette.gray.base};
      color: ${palette.gray.dark3};

      &:hover,
      &:active {
        background-color: ${palette.white};
        box-shadow: 0 0 0 3px ${palette.gray.light2};
      }
    `,

    [Variant.Primary]: css`
      background-color: ${palette.green.dark2};
      border-color: ${palette.green.dark2};
      color: ${palette.white};

      &:hover,
      &:active {
        color: ${palette.white};
        background-color: #00593f; // Not quite dark3
        border-color: #00593f; // Not quite dark3
        box-shadow: 0 0 0 3px ${palette.green.light2};
      }
    `,

    [Variant.PrimaryOutline]: css`
      background-color: transparent;
      border-color: ${palette.green.dark2};
      color: ${palette.green.dark2};

      &:hover,
      &:active {
        background-color: ${transparentize(0.96, palette.green.base)};
        box-shadow: 0px 0px 0px 3px ${palette.green.light2};
      }
    `,

    [Variant.Danger]: css`
      background-color: ${palette.red.base};
      border-color: ${palette.red.base};
      color: ${palette.white};

      &:hover,
      &:active {
        color: ${palette.white};
        background-color: #c82222; // not quite dark1
        border-color: #c82222; // not quite dark1
        box-shadow: 0px 0px 0px 3px ${palette.red.light3};
      }
    `,

    [Variant.DangerOutline]: css`
      background-color: transparent;
      border-color: ${palette.red.light1};
      color: ${palette.red.base};

      &:hover,
      &:active {
        color: ${palette.red.dark2};
        background-color: ${transparentize(0.96, palette.red.base)};
        border-color: ${palette.red.base};
        box-shadow: 0px 0px 0px 3px ${palette.red.light3};
      }
    `,

    [Variant.BaseGreen]: css`
      background-color: ${palette.green.base};
      border-color: ${palette.green.dark2};
      color: ${palette.green.dark3};

      &:hover,
      &:active {
        background-color: ${mix(0.12, palette.green.dark3, palette.green.base)};
        box-shadow: 0px 0px 0px 3px ${palette.green.light2};
      }
    `,
  },
  [Mode.Dark]: {
    [Variant.Default]: css`
      background-color: ${palette.gray.dark2};
      border-color: ${palette.gray.base};
      color: ${palette.white};

      &:focus {
        color: ${palette.white};
      }

      &:hover,
      &:active {
        background-color: ${palette.gray.dark1};
        border-color: ${palette.gray.base};
        color: ${palette.white};
        box-shadow: 0px 0px 0px 3px ${palette.gray.dark2};
      }
    `,
    [Variant.Primary]: css`
      background-color: ${palette.green.dark2};
      border: 1px solid ${palette.green.base};
      color: ${palette.white};

      &:focus {
        color: ${palette.white};
      }

      &:hover,
      &:active {
        color: ${palette.white};
        background-color: #00593f; // Off palette
        box-shadow: 0 0 0 3px ${palette.green.dark3};
      }
    `,

    [Variant.PrimaryOutline]: css`
      background-color: transparent;
      border-color: ${palette.green.base};
      color: ${palette.green.base};

      &:focus {
        color: ${palette.green.base};
      }

      &:hover,
      &:active {
        color: ${palette.green.base};
        background-color: ${transparentize(0.96, palette.green.base)};
        border-color: ${palette.green.base};
        box-shadow: 0px 0px 0px 3px ${palette.green.dark3};
      }
    `,

    [Variant.Danger]: css`
      background-color: ${palette.red.base};
      border-color: ${palette.red.light1};
      color: ${palette.white};

      &:focus {
        color: ${palette.white};
      }

      &:hover,
      &:active {
        border-color: ${palette.red.light1};
        color: ${palette.white};
        background-color: #c82222; // Off palette
        box-shadow: 0px 0px 0px 3px ${palette.yellow.dark3}; // yes, yellow
      }
    `,

    [Variant.DangerOutline]: css`
      border-color: ${palette.red.light1};
      color: ${palette.red.light1};

      &:focus {
        color: ${palette.red.light1};
      }

      &:hover,
      &:active {
        color: ${palette.red.light1};
        background-color: ${transparentize(0.96, palette.red.base)};
        box-shadow: 0px 0px 0px 3px ${palette.yellow.dark3}; // yes, yellow
      }
    `,

    [Variant.BaseGreen]: css`
      background-color: ${palette.green.base};
      border-color: ${palette.green.base};
      color: ${palette.green.dark3};

      &:hover,
      &:active {
        background-color: ${mix(
          0.16,
          palette.green.light3,
          palette.green.base,
        )};
        border-color: ${mix(0.16, palette.green.light3, palette.green.base)};
        box-shadow: 0px 0px 0px 3px ${palette.green.dark2};
      }
    `,
  },
};

const focusStyle: Record<Mode, Record<Variant, string>> = {
  [Mode.Light]: {
    [Variant.Default]: css`
      &:focus {
        background-color: ${palette.white};
        box-shadow: ${focusBoxShadow(palette.white)};
      }
    `,
    [Variant.Primary]: css`
      &:focus {
        color: ${palette.white};
        background-color: #00593f; // Not quite dark3
        box-shadow: ${focusBoxShadow(palette.white)};
      }
    `,
    [Variant.PrimaryOutline]: css`
      &:focus {
        background-color: ${transparentize(0.96, palette.green.base)};
        box-shadow: ${focusBoxShadow(palette.white)};
      }
    `,
    [Variant.Danger]: css`
      &:focus {
        color: ${palette.white};
        background-color: #c82222; // not quite dark1
        box-shadow: ${focusBoxShadow(palette.white)};
      }
    `,
    [Variant.DangerOutline]: css`
      &:focus {
        color: ${palette.red.dark2};
        box-shadow: ${focusBoxShadow(palette.white)};
      }
    `,
    [Variant.BaseGreen]: css`
      &:focus {
        box-shadow: ${focusBoxShadow(palette.white)};
      }
    `,
  },
  [Mode.Dark]: {
    [Variant.Default]: css`
      &:focus {
        background-color: ${palette.gray.dark1};
        box-shadow: ${focusBoxShadow(palette.black)};
      }
    `,
    [Variant.Primary]: css`
      &:focus {
        background-color: #00593f; // Off palette
        box-shadow: ${focusBoxShadow(palette.black)};
      }
    `,
    [Variant.PrimaryOutline]: css`
      &:focus {
        background-color: ${transparentize(0.96, palette.green.base)};
        border-color: ${palette.green.base};
        box-shadow: ${focusBoxShadow(palette.black)};
      }
    `,
    [Variant.Danger]: css`
      &:focus {
        background-color: #c82222; // Off palette
        box-shadow: ${focusBoxShadow(palette.black)};
      }
    `,
    [Variant.DangerOutline]: css`
      &:focus {
        background-color: ${transparentize(0.96, palette.red.base)};
        border-color: ${palette.red.light1};
        box-shadow: ${focusBoxShadow(palette.black)};
      }
    `,
    [Variant.BaseGreen]: css`
      &:focus {
        background-color: ${palette.green.base};
        box-shadow: ${focusBoxShadow(palette.black)};
      }
    `,
  },
};

const disabledStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    &,
    &:hover {
      background-color: ${palette.gray.light2};
      border-color: ${palette.gray.light1};
      color: ${palette.gray.base};
      cursor: not-allowed;
    }

    &:focus {
      box-shadow: ${focusBoxShadow(palette.white)};
    }
  `,

  [Mode.Dark]: css`
    &,
    &:hover {
      background-color: ${palette.gray.dark3};
      border-color: ${palette.gray.dark1};
      color: ${palette.gray.dark1};
      cursor: not-allowed;
    }

    &:focus {
      box-shadow: 0px 4px 4px rgba(0, 124, 173, 0.4),
        0px 0px 0px 3px ${uiColors.focus};
    }
  `,
};

const sizeSet: Record<Size, string> = {
  [Size.XSmall]: css`
    height: 22px;
    text-transform: uppercase;
    font-size: 12px;
    line-height: 1em;
    font-weight: bold;
    letter-spacing: 0.4px;
  `,

  [Size.Small]: css`
    height: 28px;
  `,

  [Size.Default]: css`
    height: 36px;
  `,

  [Size.Large]: css`
    height: 48px;
    font-size: 18px;
    line-height: 24px;
  `,
};

const fontStyles: Record<FontSize, string> = {
  [FontSize.Body1]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    font-weight: 500; // Medium
  `,
  [FontSize.Body2]: css`
    font-size: ${typeScales.body2.fontSize}px;
    line-height: ${typeScales.body2.lineHeight}px;
    // Pixel pushing for optical alignment purposes
    transform: translateY(1px);
    font-weight: 500; // Medium
  `,
};

export const ButtonDataProp = createDataProp('button');

export function getClassName({
  variant,
  size: sizeProp,
  darkMode,
  baseFontSize,
  disabled,
  usingKeyboard,
}: Required<
  Pick<
    ButtonProps,
    'baseFontSize' | 'variant' | 'size' | 'darkMode' | 'disabled'
  > & { usingKeyboard: boolean }
>) {
  const mode = darkMode ? Mode.Dark : Mode.Light;
  const color = colorSet[mode][variant];
  const focus = focusStyle[mode][variant];
  const size = sizeSet[sizeProp];
  const fontSize = fontStyles[baseFontSize];

  return cx(
    baseButtonStyles,
    color,
    fontSize,
    size,
    { [focus]: usingKeyboard && !disabled },
    { [disabledStyle[mode]]: disabled },
  );
}

const rippleOpacity = 0.76;

export const rippleColors: Record<Mode, Record<Variant, string>> = {
  [Mode.Light]: {
    [Variant.Default]: palette.gray.light2,
    [Variant.Primary]: palette.green.dark1,
    [Variant.PrimaryOutline]: transparentize(rippleOpacity, palette.green.base),
    [Variant.Danger]: palette.red.light1,
    [Variant.DangerOutline]: transparentize(rippleOpacity, palette.red.base),
    [Variant.BaseGreen]: palette.green.light1,
  },
  [Mode.Dark]: {
    [Variant.Default]: palette.gray.base,
    [Variant.Primary]: palette.green.dark1,
    [Variant.PrimaryOutline]: transparentize(rippleOpacity, palette.green.base),
    [Variant.Danger]: palette.red.base,
    [Variant.DangerOutline]: transparentize(rippleOpacity, palette.red.base),
    [Variant.BaseGreen]: palette.green.dark1,
  },
};
