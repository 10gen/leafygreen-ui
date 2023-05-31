import React, { useRef } from 'react';
import { StoryFn } from '@storybook/react';

import {
  defaultStorybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';

import {
  NotificationProps,
  Size,
  State,
} from './PasswordInput/PasswordInput.types';
import { PasswordInput, PasswordInputProps } from '.';

const meta: StoryMetaType<typeof PasswordInput> = {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  args: {
    label: 'label',
    stateNotifications: [],
  },
  argTypes: {
    darkMode: defaultStorybookArgTypes.darkMode,
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: Object.values(Size),
    },
  },
  parameters: {
    default: 'Basic',
    controls: {
      exclude: [...storybookExcludedControlParams, 'as', 'children', 'value'],
    },
  },
};
export default meta;

const userFriendlyObj: { [key: string]: Array<NotificationProps> } = {
  'No State Notifications': [],
  Error: [
    {
      notification: "i'm an error",
      state: 'error',
    },
  ],
  Warning: [
    {
      notification: "i'm a warning",
      state: 'warning',
    },
  ],
  None: [
    {
      notification: "i'm waiting",
      state: 'none',
    },
  ],
  Combination: [
    {
      notification: "i'm an error",
      state: 'error',
    },
    {
      notification: "i'm a warning",
      state: 'warning',
    },
    {
      notification: "i'm valid",
      state: 'valid',
    },
    {
      notification: "i'm idle",
      state: 'none',
    },
  ],
  'All Errors': [
    {
      notification: "i'm an error",
      state: 'error',
    },
    {
      notification: "i'm another error",
      state: 'error',
    },
  ],
  'All Valid': [
    {
      notification: "i'm valid",
      state: 'valid',
    },
    {
      notification: "i'm also valid",
      state: 'valid',
    },
  ],
  'All None': [
    {
      notification: "i'm idle",
      state: 'none',
    },
    {
      notification: "i'm also idle",
      state: 'none',
    },
  ],
};

type UserFriendlyObj = keyof typeof userFriendlyObj;
type UserFriendlyProps = PasswordInputProps & {
  stateNotificationsSelect: UserFriendlyObj;
};

const UserFriendlyTemplate: StoryFn<UserFriendlyProps> = ({
  stateNotificationsSelect,
  label,
  ...rest
}: UserFriendlyProps) => {
  const stateNotifications: Array<NotificationProps> =
    userFriendlyObj[stateNotificationsSelect];
  return (
    <PasswordInput
      {...rest}
      label={label as string}
      stateNotifications={stateNotifications as Array<NotificationProps>}
      aria-describedby={undefined} //TODO: TS cannot infer what this is when using ...rest?
    />
  );
};

const Template: StoryFn<PasswordInputProps> = (props: PasswordInputProps) => {
  return <PasswordInput data-testid="test-id" {...props} />;
};

export const Basic = UserFriendlyTemplate.bind({});
Basic.argTypes = {
  stateNotifications: {
    control: 'none',
  },
  stateNotificationsSelect: {
    control: 'select',
    options: Object.keys(userFriendlyObj),
    description:
      'STORYBOOK ONLY. This determines what gets passed to `stateNotifications`',
  },
};

export const NoStateNotifications = Template.bind({});

export const Error = Template.bind({});
Error.args = {
  stateNotifications: [
    {
      notification: "i'm an error",
      state: 'error',
    },
  ],
};

export const Warning = Template.bind({});
Warning.args = {
  stateNotifications: [
    {
      notification: "i'm a warning",
      state: 'warning',
    },
  ],
};

export const Valid = Template.bind({});
Valid.args = {
  stateNotifications: [
    {
      notification: "i'm valid",
      state: 'valid',
    },
  ],
};

export const None = Template.bind({});
None.args = {
  stateNotifications: [
    {
      notification: "i'm waiting",
      state: 'none',
    },
  ],
};

export const Mixed = Template.bind({});
Mixed.args = {
  stateNotifications: [
    {
      notification: "i'm an error",
      state: 'error',
    },
    {
      notification: "i'm a warning",
      state: 'warning',
    },
    {
      notification: "i'm valid",
      state: 'valid',
    },
    {
      notification: "i'm waiting",
      state: 'none',
    },
  ],
};

export const CustomContainer = ({
  stateNotifications,
  ...rest
}: PasswordInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <PasswordInput
      {...rest}
      stateNotifications={stateNotifications as State}
      aria-describedby={'my-id'}
      ref={ref}
    />
  );
};

CustomContainer.argTypes = {
  stateNotifications: {
    control: 'select',
    options: Object.values(State),
  },
};

CustomContainer.args = {
  stateNotifications: State.Warning,
};
