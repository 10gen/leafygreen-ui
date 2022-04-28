/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { H2, InlineCode } from '@leafygreen-ui/typography';
import { spacing } from '.';
import hoverRing from './hoverRing';
import { Mode } from './mode';
import { startCase } from 'lodash';
import fontFamilies from './fontFamilies';
import typeScales from './typeScales';
import { focusRing } from '../dist';

const gutter = css`
  margin-left: ${spacing[3]}px;
`;

const colors = [
  '#fb4949',
  '#497ffb',
  '#62e3fd',
  '#52c825',
  '#fdd063',
  '#fd7fec',
  '#a5fd8b',
];

const spacingBlockVariants = Object.keys(spacing).reduce(
  (acc: Partial<Record<keyof typeof spacing, string>>, index, idx) => {
    const key = index as PropertyKey as keyof typeof spacing;
    acc[key] = css`
      background-color: ${colors[idx]};
      width: ${spacing[key]}px;
      height: ${spacing[key]}px;
    `;
    return acc;
  },
  {},
);

function SpacingBlock({ space }: { space: keyof typeof spacing }) {
  return (
    <div className={gutter}>
      <InlineCode>
        spacing[{space}]: {spacing[space]}
      </InlineCode>
      <div className={spacingBlockVariants[space]}></div>
    </div>
  );
}

storiesOf('Packages/Tokens', module)
  .add('Spacing', () => (
    <div>
      <H2>Spacing</H2>
      <div
        className={css`
          display: flex;
        `}
      >
        {Object.keys(spacing).map(space => (
          <SpacingBlock
            space={space as PropertyKey as keyof typeof spacing}
            key={space}
          />
        ))}
      </div>
    </div>
  ))
  .add('Typescales', () => {
    return (
      <div>
        <H2>Typescales</H2>
        {Object.keys(typeScales).map(scale => (
          <div
            key={scale}
            className={css`
              font-family: ${scale.includes('code')
                ? fontFamilies.code
                : fontFamilies.default};
              font-size: ${typeScales[scale].fontSize}px;
              line-height: ${typeScales[scale].lineHeight}px;
              margin: ${spacing[3]}px;
            `}
          >
            <InlineCode>
              typeScales.{scale}: {JSON.stringify(typeScales[scale])}
            </InlineCode>{' '}
            <div>{scale}</div>
          </div>
        ))}
      </div>
    );
  })
  .add('Font Families', () => (
    <div>
      <H2>Font Families</H2>
      {Object.keys(fontFamilies).map(family => (
        <div
          key={family}
          className={css`
            font-family: ${fontFamilies[family]};
            margin: ${spacing[3]}px;
          `}
        >
          <InlineCode>
            fontFamilies.{family}: {fontFamilies[family]}
          </InlineCode>
          <div>{family}</div>
        </div>
      ))}
    </div>
  ))
  .add('Interaction rings', () => {
    const invertMode = (mode: Mode): Mode =>
      mode === 'dark' ? 'light' : 'dark';

    const modeWrapper = (mode: Mode) => css`
      display: flex;
      gap: ${spacing[2]}px;
      color: ${mode === 'dark' ? palette.white : palette.black};
      background-color: ${mode === 'dark' ? palette.black : palette.white};
      border: 1px solid
        ${mode === 'dark' ? palette.gray.light3 : palette.gray.dark3};
      border-radius: ${spacing[3]}px;
      padding: ${spacing[4]}px;
      margin: ${spacing[2]}px;
    `;

    const buttonBase = css`
      font-family: ${fontFamilies.default};
      font-size: ${typeScales.body2.fontSize}px;
      outline: none;
      background-color: unset;
      border: unset;
      padding: ${spacing[2]}px;
      border-radius: ${spacing[1]}px;
      cursor: pointer;
      transition: box-shadow 100ms ease-in-out;
    `;

    return (
      <div>
        <H2>Interaction States</H2>
        <div>
          {Object.values(Mode).map(mode => (
            <div key={mode} className={modeWrapper(mode as Mode)}>
              {Object.keys(hoverRing[mode]).map(color => {
                return (
                  <button
                    key={color}
                    className={css`
                      ${buttonBase};
                      background-color: ${palette[color][`${mode}3`]};
                      color: ${palette[color][`${invertMode(mode)}2`]};
                      &:hover {
                        box-shadow: ${hoverRing[mode][color]};
                      }
                      &:focus {
                        box-shadow: ${focusRing[mode].default};
                      }
                    `}
                  >
                    {startCase(color)}
                  </button>
                );
              })}
              <input
                type="text"
                placeholder="Input"
                className={css`
                  ${buttonBase};
                  border: 1px solid ${palette.gray[`${mode}1`]};
                  &:hover {
                    box-shadow: ${hoverRing[mode].gray};
                  }
                  &:focus {
                    box-shadow: ${focusRing[mode].input};
                  }
                `}
              />
            </div>
          ))}
        </div>
      </div>
    );
  });
