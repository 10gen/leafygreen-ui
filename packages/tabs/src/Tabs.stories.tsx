import React, { useState } from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import Card from '@leafygreen-ui/card';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import ExportIcon from '@leafygreen-ui/icon/dist/Export';
import SaveIcon from '@leafygreen-ui/icon/dist/Save';
import IconButton from '@leafygreen-ui/icon-button';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Body, Subtitle } from '@leafygreen-ui/typography';

import { Tab, Tabs, TabsProps } from './index';

const CardWithMargin = (props: any) => (
  <Card
    {...props}
    className={css`
      margin: 1em;
    `}
  />
);

const Lipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper nulla non metus auctor fringilla.`;

const defaultExcludedControls = [
  ...storybookExcludedControlParams,
  'children',
  'setSelected',
];

const meta: StoryMetaType<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        baseFontSize: [BaseFontSize.Body1, BaseFontSize.Body2],
        darkMode: [false, true],
        size: ['small', 'default'],
      },
      excludeCombinations: [
        { baseFontSize: BaseFontSize.Body2, size: 'small' },
      ],
    },
    controls: {
      exclude: defaultExcludedControls,
    },
  },
  args: {
    as: 'button',
    darkMode: false,
    children: [
      <Tab key="Tab 1" default name="Tab 1">
        <CardWithMargin>
          <Subtitle>Tab 1 Content</Subtitle>
          <Body>{Lipsum}</Body>
        </CardWithMargin>
      </Tab>,
      <Tab
        key="Tab 2"
        name="Tab 2 with a really long name that might overflow and stretch past the width of the Tab"
      >
        <CardWithMargin>
          <Subtitle>Tab 2 Content</Subtitle>
          <Body>{Lipsum}</Body>
        </CardWithMargin>
      </Tab>,
      <Tab key="Tab 3" disabled name="Tab 3">
        <CardWithMargin>
          <Subtitle>Tab 3 Content</Subtitle>
          <Body>{Lipsum}</Body>
        </CardWithMargin>
      </Tab>,
      <Tab
        key="Tab 4"
        name={
          <>
            <Icon glyph="Support" /> Tab 4 with an icon in the name
          </>
        }
      >
        <CardWithMargin>
          <Subtitle>Tab 4 Content</Subtitle>
          <Body>{Lipsum}</Body>
        </CardWithMargin>
      </Tab>,
    ],
    forceRenderAllTabPanels: false,
  },
  argTypes: {
    as: storybookArgTypes.as,
    baseFontSize: storybookArgTypes.baseFontSize,
    forceRenderAllTabPanels: { control: 'boolean' },
    selected: { control: 'number' },
    size: {
      control: 'radio',
      description:
        "The size of the title. `size='small'` overrides `baseFontSize` to be `BaseFontSize.Body1`",
      options: ['small', 'default'],
    },
  },
  // TODO: Add subcomponent controls for Tab when supported by Storybook
  subcomponents: { tab: Tab },
};
export default meta;

export const LiveExample: StoryFn<TabsProps> = ({
  baseFontSize,
  ...props
}: TabsProps) => (
  <LeafyGreenProvider baseFontSize={baseFontSize === 16 ? 16 : 14}>
    <Tabs
      className={css`
        max-width: 66vw;
      `}
      aria-label="Tabs to demonstrate usage of Leafygreen UI Tab Components"
      {...props}
    />
  </LeafyGreenProvider>
);

export const Controlled: StoryFn<TabsProps> = (args: TabsProps) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <LiveExample
      {...args}
      selected={selectedTab}
      setSelected={setSelectedTab}
    />
  );
};
Controlled.parameters = {
  chromatic: { disableSnapshot: true },
  controls: {
    exclude: [...defaultExcludedControls, 'selected'],
  },
};

export const WithInlineChildren = LiveExample.bind({});
WithInlineChildren.args = {
  inlineChildren: (
    <>
      <IconButton aria-label="export">
        <ExportIcon />
      </IconButton>
      <IconButton aria-label="save">
        <SaveIcon />
      </IconButton>
      <Button variant="primary">Continue</Button>
    </>
  ),
};
WithInlineChildren.argTypes = {
  inlineChildren: { control: 'none' },
};

export const Generated = () => {};
