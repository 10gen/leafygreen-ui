import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import {
  defaultStorybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Body, InlineCode, Subtitle } from '@leafygreen-ui/typography';

import Tooltip, { Align, Justify, TooltipProps } from '.';

const meta: StoryMetaType<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    children: 'I am a tooltip!',
    trigger: <Button>trigger</Button>,
    enabled: true,
    usePortal: true,
  },
  argTypes: {
    open: { control: 'boolean' },
    darkMode: defaultStorybookArgTypes.darkMode,
    children: defaultStorybookArgTypes.children,
    baseFontSize: {
      control: 'radio',
      options: Object.values(BaseFontSize),
    },
  },
  parameters: {
    default: 'Basic',
    controls: {
      exclude: [...storybookExcludedControlParams, 'trigger'],
    },
  },
};
export default meta;

export const Basic: StoryFn<TooltipProps> = ({
  darkMode,
  ...args
}: TooltipProps) => (
  <div
    className={css`
      padding: 100px;
    `}
  >
    <Tooltip darkMode={darkMode} {...args} />
  </div>
);
Basic.argTypes = {
  open: {
    control: 'none',
  },
};

export const ControlledWithState = (args: TooltipProps) => {
  const [open, setOpen] = useState(true);
  return <Tooltip {...args} open={open} setOpen={setOpen} />;
};

export const WithLeafyGreenChildren = Basic.bind({});
WithLeafyGreenChildren.args = {
  children: (
    <>
      <Subtitle>Example</Subtitle>
      <Body>Use Tooltip in your codebase:</Body>
      <InlineCode>@leafygreen-ui/tooltip</InlineCode>
    </>
  ),
};

export const AlignmentTest = ({ darkMode, ...args }: TooltipProps) => {
  return (
    <div
      className={css`
        display: grid;
        grid-template-columns: repeat(4, 64px);
        grid-template-rows: repeat(4, 64px);
        width: 100%;
        gap: 64px;
        align-items: center;
        justify-items: center;
        justify-content: center;
        padding: 96px;
      `}
    >
      {Object.values(Align).map(a =>
        Object.values(Justify).map(j => (
          <Tooltip
            {...args}
            key={a + j}
            darkMode={darkMode}
            align={a}
            justify={j}
            triggerEvent="click"
          >
            Align {a}, Justify {j}.
          </Tooltip>
        )),
      )}
    </div>
  );
};

export const LongText = Basic.bind({});
LongText.args = {
  children:
    '5hhs8d83jj2992h88d9s49ns94jsjsj9456j9djdf95hhs8d83jj2992h88d9s49ns94jsjsj9456j9djdf9',
};

const scrollableStyle = css`
  width: 600px;
  height: 80vh;
  background-color: #e8edeb;
  overflow: scroll;
  position: relative;
`;

const scrollableInnerStyle = css`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const referenceElPositions: { [key: string]: string } = {
  centered: css`
    position: relative;
  `,
  top: css`
    top: 20px;
    position: absolute;
  `,
  right: css`
    right: 20px;
    position: absolute;
  `,
  bottom: css`
    bottom: 20px;
    position: absolute;
  `,
  left: css`
    left: 20px;
    position: absolute;
  `,
};

type TooltipScrollableProps = TooltipProps & {
  buttonText: string;
  refButtonPosition: string;
};

export const ScrollableContainer = ({
  refButtonPosition,
  buttonText,
  justify,
  align,
  ...args
}: TooltipScrollableProps) => {
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(
    null,
  );
  const position = referenceElPositions[refButtonPosition];

  return (
    <div className={scrollableStyle}>
      <div className={scrollableInnerStyle} ref={el => setPortalContainer(el)}>
        <div className={position}>
          <Tooltip
            trigger={
              <span>
                <Icon glyph="Cloud" />
              </span>
            }
            portalContainer={portalContainer}
            scrollContainer={portalContainer}
            triggerEvent="click"
            justify={justify}
            align={align}
            {...args}
          >
            I am a Tooltip! Lorem ipsum dolor sit amet, consectetur adipiscing
            elit
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

ScrollableContainer.args = {
  usePortal: true,
};

ScrollableContainer.argTypes = {
  refButtonPosition: {
    options: ['centered', 'top', 'right', 'bottom', 'left'],
    control: { type: 'select' },
    description:
      'Storybook only prop. Used to change position of the reference button',
    defaultValue: 'centered',
  },
  usePortal: { control: 'none' },
  portalClassName: { control: 'none' },
  refEl: { control: 'none' },
  className: { control: 'none' },
  active: { control: 'none' },
  trigger: { control: 'none' },
  triggerEvent: { control: 'none' },
  enabled: { control: 'none' },
  open: { control: 'none' },
  setOpen: { control: 'none' },
  children: { control: 'none' },
  darkMode: { control: 'none' },
};
