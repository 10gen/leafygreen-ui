import { ReactChild, ReactElement } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export interface FeaturesEmptyStateProps extends DarkModeProps {
  /**
   * Heading text
   */
  title: string;

  /**
   * Array of Feature objects (length should be 2 or 3 elements)
   */
  features: Array<Feature>;

  /**
   * Primary CTA button.
   */
  primaryButton: ReactElement;

  /**
   * Optional secondary CTA button.
   */
  secondaryButton?: ReactElement;

  /**
   * Optional link to external page for additional information
   */
  externalLink?: ReactElement;
}

export interface Feature {
  /**
   * Image element for feature. This prop is designed to be used with MongoDB marketing-approved graphics.
   */
  graphic: ReactElement;

  /**
   * Heading text
   */
  title: string;

  /**
   * Secondary text
   */
  description: ReactChild;
}
