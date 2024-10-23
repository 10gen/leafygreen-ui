import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

import { ChartOptions } from '../Chart.types';
import { colors } from '../colors';

const commonAxisOptions = {
  /**
   * Axis need to be hidden explicitly to prevent error when rendering chart without Axis
   */
  splitLine: {
    show: false,
  },
  axisLine: {
    show: false,
  },
  axisLabel: {
    show: false,
  },
  axisTick: {
    show: false,
  },
};

/**
 * Returns default chart options that are shared by all charts.
 */
export const getDefaultChartOptions = (
  theme: Theme,
): Partial<ChartOptions> => ({
  aria: {
    show: true,
  },
  animation: false, // Disabled by default to optimize performance

  title: {
    show: false, // Title is rendered in custom header instead
  },

  color: colors[theme],

  /**
   * Though there's a Grid component that will render the grid lines, this allows the box
   * that contains the chart to to show with proper dimensions by default.
   */
  grid: {
    /**
     * Spacing added here instead of in CSS because the grid is rendered in a canvas.
     * Adding the spacing in the canvas assures that the labels and borders are not cutoff.
     */
    left: spacing[300],
    right: spacing[400],
    top: spacing[300],
    bottom: spacing[400],
    borderColor:
      color[theme].border[Variant.Secondary][InteractionState.Default],
    borderWidth: 1,
    containLabel: true,
  },

  xAxis: {
    type: 'time',
    ...commonAxisOptions,
  },

  yAxis: {
    type: 'value',
    ...commonAxisOptions,
  },
});