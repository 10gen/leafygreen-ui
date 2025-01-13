import { useEffect } from 'react';
import { useChartContext } from '../../ChartContext';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { EventLevel } from '../EventMarker.types';

import { SeriesOption } from '../../Chart';
import {
  borderRadius,
  color,
  fontFamilies,
  fontWeights,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';
import { Theme } from '@leafygreen-ui/lib';
import { infoIcon, warningIcon } from '../iconsSvgPaths';

export function getMarkLineConfig({
  name,
  theme,
  label,
  message,
  level,
  point,
}: {
  name: string;
  theme: Theme;
  label: string;
  message: string;
  level: EventLevel;
  point: string | number;
}): SeriesOption {
  return {
    animation: false,
    name,
    type: 'line', // Requires a type even though it's not an actual series
    markLine: {
      data: [
        {
          name: name,
          xAxis: point,
        },
      ],
      emphasis: {
        label: {
          show: true,
        },
        lineStyle: {
          width: 2, // needed to show line but style actually controlled by LineStyle
        },
      },
      label: {
        borderRadius: borderRadius[200],
        backgroundColor:
          color[theme].background[Variant.InversePrimary][
            InteractionState.Default
          ],
        color:
          color[theme].text[Variant.InversePrimary][InteractionState.Default],
        fontFamily: fontFamilies.default,
        fontSize: 12,
        fontWeight: fontWeights.regular,
        formatter: [`{label|${label}}`, `{message|${message}}`].join('\n'),
        lineHeight: 15,
        padding: spacing[150],
        position: 'insideStartTop', // This will position it high on the left side
        rich: {
          label: {
            color:
              color[theme].text[Variant.InverseSecondary][
                InteractionState.Default
              ],
            align: 'left',
          },
          message: {
            align: 'left',
          },
        },
        show: false, // Needed so it only shows on hover (aka emphasis)
      },
      lineStyle: {
        color:
          level === EventLevel.Warning
            ? color[theme].icon[Variant.Error][InteractionState.Default]
            : color[theme].icon[Variant.Primary][InteractionState.Default],
        type: 'solid',
        width: 1,
      },
      symbol:
        level === EventLevel.Warning
          ? [warningIcon, 'none']
          : [infoIcon, 'none'],
      symbolSize: [16, 16],
      symbolRotate: 360,
    },
  };
}

export function EventMarkerLine({
  point,
  label,
  message,
  level = EventLevel.Warning,
}: {
  point: string | number;
  label: string;
  message: string;
  level?: EventLevel;
}) {
  const { chart } = useChartContext();
  const { theme } = useDarkMode();
  const name = `event-marker-${point}`;

  useEffect(() => {
    if (!chart.ready) return;

    /**
     * Threshold lines in Echarts are always attached to a series. In order
     * to make this a separate component and not a prop on `Line`, we must add
     * a dummy series with no data, and a mark line. This does not show up as a
     * series in something like a Tooltip.
     */
    chart.addSeries(
      getMarkLineConfig({ name, theme, label, message, level, point }),
    );

    return () => {
      /**
       * Remove...
       */
      chart.removeSeries(name);
    };
  }, [theme, chart.ready, point]);

  return null;
}
