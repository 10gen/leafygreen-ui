import React from 'react';
import { Meta } from '@storybook/react';

import Badge from '@leafygreen-ui/badge';

import { Cell, HeaderRow, Row, Table, TableHeader } from '../TableV10';
import { defaultData } from '../TableV10/fixtures';
import { makeData } from '../utils/makeData';

import V11Adapter from './V11Adapter';

export default {
  title: 'Components/Table/V11 Adapter',
  component: V11Adapter,
} as Meta<typeof V11Adapter>;

export const Basic = () => {
  return (
    <V11Adapter>
      <Table
        data={defaultData.slice(0, 8)}
        columns={
          <HeaderRow>
            <TableHeader key="name" label="Name" dataType="string" />
            <TableHeader key="age" label="Age" dataType="number" />
            <TableHeader key="color" label="Color" dataType="string" />
            <TableHeader key="location" label="Location" />
          </HeaderRow>
        }
      >
        {({ datum }: any) => (
          <Row>
            <Cell>{datum.name}</Cell>
            <Cell>{datum.age}</Cell>
            <Cell>{datum.color}</Cell>
            <Cell>{datum.location}</Cell>
          </Row>
        )}
      </Table>
    </V11Adapter>
  );
};

export const BasicVS = () => {
  const data = React.useState(() => makeData(false, 100))[0];
  return (
    <V11Adapter useVirtualScrolling>
      <Table
        data={makeData(false, 1000)}
        columns={
          <HeaderRow>
            <TableHeader key="name" label="Name" dataType="string" />
            <TableHeader key="age" label="Age" dataType="number" />
            <TableHeader key="color" label="Color" dataType="string" />
            <TableHeader key="location" label="Location" />
          </HeaderRow>
        }
      >
        {({ datum }: any) => (
          <Row>
            <Cell>{datum.name}</Cell>
            <Cell>{datum.age}</Cell>
            <Cell>{datum.color}</Cell>
            <Cell>{datum.location}</Cell>
          </Row>
        )}
      </Table>
    </V11Adapter>
  );
};

export const DefaultZebraStripes = () => {
  return (
    <V11Adapter>
      <Table
        data={defaultData}
        columns={
          <HeaderRow>
            <TableHeader key="name" label="Name" dataType="string" />
            <TableHeader key="age" label="Age" dataType="number" />
            <TableHeader key="color" label="Color" dataType="string" />
            <TableHeader key="location" label="Location" />
          </HeaderRow>
        }
      >
        {({ datum }: any) => (
          <Row>
            <Cell>{datum.name}</Cell>
            <Cell>{datum.age}</Cell>
            <Cell>{datum.color}</Cell>
            <Cell>{datum.location}</Cell>
          </Row>
        )}
      </Table>
    </V11Adapter>
  );
};

export const NestedRows = () => {
  return (
    <V11Adapter>
      <Table
        data={defaultData}
        columns={
          <HeaderRow>
            <TableHeader key="name" label="Name" dataType="string" />
            <TableHeader key="age" label="Age" dataType="number" />
            <TableHeader key="color" label="Color" dataType="string" />
            <TableHeader key="location" label="Location" />
          </HeaderRow>
        }
      >
        {({ datum }: any) => (
          <Row>
            <Cell>{datum.name}</Cell>
            <Cell>{datum.age}</Cell>
            <Cell>{datum.color}</Cell>
            <Cell>{datum.location}</Cell>
            {datum.name !== 'Donna' && (
              <Row>
                <Cell>
                  {datum.rand < 0.5 && <Badge>Low Rand Value</Badge>}
                  expanded name: {datum.name}
                </Cell>
                <Cell>expanded age: {datum.age}</Cell>
                <Cell>expanded color: {datum.color}</Cell>
                <Cell>expanded location: {datum.location}</Cell>
              </Row>
            )}
          </Row>
        )}
      </Table>
    </V11Adapter>
  );
};

export const ExpandableContent = () => {
  return (
    <V11Adapter>
      <Table
        data={defaultData.slice(0, 8)}
        columns={
          <HeaderRow>
            <TableHeader key="name" label="Name" dataType="string" />
            <TableHeader key="age" label="Age" dataType="number" />
            <TableHeader key="color" label="Color" dataType="string" />
            <TableHeader key="location" label="Location" />
          </HeaderRow>
        }
      >
        {({ datum }: any) => (
          <Row>
            <Cell>{datum.name}</Cell>
            <Cell>{datum.age}</Cell>
            <Cell>{datum.color}</Cell>
            <Cell>{datum.location}</Cell>
            {datum.name === 'Donna' && (
              <Row>
                <Cell colSpan={4}>
                  Nulla vitae elit libero, a pharetra augue. Sed posuere
                  consectetur est at lobortis. Integer posuere erat a ante
                  venenatis dapibus posuere velit aliquet. Maecenas faucibus
                  mollis interdum. Nullam id dolor id nibh ultricies vehicula ut
                  id elit. Duis mollis, est non commodo luctus, nisi erat
                  porttitor ligula, eget lacinia odio sem nec elit. Cras justo
                  odio, dapibus ac facilisis in, egestas eget quam. Donec id
                  elit non mi porta gravida at eget metus. Donec id elit non mi
                  porta gravida at eget metus. Aenean lacinia bibendum nulla sed
                  consectetur. Vestibulum id ligula porta felis euismod semper.
                  Maecenas sed diam eget risus varius blandit sit amet non
                  magna. Etiam porta sem malesuada magna mollis euismod. Donec
                  ullamcorper nulla non metus auctor fringilla. Donec id elit
                  non mi porta gravida at eget metus.
                </Cell>
              </Row>
            )}
          </Row>
        )}
      </Table>
    </V11Adapter>
  );
};

export const SortableRows = () => {
  return (
    <V11Adapter>
      <Table
        data={defaultData}
        columns={
          <HeaderRow>
            <TableHeader
              key="name"
              label="Name"
              dataType="string"
              compareFn={(a: any, b: any, dir) => {
                const reverse = (str: string) =>
                  str.split('').reverse().join('');

                // Pin 'Yvonne' to the top
                if (b.name === 'Yvonne') return 1;
                else if (a.name === 'Yvonne') return -1;

                // Sort by reversed name
                if (dir == 'desc') {
                  return reverse(b.name) >= reverse(a.name) ? 1 : -1;
                }

                return reverse(b.name) >= reverse(a.name) ? -1 : 1;
              }}
            />
            <TableHeader
              key="age"
              label="Age"
              dataType="number"
              sortBy={(datum: any) => datum.age.toString()}
            />
            <TableHeader
              key="color"
              label="Color"
              dataType="string"
              sortBy={(datum: any) => datum.color}
            />
            <TableHeader
              key="location"
              label="Location"
              handleSort={dir => {
                // eslint-disable-next-line no-console
                console.log(`Sorting location ${dir}`);
              }}
            />
          </HeaderRow>
        }
      >
        {({ datum }: any) => (
          <Row>
            <Cell>{datum.name}</Cell>
            <Cell>{datum.age}</Cell>
            <Cell>{datum.color}</Cell>
            <Cell>{datum.location}</Cell>
          </Row>
        )}
      </Table>
    </V11Adapter>
  );
};

export const SelectableRows = () => {
  return (
    <V11Adapter hasSelectableRows>
      <Table
        data={defaultData.slice(0, 8)}
        columns={
          <HeaderRow>
            <TableHeader key="name" label="Name" dataType="string" />
            <TableHeader key="age" label="Age" dataType="number" />
            <TableHeader key="color" label="Color" dataType="string" />
            <TableHeader key="location" label="Location" />
          </HeaderRow>
        }
      >
        {({ datum }: any) => (
          <Row>
            <Cell>{datum.name}</Cell>
            <Cell>{datum.age}</Cell>
            <Cell>{datum.color}</Cell>
            <Cell>{datum.location}</Cell>
          </Row>
        )}
      </Table>
    </V11Adapter>
  );
};
