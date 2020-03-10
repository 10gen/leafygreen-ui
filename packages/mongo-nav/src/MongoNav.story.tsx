import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import MongoNav from '.';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Product, NavElement } from './types';

const setStorybookWidth = css`
  width: 100%;
  margin: 0;
`;

storiesOf('MongoNav', module).add('Default', () => (
  <LeafygreenProvider>
    <div className={setStorybookWidth}>
      <MongoNav
        mode="dev"
        activeProduct={select(
          'activeProduct',
          Object.values(Product),
          Product.Cloud,
        )}
        activeNav={select(
          'activeNav',
          Object.values(NavElement),
          'orgNavAccessManager',
        )}
        onOrganizationChange={() => {}}
        onProjectChange={() => {}}
        admin={boolean('admin', true)}
        onElementClick={(t, e) => console.log(t)}
        onPrem={{
          mfa: true,
          version: '4.4.0',
          enabled: boolean('onPrem enabled', false),
        }}
        loadData={boolean('loadData', true)}
      />
    </div>
  </LeafygreenProvider>
));
