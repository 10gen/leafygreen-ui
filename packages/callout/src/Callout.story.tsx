import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import Callout, { Variant } from '.';

storiesOf('Callout', module).add('Default', () => {
  const variant = select(
    'Variant',
    Object.values(Variant) as Array<Variant>,
    Variant.Note,
  );
  const hasTitle = boolean('With title', true);

  return (
    <Callout variant={variant} title={hasTitle && text('Title', 'Title')}>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry&#39;s standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book.
    </Callout>
  );
});
