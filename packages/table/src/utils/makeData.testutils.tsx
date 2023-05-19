import React from 'react';
import { faker } from '@faker-js/faker';

import Code from '@leafygreen-ui/code';

import { LeafyGreenTableRow } from '../useLeafyGreenTable';

const SEED = 0;
faker.seed(SEED);

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: 'relationship' | 'complicated' | 'single';
  subRows?: Array<Person>;
}

/** HELPERS */

const range = (len: number) => {
  const arr = [];

  for (let i = 0; i < len; i++) {
    arr.push(i);
  }

  return arr;
};

export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const newPerson = (): Person => {
  return {
    id: faker.string.alphanumeric(8),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 20, max: 100 }),
    visits: faker.number.int(1000),
    status: faker.helpers.arrayElement<Person['status']>([
      'relationship',
      'complicated',
      'single',
    ]),
  };
};

const ExpandedContentComponent = (row: LeafyGreenTableRow<unknown>) => {
  return (
    <div style={{ padding: '0 30px' }}>
      Test
      <pre>{JSON.stringify(row, null, 2)}</pre>
    </div>
  );
};

/**
 * Generates a series of sample data to be used in Storybook
 * @param renderingExpandableRows indicates whether the `renderExpandedContent` prop should be defined in some rows
 * @param lens number of rows in each level of nesting
 * @returns Array<Person>
 */
export function makeData(
  renderingExpandableRows: boolean,
  ...lens: Array<number>
) {
  faker.seed(SEED);

  const hasSubRows = !renderingExpandableRows && lens.length > 1;

  const makeDataLevel = (depth = 0): Array<Person> => {
    const len = lens[depth]!;
    return range(len).map((_): Person => {
      return {
        ...newPerson(),
        ...(hasSubRows &&
          lens[depth + 1] &&
          randomIntFromInterval(1, 2) == 1 && {
            subRows: makeDataLevel(depth + 1),
          }),
        ...(renderingExpandableRows &&
          randomIntFromInterval(1, 3) == 1 && {
            renderExpandedContent: ExpandedContentComponent,
          }),
      };
    });
  };

  const data = makeDataLevel();
  return data;
}

const SampleExpandedContent = (row: LeafyGreenTableRow<object>) => {
  return (
    <div style={{ padding: '12px 70px 24px 70px' }}>
      <Code language="js" style={{ width: '100%' }}>
        {`          
          function greeting(row) {
            return \`Hello, you're looking at row ID ${row.id}! Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper.\`;
          }
          
          console.log(greeting(row));
        `}
      </Code>
    </div>
  );
};

const createKitchenSinkData: (depth?: number) => object = (depth = 0) => {
  return {
    dateCreated: faker.date.past(),
    frequency: faker.helpers.arrayElement(['Daily', 'Weekly', 'Monthly']),
    clusterType: faker.helpers.arrayElement(['Replica set', 'Sharded cluster']),
    encryptorEnabled: faker.datatype.boolean(0.75),
    mdbVersion: faker.system.semver(),
    subRows:
      depth === 0
        ? [...Array(3)].map(_ => createKitchenSinkData(depth + 1))
        : undefined,
    renderExpandedContent: depth > 0 ? SampleExpandedContent : undefined,
  };
};

export const makeKitchenSinkData = (rows: number) => {
  faker.seed(SEED);

  return [...Array(rows)].map(_ => createKitchenSinkData());
};
