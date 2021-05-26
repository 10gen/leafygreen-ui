import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { typeIs } from '@leafygreen-ui/lib';
import RadioBox from './RadioBox';
import RadioBoxGroup from './RadioBoxGroup';

const className = 'test-radio-box-class';

const { container } = render(
  <RadioBox value="radio-1" className={className} checked readOnly>
    Input 1
  </RadioBox>,
);

describe('packages/RadioBox', () => {
  const radioBoxContainer = container.firstChild;

  if (!typeIs.element(radioBoxContainer)) {
    throw new Error('Could not find radio box container element');
  }

  const radioBox = radioBoxContainer.firstChild;

  if (!typeIs.input(radioBox)) {
    throw new Error('Could not find radio box input element');
  }

  test('does not have basic accessibility issues', async () => {
    const results = await axe(radioBoxContainer);
    expect(results).toHaveNoViolations();
  });

  test(`renders "${className}" in RadioBox's classList`, () => {
    expect(radioBoxContainer.classList.contains(className)).toBe(true);
  });

  test('renders as checked, when the checked prop is set', () => {
    expect(radioBox.checked).toBe(true);
    expect(radioBox.getAttribute('aria-checked')).toBe('true');
  });

  test('renders as disabled, when the disabled prop is set', () => {
    const { container } = render(
      <RadioBox value="option-disabled" disabled>
        Input 2
      </RadioBox>,
    );

    const radioBoxContainer = container.firstChild;

    if (!typeIs.element(radioBoxContainer)) {
      throw new Error('Could not find radio box container element');
    }

    const radioBox = radioBoxContainer.firstChild;

    if (!typeIs.input(radioBox)) {
      throw new Error('Could not find radio box input element');
    }

    expect(radioBox.getAttribute('aria-disabled')).toBe('true');
  });
});

describe('packages/RadioBoxGroup', () => {
  function WrappedRadioBox({ text }: { text: string }) {
    return (
      <div className="wrapped-radio-box">
        {text} <RadioBox value="option-3">Input 3</RadioBox>
      </div>
    );
  }

  const { container } = render(
    <RadioBoxGroup>
      <RadioBox value="option-1">Input 1</RadioBox>
      <h1>Will Remain As Text</h1>
      <RadioBox value="option-2">Input 2</RadioBox>
      <WrappedRadioBox text="Also still text" />
    </RadioBoxGroup>,
  );

  const radioBoxGroupContainer = container.firstChild;

  if (!typeIs.element(radioBoxGroupContainer)) {
    throw new Error('Could not find radio box group container element');
  }

  const text = radioBoxGroupContainer.children[1];

  test('renders children of Radio Box Group, that are not themselves Radio Boxes, as is, without converting them to RadioBoxes', () => {
    expect(text.tagName.toLowerCase()).toBe('h1');
  });

  const wrapped = radioBoxGroupContainer.children[3];

  test('renders wrapper components as themselves', () => {
    expect(wrapped.tagName.toLowerCase()).toBe('div');
    expect(wrapped.className).toBe('wrapped-radio-box');
  });

  describe('when controlled', () => {
    const controlledOnChange = jest.fn();

    render(
      <RadioBoxGroup value="option-1" onChange={controlledOnChange}>
        <RadioBox value="option-1">Option 1</RadioBox>
        <RadioBox value="option-2">Option 2</RadioBox>
        <WrappedRadioBox text="text" />
      </RadioBoxGroup>,
      { container },
    );

    const radioBoxGroup = container.firstChild;

    if (!typeIs.element(radioBoxGroup)) {
      throw new Error('Could not find radio box group element');
    }

    const firstRadioBoxLabel = radioBoxGroup.firstChild;

    if (!typeIs.element(firstRadioBoxLabel)) {
      throw new Error('Could not find label element');
    }

    const firstRadioBoxInput = firstRadioBoxLabel.firstChild;
    const secondRadioBoxInput = radioBoxGroup.children[1].firstChild;

    if (
      !typeIs.input(firstRadioBoxInput) ||
      !typeIs.input(secondRadioBoxInput)
    ) {
      throw new Error('Could not find input element');
    }

    fireEvent.click(secondRadioBoxInput);

    test('initial value set by radio box group when prop provided', () => {
      expect(firstRadioBoxInput.checked).toBe(true);
      expect(firstRadioBoxInput.getAttribute('aria-checked')).toBe('true');
    });

    test('onChange fires once when the label is clicked', () => {
      expect(controlledOnChange.mock.calls.length).toBe(1);
    });

    test('radio input does not become checked when clicked', () => {
      expect(secondRadioBoxInput.checked).toBe(false);
    });
  });

  describe('when controlled with a wrapper component', () => {
    const controlledOnChange = jest.fn();

    const { container } = render(
      <RadioBoxGroup value="option-1" onChange={controlledOnChange}>
        <RadioBox value="option-1">Option 1</RadioBox>
        <RadioBox value="option-2">Option 2</RadioBox>
        <WrappedRadioBox text="text" />
      </RadioBoxGroup>,
    );

    const radioBoxGroup = container.firstChild;

    if (!typeIs.element(radioBoxGroup)) {
      throw new Error('Could not find radio box group element');
    }

    const firstRadioBoxLabel = radioBoxGroup.firstChild;

    if (!typeIs.element(firstRadioBoxLabel)) {
      throw new Error('Could not find label element');
    }

    const firstRadioBoxInput = firstRadioBoxLabel.firstChild;

    if (!typeIs.input(firstRadioBoxInput)) {
      throw new Error('Could not find input element');
    }

    const wrappedRadioBoxInput =
      radioBoxGroup.children[2].firstElementChild?.firstElementChild;

    if (!typeIs.input(wrappedRadioBoxInput)) {
      throw new Error('Could not find wrapped input element');
    }

    fireEvent.click(wrappedRadioBoxInput);

    test('initial value set by radio box group', () => {
      // .checked prop can be inconsistent in ssr tests,
      // so while I'd like to do expect(firstRadioBoxInput.checked).toBe(true);
      // aria-checked should be good enough
      expect(firstRadioBoxInput.getAttribute('aria-checked')).toBe('true');
    });

    test('onChange fires when the wrapped label is clicked', () => {
      expect(controlledOnChange.mock.calls.length).toBe(1);
    });

    test('wrapped input does not become checked when clicked', () => {
      expect(wrappedRadioBoxInput.checked).toBe(false);
    });
  });

  describe('when controlled with a selected wrapper component', () => {
    const controlledOnChange = jest.fn();

    const { container } = render(
      <RadioBoxGroup value="option-3" onChange={controlledOnChange}>
        <RadioBox value="option-1">Option 1</RadioBox>
        <RadioBox value="option-2">Option 2</RadioBox>
        <WrappedRadioBox text="text" />
      </RadioBoxGroup>,
    );

    const radioBoxGroup = container.firstChild;

    if (!typeIs.element(radioBoxGroup)) {
      throw new Error('Could not find radio box group element');
    }

    const wrappedRadioBoxInput =
      radioBoxGroup.children[2].firstElementChild?.firstElementChild;

    if (!typeIs.input(wrappedRadioBoxInput)) {
      throw new Error('Could not find wrapped input element');
    }

    test('wrapped input is rendered as checked', () => {
      expect(wrappedRadioBoxInput.checked).toBe(true);
      expect(wrappedRadioBoxInput.getAttribute('aria-checked')).toBe('true');
    });
  });

  describe('when uncontrolled', () => {
    const uncontrolledOnChange = jest.fn();

    render(
      <RadioBoxGroup onChange={uncontrolledOnChange}>
        <RadioBox value="option-1">Option 1</RadioBox>
      </RadioBoxGroup>,
      { container },
    );

    const radioBoxGroup = container.firstChild;

    if (!typeIs.element(radioBoxGroup)) {
      throw new Error('Could not find radio box group element');
    }

    const radioBoxLabel = radioBoxGroup.firstChild;

    if (!typeIs.element(radioBoxLabel)) {
      throw new Error('Could not find label element');
    }

    const radioBoxInput = radioBoxLabel.firstChild;

    if (!typeIs.input(radioBoxInput)) {
      throw new Error('Could not find radio box input element');
    }

    fireEvent.click(radioBoxLabel);

    test('onChange fires once when the label is clicked', () => {
      expect(uncontrolledOnChange.mock.calls.length).toBe(1);
    });

    test('radio box becomes checked when clicked', () => {
      expect(radioBoxInput.getAttribute('aria-checked')).toBe('true');
      expect(radioBoxInput.checked).toBe(true);
    });

    describe('and the default prop is set', () => {
      const uncontrolledContainer = render(
        <RadioBoxGroup onChange={uncontrolledOnChange}>
          <RadioBox value="option-1">RadioBox Button 1</RadioBox>
          <RadioBox default value="option-2">
            RadioBox Button 1
          </RadioBox>
        </RadioBoxGroup>,
      ).container.firstChild;

      const defaultRadioBox =
        uncontrolledContainer &&
        (uncontrolledContainer as HTMLElement).children[1].firstChild;

      test('radio box is checked when default prop is set', () => {
        expect((defaultRadioBox as HTMLInputElement).checked).toBe(true);
      });
    });
  });
});
