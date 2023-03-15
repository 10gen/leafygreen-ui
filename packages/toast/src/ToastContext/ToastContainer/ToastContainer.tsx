import React, { useCallback, useRef, useState } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';

import { css, cx } from '@leafygreen-ui/emotion';
import {
  useBackdropClick,
  useDynamicRefs,
  useIdAllocator,
  useMutationObserver,
  useStateRef,
} from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  createSyntheticEvent,
  createUniqueClassName,
} from '@leafygreen-ui/lib';
import Portal from '@leafygreen-ui/portal';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

import { TOAST } from '../../constants';
import { InternalToast } from '../../InternalToast';
import { ToastId, ToastStack } from '../ToastContext.types';
import { useToast } from '..';

import { NotificationBar } from './NotificationBar/NotificationBar';
import { notificationBarTransitionStyles } from './NotificationBar/NotificationBar.styles';
import { getDividedStack } from './utils/getDividedStack';
import {
  getContainerStatefulStyles,
  getToastHoverStyles,
  getToastTransitionStyles,
  getToastUnhoveredStyles,
  toastContainerStyles,
} from './ToastContainer.styles';
import { useToastHeights } from './useToastHeights';
import { useToastTimers } from './useToastTimers';
import { useToastTransitions } from './useToastTransitions';

export const toastPortalClassName = createUniqueClassName('toast-portal');

/**
 * ToastContainer is responsible for rendering the stack of toasts provided
 */
export const ToastContainer = ({ stack }: { stack: ToastStack }) => {
  const regionId = useIdAllocator({ id: 'lg-toast-region' });
  const toastContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const getToastRef = useDynamicRefs<HTMLDivElement>({ prefix: 'toast' });
  const { theme } = useDarkMode();
  const { popToast, getToast } = useToast();
  const [isHovered, setHoveredState] = useState(false);
  const setHovered = () => setHoveredState(true);
  const setUnhovered = () => setHoveredState(false);
  const [shouldExpand, setShouldExpand, getShouldExpand] = useStateRef(false);
  const expandToasts = () => setShouldExpand(true);
  const collapseToasts = () => setShouldExpand(false);

  const { recentToasts, remainingToasts } = getDividedStack(stack);
  const displayedToasts = shouldExpand
    ? [...remainingToasts, ...recentToasts]
    : recentToasts;

  /** is the "N more" bar visible? */
  const showNotifBar = isHovered && !shouldExpand && remainingToasts.length > 0;
  /** How much vertical space is the "N more" bar taking up  */
  const notifBarSpacing = showNotifBar
    ? TOAST.notificationBarHeight + TOAST.gap
    : 0;

  /**
   * Keep track of the DOM height of each toast element
   */
  const { toastHeights, totalStackHeight, updateToastHeights } =
    useToastHeights({
      stack,
      getToastRef,
      shouldExpand,
    });

  /**
   * We watch the toast container for mutations,
   * and calculate the toast height variables when they are added to the DOM
   */
  useMutationObserver(
    toastContainerRef.current,
    {
      childList: true,
      attributes: true,
      subtree: true,
    },
    updateToastHeights,
  );

  /**
   * Keep track of whether the toasts have transitioned in or out
   */
  const { isExpanded, handleTransitionExit, handleTransitionEnter } =
    useToastTransitions({
      containerRef: toastContainerRef,
      getShouldExpand,
      setHoveredState,
      totalStackHeight,
    });

  const isInteracted = isHovered || shouldExpand;

  /**
   * When a user clicks away from the expanded stack, collapse the stack
   */
  useBackdropClick(collapseToasts, toastContainerRef, isExpanded);

  /**
   * Callback passed into the InternalToast component as `onClose`
   * Also fired when timeout timers expires
   */
  const handleClose = useCallback(
    (id: ToastId, e?: MouseEvent) => {
      const toast = getToast(id);
      const toastRef = getToastRef(id);

      if (toast && toastRef?.current) {
        // We only self-close the toast if it's not externally controlled
        if (!toast.isControlled) {
          popToast(id);
        }

        toast.onClose?.(
          // Call the close handler either with the default click event (if it exists),
          // or a synthetic custom "timeout" event
          e ?? createSyntheticEvent(new Event('timeout'), toastRef.current),
        );
      }
    },
    [getToast, getToastRef, popToast],
  );

  /**
   * Set & keep track of timers for each toast in the stack
   */
  useToastTimers({
    stack,
    isHovered,
    callback: handleClose,
  });

  return (
    <Portal className={toastPortalClassName}>
      <div
        ref={toastContainerRef}
        id={regionId}
        data-testid="lg-toast-region"
        role="status"
        aria-live="polite"
        aria-relevant="all"
        data-hovered={isHovered}
        data-shouldExpand={shouldExpand}
        data-expanded={isExpanded}
        onMouseEnter={setHovered}
        onMouseLeave={setUnhovered}
        onFocus={setHovered}
        onBlur={setUnhovered}
        className={cx(
          toastContainerStyles,
          getContainerStatefulStyles({
            isExpanded,
            isHovered,
            shouldExpand,
            totalStackHeight,
            topToastHeight: toastHeights[0],
            recentToastsLength: recentToasts.length,
            bottomOffset: notifBarSpacing,
          }),
        )}
      >
        <div
          ref={scrollContainerRef}
          className={cx(
            css`
              position: relative;
              width: 100%;
              height: 100%;
              transform-style: inherit;
              /* background-color: rgba(255, 0, 255, 0.2); */
            `,
            {
              [css`
                position: relative;
                /* height: 100vh; */
                min-height: ${totalStackHeight + spacing[3]}px;
              `]: isExpanded,
            },
          )}
          data-height={totalStackHeight}
        >
          <TransitionGroup enter exit component={null}>
            {displayedToasts
              .reverse() // reversing so they're in the DOM with most recent first
              .map(([id, { onClose, className, ...toastProps }], index) => {
                const toastRef = getToastRef(id);

                return (
                  <Transition
                    onEntered={handleTransitionEnter}
                    onExited={handleTransitionExit}
                    key={id}
                    timeout={transitionDuration.default}
                  >
                    {state => (
                      <InternalToast
                        id={id}
                        ref={toastRef}
                        onClose={e => handleClose(id, e)}
                        index={index}
                        data-index={index}
                        isHovered={isInteracted}
                        className={cx(
                          getToastTransitionStyles({
                            state,
                            theme,
                            index,
                          }),
                          {
                            [getToastUnhoveredStyles({
                              theme,
                              index,
                              toastHeights,
                            })]: !isInteracted,
                            [getToastHoverStyles({
                              index,
                              toastHeights,
                              theme,
                              bottomOffset: notifBarSpacing,
                              isExpanded, //: shouldExpand,
                            })]: isInteracted,
                          },
                          className,
                        )}
                        {...toastProps}
                        description={
                          // TODO: Remove debug strings
                          toastProps.description + ` (${id} index #${index}.)`
                        }
                      />
                    )}
                  </Transition>
                );
              })}
          </TransitionGroup>

          <Transition in={showNotifBar} timeout={transitionDuration.slower}>
            {state =>
              !shouldExpand && (
                <NotificationBar
                  count={remainingToasts.length}
                  onClick={expandToasts}
                  className={notificationBarTransitionStyles[state]}
                />
              )
            }
          </Transition>
        </div>
      </div>
    </Portal>
  );
};
