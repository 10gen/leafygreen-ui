import { MouseEventHandler } from 'react';

import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface ChartCardProps extends Omit<HTMLElementProps<'div'>, 'title'> {
  /**
   * The title of the card
   */
  title: string;

  /**
   * Defines the default state of the card
   */
  defaultOpen?: boolean;

  /**
   * Forces the card state
   */
  isOpen?: boolean;

  /**
   * Callback fired when user clicks the toggle button
   */
  onToggleButtonClick?: MouseEventHandler<HTMLButtonElement>;

  /**
   * Content to be rendered to the right of the label.
   */
  headerContent?: React.ReactNode;
}