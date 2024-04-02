import React, { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';

import { LGIDS_FORM_FIELD } from '../constants';
import { FormFieldState } from '../FormField/FormField.types';
import { useFormFieldContext } from '../FormFieldContext/FormFieldContext';

import {
  childrenWrapperStyles,
  getInputWrapperStyles,
  iconClassName,
  iconDisabledStyles,
  iconStyles,
  iconsWrapperStyles,
  inputElementClassName,
  optionalTextBaseStyle,
  optionalTextThemeStyle,
} from './FormFieldInputContainer.styles';
import { FormFieldInputContainerProps } from './FormFieldInputContainer.types';

/**
 * Applies styling around the `input` of a FormField element
 * @internal
 */
export const FormFieldInputContainer = forwardRef<
  HTMLDivElement,
  FormFieldInputContainerProps
>(
  (
    { contentEnd, className, children, ...rest }: FormFieldInputContainerProps,
    fwdRef,
  ) => {
    const { theme } = useDarkMode();
    const { disabled, size, state, inputProps, optional } =
      useFormFieldContext();

    const inputWrapperStyles = getInputWrapperStyles({
      disabled,
      size: size ?? Size.Default,
      state,
      theme,
    });

    const renderedChildren = React.cloneElement(children, {
      ...inputProps,
      className: cx(inputElementClassName, children.props.className),
    });

    const shouldRenderOptionalText =
      state === FormFieldState.None && !disabled && optional;
    const shouldRenderIconWrapper = shouldRenderOptionalText || contentEnd;

    return (
      <div {...rest} ref={fwdRef} className={cx(inputWrapperStyles, className)}>
        <div className={childrenWrapperStyles}>{renderedChildren}</div>
        {shouldRenderIconWrapper && (
          <div className={iconsWrapperStyles}>
            {shouldRenderOptionalText && (
              <div
                data-lgid={LGIDS_FORM_FIELD.optional}
                className={cx(
                  optionalTextBaseStyle,
                  optionalTextThemeStyle[theme],
                )}
              >
                <p>Optional</p>
              </div>
            )}

            {contentEnd &&
              React.cloneElement(contentEnd, {
                className: cx(
                  iconClassName,
                  iconStyles[theme],
                  { [iconDisabledStyles[theme]]: disabled },
                  contentEnd.props.className,
                ),
              })}
          </div>
        )}
      </div>
    );
  },
);

FormFieldInputContainer.displayName = 'FormFieldInputWrapper';
