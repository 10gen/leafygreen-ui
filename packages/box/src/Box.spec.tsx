import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import Box, { ExtendableBox, BoxProps } from '.';

interface LinkWrapperProps {
  href?: string;
  target?: string;
  children?: React.ReactNode;
}

const TestComponent = (props: { test: number }) => {
  return <div>{props.test}</div>;
};

const TestAnchorLike = (props: React.AnchorHTMLAttributes<any>) => {
  return <a {...props} />; //eslint-disable-line jsx-a11y/anchor-has-content
};

const TestExtendableBox: ExtendableBox<{ test: number }> = (
  props: BoxProps & { test: number },
) => {
  // @ts-ignore
  return <Box {...props} />;
};

describe('packages/box', () => {
  const linkWrapperFn = jest.fn();

  function LinkWrapper({ href, target, children, ...rest }: LinkWrapperProps) {
    linkWrapperFn();
    return (
      <span {...rest}>
        <a data-testid="link-component" href={href} target={target}>
          {children}
        </a>
      </span>
    );
  }

  const sharedProps = { name: 'testName' };
  const anchorProps: React.ComponentPropsWithRef<'a'> & { as: 'a' } = {
    as: 'a',
    href: 'https://cloud.mongodb.com',
    target: '_blank',
    ...sharedProps,
  };

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  describe('when rendered with only shared props', () => {
    let box: HTMLElement;
    let child: HTMLElement;

    beforeEach(() => {
      const { getByTestId } = render(
        <Box data-testid="box" {...sharedProps}>
          <div data-testid="child">Child Content</div>
        </Box>,
      );

      box = getByTestId('box');
      child = getByTestId('child');
    });

    test('it renders the box component as a div', () => {
      expect(box).toBeInTheDocument();
      expect(box?.tagName.toLowerCase()).toBe('div');
    });

    test('it renders the child content', () => {
      expect(child).toBeInTheDocument();
    });

    test('it preserves the shared props', () => {
      expect(box).toHaveAttribute('name', sharedProps.name);
    });
  });

  describe('when rendered with the expected anchor props', () => {
    let box: HTMLElement;
    let child: HTMLElement;

    beforeEach(() => {
      const { getByTestId } = render(
        <Box {...anchorProps} data-testid="anchor-component">
          <span data-testid="anchor-child">hi</span>
        </Box>,
      );

      box = getByTestId('anchor-component');
      child = getByTestId('anchor-child');
    });

    test('it renders the box component as an anchor', () => {
      expect(box).toBeInTheDocument();
      expect(box?.tagName.toLowerCase()).toBe('a');
    });

    test('it renders the child content', () => {
      expect(child).toBeInTheDocument();
    });

    test('it preserves the shared props', () => {
      expect(box).toHaveAttribute('name', sharedProps.name);
    });

    test('it sets the anchor-specific attributes', () => {
      expect(box).toHaveAttribute('href', anchorProps.href);
      expect(box).toHaveAttribute('target', anchorProps.target);
    });
  });

  describe('when rendered as a custom component', () => {
    let box: HTMLElement;
    let child: HTMLElement;

    beforeEach(() => {
      const { getByTestId } = render(
        <Box
          as={LinkWrapper}
          href="https://cloud.mongodb.com"
          target="_blank"
          data-testid="custom-component"
        />,
      );
      box = getByTestId('custom-component');
      child = getByTestId('link-component');
    });

    test('it renders the box component as the custom component', () => {
      expect(box).toBeInTheDocument();
      expect(linkWrapperFn).toHaveBeenCalledTimes(1);
      expect(box?.tagName.toLowerCase()).toBe('span');
    });

    test('it renders the child content', () => {
      expect(child).toBeInTheDocument();
    });
  });

  describe('types work as expected', () => {
    // eslint-disable-next-line jest/expect-expect
    test('does not allow specifying "target", without "as" or "href"', () => {
      // @ts-expect-error
      <Box target="_blank" />;
    });

    // eslint-disable-next-line jest/expect-expect
    test('does not allow specifying "href", when "as" is set to "div" ', () => {
      // @ts-expect-error
      <Box as="div" href="string" />;
    });

    // eslint-disable-next-line jest/expect-expect
    test('does not allow props that do not exist on the "as" element', () => {
      // @ts-expect-error
      <Box as="div" x="" />;
    });

    // eslint-disable-next-line jest/expect-expect
    test('expects "href" to be a string when as is an anchor component wrapper', () => {
      // @ts-expect-error
      <Box as={TestAnchorLike} href={1} />;
    });

    // eslint-disable-next-line jest/expect-expect
    test('expects required props to exist when as is a React Component with required props', () => {
      // @ts-expect-error
      <Box as={TestComponent} />;
    });
  });

  describe('packages/box/ExtendableBox', () => {
    describe('the types work as expected', () => {
      // eslint-disable-next-line jest/expect-expect
      test('does not allow specifying "target", without "as" or "href"', () => {
        // @ts-expect-error
        <TestExtendableBox target="_blank" />;
      });

      // eslint-disable-next-line jest/expect-expect
      test('does not allow specifying "href", when "as" is set to "div" ', () => {
        // @ts-expect-error
        <TestExtendableBox as="div" href="string" />;
      });

      // eslint-disable-next-line jest/expect-expect
      test('does not allow props that do not exist on the "as" element', () => {
        // @ts-expect-error
        <TestExtendableBox as="div" x="" />;
      });

      // eslint-disable-next-line jest/expect-expect
      test('expects "href" to be a string when as is an anchor component wrapper', () => {
        // @ts-expect-error
        <TestExtendableBox as={TestAnchorLike} href={1} />;
      });

      // eslint-disable-next-line jest/expect-expect
      test('expects required props to exist when as is a React Component with required props', () => {
        // @ts-expect-error
        <TestExtendableBox as={TestComponent} />;
      });
    });
  });
});
