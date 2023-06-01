import React from 'react';
import { StoryFn } from '@storybook/react';

import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';

import Stage from './Stage';
import { Size } from './types';
import { Pipeline, PipelineProps } from '.';

const meta: StoryMetaType<typeof Pipeline> = {
  title: 'Components/Pipeline',
  component: Pipeline,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'children'],
    },
    generate: {
      props: {
        darkMode: [false, true],
        size: Object.values(Size),
        children: [
          ['$match', '$group', '$project', '$addFields'],
          // prettier-ignore
          ['$match', '$group', '$project', '$addFields', '$limit', '$foobar', '$barbaz', '$loremipsum', '$doloramet'],
        ],
      },
    },
  },
  args: {
    darkMode: false,
    size: Size.Normal,
    children: ['$match', '$group', '$project', '$addFields', '$limit'].map(
      (stage, index) => <Stage key={`${stage}-${index}`}>{stage}</Stage>,
    ),
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
};
export default meta;

export const LiveExample: StoryFn<PipelineProps & { stages: string }> = ({
  ...args
}: PipelineProps & { stages: string }) => {
  return <Pipeline {...args} />;
};

export const Generated = () => {};
