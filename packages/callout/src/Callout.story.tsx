import React from 'react';
import { StoryFn } from '@storybook/react';

import Code from '@leafygreen-ui/code';
import { storybookArgTypes, StoryMetaType } from '@leafygreen-ui/lib';
import { Link } from '@leafygreen-ui/typography';

import Callout, { CalloutProps, Variant } from '.';

const loremIpsum = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy children ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`;
const loremWithLinks = (
  <div>
    <Link href="./">Link component</Link> is simply dummy text of the printing
    and typesetting industry. <a href="./">Anchor tag</a> has been the industry
    standard dummy children ever since the 1500s, when an unknown printer took a
    galley of type and scrambled it to make a type specimen book.
  </div>
);

const meta: StoryMetaType<typeof Callout> = {
  title: 'Components/Callout',
  component: Callout,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        variant: Object.values(Variant),
      },
    },
  },
  args: {
    variant: Variant.Note,
    children: loremWithLinks,
    darkMode: false,
  },
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
    },
    children: storybookArgTypes.children,
    darkMode: storybookArgTypes.darkMode,
  },
};
export default meta;

export const LiveExample: StoryFn<CalloutProps> = args => <Callout {...args} />;
LiveExample.args = {
  children: loremIpsum,
};
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const WithRichContent: StoryFn<CalloutProps> = ({
  // eslint-disable-next-line react/prop-types
  darkMode,
  ...args
}) => {
  return (
    <Callout {...args} title="Title" darkMode={darkMode}>
      <>
        Shopping items
        <ul>
          <li>Milk</li>
          <li>Bread</li>
          <li>Bananas</li>
        </ul>
        <Code language="js" darkMode={darkMode}>
          console.log(&apos;Hello world&apos;)
        </Code>
      </>
    </Callout>
  );
};

export const Generated = () => {};
