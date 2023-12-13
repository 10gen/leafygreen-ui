/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { Month, newUTC } from '@leafygreen-ui/date-utils';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';
import Modal from '@leafygreen-ui/modal';
import { Size } from '@leafygreen-ui/tokens';

import {
  DatePickerContextProps,
  DatePickerProvider,
} from './shared/components/DatePickerContext';
import { MAX_DATE, MIN_DATE } from './shared/constants';
import { getProviderPropsFromStoryContext } from './shared/testutils/getProviderPropsFromStoryContext';
import { Locales, TimeZones } from './shared/testutils/testValues';
import { AutoComplete } from './shared/types';
import { DatePicker } from './DatePicker';

const ProviderWrapper = (Story: StoryFn, ctx: any) => {
  const { leafyGreenProviderProps, datePickerProviderProps, storyProps } =
    getProviderPropsFromStoryContext(ctx?.args);

  return (
    <LeafyGreenProvider {...leafyGreenProviderProps}>
      <DatePickerProvider {...datePickerProviderProps}>
        <Story {...storyProps} />
      </DatePickerProvider>
    </LeafyGreenProvider>
  );
};

const meta: StoryMetaType<typeof DatePicker, DatePickerContextProps> = {
  title: 'Components/DatePicker/DatePicker',
  component: DatePicker,
  decorators: [ProviderWrapper],
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [
        'handleValidation',
        'initialValue',
        'onChange',
        'onDateChange',
        'onSegmentChange',
        'value',
      ],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        value: [newUTC(2023, Month.December, 26)],
        locale: ['iso8601', 'en-US', 'en-UK', 'de-DE'],
        timeZone: ['UTC', 'Europe/London', 'America/New_York', 'Asia/Seoul'],
        disabled: [false, true],
      },
      decorator: ProviderWrapper,
    },
  },
  args: {
    locale: 'iso8601',
    label: 'Pick a date',
    size: Size.Default,
    autoComplete: AutoComplete.Off,
    min: MIN_DATE,
    max: MAX_DATE,
  },
  argTypes: {
    baseFontSize: { control: 'select' },
    locale: { control: 'select', options: Locales },
    description: { control: 'text' },
    label: { control: 'text' },
    min: { control: 'date' },
    max: { control: 'date' },
    size: { control: 'select' },
    state: { control: 'select' },
    timeZone: { control: 'select', options: [undefined, ...TimeZones] },
    autoComplete: { control: 'select', options: Object.values(AutoComplete) },
  },
};

export default meta;

export const LiveExample: StoryFn<typeof DatePicker> = props => {
  const [value, setValue] = useState<Date | null | undefined>();

  return (
    <DatePicker
      {...props}
      aria-label="testing the label"
      value={value}
      onDateChange={setValue}
      handleValidation={date =>
        // eslint-disable-next-line no-console
        console.log('Storybook: handleValidation', { date })
      }
    />
  );
};

export const Uncontrolled: StoryFn<typeof DatePicker> = props => {
  return <DatePicker {...props} />;
};

export const InModal: StoryFn<typeof DatePicker> = props => {
  const [value, setValue] = useState<Date | null | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(curr => !curr)}>Open Modal</Button>
      <Modal open={isModalOpen} setOpen={setIsModalOpen}>
        Inside the modal
        <DatePicker {...props} value={value} onDateChange={setValue} />
      </Modal>
    </>
  );
};
InModal.parameters = {
  chromatic: {
    disableSnapshots: true,
  },
};

export const Generated = () => {};
