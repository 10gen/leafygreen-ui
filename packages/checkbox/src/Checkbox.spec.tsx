import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Checkbox from '.';

afterAll(cleanup);

const className = 'test-classname';
const onChange = jest.fn();
const onClick = jest.fn();

function renderCheckbox(props = {}) {
  const utils = render(
    <Checkbox data-testid="checkbox" label="this is the label" {...props} />,
  );
  const checkbox = utils.getByTestId('checkbox');
  const label = utils.container.querySelector('label');
  return { ...utils, checkbox, label };
}

describe('packages/checkbox', () => {
  test(`renders ${className} in the Checkbox label's classlist`, () => {
    const { label } = renderCheckbox({ className });
    expect(label?.classList.contains(className)).toBe(true);
  });

  test('renders as unchecked by default', () => {
    const { checkbox } = renderCheckbox();
    expect((checkbox as HTMLInputElement).checked).toBe(false);
    expect(checkbox.getAttribute('aria-checked')).toBe('false');
  });

  test('renders as checked when the prop is set', () => {
    const { checkbox } = renderCheckbox({ checked: true });
    // expect((checkbox as HTMLInputElement).checked).toBe(true);
    expect(checkbox.getAttribute('aria-checked')).toBe('true');
  });

  test('renders as disabled when the prop is set', () => {
    const { checkbox } = renderCheckbox({ disabled: true });
    expect((checkbox as HTMLInputElement).disabled).toBe(true);
    expect(checkbox.getAttribute('aria-disabled')).toBe('true');
  });

  test('renders as indeterminate when the prop is set', () => {
    const { checkbox } = renderCheckbox({ indeterminate: true });
    expect(checkbox.getAttribute('aria-checked')).toBe('mixed');
  });

  describe('when controlled', () => {
    test('onClick fires once when the label is clicked', () => {
      const { label } = renderCheckbox({ onClick, checked: false });
      fireEvent.click(label!);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('onChange fires once when the label is clicked', () => {
      const { label } = renderCheckbox({ onChange, checked: false });
      fireEvent.click(label!);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    test('checkbox does not become checked when clicked', () => {
      const { checkbox } = renderCheckbox({ checked: false });
      fireEvent.click(checkbox);
      expect((checkbox as HTMLInputElement).checked).toBe(false);
    });
  });

  describe('when uncontrolled', () => {
    const uncontrolledOnClick = jest.fn();
    const uncontrolledOnChange = jest.fn();

    test('onClick fires once when the label is clicked', () => {
      const { label } = renderCheckbox({ onClick: uncontrolledOnClick });
      fireEvent.click(label!);
      expect(uncontrolledOnClick).toHaveBeenCalledTimes(1);
    });

    test('onChange fires once when the label is clicked', () => {
      const { label } = renderCheckbox({ onChange: uncontrolledOnChange });
      fireEvent.click(label!);
      expect(uncontrolledOnChange).toHaveBeenCalledTimes(1);
    });

    test('checkbox becomes checked when clicked', () => {
      const { checkbox } = renderCheckbox({});
      fireEvent.click(checkbox);
      expect((checkbox as HTMLInputElement).checked).toBe(true);
    });
  });
});
