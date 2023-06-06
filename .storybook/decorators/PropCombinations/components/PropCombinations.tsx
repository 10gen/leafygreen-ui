import React, { PropsWithChildren, ReactElement } from 'react';
import { entries } from 'lodash';
import { Args, StoryFn } from '@storybook/react';

import { css, cx } from '@leafygreen-ui/emotion';
import { GeneratedStoryConfig } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { Polymorph } from '@leafygreen-ui/polymorphic';

import {
  combinationStyles,
  combinationStylesDarkMode,
  combinationStylesDarkModeProp,
  instanceStyles,
  propWrapperStyles,
  propWrapperStylesDarkModeProp,
} from '../PropCombinations.styles';
import { shouldExcludePropCombo, valStr } from '../utils';

/**
 * Generates all combinations of each variable
 */
export function PropCombinations<T extends React.ComponentType<any>>({
  component,
  variables,
  args,
  exclude,
  decorator = (SFn: StoryFn) => <SFn />,
}: {
  component: T;
  variables: Array<[string, Array<any>]>;
  args: Args;
  exclude: GeneratedStoryConfig<T>['excludeCombinations'];
  decorator: GeneratedStoryConfig<T>['decorator'];
}): ReactElement<any> {
  let comboCount = 0;

  const AllCombinations = RecursiveCombinations({}, [...variables]);

  console.log(
    `Rendering ${comboCount} prop combinations for component: ${component.displayName}`,
  );

  return AllCombinations;

  /**
   * Recursively loop through all prop combinations defined in `variables` and render them
   */
  function RecursiveCombinations(
    props: Record<string, any>,
    vars: Array<[string, Array<any>]>,
  ): ReactElement<any> {
    // If this is the last variable, this is our base case
    if (vars.length === 0) {
      comboCount += 1;
      return <Instance instanceProps={props} />;
    } else {
      const [propName, propValues] = vars.shift()!;
      const isDarkModeProp = propName === 'darkMode';

      const polyProps = isDarkModeProp && {
        className: cx(propWrapperStyles, {
          [propWrapperStylesDarkModeProp]: isDarkModeProp,
        }),
        id: propName,
      };

      if (propValues) {
        return (
          <Polymorph
            as={isDarkModeProp ? 'div' : React.Fragment}
            {...polyProps}
          >
            {propValues.map(val => (
              <PropDetailsComponent propName={propName} val={val}>
                {RecursiveCombinations({ [propName]: val, ...props }, [
                  ...vars,
                ])}
              </PropDetailsComponent>
            ))}
          </Polymorph>
        );
      } else {
        return <div>No Prop Values</div>;
      }
    }

    /** Scoped to `RecursiveCombinations` closure */
    function PropDetailsComponent({
      children,
      propName,
      val,
    }: PropsWithChildren<{
      propName: string;
      val: any;
    }>) {
      const shouldRender = !shouldExcludePropCombo<T>({
        propName,
        val,
        props,
        exclude,
      });

      const isDarkModeProp = propName === 'darkMode';

      const polyProps = isDarkModeProp && {
        id: `${propName}-${val}`,
        className: cx(combinationStyles, {
          [combinationStylesDarkModeProp]: isDarkModeProp,
          [combinationStylesDarkMode]: isDarkModeProp && val,
        }),
        darkMode: isDarkModeProp && val,
      };

      return shouldRender ? (
        <Polymorph
          as={isDarkModeProp ? 'table' : React.Fragment}
          {...polyProps}
        >
          {children}
        </Polymorph>
      ) : (
        <></>
      );
    }
  }

  /** Scoped to PropCombinations */
  function Instance({ instanceProps }: { instanceProps: Record<string, any> }) {
    return (
      <tr
        className={css`
          border-top: 1px solid ${palette.gray.base};
          border-bottom: 1px solid ${palette.gray.base};
        `}
      >
        <PropLabels instanceProps={instanceProps} />
        <td
          className={cx(instanceStyles)}
          data-props={JSON.stringify(instanceProps)}
        >
          {decorator(
            (extraArgs: typeof args) =>
              React.createElement(component, {
                ...extraArgs,
                ...args,
                ...instanceProps,
              }),
            { args: { ...instanceProps, ...args } },
          )}
        </td>
      </tr>
    );
  }

  /** Scoped to PropCombinations */
  function PropLabels({
    instanceProps,
  }: {
    instanceProps: Record<string, any>;
  }) {
    const propsToLabel = entries(instanceProps).filter(
      ([p]) => p !== 'darkMode',
    );
    propsToLabel.reverse();

    return (
      <td>
        <pre>
          {propsToLabel.map(([name, val]) => (
            <div>
              <b>{name}: </b>
              {valStr(val)}
            </div>
          ))}
        </pre>
      </td>
    );
  }
}
