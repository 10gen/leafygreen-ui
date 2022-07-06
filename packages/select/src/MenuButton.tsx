import React, { useCallback, useContext } from 'react';
import Button, { Size as ButtonSize, Variant } from '@leafygreen-ui/button';
import { css, cx } from '@leafygreen-ui/emotion';
import CaretDownIcon from '@leafygreen-ui/icon/dist/CaretDown';
import {
  BaseFontSize,
  breakpoints,
  focusRing,
  spacing,
} from '@leafygreen-ui/tokens';
import { palette } from '@leafygreen-ui/palette';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import { HTMLElementProps, Theme } from '@leafygreen-ui/lib';
import { mobileSizeSet, sizeSets } from './styleSets';
import SelectContext from './SelectContext';
import { useForwardedRef } from './utils';
import { State } from './types';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';

const menuButtonStyleOverrides = css`
  // Override button defaults
  font-weight: 400;
  > *:last-child {
    grid-template-columns: 1fr 16px;
    padding: 0 12px;
    justify-content: flex-start;

    > svg {
      justify-self: right;
      width: 16px;
      height: 16px;
    }
  }
`;

const menuButtonModeOverrides: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.white};
    // Override button default color
    > *:last-child {
      > svg {
        color: ${palette.gray.dark2};
      }
    }
  `,
  [Theme.Dark]: css`
    border-color: ${palette.gray.base};
    background-color: ${palette.gray.dark4};
    color: ${palette.gray.light3};

    // Override button default color
    > *:last-child {
      > svg {
        color: ${palette.gray.light1};
      }
    }

    &:hover,
    &:active,
    &:focus {
      background-color: ${palette.gray.dark4};
      color: ${palette.gray.light3};
    }
  `,
};

// Override default button focus styles
const menuButtonFocusStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    &:focus {
      box-shadow: ${focusRing['light'].input};
      border-color: rgba(255, 255, 255, 0);
    }
  `,
  [Theme.Dark]: css`
    &:focus {
      background-color: ${palette.gray.dark4};
      box-shadow: ${focusRing['dark'].input};
      border-color: rgba(255, 255, 255, 0);
    }
  `,
};

const menuButtonDeselectedStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.dark1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light1};

    &:hover,
    &:active,
    &:focus {
      color: ${palette.gray.light1};
    }
  `,
};

const menuButtonDisabledStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    &:disabled {
      background-color: ${palette.gray.light2};
      color: ${palette.gray.base};
      cursor: not-allowed;

      > *:last-child {
        > svg {
          color: ${palette.gray.base};
        }
      }
    }
  `,
  [Theme.Dark]: css`
    &:disabled {
      background-color: ${palette.gray.dark3};
      color: ${palette.gray.dark2};
      cursor: not-allowed;
      border-color: ${palette.gray.dark2};

      > *:last-child {
        > svg {
          color: ${palette.gray.dark2};
        }
      }
    }
  `,
};

const menuButtonTextWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  gap: ${spacing[1]}px;
  overflow: hidden;
`;

const menuButtonTextStyle = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const errorColor: Record<Theme, string> = {
  [Theme.Light]: palette.red.base,
  [Theme.Dark]: '#FF6960', // TODO: palette.red.light1 is different in figma(#FF6960) which does not match react(#EF5752)
};

const menuButtonErrorStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    border-color: ${errorColor[Theme.Light]};
    background-color: ${palette.white};

    &:hover,
    &:active {
      box-shadow: 0 0 0 3px #f9d5c5; // Between light2 & light3
    }
  `,
  [Theme.Dark]: css`
    border-color: ${errorColor[Theme.Dark]};

    &:hover,
    &:active {
      border-color: ${errorColor[Theme.Dark]};
      box-shadow: 0px 0px 0px 3px ${palette.yellow.dark3};
    }
  `,
};

interface MenuButtonProps
  extends HTMLElementProps<'button', HTMLButtonElement> {
  children: React.ReactNode;
  value: string;
  text: React.ReactNode;
  name?: string;
  deselected: boolean;
  readOnly?: boolean;
  onClose: () => void;
  onOpen: () => void;
  errorMessage?: string;
  state?: State;
  baseFontSize?: BaseFontSize;
  __INTERNAL__menuButtonSlot__?: React.ForwardRefExoticComponent<
    React.RefAttributes<unknown>
  >;
}

type Props = MenuButtonProps &
  Required<
    Pick<
      JSX.IntrinsicElements['div'],
      'aria-labelledby' | 'aria-controls' | 'aria-expanded' | 'aria-describedby'
    >
  >;

const MenuButton = React.forwardRef<HTMLElement, Props>(function MenuButton(
  {
    children,
    value,
    text,
    name,
    deselected,
    readOnly,
    onClose,
    onOpen,
    errorMessage,
    state,
    baseFontSize,
    __INTERNAL__menuButtonSlot__,
    ...rest
  }: Props,
  forwardedRef,
) {
  const { usingKeyboard } = useUsingKeyboardContext();

  const { theme, open, size, disabled } = useContext(SelectContext);

  const ref = useForwardedRef(forwardedRef, null);

  const sizeSet = sizeSets[size];

  const onClick = useCallback(() => {
    if (open) {
      onClose();
    } else {
      onOpen();
    }
    ref.current!.focus();
  }, [onClose, onOpen, open, ref]);

  const Component = __INTERNAL__menuButtonSlot__
    ? __INTERNAL__menuButtonSlot__
    : Button;

  const buttonClassName = __INTERNAL__menuButtonSlot__
    ? ''
    : cx(
        menuButtonStyleOverrides,
        menuButtonModeOverrides[theme],
        {
          [menuButtonFocusStyle[theme]]: usingKeyboard,
          [menuButtonDeselectedStyles[theme]]: deselected,
          [menuButtonDisabledStyles[theme]]: disabled,
          [menuButtonErrorStyle[theme]]:
            state === State.Error && !!errorMessage,
          [css`
            letter-spacing: initial;
          `]: size === ButtonSize.XSmall,
        },
        css`
          width: 100%;
          @media only screen and (max-width: ${breakpoints.Desktop}px) {
            height: ${mobileSizeSet.height}px;
            font-size: ${mobileSizeSet.text}px;
          }
        `,
      );

  const testId =
    (rest as any)['data-testid'] ?? 'leafygreen-ui-select-menubutton';
  return (
    <Component
      {...rest}
      ref={ref}
      name={name}
      value={value}
      disabled={disabled}
      onClick={onClick}
      variant={Variant.Default}
      darkMode={theme === Theme.Dark}
      rightGlyph={<CaretDownIcon />}
      size={size}
      data-testid={testId}
      className={cx(buttonClassName, {
        [css`
          font-size: ${baseFontSize}px;
        `]: size === ButtonSize.Default,
      })}
    >
      <div className={menuButtonTextWrapperStyle}>
        <div className={menuButtonTextStyle}>{text}</div>
        {state === State.Error && errorMessage && (
          <WarningIcon
            role="presentation"
            className={css`
              color: ${errorColor[theme]};
            `}
            size={sizeSet.warningIcon}
          />
        )}
      </div>
      {children}
    </Component>
  );
});

MenuButton.displayName = 'MenuButton';

export default MenuButton;
