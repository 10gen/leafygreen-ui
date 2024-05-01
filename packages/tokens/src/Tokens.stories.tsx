/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import startCase from 'lodash/startCase';

import Card from '@leafygreen-ui/card';
import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

import { Mode } from './mode';
import {
  color,
  focusRing,
  fontFamilies,
  hoverRing,
  spacing,
  transitionDuration,
  typeScales,
} from '.';

const meta: StoryMetaType<any> = {
  title: 'Components/Tokens',
  component: null,
  parameters: { default: 'Spacing' },
};
export default meta;

type HoverRingColor = keyof typeof hoverRing.dark;
type TypeScale = keyof typeof typeScales;
type FontFamily = keyof typeof fontFamilies;

const gutter = css`
  margin-left: ${spacing[3]}px;
`;

const spacingBlockVariants = Object.keys(spacing)
  .filter(num => Number(num) === 0 || Number(num) > 25)
  .reduce((acc: Partial<Record<keyof typeof spacing, string>>, index, idx) => {
    const key = index as PropertyKey as keyof typeof spacing;
    acc[key] = css`
      background-color: ${palette.purple.light2};
      width: ${spacing[key]}px;
      height: ${spacing[key]}px;
    `;
    return acc;
  }, {});

function SpacingBlock({ space }: { space: keyof typeof spacing }) {
  return (
    <div className={gutter}>
      <code>
        spacing[{space}]: {spacing[space]}
      </code>
      <div className={spacingBlockVariants[space]}></div>
    </div>
  );
}

export const Spacing = () => (
  <div>
    <h2>Spacing</h2>
    <div
      className={css`
        display: flex;
        flex-direction: column;
        gap: ${spacing[100]}px;
      `}
    >
      {Object.keys(spacing)
        .filter(num => Number(num) === 0 || Number(num) > 25)
        .map(space => (
          <SpacingBlock
            space={space as PropertyKey as keyof typeof spacing}
            key={space}
          />
        ))}
    </div>
  </div>
);

export const TypeScales = () => {
  return (
    <div>
      <h2>Typescales</h2>
      {Object.keys(typeScales).map((_scale: string) => {
        const scale = _scale as TypeScale;
        return (
          <div
            key={scale}
            className={css`
              font-family: ${scale.includes('code')
                ? fontFamilies.code
                : fontFamilies.default};
              font-size: ${typeScales[scale].fontSize}px;
              line-height: ${typeScales[scale].lineHeight}px;
              margin: ${spacing[3]}px 0;
            `}
          >
            <div>{scale}</div>
          </div>
        );
      })}
    </div>
  );
};

export const FontFamilies = () => (
  <div>
    <h2>Font Families</h2>
    {Object.keys(fontFamilies).map((_family: string) => {
      const family = _family as FontFamily;
      return (
        <div
          key={family}
          className={css`
            font-family: ${fontFamilies[family]};
            margin: ${spacing[3]}px 0;
          `}
        >
          <div>{family}</div>
        </div>
      );
    })}
  </div>
);

const generateTable = (theme: Theme) => {
  const isDarkMode = !!(theme === Theme.Dark);
  return (
    <Card darkMode={isDarkMode}>
      <h3
        className={css`
          color: ${color[theme].text.primary.default};
          text-transform: capitalize;
        `}
      >
        {theme} Mode
      </h3>
      <div
        className={css`
          display: flex;
          gap: ${spacing[400]}px;
        `}
      >
        {Object.keys(color[theme]).map(type => (
          <Card darkMode={isDarkMode}>
            <table
              className={css`
                border-spacing: ${spacing[200]}px;
              `}
            >
              <thead
                className={css`
                  font-size: 10px;
                `}
              >
                <td
                  className={css`
                    color: ${color[theme].text.secondary.default};
                    font-weight: bold;
                    width: 100px;
                  `}
                >
                  <code>{type}</code>
                </td>
                <td
                  className={css`
                    width: ${spacing[1600]}px;
                  `}
                >
                  <code>default</code>
                </td>
                <td
                  className={css`
                    width: ${spacing[1600]}px;
                  `}
                >
                  <code>hover</code>
                </td>
                <td
                  className={css`
                    width: ${spacing[1600]}px;
                  `}
                >
                  <code>focus</code>
                </td>
              </thead>
              {Object.keys(color[theme][type]).map(variant => (
                <tbody
                  className={css`
                    font-size: 10px;
                  `}
                >
                  <tr>
                    <td>
                      <code>{variant}</code>
                    </td>

                    {Object.keys(color[theme][type][variant]).map(state => (
                      <td
                        className={css`
                          border: 1px solid
                            ${color[theme].border.primary.default};
                          background-color: ${color[theme][type][variant][
                            state
                          ]};
                        `}
                      />
                    ))}
                  </tr>
                </tbody>
              ))}
            </table>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export const Colors = () => {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        gap: ${spacing[400]}px;
      `}
    >
      <h2>Color Tokens</h2>
      {Object.values(Theme).map(theme => generateTable(theme))}
    </div>
  );
};

export const InteractionRings = () => {
  const invertMode = (mode: Mode): Mode => (mode === 'dark' ? 'light' : 'dark');

  const modeWrapper = (mode: Mode) => css`
    display: flex;
    gap: ${spacing[2]}px;
    color: ${mode === 'dark' ? palette.white : palette.black};
    background-color: ${mode === 'dark' ? palette.black : palette.white};
    border: 1px solid
      ${mode === 'dark' ? palette.gray.light3 : palette.gray.dark3};
    border-radius: ${spacing[3]}px;
    padding: ${spacing[4]}px;
    margin: ${spacing[3]}px 0;
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
    transition: box-shadow ${transitionDuration.faster}ms ease-in-out;
  `;

  return (
    <div>
      <h2>Interaction States</h2>
      <div>
        {Object.values(Mode).map((mode: Mode) => (
          <div key={mode} className={modeWrapper(mode)}>
            {Object.keys(hoverRing[mode]).map(_color => {
              const color = _color as HoverRingColor;
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
};
InteractionRings.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};
