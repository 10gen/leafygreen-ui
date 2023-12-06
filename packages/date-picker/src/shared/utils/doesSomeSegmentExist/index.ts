import { DateSegmentsState } from '../../types';
import { isNotZeroLike } from '../isZeroLike';

/**
 * Returns whether at least one segment has a value
 */
export const doesSomeSegmentExist = (segments: DateSegmentsState) => {
  return Object.values(segments).some(isNotZeroLike);
};
