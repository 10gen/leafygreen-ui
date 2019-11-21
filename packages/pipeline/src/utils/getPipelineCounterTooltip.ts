import { ReactNode } from 'react';
import { onlyText } from 'react-children-utilities';
import { flow, compact, split, map } from 'lodash/fp';

/**
 * A utility function which takes the React.children rendered by the Pipeline component
 * and returns the string which represents the full pipeline, for usage with the tooltip.
 *
 * @param children - the children rendered by the pipeline component
 * @returns string - the tooltip text
 */
export default function getPipelineCounterTooltip(children: ReactNode): string {
  const stages = flow(
    onlyText,
    split('$'),
    compact,
    map(str => `$${str}`),
  )(children);

  const formattedStages = stages.flatMap((value, index, array) =>
    array.length - 1 !== index ? [value, '>'] : value,
  );

  return formattedStages.join(' ');
}
