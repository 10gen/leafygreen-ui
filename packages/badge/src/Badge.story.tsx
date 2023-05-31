import React from 'react';
import { StoryFn } from '@storybook/react';

import { defaultStorybookArgTypes, StoryMetaType } from '@leafygreen-ui/lib';

import Badge, { BadgeProps } from '.';

const meta: StoryMetaType<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    default: 'Basic',
  },
  args: {
    darkMode: false,
  },
  argTypes: {
    darkMode: defaultStorybookArgTypes.darkMode,
  },
};
export default meta;

const Template: StoryFn<BadgeProps> = args => <Badge {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: 'Badge',
};
