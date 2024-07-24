import { ComponentProps } from 'react';

import { Align, Justify, TooltipProps } from '@leafygreen-ui/tooltip';

export { Align, Justify };

type ModifiedTooltipProps = Omit<
  TooltipProps,
  'onClick' | 'trigger' | 'triggerEvent' | 'refEl' | 'children' | 'spacing'
>;

export interface InfoSprinkleProps extends ModifiedTooltipProps {
  /**
   * String rendered inside the tooltip
   */
  children: string;

  /**
   * Trigger props, excludes `ref`
   */
  triggerProps?: Omit<ComponentProps<'span'>, 'ref'>;
}
