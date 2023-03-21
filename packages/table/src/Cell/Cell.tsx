import React from 'react';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';

import { LGRowData } from '../useLeafyGreenTable';

import { baseCellStyles, cellContentContainerStyles, cellContentTransitionStyles } from './Cell.styles';
import { CellProps } from '.';

const Cell = <T extends LGRowData>({
  children,
  className,
  cellIndex,
  toggleExpandedIconProps,
  cell,
  contentClassName,
  isRowExpanded,
  ...rest
}: CellProps<T>) => {
  return (
    <td className={cx(baseCellStyles, className)} {...rest}>
      <Transition in={isRowExpanded} timeout={0}>
        {state => (
          <div
            data-state={state}
            className={cx(
              cellContentContainerStyles,
              cellContentTransitionStyles[state],
              contentClassName
            )}>
            {children}
          </div>
        )}
      </Transition>
    </td>
  );
};

Cell.propTypes = {
  cell: PropTypes.any,
};

export default Cell;
