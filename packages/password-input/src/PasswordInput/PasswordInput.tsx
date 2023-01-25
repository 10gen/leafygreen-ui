import React, { useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useControlledValue, useIdAllocator } from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Label } from '@leafygreen-ui/typography';

import { TogglePassword } from '../TogglePassword';
import { ValidationMessage } from '../ValidationMessage';

import {
  inputBaseStyles,
  inputFocusThemeStyles,
  inputSizeStyles,
  inputThemeStyles,
  inputWrapperStyles,
  labelBaseStyles,
  messageWrapperStyles,
} from './PasswordInput.styles';
import {
  PasswordInputProps,
  SizeVariant,
  States,
  ValidationStateProps,
} from './PasswordInput.types';

function allEqual(arr: Array<any>) {
  return new Set(arr).size == 1;
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      value: valueProp,
      placeholder,
      onChange: onChangeProp,
      className,
      darkMode: darkModeProp,
      label,
      sizeVariant = SizeVariant.Default,
      validationState = [],
      disabled = false,
      autoComplete = 'new-password',
      id: idProp,
      'aria-describedby': ariaDescribedbyProp,
      'aria-labelledby': ariaLabelledbyProp,
      ...rest
    }: PasswordInputProps,
    forwardedRef,
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const prefix = 'passwordinput';
    const inputId = useIdAllocator({ prefix, id: idProp });
    const ariaDescribedby = useIdAllocator({
      prefix,
      id: ariaDescribedbyProp,
    });
    const ariaLabelledby = useIdAllocator({
      prefix,
      id: ariaLabelledbyProp,
    });
    const { theme, darkMode } = useDarkMode(darkModeProp);

    // TODO: handle validation hook

    const { value, handleChange } = useControlledValue(valueProp, onChangeProp);

    const handleTogglePasswordClick = () => setShowPassword(s => !s);

    const getStateFromArray = (): States => {
      if (validationState.length === 0) return States.None;

      const statesArray: Array<States> = (
        validationState as Array<ValidationStateProps>
      ).map((message: ValidationStateProps) => message.state);

      // if (statesArray.length === 1) return statesArray[0];
      if (allEqual(statesArray)) return statesArray[0];
      if (statesArray.includes(States.Error)) return States.Error;
      if (statesArray.includes(States.Warning)) return States.Warning;

      return States.None;
    };

    const state: States = Array.isArray(validationState)
      ? getStateFromArray()
      : validationState;

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div className={cx(className)}>
          {label && (
            <Label
              id={ariaLabelledby}
              className={labelBaseStyles}
              htmlFor={inputId}
            >
              {label}
            </Label>
          )}
          <div className={inputWrapperStyles}>
            <input
              ref={forwardedRef}
              type={showPassword ? 'text' : 'password'}
              value={value}
              id={inputId}
              autoComplete={autoComplete}
              aria-describedby={ariaDescribedby}
              aria-labelledby={ariaLabelledby}
              aria-disabled={disabled}
              className={cx(
                inputBaseStyles,
                inputSizeStyles[sizeVariant],
                inputFocusThemeStyles[theme],
                inputThemeStyles[theme][state],
              )}
              onChange={handleChange}
              {...rest}
            />
            <TogglePassword
              disabled={disabled}
              showPassword={showPassword}
              handleTogglePasswordClick={handleTogglePasswordClick}
              sizeVariant={sizeVariant}
            />
          </div>
          {!ariaDescribedbyProp && Array.isArray(validationState) && (
            // We're using aria-polite to announce when a message has changed. In order for aria-polite to work correctly the message wrapper needs to remain on the page even if there are no messages. If a custom message container is specified with aria-describedby then this wrapper will not render.
            <ul
              aria-live="polite"
              className={messageWrapperStyles}
              id={ariaDescribedby}
            >
              {(validationState as Array<ValidationStateProps>).map(
                (message, index) => (
                  <ValidationMessage
                    key={index}
                    message={message.message as string}
                    state={message.state}
                  />
                ),
              )}
            </ul>
          )}
        </div>
      </LeafyGreenProvider>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

//TODO: propTypes!
