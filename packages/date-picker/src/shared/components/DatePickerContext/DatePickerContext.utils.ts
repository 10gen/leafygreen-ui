import { isWithinInterval } from 'date-fns';
import defaults from 'lodash/defaults';
import defaultTo from 'lodash/defaultTo';

import { BaseFontSize, Size } from '@leafygreen-ui/tokens';

import { MAX_DATE, MIN_DATE } from '../../constants';
import {
  AutoComplete,
  BaseDatePickerProps,
  DatePickerState,
} from '../../types';
import { getFormatParts, toDate } from '../../utils';

import {
  DatePickerContextProps,
  DatePickerProviderProps,
} from './DatePickerContext.types';

export type ContextPropKeys = keyof DatePickerProviderProps &
  keyof BaseDatePickerProps;

/**
 * Prop names that are in both DatePickerProps and DatePickerProviderProps
 * */
export const contextPropNames: Array<ContextPropKeys> = [
  'label',
  'description',
  'dateFormat',
  'timeZone',
  'min',
  'max',
  'baseFontSize',
  'disabled',
  'size',
  'errorMessage',
  'initialOpen',
  'state',
  'autoComplete',
];

/** The default context value */
export const defaultDatePickerContext: DatePickerContextProps = {
  label: '',
  description: '',
  dateFormat: 'iso8601',
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  min: MIN_DATE,
  max: MAX_DATE,
  isOpen: false,
  initialOpen: false,
  setOpen: () => {},
  isDirty: false,
  setIsDirty: () => {},
  isInRange: () => true,
  disabled: false,
  size: Size.Default,
  errorMessage: '',
  baseFontSize: BaseFontSize.Body1,
  darkMode: false,
  menuId: '',
  isSelectOpen: false,
  setIsSelectOpen: () => {},
  stateNotification: {
    state: DatePickerState.None,
    message: '',
  },
  setInternalErrorMessage: () => {},
  clearInternalErrorMessage: () => {},
  autoComplete: AutoComplete.Off,
};

/**
 * Returns an `isInRange` function,
 * with `min` and `max` values in the closure
 */
export const getIsInRange =
  (min: Date, max: Date) =>
  (d?: Date | null): boolean =>
    !!(
      d &&
      isWithinInterval(d, {
        start: min,
        end: max,
      })
    );

/**
 * Returns a valid `Context` value given optional provider props
 */
export const getContextProps = (
  providerProps: DatePickerProviderProps,
): DatePickerContextProps => {
  const { min, max, timeZone, ...rest } = providerProps;
  const providerValue: DatePickerContextProps = {
    ...defaults(rest, defaultDatePickerContext),
    timeZone: defaultTo(
      timeZone,
      Intl.DateTimeFormat().resolvedOptions().timeZone,
    ),
    min: defaultTo(toDate(min), defaultDatePickerContext.min),
    max: defaultTo(toDate(max), defaultDatePickerContext.max),
  };

  const isInRange = getIsInRange(providerValue.min, providerValue.max);

  // Only used to track the _order_ of segments, not the value itself
  const formatParts = getFormatParts(providerValue.dateFormat);

  return { ...providerValue, isInRange, formatParts };
};
