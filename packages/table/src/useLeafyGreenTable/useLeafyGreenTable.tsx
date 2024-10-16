import React from 'react';
import { useReactTable } from '@tanstack/react-table';
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import omit from 'lodash/omit';

import { TableHeaderCheckbox } from './TableHeaderCheckbox';
import { TableRowCheckbox } from './TableRowCheckbox';
import { LeafyGreenTableOptions, LGRowData } from './useLeafyGreenTable.types';
import { LeafyGreenTable, LGColumnDef, LGTableDataType } from '.';

const CHECKBOX_WIDTH = 14;

function useLeafyGreenTable<T extends LGRowData, V extends unknown = unknown>({
  data,
  columns: columnsProp,
  hasSelectableRows,
  withPagination = false,
  allowSelectAll = true,
  ...rest
}: LeafyGreenTableOptions<T, V>): LeafyGreenTable<T> {
  /**
   * A `ColumnDef` object injected into `useReactTable`'s `columns` option when the user is using selectable rows.
   */
  const baseSelectColumnConfig: LGColumnDef<T, V> = {
    id: 'select',
    size: CHECKBOX_WIDTH,
    header: TableHeaderCheckbox,
    cell: TableRowCheckbox,
  };

  const hasSortableColumns = React.useMemo(
    () => columnsProp.some(propCol => !!propCol.enableSorting),
    [columnsProp],
  );
  const selectColumnConfig = allowSelectAll
    ? baseSelectColumnConfig
    : omit(baseSelectColumnConfig, 'header');
  const columns = React.useMemo<Array<LGColumnDef<T, V>>>(
    () => [
      ...(hasSelectableRows ? [selectColumnConfig as LGColumnDef<T, V>] : []),
      ...columnsProp.map(propColumn => {
        return {
          ...propColumn,
          align: propColumn.align ?? 'left',
          enableSorting: propColumn.enableSorting ?? false,
        } as LGColumnDef<T, V>;
      }),
    ],
    [columnsProp, hasSelectableRows, selectColumnConfig],
  );

  const table = useReactTable<LGTableDataType<T>>({
    state: {
      ...rest.state,
    },
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowCanExpand: row => {
      return !!row.original.renderExpandedContent || !!row.subRows?.length;
    },
    enableExpanding: true,
    enableSortingRemoval: hasSortableColumns ? true : undefined,
    getSubRows: row => row.subRows,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: withPagination ? getPaginationRowModel() : undefined,
    ...rest,
  });

  const { rows } = table.getRowModel();

  return {
    ...table,
    hasSelectableRows,
    rows: rows,
  } as LeafyGreenTable<T>;
}

export default useLeafyGreenTable;
