import React, { useEffect, useRef } from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Spinner } from '@leafygreen-ui/loading-indicator';
import { registerRipple } from '@leafygreen-ui/ripple';

import ButtonIcon from '../ButtonIcon/ButtonIcon';
import { ButtonProps, Size, Variant } from '../types';

import {
  buttonContentSizeStyle,
  buttonContentStyle,
  buttonSpinnerSize,
  centeredSpinnerStyles,
  rippleColors,
  rippleStyle,
  spinnerStyles,
  textlessLoadingStyles,
} from './ButtonContent.styles';

type ButtonContentProps = Omit<ButtonProps, 'as'>;

export const ButtonContent = ({
  rightGlyph,
  leftGlyph,
  darkMode: darkModeProp,
  disabled = false,
  variant = Variant.Default,
  size = Size.Default,
  isLoading,
  loadingText,
  children,
}: ButtonContentProps) => {
  const { darkMode, theme } = useDarkMode(darkModeProp);
  const rippleRef = useRef<HTMLDivElement | null>(null);
  const loadingContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let unregisterRipple: (() => void) | undefined;
    const backgroundColor = rippleColors[theme][variant];

    if (rippleRef.current != null && !disabled) {
      unregisterRipple = registerRipple(rippleRef.current, {
        backgroundColor,
      });
    }

    return unregisterRipple;
  }, [rippleRef, variant, darkMode, disabled, theme]);

  const isIconOnlyButton = ((leftGlyph || rightGlyph) && !children) ?? false;
  const iconProps = { variant, size, darkMode, disabled, isIconOnlyButton };

  return (
    <>
      {/* Ripple cannot wrap children, otherwise components that rely on children to render dropdowns will not be rendered due to the overflow:hidden rule. */}
      <div className={rippleStyle} ref={rippleRef} />

      <div
        className={cx({
          [textlessLoadingStyles(loadingContentRef)]: isLoading && !loadingText,
        })}
      >
        {isLoading && (
          <div className={cx(buttonContentStyle, buttonContentSizeStyle[size])}>
            <Spinner
              sizeOverride={buttonSpinnerSize[size]}
              className={cx(
                {
                  [centeredSpinnerStyles]: !loadingText,
                },
                spinnerStyles[theme],
              )}
            />
            {loadingText}
          </div>
        )}
        <div
          ref={loadingContentRef}
          className={cx(buttonContentStyle, buttonContentSizeStyle[size], {
            [css`
              justify-content: space-between;
            `]: !!rightGlyph && darkMode,
            [css`
              visibility: hidden;
            `]: isLoading,
            [css`
              display: none;
            `]: isLoading && !!loadingText,
          })}
        >
          {leftGlyph && (
            <ButtonIcon
              glyph={leftGlyph}
              className={css`
                justify-self: right;
              `}
              {...iconProps}
            />
          )}

          {children}

          {rightGlyph && (
            <ButtonIcon
              glyph={rightGlyph}
              className={css`
                justify-self: left;
              `}
              {...iconProps}
            />
          )}
        </div>
      </div>
    </>
  );
};
