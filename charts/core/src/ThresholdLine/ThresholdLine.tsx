import { useEffect } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  fontFamilies,
  fontWeights,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

import { SeriesOption } from '../Chart';
import { useChartContext } from '../ChartContext';

import { svgSymbolPath } from './svgSymbolPath';

function getMarkLineConfig({
  name,
  position,
  theme,
  label,
  value,
}: {
  name: string;
  position: number;
  theme: Theme;
  label: string;
  value: string;
}): SeriesOption {
  return {
    name,
    type: 'line', // Requires a type even though it's not an actual series
    markLine: {
      data: [
        {
          name: name,
          yAxis: position,
          emphasis: {
            label: {
              show: true,
            },
            lineStyle: {
              width: 1, // needed to show line but style actually controlled by LineStyle
            },
          },
        },
      ],
      label: {
        borderRadius: borderRadius[200],
        distance: spacing[300],
        backgroundColor:
          color[theme].background[Variant.InversePrimary][
            InteractionState.Default
          ],
        color:
          color[theme].text[Variant.InversePrimary][InteractionState.Default],
        fontFamily: fontFamilies.default,
        fontSize: 12,
        fontWeight: fontWeights.regular,
        formatter: `{label|${label}}: ${value}`,
        lineHeight: 20,
        padding: spacing[150],
        position: 'insideEnd',
        rich: {
          label: {
            color:
              color[theme].text[Variant.InverseSecondary][
                InteractionState.Default
              ],
          },
        },
        show: false, // Only show on hover / emphasis
      },
      lineStyle: {
        color: color[theme].icon[Variant.Error][InteractionState.Default],
        type: 'dashed',
        width: 1,
      },
      silent: false,
      symbol: ['none', svgSymbolPath],
      symbolOffset: [
        // Allowed format. See https://echarts.apache.org/en/option.html#series-line.markLine.symbolOffset
        // @ts-ignore Type '[number, number]' is not assignable to type 'string | number'.
        [0, 0],
        // @ts-ignore Type '[number, number]' is not assignable to type 'string | number'.
        [-3, 0], // Needed to move array to be flesh with the last vertical line
      ],
      symbolSize: [7, 10],
      symbolRotate: 360,
    },
  };
}

export function ThresholdLine({
  position,
  label,
  value,
}: {
  position: number;
  label: string;
  value: string;
}) {
  const { chart } = useChartContext();
  const { theme } = useDarkMode();
  const name = `threshold-${position}`;

  useEffect(() => {
    if (!chart.ready) return;

    /**
     * Threshold lines in Echarts are always attached to a series. In order
     * to make this a separate component and not a prop on `Line`, we must add
     * a dummy series with no data, and a mark line. This does not show up as a
     * series in something like a Tooltip.
     */
    chart.addSeries(getMarkLineConfig({ name, position, theme, label, value }));

    return () => {
      /**
       * Remove...
       */
      chart.removeSeries(name);
    };
  }, [theme, chart.ready, position, label, value]);

  return null;
}
