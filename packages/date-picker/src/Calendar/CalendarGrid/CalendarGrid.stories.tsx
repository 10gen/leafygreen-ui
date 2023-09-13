/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';

import { Month } from '../../constants';
import { Locales, TimeZones } from '../../DatePicker.testUtils';
import {
  DatePickerContextProps,
  DatePickerProvider,
  useDatePickerContext,
} from '../../DatePickerContext';
import { isTodayTZ } from '../../utils/isTodayTZ';
import { CalendarCell } from '../CalendarCell/CalendarCell';

import { CalendarGrid } from './CalendarGrid';

const ProviderWrapper = (Story: StoryFn, ctx?: { args: any }) => (
  <LeafyGreenProvider darkMode={ctx?.args.darkMode}>
    <DatePickerProvider
      value={{
        ...ctx?.args,
      }}
    >
      <Story />
    </DatePickerProvider>
  </LeafyGreenProvider>
);

const meta: StoryMetaType<typeof CalendarGrid, DatePickerContextProps> = {
  title: 'Components/DatePicker/CalendarGrid',
  component: CalendarGrid,
  parameters: {
    default: 'Demo',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        dateFormat: Locales,
      },
      decorator: ProviderWrapper,
    },
  },
  decorators: [ProviderWrapper],
  args: {
    dateFormat: 'en-US',
    timeZone: 'UTC',
  },
  argTypes: {
    darkMode: { control: 'boolean' },
    dateFormat: {
      control: 'select',
      options: Locales,
    },
    timeZone: {
      control: 'select',
      options: TimeZones,
    },
  },
};

export default meta;

export const Demo: StoryFn<typeof CalendarGrid> = ({ ...props }) => {
  const { timeZone } = useDatePickerContext();
  const [month] = useState(new Date(Date.UTC(2023, Month.August, 1)));

  const [hovered, setHovered] = useState<string | undefined>();

  const handleHover = (id?: string) => () => {
    setHovered(id);
  };

  return (
    <CalendarGrid
      {...props}
      month={month}
      onMouseLeave={handleHover(undefined)}
    >
      {(day, i) => (
        <CalendarCell
          key={i}
          isCurrent={isTodayTZ(day, timeZone)}
          isHighlighted={hovered ? hovered === day?.toISOString() : false}
          onMouseEnter={handleHover(day?.toISOString())}
          data-iso={day?.toISOString()}
        >
          {day?.getUTCDate()}
        </CalendarCell>
      )}
    </CalendarGrid>
  );
};

export const Generated: StoryFn<typeof CalendarGrid> = () => <></>;
Generated.parameters = {
  generate: {
    args: {
      month: new Date(Date.UTC(2023, Month.August, 1)),
      children: (day: Date, i: number) => (
        <CalendarCell key={i} isCurrent={false} isHighlighted={false}>
          {day?.getUTCDate()}
        </CalendarCell>
      ),
    },
  },
};
