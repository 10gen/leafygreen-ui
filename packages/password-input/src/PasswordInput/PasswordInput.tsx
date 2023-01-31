import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useControlledValue, useIdAllocator } from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Label } from '@leafygreen-ui/typography';

import { InputIcon } from '../InputIcon';
import { StateNotifications } from '../StateNotifications';
import { TogglePassword } from '../TogglePassword';

import {
  inputBaseStyles,
  inputDisabledBaseStyles,
  inputDisabledThemeStyles,
  inputFocusThemeStyles,
  inputIconSizeStyles,
  inputSizeStyles,
  inputThemeStyles,
  inputWrapperStyles,
  labelBaseStyles,
} from './PasswordInput.styles';
import {
  type MessageProps,
  PasswordInputProps,
  SizeVariant,
  States,
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
      onChange: onChangeProp,
      className,
      darkMode: darkModeProp,
      label,
      sizeVariant = SizeVariant.Default,
      stateNotifications = [],
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
    //TODO: can't find hook for some reason
    // const { value, handleChange } = useControlledValue(valueProp, onChangeProp);

    // If disabled then hide password
    useEffect(() => {
      if (disabled) setShowPassword(false);
    }, [disabled]);

    const handleTogglePasswordClick = () => setShowPassword(s => !s);

    const getStateFromArray = (): States => {
      if (stateNotifications.length === 0) return States.None;

      const statesArray: Array<States> = (
        stateNotifications as Array<MessageProps>
      ).map((message: MessageProps) => message.state);

      // if (statesArray.length === 1) return statesArray[0];
      if (allEqual(statesArray)) return statesArray[0];
      if (statesArray.includes(States.Error)) return States.Error;
      if (statesArray.includes(States.Warning)) return States.Warning;

      return States.None;
    };

    const state: States = Array.isArray(stateNotifications)
      ? getStateFromArray()
      : stateNotifications;

    const hasValidationMessages =
      !ariaDescribedbyProp && Array.isArray(stateNotifications);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div className={cx(className)} ref={forwardedRef}>
          {label && (
            <Label
              id={ariaLabelledby}
              className={labelBaseStyles}
              htmlFor={inputId}
              disabled={disabled}
            >
              {label}
            </Label>
          )}
          <div className={inputWrapperStyles}>
            <input
              type={showPassword ? 'text' : 'password'}
              // value={value}
              id={inputId}
              autoComplete={autoComplete}
              aria-describedby={ariaDescribedby}
              aria-labelledby={ariaLabelledby}
              aria-disabled={disabled}
              aria-invalid={state === States.Error || state === States.Warning}
              className={cx(
                inputBaseStyles,
                inputSizeStyles[sizeVariant],
                inputFocusThemeStyles[theme],
                {
                  [inputThemeStyles[theme][state]]: !disabled,
                  [cx(
                    inputDisabledBaseStyles,
                    inputDisabledThemeStyles[theme],
                  )]: disabled,
                  [inputIconSizeStyles[sizeVariant]]:
                    !hasValidationMessages && state !== States.None,
                },
              )}
              // onChange={handleChange}
              readOnly={disabled ? true : false}
              {...rest}
            />
            {/* Visual icons inside the input will only render if aria-describedby is set and the state is not `none`. None does not need a visible icon */}
            {!hasValidationMessages && state !== States.None && (
              <InputIcon state={state} sizeVariant={sizeVariant} />
            )}
            <TogglePassword
              disabled={disabled}
              showPassword={showPassword}
              handleTogglePasswordClick={handleTogglePasswordClick}
              sizeVariant={sizeVariant}
            />
          </div>
          {hasValidationMessages && (
            <StateNotifications
              ariaDescribedby={ariaDescribedby}
              messages={stateNotifications as Array<MessageProps>}
            />
          )}
        </div>
      </LeafyGreenProvider>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

// const stateNotificationPropCheck = () => {
//   const stateProp = PropTypes.oneOf(Object.values(States)).isRequired;
//   const arrayProp = PropTypes.arrayOf(
//     PropTypes.shape({
//       state: PropTypes.oneOf(Object.values(States)).isRequired,
//       message: PropTypes.string.isRequired,
//     }),
//   );
//   const ariaProp = 'aria-describedby';

//   return function validate(
//     props: { [x: string]: any },
//     propName: string,
//     ...rest: Array<any> // ...rest: ['componentName', 'location', 'propFullName']
//   ) {
//     const originalPropType1 = stateProp(props, propName, ...rest);
//     const originalPropType2 = arrayProp(props, propName, ...rest);
//     if (
//       typeof props[ariaProp] === 'string' &&
//       typeof props[propName] !== 'string'
//     )
//       return originalPropType1;
//     if (typeof props[ariaProp] === 'undefined') return originalPropType2;
//     return new Error('Error');
//   };
// };

const check = function (
  props: { [x: string]: any },
  propName: string,
  ...rest: ['componentName', 'location', 'propFullName']
) {
  const stateProp = PropTypes.oneOf(Object.values(States)).isRequired;
  const arrayProp = PropTypes.arrayOf(
    PropTypes.shape({
      state: PropTypes.oneOf(Object.values(States)).isRequired,
      message: PropTypes.string.isRequired,
    }),
  );
  const ariaProp = 'aria-describedby';

  const originalPropType1 = stateProp(props, propName, ...rest);
  const originalPropType2 = arrayProp(props, propName, ...rest);

  if (
    typeof props[ariaProp] === 'string' &&
    typeof props[propName] !== 'string'
  )
    return originalPropType1;
  if (typeof props[ariaProp] === 'undefined') return originalPropType2;
};

PasswordInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  'aria-labelledby': PropTypes.string,
  className: PropTypes.string,
  darkMode: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  sizeVariant: PropTypes.oneOf(Object.values(SizeVariant)),
  value: PropTypes.string,
  /// @ts-ignore
  'aria-describedby': PropTypes.string,
  /// @ts-ignore
  // stateNotifications: PropTypes.oneOfType([
  //   PropTypes.oneOf(Object.values(States)).isRequired,
  //   PropTypes.arrayOf(
  //     PropTypes.shape({
  //       state: PropTypes.oneOf(Object.values(States)).isRequired,
  //       message: PropTypes.string.isRequired,
  //     }),
  //   ),
  // ]),

  // stateNotifications: function (props: { [x: string]: any }, propName: string) {
  //   if (
  //     typeof props['aria-describedby'] === 'string' &&
  //     typeof props[propName] !== 'string'
  //   ) {
  //     return new Error(
  //       '`stateNotifications` must be of type `"error" | "warning" | "valid" | "none"`, expected string',
  //     );
  //   }

  //   return PropTypes.arrayOf(
  //     PropTypes.shape({
  //       state: PropTypes.oneOf(Object.values(States)).isRequired,
  //       message: PropTypes.string.isRequired,
  //     }),
  //   );
  // },

  // stateNotifications: stateNotificationPropCheck(),
  stateNotifications: check,
};
