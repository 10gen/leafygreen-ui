import React, { SyntheticEvent, useState } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';

import { css, cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import Portal from '@leafygreen-ui/portal';
import { transitionDuration } from '@leafygreen-ui/tokens';

import {
  gap,
  notificationBarHeight,
  toastHeight,
  toastInset,
} from '../constants';
import { InternalToast, toastBGColor } from '../InternalToast';
import { ToastProps } from '../Toast.types';
import { useToast } from '../ToastContext';
import { ToastId, ToastStack } from '../ToastContext/ToastContext.types';

import { NotificationBar } from './NotificationBar/NotificationBar';
import { notificationBarTransitionStyles } from './NotificationBar/NotificationBar.styles';
import {
  getToastTransitionStyles,
  toastContainerStyles,
} from './ToastContainer.styles';
import { useTimers } from './useTimers';

export const toastPortalClassName = createUniqueClassName('toast-portal');
const toastClassName = createUniqueClassName('toast');

/**
 * ToastContainer is responsible for rendering the stack of toasts provided
 */
export const ToastContainer = ({ stack }: { stack: ToastStack }) => {
  const regionId = useIdAllocator({ id: 'lg-toast-region' });
  const { theme } = useDarkMode();
  const { popToast } = useToast();
  const [isHovered, setHovered] = useState(false);

  const { recentToasts, remainingToasts } = getDividedStack(stack);
  const indexFromTop = (i: number) => recentToasts.length - 1 - i;
  const showNotifBar = isHovered && remainingToasts.length > 0;
  const notifBarSpacing = showNotifBar ? notificationBarHeight + gap : 0;

  const handleClose = (id: ToastId, e?: SyntheticEvent) => {
    const toast = stack.get(id);

    if (toast) {
      // We only self-close the toast if it's not externally controlled
      if (!toast.isControlled) {
        popToast(id);
      }
      toast.onClose?.(e);
    }
  };

  useTimers(
    {
      stack,
      isHovered,
    },
    handleClose,
  );

  return (
    <Portal className={toastPortalClassName}>
      <div
        id={regionId}
        role="status"
        aria-live="polite"
        aria-relevant="all"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cx(toastContainerStyles, {
          [css`
            height: ${toastInset +
            recentToasts.length * (toastHeight + gap) +
            notifBarSpacing}px;
          `]: isHovered,
        })}
      >
        <TransitionGroup appear exit component={null}>
          {recentToasts.map(
            ([id, { onClose, className, ...toastProps }], i) => {
              return (
                <Transition key={id} timeout={transitionDuration.default}>
                  {state => (
                    <InternalToast
                      onClose={e => handleClose(id, e)}
                      className={cx(
                        toastClassName,
                        getToastTransitionStyles({
                          state,
                          theme,
                          indexFromTop: indexFromTop(i),
                        }),
                        {
                          [css`
                            background-color: ${toastBGColor[theme]};
                            transform: translate3d(
                              0,
                              -${i * (toastHeight + gap) + notifBarSpacing}px,
                              0
                            );
                          `]: isHovered,
                        },
                        className,
                      )}
                      {...toastProps}
                      description={`${id} #${i} in stack (${indexFromTop(
                        i,
                      )} from top)`}
                    />
                  )}
                </Transition>
              );
            },
          )}
        </TransitionGroup>
        <Transition in={showNotifBar} timeout={transitionDuration.slower}>
          {state => (
            <NotificationBar
              count={remainingToasts.length}
              onClick={() => {}}
              className={notificationBarTransitionStyles[state]}
            />
          )}
        </Transition>
      </div>
    </Portal>
  );
};

function getDividedStack(stack: ToastStack): {
  recentToasts: Array<[string, ToastProps]>;
  remainingToasts: Array<[string, ToastProps]>;
} {
  return Array.from(stack).reduce(
    (acc, toast, i) => {
      if (stack.size <= 3 || i >= stack.size - 3) {
        acc.recentToasts.push(toast);
      } else {
        acc.remainingToasts.push(toast);
      }

      return acc;
    },
    {
      recentToasts: [] as Array<[ToastId, ToastProps]>,
      remainingToasts: [] as Array<[ToastId, ToastProps]>,
    },
  );
}
