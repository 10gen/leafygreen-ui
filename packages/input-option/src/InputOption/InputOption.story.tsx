import React from 'react';
import { StoryFn } from '@storybook/react';

import Icon, { glyphs } from '@leafygreen-ui/icon';
import {
  defaultStorybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';

import {
  InputOptionContent,
  InputOptionContentProps,
} from '../InputOptionContent';

import { InputOption, type InputOptionProps } from '.';

const meta: StoryMetaType<typeof InputOption> = {
  title: 'Components/InputOption',
  component: InputOption,
  parameters: {
    default: 'Basic',
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'setError',
        'filteredOptions',
        'initialValue',
        'value',
        'children',
      ],
    },
    generate: {
      props: {
        darkMode: [false, true],
        selected: [false, true],
        isInteractive: [false, true],
        showWedge: [false, true],
        disabled: [false, true],
      },
    },
  },
  args: {
    children: 'Some text',
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    highlighted: {
      control: 'boolean',
    },
    selected: {
      control: 'boolean',
    },
    showWedge: {
      control: 'boolean',
    },
    leftGlyph: {
      options: Object.keys(glyphs),
      control: { type: 'select' },
    },
    rightGlyph: {
      options: Object.keys(glyphs),
      control: { type: 'select' },
    },
    description: {
      control: { type: 'text' },
    },
    as: defaultStorybookArgTypes.as,
  },
};

export default meta;

export const LiveExample: StoryFn<
  InputOptionProps & InputOptionContentProps
> = (props: InputOptionProps & InputOptionContentProps) => {
  const { leftGlyph, rightGlyph, description, ...rest } = props;
  return (
    <InputOption {...rest}>
      <InputOptionContent
        leftGlyph={leftGlyph ? <Icon glyph={leftGlyph as string} /> : undefined}
        rightGlyph={
          rightGlyph ? <Icon glyph={rightGlyph as string} /> : undefined
        }
        description={description}
      >
        Some text
      </InputOptionContent>
    </InputOption>
  );
};

export const Generated = () => {};
