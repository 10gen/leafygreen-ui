import React from 'react';
import { render } from '@testing-library/react';
import {
  H1,
  H2,
  H3,
  Subtitle,
  Body,
  Description,
  Label,
  Disclaimer,
  InlineCode,
  InlineKeyCode,
  Overline,
} from '.';

const typographyComponents: Array<{
  Component: React.ComponentType<any>;
  extendsBox: boolean;
}> = [
  { Component: H1, extendsBox: true },
  { Component: H2, extendsBox: true },
  { Component: H3, extendsBox: true },
  { Component: Subtitle, extendsBox: true },
  { Component: Body, extendsBox: false },
  { Component: Description, extendsBox: false },
  { Component: Label, extendsBox: false },
  { Component: Disclaimer, extendsBox: false },
  { Component: InlineCode, extendsBox: false },
  { Component: InlineKeyCode, extendsBox: false },
  { Component: Overline, extendsBox: false },
];

describe.each(typographyComponents)(
  'packages/typography',
  ({ Component, extendsBox }) => {
    const { displayName = '' } = Component;

    describe(`${displayName}`, () => {
      test('renders', () => {
        const { container } = render(<Component />);
        expect(container.firstElementChild).toBeInTheDocument();
      });

      test('renders props', () => {
        const { getByTestId } = render(<Component data-testid="component" />);
        expect(getByTestId('component')).toBeInTheDocument();
      });

      describe('Extends `Box`', () => {
        if (extendsBox) {
          test('renders with HTMLElement `as` prop', () => {
            const { getByTestId } = render(
              <Component data-testid="component" as={'span'} />,
            );
            expect(getByTestId('component')).toBeInTheDocument();
            expect(getByTestId('component').tagName.toLowerCase()).toBe('span');
          });

          // eslint-disable-next-line jest/no-disabled-tests
          test.skip('renders with `href`', () => {
            const { getByTestId } = render(
              <Component
                data-testid="component"
                href="http://mongodb.design"
              />,
            );
            expect(getByTestId('component')).toBeInTheDocument();
            expect(getByTestId('component').tagName.toLowerCase()).toBe('a');
            expect(getByTestId('component')).toHaveAttribute(
              'href',
              'http://mongodb.design',
            );
          });
        }
      });
    });
  },
);
