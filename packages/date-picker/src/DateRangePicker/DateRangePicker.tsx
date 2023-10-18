import React, { forwardRef } from 'react';

import { contextPropNames, DatePickerProvider } from '../DatePickerContext';
import { useControlledValue } from '../hooks/useControlledValue';
import { pickAndOmit } from '../utils';

import { DateRangeComponent } from './DateRangeComponent';
import { DateRangeProvider } from './DateRangeContext';
import { DateRangePickerProps } from './DateRangePicker.types';

export const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  (
    {
      value: rangeProp,
      initialValue: initialProp,
      onRangeChange: onChangeProp,
      ...props
    }: DateRangePickerProps,
    fwdRef,
  ) => {
    const [datePickerContextProps, restProps] = pickAndOmit(
      props,
      contextPropNames,
    );

    const { value, setValue } = useControlledValue(
      rangeProp,
      onChangeProp,
      initialProp,
    );

    return (
      <DatePickerProvider value={datePickerContextProps}>
        <DateRangeProvider rootRef={fwdRef} value={value} setValue={setValue}>
          <DateRangeComponent ref={fwdRef} {...restProps} />
        </DateRangeProvider>
      </DatePickerProvider>
    );
  },
);

DateRangePicker.displayName = 'DateRangePicker';
