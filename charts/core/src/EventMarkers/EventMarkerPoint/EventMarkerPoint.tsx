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

export function getMarkPointConfig({
  name,
  theme,
  label,
  level,
  position,
}: {
  name: string;
  theme: Theme;
  label: string;
  level: EventLevel;
  position: [string | number | Date, string | number | Date];
}): SeriesOption {
  return {
    name,
    type: 'line', // Requires a type even though it's not an actual series
    markPoint: {
      data: [
        {
          name: name,
          coord: position,
          emphasis: {
            label: {
              show: true,
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
        formatter: label,
        lineHeight: 20,
        padding: spacing[150],
        position: 'top',
        show: false, // Needed so it only shows on hover (aka emphasis)
      },
      silent: false,
      symbol: level === EventLevel.Warning ? warningIcon : infoIcon,
      symbolSize: [17, 17],
      symbolRotate: 360,
    },
  };
}

export function EventMarkerPoint({
  position,
  label,
  level = EventLevel.Warning,
}: {
  position: [string | number | Date, string | number | Date];
  label: string;
  level?: EventLevel;
}) {
  const { chart } = useChartContext();
  const { theme } = useDarkMode();
  const name = `event-marker-${position[0]}-${position[1]}`;

  useEffect(() => {
    if (!chart.ready) return;

    /**
     * Threshold lines in Echarts are always attached to a series. In order
     * to make this a separate component and not a prop on `Line`, we must add
     * a dummy series with no data, and a mark line. This does not show up as a
     * series in something like a Tooltip.
     */
    chart.addSeries(
      getMarkPointConfig({ name, theme, label, level, position }),
    );

    return () => {
      /**
       * Remove...
       */
      chart.removeSeries(name);
    };
  }, [theme, chart.ready, position]);

  return null;
}
