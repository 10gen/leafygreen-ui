import React, { useRef } from 'react';
import { defaults } from 'lodash';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';

import { Variant } from '../Toast.types';

import { defaultToastProps } from './defaultProps';
import {
  baseIconStyle,
  baseToastStyle,
  contentWrapperStyle,
  descriptionStyle,
  descriptionThemeStyle,
  dismissButtonStyle,
  dismissButtonThemeStyle,
  textContentStyle,
  titleStyle,
  titleThemeStyle,
  toastThemeStyles,
  variantIconStyle,
} from './InternalToast.styles';
import { InternalToastProps } from './InternalToast.types';
import { ProgressBar } from './ProgressBar';
import { variantIcons } from './VariantIcon';

export function InternalToast({
  title,
  description,
  className,
  darkMode: darkModeProp,
  onClose,
  action,
  ...rest
}: InternalToastProps) {
  const {
    variant,
    progress,
    dismissible,
    // timeout,
  } = defaults(rest, defaultToastProps);
  const { theme, darkMode } = useDarkMode(darkModeProp);
  const nodeRef = useRef(null);

  const VariantIcon = variantIcons[variant];
  const iconThemeStyle = variantIconStyle[variant];

  return (
    <div
      ref={nodeRef}
      className={cx(baseToastStyle, toastThemeStyles[theme], className)}
      aria-atomic="true"
      data-testid="lg-toast"
      {...rest}
    >
      <div className={cx(contentWrapperStyle)}>
        <VariantIcon
          aria-hidden
          className={cx(baseIconStyle, iconThemeStyle[theme])}
          size={32}
        />

        <div className={textContentStyle}>
          <Body
            data-testid="toast-title"
            className={cx(titleStyle, titleThemeStyle[theme])}
          >
            {title}
          </Body>

          {description && (
            <Body
              className={cx(descriptionStyle, descriptionThemeStyle[theme])}
            >
              {description}
            </Body>
          )}
        </div>
      </div>

      {dismissible && (
        <IconButton
          className={cx(dismissButtonStyle, dismissButtonThemeStyle[theme])}
          aria-label="Close Message"
          onClick={onClose}
          darkMode={!darkMode}
          data-testid="lg-toast-dismiss-button"
        >
          <XIcon />
        </IconButton>
      )}
      {variant === Variant.Progress && (
        <ProgressBar theme={theme} progress={progress} />
      )}
    </div>
  );
}

InternalToast.displayName = 'InternalToast';

InternalToast.propTypes = {
  darkMode: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  description: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  variant: PropTypes.oneOf(Object.values(Variant)),
  progress: PropTypes.number,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  dismmissible: PropTypes.bool,
};
