import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { Tab, Tabs, Variant } from './index';

function ControlledTabs() {
  const [selected, setSelected] = useState(0);

  const variant = select('variant', Object.values(Variant), Variant.Default);

  return (
    <div>
      <Tabs
        setSelected={setSelected}
        selected={selected}
        variant={variant}
        className={css`
          background-color: ${variant === Variant.Default
            ? 'white'
            : uiColors.gray.dark3};
          padding: 20px;
        `}
      >
        <Tab name={text('name', 'Harry Spencer Wolff')}>
          {text('Tab Content', 'Hello 1')}
        </Tab>
        <Tab name="Jeremy Steven Tice">Hello 2</Tab>
        <Tab name="Mark Frederick Truman">Hello 3</Tab>
      </Tabs>
    </div>
  );
}

storiesOf('Tabs', module)
  .add('Uncontrolled', () => (
    <Tabs>
      <Tab
        default={boolean('default', true)}
        name={text('name', 'Brooke Scarlett Yalof')}
      >
        {text('Tab Content', 'Hello 1')}
      </Tab>
      <Tab name="Robert Arnold Audroue">Hello 2</Tab>
      <Tab disabled={boolean('disabled', true)} name="David Scott McCarthy">
        Hello 3
      </Tab>
    </Tabs>
  ))
  .add('Controlled', () => <ControlledTabs />);
