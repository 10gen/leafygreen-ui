import React, {
  forwardRef,
  createRef,
  useState,
  Ref,
  ReactElement,
  useMemo,
} from 'react';

import PropTypes from 'prop-types';
import Tooltip from '@leafygreen-ui/tooltip';
import { cx } from '@leafygreen-ui/emotion';
import { useMutationObserver } from '@leafygreen-ui/hooks';
import { PipelineContext } from './PipelineContext';
import Stage from './Stage';
import Counter from './Counter';

import { getPipelineCounterTooltip, isElementOverflowed } from './utils';

import {
  baseSizeStyles,
  basePipelineListStyles,
  basePipelineStyles,
  counterVisibleStyles,
} from './styles';
import { PipelineProps, Size } from './types';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';

/**
 *
 * React Component to render top-level MongoDB Aggregations in a visual format.
 * Handles overflowed content gracefully by indicating how many other stages are hidden.
 *
 * ```
 * <Pipeline>
 *   <Stage>$match</Stage>
 *   <Stage>$addFields</Stage>
 *   <Stage>$limit</Stage>
 * </Pipeline>
 * ```
 *
 * @param props.children Content that will appear inside of the Pipeline component.
 * @param props.className Classname applied to Pipeline content container.
 * @param props.size Alters the rendered size of the component.
 * @param props.variant Alters the visual appearance of the component.
 */
const Pipeline = forwardRef(
  (
    {
      children,
      className = '',
      size = Size.XSmall,
      darkMode: darkModeProp,
      ...rest
    }: PipelineProps,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
    const { theme, darkMode } = useDarkMode(darkModeProp);
    // State
    const [pipelineNode, setPipelineNode] = useState<HTMLElement | null>(null);
    const [hasHiddenStages, setHasHiddenStages] = useState(false);
    const [tooltipText, setTooltipText] = useState<string>('');

    const providerData = useMemo(() => {
      return { theme };
    }, [theme]);

    // Handlers

    /**
     * Determines whether the Pipeline element is overflowed.
     * If the Pipeline is overflowed, this means that we have stages which aren't visible and
     * so we should display the counter.
     */
    const handleCounterDisplay = () => {
      const result = isElementOverflowed(pipelineNode!);
      setHasHiddenStages(result);
    };

    /**
     * Get the text of all the hidden stages. The mutation of the DOM is required otherwise the
     * Stage components will re-render, triggering an infinite loop on the
     * mutation observer.
     */
    const setAllHiddenStagesText = () => {
      const allStages =
        Array.from(pipelineNode!.children as HTMLCollectionOf<HTMLElement>) ||
        [];

      const allHiddenStages = allStages
        .filter(element => element.dataset.stageVisible === 'false')
        .map(element => element.textContent);

      setTooltipText(getPipelineCounterTooltip(allHiddenStages));
    };

    /**
     * Callback for the Mutation Observer.
     * @param records The records for the observed mutation
     */
    const observeChanges = (records: Array<MutationRecord>) => {
      const types = records.map(r => r.type);
      const attrs = records.map(r => r.attributeName);

      if (attrs.includes('data-stage-visible') || types.includes('childList')) {
        handleCounterDisplay();
        setAllHiddenStagesText();
      }
    };

    // Effects
    useMutationObserver(
      pipelineNode,
      {
        childList: true,
        subtree: true,
        attributes: true,
      },
      observeChanges,
    );

    const childrenAsPipelineStages = React.Children.map(children, child => {
      const props = {
        size,
        intersectionNode: pipelineNode,
        ref: createRef<HTMLLIElement>(),
      };

      if (isComponentType(child, 'Stage')) {
        const { children, ...rest } = child.props;
        const combinedProps = {
          ...props,
          ...rest,
        };
        return <Stage {...combinedProps}>{children}</Stage>;
      }

      return <Stage {...props}>{child}</Stage>;
    });

    const isCounterVisible =
      hasHiddenStages && React.Children.count(childrenAsPipelineStages) > 0;

    return (
      <PipelineContext.Provider value={providerData}>
        <div
          {...rest}
          data-testid="pipeline"
          ref={ref}
          className={cx(baseSizeStyles[size], basePipelineStyles, className)}
        >
          <ol
            ref={setPipelineNode}
            data-testid="pipeline-stages"
            className={cx(basePipelineListStyles)}
          >
            {childrenAsPipelineStages}
          </ol>

          {/* Removing the component was causing a unmounted error so instead we're hiding it with css */}
          <Tooltip
            align="top"
            justify="middle"
            trigger={
              <Counter
                className={cx({ [counterVisibleStyles]: isCounterVisible })}
                size={size}
              />
            }
            triggerEvent="hover"
            darkMode={darkMode}
          >
            {tooltipText}
          </Tooltip>
        </div>
      </PipelineContext.Provider>
    );
  },
);

Pipeline.displayName = 'Pipeline';

Pipeline.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(Object.values(Size)).isRequired,
  darkMode: PropTypes.bool,
};

export default Pipeline;
