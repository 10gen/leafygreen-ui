import React from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { useRowContext } from '../Row/RowContext';
import { useTableContext } from '../TableContext';
import ToggleExpandedIcon from '../ToggleExpandedIcon';
import { LGRowData } from '../useLeafyGreenTable';

import { getCellEllipsisStyles, getCellStyles } from './Cell.styles';
import { InternalCellWithRTProps } from './Cell.types';
import InternalCell from './InternalCell';

const InternalCellWithRT = <T extends LGRowData>({
  children,
  className,
  contentClassName,
  align,
  cell,
  ...rest
}: InternalCellWithRTProps<T>) => {
  const { disabled, isExpanded, isExpandable, depth, toggleExpanded } =
    useRowContext();
  const { isSelectable, shouldTruncate = true } = useTableContext();
  const isFirstCell = (cell && cell.column.getIsFirstColumn()) || false;

  return (
    <InternalCell
      className={cx(
        getCellStyles(depth, isExpandable, isSelectable),
        className,
      )}
      // TS error is ignored (and not expected) as it doesn't show up locally but interrupts build
      // @ts-ignore Cell types need to be extended or declared in the react-table namespace
      align={align || cell?.column.columnDef?.align}
      {...rest}
    >
      {isFirstCell && isExpandable && (
        <ToggleExpandedIcon
          isExpanded={isExpanded!}
          toggleExpanded={toggleExpanded!}
          disabled={disabled}
        />
      )}
      <div className={getCellEllipsisStyles(shouldTruncate)}>{children}</div>
    </InternalCell>
  );
};

InternalCellWithRT.displayName = 'InternalCellWithRT';

export default InternalCellWithRT;