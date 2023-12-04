/* eslint-disable react/prop-types */
import React, { createRef, useEffect, useState } from 'react';
import { StoryFn } from '@storybook/react';
import { isValid } from 'date-fns';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType, StoryType } from '@leafygreen-ui/lib';

import { Month } from '../../../constants';
import { newUTC } from '../../../utils';
import {
  DatePickerContextProps,
  DatePickerProvider,
} from '../../DatePickerContext';

import { DateInputBox } from './DateInputBox';

const testDate = newUTC(1993, Month.December, 26);

const ProviderWrapper = (Story: StoryFn, ctx?: { args: any }) => (
  <LeafyGreenProvider darkMode={ctx?.args.darkMode}>
    <DatePickerProvider {...ctx?.args}>
      <Story />
    </DatePickerProvider>
  </LeafyGreenProvider>
);

const meta: StoryMetaType<typeof DateInputBox, DatePickerContextProps> = {
  title: 'Components/DatePicker/Shared/DateInputBox',
  component: DateInputBox,
  decorators: [ProviderWrapper],
  parameters: {
    default: null,
    generate: {
      storyNames: ['Formats'],
      combineArgs: {
        darkMode: [false, true],
        value: [null, testDate],
      },
      decorator: ProviderWrapper,
    },
  },
  args: {
    label: 'Label',
    dateFormat: 'en-UK',
    timeZone: 'Europe/London',
    segmentRefs: {
      day: createRef(),
      month: createRef(),
      year: createRef(),
    },
  },
  argTypes: {
    value: { control: 'date' },
  },
};

export default meta;

export const Basic: StoryFn<typeof DateInputBox> = props => {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    if (props.value && isValid(new Date(props.value))) {
      setDate(new Date(props.value));
    }
  }, [props.value]);

  const updateDate = (date: Date | null) => {
    setDate(date);
  };

  return (
    <>
      <DateInputBox {...props} value={date} setValue={updateDate} />
    </>
  );
};

export const Static: StoryFn<typeof DateInputBox> = props => {
  return (
    <>
      <DateInputBox {...props} value={testDate} />
    </>
  );
};

export const Formats: StoryType<
  typeof DateInputBox,
  DatePickerContextProps
> = () => <></>;
Formats.parameters = {
  generate: {
    combineArgs: {
      dateFormat: ['iso8601', 'en-US', 'en-UK', 'de-DE'],
    },
  },
};