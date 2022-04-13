import { useBaseFontSize } from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';

/**
 * A wrapper around the hook useBaseFontSize that returns
 * a value that is consistent with the updated base font sizes.
 *
 * Prefer using {@link useBaseFontSize} when LeafygreenProvider is updated to support the new values.
 */
export const useUpdatedBaseFontSize = (): BaseFontSize => {
  const baseFontSize = useBaseFontSize();
  return baseFontSize === 16 ? baseFontSize : 13;
};
