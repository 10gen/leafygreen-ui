import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { BoxProps } from '@leafygreen-ui/box';
import Button from './Button';
import { ButtonProps } from './types';
import Link from 'next/link';

const className = 'test-button-class';
const title = 'Test button title';
const child = 'Button child';

function renderButton(props: BoxProps<'button', ButtonProps> = {}) {
  const utils = render(<Button {...props} data-testid="button-id" />);
  const button = utils.getByTestId('button-id');
  return { ...utils, button };
}

describe('packages/button', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues when rendered as a button', async () => {
      const { container } = renderButton({ children: child });
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    test('does not have basic accessibility issues when rendered as an anchor tag', async () => {
      const { container } = renderButton({
        href: 'https://mongodb.design',
        children: child,
      });
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    test(`renders "${className}" in the component's markup`, () => {
      const { button } = renderButton({
        className,
      });

      expect(button.closest(`.${className}`)).toBeVisible();
    });

    test(`renders "${child}" as the button's textContent`, () => {
      const { button } = renderButton({
        children: child,
      });
      expect(button.textContent).toBe(child);
    });

    test(`renders "${title}" as the button title`, () => {
      const { button } = renderButton({
        title,
      });
      expect(button.title).toBe(title);
    });

    test(`renders the disabled and aria-disabled attributes when disabled is set`, () => {
      const { button } = renderButton({
        disabled: true,
      });
      expect((button as HTMLButtonElement).disabled).toBe(true);
      expect(button.getAttribute('aria-disabled')).toBe('true');
    });

    test(`renders a button with the "button" type by default`, () => {
      const { button } = renderButton();
      expect((button as HTMLButtonElement).type).toBe('button');
    });

    test(`renders a button with the given type when one is set`, () => {
      const { button } = renderButton({
        type: 'submit',
      });
      expect((button as HTMLButtonElement).type).toBe('submit');
    });

    test(`renders inside of a \`button\` tag by default`, () => {
      const { button } = renderButton();
      expect(button.tagName.toLowerCase()).toBe('button');
    });

    test(`renders component inside of an \`a\` tag when "href" prop is set`, () => {
      const { button } = renderButton({
        href: 'http://mongodb.design',
      });
      expect(button.tagName.toLowerCase()).toBe('a');
    });

    test(`renders component inside of \`button\` tag when "href" prop is undefined`, () => {
      const { button } = renderButton({
        href: undefined,
      });
      expect(button.tagName.toLowerCase()).toBe('button');
    });

    test(`renders component inside of \`div\` tag when "href" prop is set, but "disabled" is true`, () => {
      const { button } = renderButton({
        href: 'http://mongodb.design',
        disabled: true,
      });
      expect(button.tagName.toLowerCase()).toBe('button');
    });

    test(`renders a button as another HTML element if the "as" prop is set`, () => {
      const { container, button } = renderButton({
        as: 'p',
      });
      expect(container.querySelector('button')).not.toBeInTheDocument();
      expect(button.tagName.toLowerCase()).toBe('p');
    });

    test(`renders a button as another component if the "as" prop is set`, () => {
      const { container, button } = renderButton({
        href: 'https://mongodb.design',
        as: Link,
      });

      expect(container.querySelector('button')).not.toBeInTheDocument();
      expect(button.tagName.toLowerCase()).toBe('a');
    });

    test(`does not render the disabled attribute for a disabled link`, () => {
      const { button } = renderButton({
        href: 'http://mongodb.design',
        disabled: true,
      });
      expect(button).not.toHaveAttribute('disabled');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    test('renders additional attributes not explicitly defined in props', () => {
      const { button } = renderButton({
        tabIndex: 0,
      });

      expect(button).toHaveAttribute('tabindex', '0');
    });
  });

  describe('interaction', () => {
    test('fires the onClick handler once when clicked', () => {
      const onClick = jest.fn();
      const { button } = renderButton({
        onClick,
      });
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('does not fire onClick handler when disabled', () => {
      const onClick = jest.fn();
      const { button } = renderButton({
        disabled: true,
        onClick,
      });
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(0);
    });

    test('does not fire onClick handler on disabled anchor', () => {
      const onClick = jest.fn();
      const { button } = renderButton({
        disabled: true,
        as: 'a',
        onClick,
      });
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(0);
    });

    test('does not fire onClick handler on disabled anchor set by "href"', () => {
      const onClick = jest.fn();
      const href = 'https://mongodb.design';
      const { button } = renderButton({
        disabled: true,
        href,
        onClick,
      });
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(0);
    });

    test('href attribute exists on a link', () => {
      const href = 'https://mongodb.design';
      const { button } = renderButton({
        href,
      });
      expect(button).toHaveAttribute('href', href);
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('types behave as expected', () => {
    // eslint-disable-next-line jest/expect-expect
    test('does not throw an error when no children are passed to the component', () => {
      <Button onClick={() => {}} />;
    });
  });
});
