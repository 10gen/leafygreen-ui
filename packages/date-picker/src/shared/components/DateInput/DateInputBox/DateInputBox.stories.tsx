/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { StoryFn } from '@storybook/react';
import { isValid } from 'date-fns';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { pickAndOmit, StoryMetaType, StoryType } from '@leafygreen-ui/lib';

import { Month } from '../../../constants';
import { Locales, segmentRefsMock } from '../../../testutils';
import { newUTC } from '../../../utils';
import {
  contextPropNames,
  DatePickerContextProps,
  DatePickerProvider,
} from '../../DatePickerContext';

import { DateInputBox } from './DateInputBox';

const testDate = newUTC(1993, Month.December, 26);

const ProviderWrapper = (Story: StoryFn, ctx?: { args: any }) => {
  const [{ darkMode, ...contextProps }, componentProps] = pickAndOmit(
    ctx?.args,
    contextPropNames,
  );

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <DatePickerProvider {...contextProps}>
        <Story {...componentProps} segmentRefs={segmentRefsMock} />
      </DatePickerProvider>
    </LeafyGreenProvider>
  );
};

const meta: StoryMetaType<typeof DateInputBox, DatePickerContextProps> = {
  title: 'Components/DatePicker/Shared/DateInputBox',
  component: DateInputBox,
  decorators: [ProviderWrapper],
  parameters: {
    controls: {
      exclude: ['onSegmentChange', 'setValue', 'segmentRefs'],
    },
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
    dateFormat: 'iso8601',
    timeZone: 'Europe/London',
  },
  argTypes: {
    value: { control: 'date' },
    dateFormat: { control: 'select', options: Locales },
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
    <DateInputBox
      value={date}
      setValue={updateDate}
      segmentRefs={segmentRefsMock}
    />
  );
};

export const Static: StoryFn<typeof DateInputBox> = () => {
  return <DateInputBox value={testDate} segmentRefs={segmentRefsMock} />;
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
