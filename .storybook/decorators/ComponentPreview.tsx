import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';
import { Decorator, StoryContext, StoryFn } from '@storybook/react';
import { isGeneratedStory } from './GeneratedStory';

const rootStyle = css`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 100px;
  height: 100%;
  overflow: auto;
`;

const darkModeStyle = css`
  background-color: ${palette.black};
`;

const decorator: Decorator = (StoryFn: StoryFn, context: StoryContext<any>) => {
  const { darkMode, baseFontSize } = context.args;
  console.log(isGeneratedStory(context));

  return (
    <LeafyGreenProvider darkMode={darkMode} baseFontSize={baseFontSize}>
      <div
        className={cx({
          [rootStyle]: !isGeneratedStory(context),
          [darkModeStyle]: darkMode,
        })}
      >
        <StoryFn darkMode={darkMode} {...context} />
      </div>
    </LeafyGreenProvider>
  );
};

export default decorator;
