/* eslint-disable react/prop-types*/
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { storybookExcludedControlParams } from '@leafygreen-ui/lib';

import { Cell, HeaderCell } from '../Cell';
import { HeaderRow, Row } from '../Row';
import Table from '../Table/Table';
import TableBody from '../TableBody/TableBody';
import TableHead from '../TableHead/TableHead';
import useLeafyGreenTable, {
  LeafyGreenTableCell,
  LeafyGreenTableRow,
} from '../useLeafyGreenTable';
import { makeData, Person } from '../utils/makeData.testutils';
import { AnyDict } from '../utils/types';
import { ColumnDef, ExpandedState, flexRender, HeaderGroup } from '..';

export default {
  title: 'Components/Table/Row',
  component: Row,
  argTypes: {
    virtualRow: { control: 'none' },
    row: { control: 'none' },
    className: { control: 'none' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    controls: {
      exclude: [...storybookExcludedControlParams, 'ref', 'children'],
    },
    chromatic: {
      disableSnapshot: true,
    },
    // This is needed as a workaround to make arg spreading performant
    // https://github.com/storybookjs/storybook/issues/11657
    docs: {
      source: { type: 'code' },
    },
  },
} as Meta<typeof Table>;

const Template: StoryFn<typeof Row> = args => {
  const data = makeData(false, 100);
  const columns = Object.keys(data[0]);
  return (
    <>
      <p>The Storybook controls manipulate all rows.</p>
      <Table>
        <TableHead>
          <HeaderRow>
            {columns.map((columnName: string) => (
              <HeaderCell key={columnName}>{columnName}</HeaderCell>
            ))}
          </HeaderRow>
        </TableHead>
        <TableBody>
          {data.map((row: AnyDict) => (
            <Row {...args} key={row.id}>
              {Object.keys(row).map((cellKey: string, index: number) => {
                return <Cell key={`${cellKey}-${index}`}>{row[cellKey]}</Cell>;
              })}
            </Row>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export const DisabledRows = Template.bind({});
DisabledRows.args = {
  disabled: true,
};

export const DisabledNestedRows: StoryFn<typeof Row> = ({ row, ...rest }) => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const data = React.useState(() => makeData(false, 100, 5, 3))[0];
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const columns = React.useMemo<Array<ColumnDef<Person>>>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 60,
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
        cell: info => info.getValue(),
      },
      {
        accessorFn: row => row.lastName,
        id: 'lastName',
        cell: info => info.getValue(),
        // eslint-disable-next-line react/display-name
        header: () => <span>Last Name</span>,
      },
      {
        accessorKey: 'age',
        // eslint-disable-next-line react/display-name
        header: () => 'Age',
        size: 50,
      },
      {
        accessorKey: 'visits',
        // eslint-disable-next-line react/display-name
        header: () => <span>Visits</span>,
        size: 50,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 90,
      },
    ],
    [],
  );

  const table = useLeafyGreenTable<Person>({
    containerRef: tableContainerRef,
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
  });

  const { rows } = table.getRowModel();

  return (
    <>
      <div>
        <p>{table.getRowModel().rows.length} total rows</p>
        <pre>Expanded rows: {JSON.stringify(expanded, null, 2)}</pre>
      </div>

      <Table table={table} ref={tableContainerRef}>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup: HeaderGroup<Person>) => (
            <HeaderRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <HeaderCell key={header.id} header={header}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </HeaderCell>
                );
              })}
            </HeaderRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row: LeafyGreenTableRow<Person>) => {
            return (
              <Row key={row.id} row={row} {...rest}>
                {row
                  .getVisibleCells()
                  .map((cell: LeafyGreenTableCell<Person>) => {
                    return (
                      <Cell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Cell>
                    );
                  })}
              </Row>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
DisabledNestedRows.args = {
  disabled: true,
};

export const ClickableRows = Template.bind({});
ClickableRows.args = {
  onClick: () => {
    // eslint-disable-next-line no-console
    console.log('row clicked!');
  },
};

export const DisabledClickableRows = Template.bind({});
DisabledClickableRows.args = {
  onClick: () => {
    // eslint-disable-next-line no-console
    console.log('row clicked!');
  },
  disabled: true,
};
