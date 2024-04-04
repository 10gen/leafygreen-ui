import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import H3 from './H3';
import { H3Props } from './H3.types';

export const LiveExample = ({ children, ...rest }: H3Props) => {
  return <H3 {...rest}>{children}</H3>;
};

const meta: StoryMetaType<typeof H3> = {
  title: 'Components/Typography/H3',
  component: H3,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
      },
    },
  },
  args: {
    children: 'Lorem ipsum dolor sit amet',
  },
};
export default meta;

export const Generated = () => <></>;
