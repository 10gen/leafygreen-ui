import { css } from '@leafygreen-ui/emotion';
import React from 'react';
import Checkbox from '.';

export default {
  title: 'Packages/Checkbox',
  component: Checkbox,
  parameters: { 
    controls: { exclude: ['children'] }
  }
};

const Template = args => <Checkbox {...args} />;

export const Basic = Template.bind({})
Basic.args = { 
  animate: true,
  label: 'I agree to this thing.',
  description: 'Donec id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum id ligula porta felis euismod semper. Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
  className: css`max-width: 700px;`
};