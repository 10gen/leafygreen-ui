import React from 'react';
import { storiesOf } from '@storybook/react';
import { css } from '@leafygreen-ui/emotion';
import { spacing } from '.';

const gutter = css`
  margin-left: ${spacing[3]};
`;

const textWrapper = css`
  margin-bottom: ${spacing[2]};
  font-size: 10px;
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

const spacingBlockVariants = Object.keys(spacing).reduce((acc, key, idx) => {
  console.log(key);
  acc[key] = css`
    background-color: ${colors[idx]};
    width: ${spacing[key]};
    height: ${spacing[key]};
  `;
  return acc;
}, {});

function SpacingBlock({ space }: { space: string }) {
  return (
    <div className={gutter}>
      <div
        className={textWrapper}
      >{`spacing[${space}]: ${spacing[space]}`}</div>
      <div className={spacingBlockVariants[space]}></div>
    </div>
  );
}

storiesOf('Tokens', module).add('Spacing', () => (
  <div
    className={css`
      display: flex;
    `}
  >
    {Object.keys(spacing).map(space => (
      <SpacingBlock space={space} key={space} />
    ))}
  </div>
));
