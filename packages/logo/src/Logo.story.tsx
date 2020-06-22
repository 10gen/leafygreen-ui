import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, select, boolean } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { Variant } from './utils';
import {
  Logo,
  LogoMark,
  CloudManagerLogo,
  AtlasLogo,
  RealmLogo,
  ChartsLogo,
} from '.';

const containerStyle = css`
  width: 150px;
  height: 70px;
  flex-shrink: 0;
  text-align: center;
  border: 1px solid #babdbe;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0.5rem;
`;

const textStyle = css`
  font-size: 12px;
  color: #babdbe;
  margin-top: 0.5rem;
`;

const map = {
  cloudManager: CloudManagerLogo,
  atlas: AtlasLogo,
  realm: RealmLogo,
  charts: ChartsLogo,
};

storiesOf('Logo', module)
  .add('LogoMark', () => {
    const variant = select(
      'Variant',
      Object.values(Variant) as Array<Variant>,
      Variant.Dark,
    );

    const background = css`
      padding: 10px;
      background-color: ${variant === Variant.Dark
        ? uiColors.gray.light3
        : uiColors.gray.dark3};
    `;

    return (
      <div className={background}>
        <LogoMark
          variant={variant}
          knockout={boolean('Knockout', false)}
          height={number('Height', 40)}
        />
      </div>
    );
  })
  .add('Logo', () => {
    const variant = select(
      'Variant',
      Object.values(Variant) as Array<Variant>,
      Variant.Dark,
    );

    const background = css`
      padding: 10px;
      background-color: ${variant === Variant.Dark
        ? uiColors.gray.light3
        : uiColors.gray.dark3};
    `;

    return (
      <div className={background}>
        <Logo
          variant={variant}
          knockout={boolean('Knockout', false)}
          height={number('Height', 40)}
        />
      </div>
    );
  })
  .add('Product Logos', () => {
    const knockout = boolean('knockout', false);
    const size = number('size', 18);

    const renderProductLogo = product => {
      const Logo = map[product];
      return (
        <div key={product} className={containerStyle}>
          <Logo knockout={knockout} size={size} />
          <div className={textStyle}>{product}</div>
        </div>
      );
    };

    return <>{Object.keys(map).map(renderProductLogo)}</>;
  });
