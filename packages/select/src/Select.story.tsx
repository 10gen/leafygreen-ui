import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';

import { css, cx } from '@leafygreen-ui/emotion';
import BeakerIcon from '@leafygreen-ui/icon/dist/Beaker';
import {
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';

import { Option, OptionGroup, Select, type SelectProps } from '.';

const meta: StoryMetaType<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    default: 'Uncontrolled',
    controls: {
      exclude: [...storybookExcludedControlParams, 'children', 'value'],
    },
  },
  args: {
    placeholder: 'Select',
    disabled: false,
    allowDeselect: false,
    darkMode: false,
    children: [
      <Option key="long" value="long">
        Cras mattis consectetur purus sit amet fermentum. Maecenas sed diam eget
        risus varius blandit sit amet non magna.
      </Option>,
      <OptionGroup key="Common" label="Common">
        <Option value="dog">Dog</Option>
        <Option value="cat">Cat</Option>
      </OptionGroup>,
      <OptionGroup key="Less common" label="Less common">
        <Option value="hamster">Hamster</Option>
        <Option value="parrot">Parrot</Option>
      </OptionGroup>,
      <Option key="iguana" value="iguana">
        Mexican spiny-tailed iguana
      </Option>,
      <Option key="spider" value="spider" disabled>
        Spider
      </Option>,
    ],
    usePortal: true,
  },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    defaultValue: { control: 'text' },
    readOnly: { control: 'boolean' },
    errorMessage: { control: 'text' },
    allowDeselect: { control: 'boolean' },
  },
};
export default meta;

export const Uncontrolled: StoryFn<SelectProps> = ({
  className,
  ...args
}: SelectProps) => (
  <Select
    {...args}
    data-test="hello-world"
    className={cx(
      css`
        min-width: 200px;
        max-width: 400px;
      `,
      className,
    )}
  />
);

export const Controlled: StoryFn<SelectProps> = ({
  className,
  defaultValue,
  readOnly,
  ...args
}: SelectProps) => {
  const [value, setValue] = useState('cat');
  return (
    <Select
      {...args}
      data-test="hello-world"
      className={cx(
        css`
          min-width: 200px;
          max-width: 400px;
        `,
        className,
      )}
      readOnly={false}
      value={value}
      onChange={setValue}
    />
  );
};

export const WithIcons = Uncontrolled.bind({});
WithIcons.args = {
  children: [
    <OptionGroup key="Common" label="Common">
      <Option glyph={<BeakerIcon />} value="dog">
        Dog
      </Option>
      <Option glyph={<BeakerIcon />} value="cat">
        Cat
      </Option>
    </OptionGroup>,
    <OptionGroup key="Less common" label="Less common">
      <Option glyph={<BeakerIcon />} value="hamster">
        Hamster
      </Option>
      <Option glyph={<BeakerIcon />} value="parrot">
        Parrot
      </Option>
    </OptionGroup>,
    <Option glyph={<BeakerIcon />} key="iguana" value="iguana">
      Mexican spiny-tailed iguana
    </Option>,
    <Option glyph={<BeakerIcon />} key="spider" value="spider" disabled>
      Spider
    </Option>,
  ],
};
