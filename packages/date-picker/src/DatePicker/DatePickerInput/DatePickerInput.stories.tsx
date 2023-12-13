/* eslint-disable react/prop-types */
import React from 'react';
import { StoryFn } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';
import { Size } from '@leafygreen-ui/tokens';

import {
  DatePickerContextProps,
  DatePickerProvider,
} from '../../shared/context';
import { getProviderPropsFromStoryContext } from '../../shared/testutils';
import { DatePickerProps } from '../DatePicker.types';
import {
  SingleDateContextProps,
  SingleDateProvider,
} from '../SingleDateContext';

import { DatePickerInput } from './DatePickerInput';

const ProviderWrapper = (Story: StoryFn, ctx: any) => {
  const { leafyGreenProviderProps, datePickerProviderProps, storyProps } =
    getProviderPropsFromStoryContext<DatePickerProps>(ctx?.args);

  return (
    <LeafyGreenProvider {...leafyGreenProviderProps}>
      <DatePickerProvider {...datePickerProviderProps}>
        <SingleDateProvider value={storyProps.value} setValue={() => {}}>
          <Story {...storyProps} />
        </SingleDateProvider>
      </DatePickerProvider>
    </LeafyGreenProvider>
  );
};

const meta: StoryMetaType<
  typeof DatePickerInput,
  SingleDateContextProps & DatePickerContextProps
> = {
  title: 'Components/DatePicker/DatePicker/DatePickerInput',
  component: DatePickerInput,
  decorators: [ProviderWrapper],
  parameters: {
    default: null,
    controls: {
      exclude: ['segmentRefs', 'onChange', 'onSegmentChange', 'onClick'],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        value: [null, new Date('1993-12-26')],
        locale: ['iso8601', 'en-US', 'en-UK', 'de-DE'],
        size: Object.values(Size),
      },
      decorator: ProviderWrapper,
    },
  },
  args: {
    label: 'Label',
    locale: 'en-UK',
    timeZone: 'Europe/London',
  },
  argTypes: {
    value: { control: 'date' },
  },
};

export default meta;

export const Basic: StoryFn<DatePickerProps> = () => <DatePickerInput />;

export const Generated: StoryFn<DatePickerProps> = () => <></>;
