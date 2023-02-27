import React, { Fragment, ReactElement, ReactNode } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { HTMLElementProps } from '@leafygreen-ui/lib';

import Cell from '../Cell';
import { useTableContext } from '../TableContext/TableContext';
import { LeafygreenTableCell, LeafygreenTableRow } from '../useLeafygreenTable';
import { flexRender } from '..';

import InternalRowBase from './InternalRowBase';
import {
  expandedContentStyles,
  nestedBgStyles,
  nestedBorderTopStyles,
} from './Row.styles';
import { InternalRowWithRTProps } from './Row.types';

const InternalRowWithRT = <T extends unknown>({
  children,
  className,
  row,
  virtualRow,
  disabled,
  ...rest
}: InternalRowWithRTProps<T>) => {
  const { theme } = useDarkMode();
  const { isExpandedRow } = useTableContext();
  const isNestedRowParent = row.depth === 0 && isExpandedRow(row.id);
  const isNestedRowOrParent = isExpandedRow(row.id) || row.depth > 0;
  const ExpandedContentRowProp = row?.original.renderExpandedContent;
  const ContainerElement = ExpandedContentRowProp
    ? (props: HTMLElementProps<'tbody'>) => (
        <tbody
          {...props}
          ref={virtualRow ? virtualRow.measureRef : undefined}
          data-testid="lg-table-expandable-row-tbody"
        />
      )
    : Fragment;

  return (
    <>
      <ContainerElement>
        <InternalRowBase
          className={cx(
            {
              [nestedBorderTopStyles[theme]]: isNestedRowParent,
              [nestedBgStyles[theme]]: isNestedRowOrParent,
            },
            className,
          )}
          disabled={disabled}
          data-depth={row.depth}
          {...rest}
        >
          {React.Children.map(children, (child: ReactNode, index: number) => {
            return React.createElement(Cell, {
              ...(child as ReactElement)?.props,
              cellIndex: index,
              depth: row.depth,
              disabled,
            });
          })}
        </InternalRowBase>
        {isExpandedRow(row.id) && ExpandedContentRowProp && (
          <tr>
            <td
              colSpan={row?.getVisibleCells().length}
              className={expandedContentStyles[theme]}
            >
              {ExpandedContentRowProp(row as LeafygreenTableRow<T>)}
            </td>
          </tr>
        )}
      </ContainerElement>
      {row.subRows &&
        row.subRows.map(subRow => (
          <InternalRowWithRT
            key={subRow.id}
            row={subRow}
            virtualRow={virtualRow}
            className={className}
            disabled={disabled}
            aria-hidden={!isExpandedRow(row.id)}
            {...rest}
          >
            {subRow
              .getVisibleCells()
              .map((cell: LeafygreenTableCell<T>, index: number) => {
                return (
                  <Cell
                    key={cell.id}
                    cell={cell}
                    cellIndex={index}
                    isSubRowCell={true}
                    isRenderedSubRowCell={isExpandedRow(row.id)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Cell>
                );
              })}
          </InternalRowWithRT>
        ))}
    </>
  );
};

export default InternalRowWithRT;
