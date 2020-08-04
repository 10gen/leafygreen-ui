import React from 'react';
import PropTypes from 'prop-types';
import { isComponentType } from '@leafygreen-ui/lib';
import { Variant, Size } from './types';

export interface RadioGroupProps {
  /**
   * Determines if the component will appear in default or light mode.
   */
  variant: Variant;

  /**
   * className supplied to RadioGroup container.
   */
  className: string;

  /**
   * Callback to be executed when a Radio is selected.
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * Content that will appear inside of RadioGroup component.
   */
  children: React.ReactNode;

  /**
   * Name passed to each Radio belonging to the RadioGroup.
   */
  name?: string;

  /**
   * Determines what radio will be checked on default. Component will be controlled if this prop is used.
   */
  value?: string | number | null;

  /**
   * Determines the size of the Radio components Can be 'small' or 'default.
   * @default default
   */
  size?: Size;
}

/**
 * # RadioGroup
 *
 * RadioGroup component
 *
 * ```
<RadioGroup onChange={() => execute callback onChange}>
  <Radio value='Radio-1'>Radio 1</Radio>
  <Radio value='Radio-2'>Radio 2</Radio>
</RadioGroup>
```
 * @param props.children Content to appear inside of RadioGroup component.
 * @param props.onChange Callback to be executed when a Radio is selected.
 * @param props.value Radio that should appear checked. If value passed, component will be controlled by consumer.
 * @param props.className classname applied to RadioGroup container.
 * @param props.name Name passed to each Radio belonging to the RadioGroup.
 * @param props.variant Variant to determine if component will appear `default` or `light`.
 * @param props.size Determines the size of the Radio components Can be 'small' or 'default.
 */
function RadioGroup({
  variant = Variant.Default,
  size = Size.Default,
  className,
  onChange,
  children,
  value: controlledValue,
  name: nameProp,
}: RadioGroupProps) {
  const isControlled = controlledValue != null;

  let defaultChecked = '';

  !isControlled &&
    React.Children.forEach(children, child => {
      if (!React.isValidElement(child)) {
        return null;
      }

      if (child?.props?.default) {
        defaultChecked = child?.props?.value;
      }
    });

  const [uncontrolledValue, setUncontrolledValue] = React.useState<string>(
    defaultChecked,
  );

  const name = nameProp || `radio-group-${Math.floor(Math.random() * 1000000)}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }

    if (!isControlled) {
      setUncontrolledValue(e.target.value);
    }
  };

  const renderedChildren = React.Children.map(children, (child, index) => {
    if (!isComponentType(child, 'Radio')) {
      return child;
    }

    const checked = isControlled
      ? child.props.value === controlledValue || child.props.checked
      : child.props.value === uncontrolledValue;

    return React.cloneElement(child, {
      onChange: handleChange,
      id: child.props.id || `${name}-${index}`,
      checked,
      variant,
      name,
      size,
    });
  });

  return (
    <div className={className} role="group" aria-label={name}>
      {renderedChildren}
    </div>
  );
}

RadioGroup.propTypes = {
  variant: PropTypes.oneOf(['default', 'light']),
  size: PropTypes.oneOf(['small', 'default']),
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  children: PropTypes.node,
  name: PropTypes.string,
};

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
