import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, number } from '@storybook/addon-knobs';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import MongoMenu, { Product } from '.';

storiesOf('MongoMenu', module).add('Default', () => (
  <LeafyGreenProvider>
    <MongoMenu
      user={{
        firstName: text('firstName', 'Alex'),
        lastName: text('lastName', 'Smith'),
        email: text('email', 'alex.smith@mongodb.com'),
      }}
      activeProduct={select(
        'activeProduct',
        Object.values(Product),
        Product.Atlas,
      )}
      accountURL={select(
        'accountURL',
        ['https://cloud.mongodb.com/v2#/account', ''],
        'https://cloud.mongodb.com/v2#/account',
      )}
      invitations={number('number', 5)}
    />
  </LeafyGreenProvider>
));
