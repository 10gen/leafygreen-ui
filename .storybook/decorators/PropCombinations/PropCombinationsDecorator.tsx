/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CAUTION ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 * Updating this file will flag a change
 * in _every_ component that leverages generated stories.
 *
 * Modify with caution
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

import React from 'react';
import { Decorator, StoryContext, StoryFn } from '@storybook/react';
import { entries, isUndefined } from 'lodash';

import {
  StoryType,
  type GeneratedStoryConfig,
  type StoryMetaType,
} from '@leafygreen-ui/lib';

import { generatedStoryWrapper } from './PropCombinations.styles';
import { Err, PropCombinations } from './components';
import { isGeneratedStory } from './utils';
import { PARAM_NAME } from './constants';

type ContextType<T extends React.ComponentType<any>> = StoryContext<T> &
  StoryMetaType<T>;

const PropCombinationsDecorator: Decorator = (
  StoryFn: StoryFn,
  context: StoryContext<unknown>,
) => {
  const { component } = context;

  if (component) {
    const { parameters, args: metaArgs } = context as ContextType<
      typeof component
    >;

    const decoratorConfig: GeneratedStoryConfig<typeof component> | undefined =
      parameters[PARAM_NAME];

    if (!isUndefined(decoratorConfig)) {
      const {
        combineArgs,
        excludeCombinations,
        args: generatedArgs,
        decorator,
      } = decoratorConfig;
      if (isGeneratedStory(context)) {
        // Check for props
        if (!combineArgs || entries(combineArgs).length === 0) {
          return Err('`combineArgs` not found in story generation parameters.');
        }

        // Remove from props any explicitly defined args
        for (let propName in { ...generatedArgs }) {
          if (combineArgs[propName]) {
            delete combineArgs[propName];
          }
        }

        // Convert the object to an array & ensure darkMode is the first prop
        const variables = entries(combineArgs).sort(sortDarkMode);

        // reversing since the PropCombos recursion is depth-first
        variables.reverse();
        const GeneratedStory: StoryType<typeof component> = () => (
          <div className={generatedStoryWrapper}>
            <PropCombinations
              component={component}
              variables={variables}
              args={{ ...metaArgs, ...generatedArgs }}
              exclude={excludeCombinations}
              decorator={decorator}
            />
          </div>
        );
        return <GeneratedStory />;
      }
    }
  }

  return <StoryFn />;
};

export default PropCombinationsDecorator;

/**
 * Sorts the darkMode prop to the top.
 *
 * We want darkMode to be first so we can easily divide the tables into two clear sections.
 */
function sortDarkMode([propA]: [string, any], [propB]: [string, any]): number {
  if (propA === 'darkMode') return -1;
  if (propB === 'darkMode') return 1;
  return 0;
}
