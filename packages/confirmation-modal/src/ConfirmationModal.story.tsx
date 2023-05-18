import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import {
  storybookArgTypes,
  storybookExcludedControlParams as defaultExclude,
  StoryMetaType,
} from '@leafygreen-ui/lib';
import { CloseIconColor } from '@leafygreen-ui/modal';

import ConfirmationModal, { ConfirmationModalProps, Variant } from '.';

const meta: StoryMetaType<typeof ConfirmationModal> = {
  title: 'Components/Modals/ConfirmationModal',
  component: ConfirmationModal,
  args: {
    title: 'Confirm Title Here',
    buttonText: 'Confirm',
    children:
      'This is some description text, and it is extra long so it fills up this modal. Another thing about the modals here. This is some description text, and it is extra long so it fills up this modal. Another thing about the modals here.',
    className: css`
      z-index: 1;
    `,
    closeIconColor: 'default',
    variant: 'primary',
  },
  argTypes: {
    requiredInputText: { control: 'text' },
    open: { control: 'boolean' },
    title: { control: 'text' },
    buttonText: { control: 'text' },
    children: storybookArgTypes.children,
    darkMode: storybookArgTypes.darkMode,
    variant: {
      control: 'select',
      options: Object.values(Variant),
    },
    closeIconColor: {
      control: 'select',
      options: Object.values(CloseIconColor),
    },
  },
  parameters: {
    default: 'Basic',
    controls: {
      exclude: [...defaultExclude, 'open', 'initialFocus'],
    },
  },
};

export default meta;

const ControlledTemplate: StoryFn<ConfirmationModalProps> = ({
  // eslint-disable-next-line react/prop-types
  darkMode,
  ...args
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button darkMode={darkMode} onClick={() => setOpen(!open)}>
        Open Modal
      </Button>
      <ConfirmationModal
        {...args}
        open={open}
        onCancel={handleClose}
        onConfirm={handleClose}
        darkMode={darkMode}
      />
    </>
  );
};

export const Basic = ControlledTemplate.bind({});
Basic.args = {
  open: true,
};

export const Delete = ControlledTemplate.bind({});
Delete.args = {
  open: true,
  variant: Variant.Danger,
};
