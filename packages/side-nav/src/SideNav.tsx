import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';
import { useEventListener, useIdAllocator } from '@leafygreen-ui/hooks';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { keyMap } from '@leafygreen-ui/lib';
import {
  prefersReducedMotion,
  validateAriaLabelProps,
} from '@leafygreen-ui/a11y';
<<<<<<< HEAD
=======
import { useBaseFontSize } from '@leafygreen-ui/leafygreen-provider';
import { useEventListener } from '@leafygreen-ui/hooks';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { keyMap, IdAllocator, createDataProp } from '@leafygreen-ui/lib';
>>>>>>> origin
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { sideNavWidth, ulStyleOverrides, collapseDuration } from './styles';
import SideNavContext from './SideNavContext';
import CollapseToggle from './CollapseToggle';

<<<<<<< HEAD
=======
const navIdAllocator = IdAllocator.create('input');
const dataProp = createDataProp('side-nav');
const sideNavSelector = dataProp.selector;

export { sideNavSelector };

>>>>>>> origin
const navStyles = css`
  transition: all ${collapseDuration}ms ease-in-out;
  background-color: ${uiColors.gray.light3};
  border-right: 1px solid ${uiColors.gray.light2};
  position: relative;
  z-index: 0;

  ${prefersReducedMotion(`
    transition: all ${collapseDuration}ms ease-in-out, width 0ms linear;
  `)}
`;

const collapsedNavStyles = css`
  width: 48px;
`;

const hoverNavStyles = css`
  box-shadow: 2px 0 4px ${transparentize(0.9, uiColors.black)};
  border-right-color: ${uiColors.gray.light3};
`;

const listWrapper = css`
  transition: opacity ${collapseDuration}ms ease-in-out,
    transform ${collapseDuration}ms ease-in-out;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;

  ${prefersReducedMotion(`
    transition: opacity ${collapseDuration}ms ease-in-out;
  `)}
`;

const listStyles = css`
  padding-top: ${spacing[3]}px;
  padding-bottom: ${spacing[3]}px;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const wrapper = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
`;

const space = css`
  transition: width ${collapseDuration}ms ease-in-out;
  position: relative;

  ${prefersReducedMotion(`
    transition: none;
  `)}
`;

const collapsedSpace = css`
  width: 48px;
`;

const expandedEnteredStyle = css`
  transform: translate3d(0, ${spacing[2]}px, 0);
  opacity: 0;
  pointer-events: none;
`;

const expandedExitedStyle = css`
  transform: translate3d(0, 0, 0);
  opacity: 1;
`;

const expandedStateStyles: Partial<Record<TransitionStatus, string>> = {
  entering: expandedEnteredStyle,
  entered: expandedEnteredStyle,
  exiting: expandedExitedStyle,
  exited: expandedExitedStyle,
} as const;

const collapsedEnteredStyle = css`
  transform: translate3d(0, 0, 0);
  opacity: 1;
`;

const collapsedExitedStyle = css`
  transform: translate3d(0, -${spacing[2]}px, 0);
  opacity: 0;
  pointer-events: none;
`;

const collapsedStateStyles: Partial<Record<TransitionStatus, string>> = {
  entering: collapsedEnteredStyle,
  entered: collapsedEnteredStyle,
  exiting: collapsedExitedStyle,
  exited: collapsedExitedStyle,
} as const;

interface SideNavProps {
  /**
   * Class name that will be applied to the root-level element.
   */
  className?: string;

  /**
   * Content that will be rendered inside the root-level element.
   */
  children?: React.ReactNode;

  id?: string;

  /**
   * Determines the base font size for the menu items.
   */
  baseFontSize?: 14 | 16;

  /**
   * Provides an override for the SideNav width.
   */
  widthOverride?: number;

  /**
   * Allows consuming applications to control the collapsed state of the navigation.
   */
  collapsed?: boolean;

  /**
   * Consuming application's collapsed-state management controller
   */
  setCollapsed?: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * # SideNav
 *
 * ```
<SideNav>
  <SideNavGroup headerText="Section Header">
    <SideNavItem href="/">
      Back to Home
    </SideNavItem>
  </SideNavGroup>
</SideNav>
 * ```
 *
 * @param props.className Class name that will be applied to the root-level element.
 * @param props.children Content that will be rendered inside the root-level element.
 * @param props.baseFontSize Determines the base font size for the menu items.
 * @param props.widthOverride Provides an override for the SideNav width.
 * @param props.collapsed Allows consuming applications to control the collapsed state of the navigation.
 * @param props.setCollapsed Consuming application's collapsed-state management controller
 */
function SideNav({
  className,
  children,
  id: idProp,
  baseFontSize,
  widthOverride,
  collapsed: controlledCollapsed,
  setCollapsed: setControlledCollapsed = () => {},
  ...rest
}: SideNavProps) {
  const { Provider: ContextProvider } = SideNavContext;
  const [uncontrolledCollapsed, uncontrolledSetCollapsed] = useState(false);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const { usingKeyboard } = useUsingKeyboardContext();
  const navId = useIdAllocator({ prefix: 'side-nav', id: idProp });
  const [
    portalContainer,
    setPortalContainer,
  ] = useState<HTMLUListElement | null>(null);
  const providerFontSize = useBaseFontSize();
  const fontSize: 14 | 16 = baseFontSize ?? providerFontSize;
  const width =
    typeof widthOverride === 'number' ? widthOverride : sideNavWidth;

  const collapsed =
    typeof controlledCollapsed === 'boolean'
      ? controlledCollapsed
      : uncontrolledCollapsed;

  const setCollapsed =
    typeof controlledCollapsed === 'boolean'
      ? setControlledCollapsed
      : uncontrolledSetCollapsed;

  // We visually expand the navigation when a user focuses on an element within the navigation
  // while navigating via keyboard.
  const focusExpand = usingKeyboard && focus;

  // Nav element should have a programmatically-determinable label
  validateAriaLabelProps(rest, 'SideNav');

  // Global event listener for toggling the navigation.
  useEventListener(
    'keypress',
    e => {
      const disabledTagNames = ['INPUT', 'TEXTAREA'] as const;

      // Disable toggling the side navigation when a user is typing in an input.
      // The typing for useEventListener doesn't seem to like using event.target,
      // so we disable this here.
      // @ts-expect-error
      const shouldToggle = disabledTagNames.includes(e.target?.tagName);

      if (e.keyCode === keyMap.BracketLeft && !shouldToggle) {
        setCollapsed(curr => !curr);
      }
    },
    {
      options: {
        passive: true,
      },
    },
  );

  return (
    <Transition
      in={collapsed && !hover && !focusExpand}
      timeout={collapseDuration}
    >
      {state => (
        <ContextProvider
          value={{
            navId,
            collapsed,
            portalContainer,
            width,
            transitionState: state,
            baseFontSize: fontSize,
          }}
        >
          <div
            data-testid="side-nav-container"
            {...dataProp.prop}
            className={cx(
              space,
              css`
                width: ${width}px;
              `,
              { [collapsedSpace]: collapsed },
              className,
            )}
          >
            <div className={wrapper} onMouseLeave={() => setHover(false)}>
              <nav
                id={navId}
                className={cx(
                  navStyles,
                  css`
                    width: ${width}px;
                  `,
                  {
                    [collapsedNavStyles]: ['entering', 'entered'].includes(
                      state,
                    ),
                    [hoverNavStyles]: (hover || focusExpand) && collapsed,
                  },
                )}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onMouseEnter={() => setHover(true)}
                {...rest}
              >
                <div className={cx(listWrapper, expandedStateStyles[state])}>
                  <ul
                    className={cx(
                      ulStyleOverrides,
                      listStyles,
                      css`
                        width: ${width}px;
                      `,
                    )}
                  >
                    {children}
                  </ul>
                </div>

                <div className={cx(listWrapper, collapsedStateStyles[state])}>
                  <ul
                    // We hide the duplicate items from screen readers.
                    aria-hidden
                    className={cx(ulStyleOverrides, listStyles)}
                    ref={setPortalContainer}
                  />
                </div>
              </nav>

              <CollapseToggle
                collapsed={collapsed || (!hover && !focusExpand && collapsed)}
                onClick={() => {
                  setCollapsed(curr => !curr);
                  setHover(false);
                }}
                // This prevents any strange flickering while the navigation is transitioning.
                hideTooltip={
                  ['entering', 'exiting'].includes(state) || undefined
                }
              />
            </div>
          </div>
        </ContextProvider>
      )}
    </Transition>
  );
}

SideNav.displayName = 'SideNav';

SideNav.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  id: PropTypes.string,
};

export default SideNav;
