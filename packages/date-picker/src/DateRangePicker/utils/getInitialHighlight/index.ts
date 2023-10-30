import { DateRangeType } from '../../../shared/types';
import { isSameUTCMonth } from '../../../utils';

export const getInitialHighlight = (
  value: DateRangeType | undefined,
  today: Date,
  month: Date,
): Date => {
  if (value) {
    const [start, end] = value;
    // Could use ternary, but that's hard to read
    if (start) return start;
    if (end) return end;
    if (isSameUTCMonth(today, month)) return today;
    return month;
  }

  return today;
};