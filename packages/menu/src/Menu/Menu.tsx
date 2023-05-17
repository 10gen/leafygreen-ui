import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import isUndefined from 'lodash/isUndefined';
import PropTypes from 'prop-types';

import { css, cx } from '@leafygreen-ui/emotion';
import { useAvailableSpace, useEventListener } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isComponentType, keyMap, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import Popover, { Align, Justify } from '@leafygreen-ui/popover';

import { MenuContext } from '../MenuContext/MenuContext';
import MenuSeparator from '../MenuSeparator/MenuSeparator';
import { SubMenu, type SubMenuProps } from '../SubMenu/';
import { ElementOf } from '../types';

import { MenuProps } from './Menu.types';

const rootMenuStyle = css`
  width: 210px;
  border-radius: 12px;
  overflow: auto;
  padding: 14px 0;
`;

const rootMenuThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.black};
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.light2};
  `,
};

const scrollContainerStyle = css`
  overflow: auto;
  list-style: none;
  margin-block-start: 0px;
  margin-block-end: 0px;
  padding-inline-start: 0px;
  padding: 0px;
`;

/**
 *
 * Menus are used when a user needs to take an action.
 *
 * In a menu a user takes an action (like copy/delete a property or navigate to a different section/screen).
 *
 * @param props.children Content to appear inside of Menu.
 * @param props.open Boolean to describe whether or not Menu is open.
 * @param props.setOpen Callback to change the open state of the Menu.
 * @param props.shouldClose Callback to determine whether or not Menu should close when user tries to close it.
 * @param props.className Classname applied to Menu.
 * @param props.align Alignment of Menu relative to another element: `top`, `bottom`, `left`, `right`.
 * @param props.justify Justification of Menu relative to another element: `start`, `middle`, `end`.
 * @param props.refEl Reference element that Menu should be positioned against.
 * @param props.usePortal Boolean to describe if content should be portaled to end of DOM, or appear in DOM tree.
 * @param props.trigger Trigger element can be ReactNode or function, and, if present, internally manages active state of Menu.
 * @param props.darkMode Determines whether or not the component will be rendered in dark theme.
 */
export function Menu({
  align = Align.Bottom,
  justify = Justify.End,
  adjustOnMutation = false,
  shouldClose = () => true,
  spacing = 6,
  open: controlledOpen,
  setOpen: controlledSetOpen,
  children,
  className,
  refEl,
  trigger,
  usePortal = true,
  portalClassName,
  portalContainer,
  scrollContainer,
  popoverZIndex,
  maxHeight = 344,
  darkMode: darkModeProp,
  id,
  ...rest
}: MenuProps) {
  const { theme, darkMode } = useDarkMode(darkModeProp);

  const hasSetInitialFocus = useRef(false);
  const hasSetInitialOpen = useRef(false);

  const [, setClosed] = useState(false);
  const [currentSubMenu, setCurrentSubMenu] = useState<ElementOf<
    typeof SubMenu
  > | null>(null);
  const [uncontrolledOpen, uncontrolledSetOpen] = useState(false);

  const setOpen =
    (typeof controlledOpen === 'boolean' && controlledSetOpen) ||
    uncontrolledSetOpen;
  const open = controlledOpen ?? uncontrolledOpen;

  const triggerRef = useRef<HTMLElement>(null);
  const availableSpace = useAvailableSpace(refEl || triggerRef, spacing);
  const maxMenuHeightValue = !isUndefined(availableSpace)
    ? `${Math.min(availableSpace, maxHeight)}px`
    : 'unset';

  const { updatedChildren, refs } = React.useMemo(() => {
    if (
      children == null ||
      ['boolean', 'number', 'string'].includes(typeof children)
    ) {
      return { updatedChildren: undefined, refs: [] };
    }

    const titleArr: Array<string> = [];
    const refs: Array<HTMLElement> = [];

    function updateChildren(children: React.ReactNode): React.ReactNode {
      return React.Children.map(children, child => {
        if (!React.isValidElement(child) || child.props?.disabled) {
          return child;
        }

        const { props } = child;

        let currentChildRef: HTMLElement | null = null;

        const setRef = (ref: HTMLElement) => {
          if (ref == null) {
            return;
          }

          refs.push(ref);
          currentChildRef = ref;

          if (open && hasSetInitialFocus.current === false) {
            setFocus(refs[0]);
            hasSetInitialFocus.current = true;
          }
        };

        const title = props?.title ?? false;

        const onFocus = ({ target }: React.FocusEvent<HTMLElement>) => {
          setFocused(target);
        };

        if (
          isComponentType<ElementOf<typeof SubMenu>>(child, 'SubMenu') &&
          title
        ) {
          if (titleArr.includes(title)) {
            throw new Error('SubMenu titles must be unique');
          }

          titleArr.push(title);

          if (!currentSubMenu && props.active && !hasSetInitialOpen.current) {
            setCurrentSubMenu(child);
            hasSetInitialOpen.current = true;
          }

          const isCurrentSubMenu =
            (currentSubMenu?.props as SubMenuProps)?.title === title;

          return React.cloneElement(child, {
            ref: setRef,
            open: isCurrentSubMenu,
            setOpen: (state: boolean) => {
              if (currentChildRef) {
                setFocused(currentChildRef);
              }

              setCurrentSubMenu(state ? child : null);
            },
            onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => {
              if (e.keyCode === keyMap.ArrowLeft && isCurrentSubMenu) {
                setCurrentSubMenu(null);
              }

              if (e.keyCode === keyMap.ArrowRight) {
                setCurrentSubMenu(child);
              }
            },
            onFocus,
            children: updateChildren(props.children),
            onExited: () => {
              setClosed(curr => !curr);
            },
          });
        }

        if (isComponentType(child, 'MenuItem')) {
          return React.cloneElement(child, {
            ref: setRef,
            onFocus,
          });
        }

        if (isComponentType(child, 'FocusableMenuItem')) {
          return React.cloneElement(child, {
            ref: setRef,
            onFocus,
          });
        }

        if (isComponentType(child, 'MenuSeparator')) {
          return <MenuSeparator {...props} />;
        }

        if (props?.children) {
          const { children, ...rest } = props;
          return React.cloneElement(child, {
            children: updateChildren(props.children),
            ...rest,
          });
        }

        return child;
      });
    }

    return { updatedChildren: updateChildren(children), refs };
  }, [children, currentSubMenu, open]);

  const [focused, setFocused] = useState<HTMLElement>(refs[0] || null);

  const [popoverNode, setPopoverNode] = useState<HTMLUListElement | null>(null);

  const setFocus = (el: HTMLElement | null) => {
    if (el == null) {
      return;
    }

    setFocused(el);
    el.focus();
  };

  useEffect(() => {
    if (open) {
      hasSetInitialFocus.current = false;
      hasSetInitialOpen.current = false;
    }
  }, [open]);

  const handleClose = useCallback(() => {
    if (shouldClose()) {
      setOpen(false);
    }
  }, [setOpen, shouldClose]);

  const handleBackdropClick = useCallback(
    (e: MouseEvent) => {
      if (popoverNode && !popoverNode.contains(e.target as HTMLElement)) {
        handleClose();
      }
    },
    [handleClose, popoverNode],
  );

  useEventListener('click', handleBackdropClick, {
    enabled: open,
  });

  function handleKeyDown(e: KeyboardEvent) {
    let refToFocus: HTMLElement;

    switch (e.keyCode) {
      case keyMap.ArrowDown:
        e.preventDefault(); // Prevents page scrolling
        refToFocus = refs[(refs.indexOf(focused!) + 1) % refs.length];
        setFocus(refToFocus);
        break;

      case keyMap.ArrowUp:
        e.preventDefault(); // Prevents page scrolling
        refToFocus =
          refs[(refs.indexOf(focused!) - 1 + refs.length) % refs.length];
        setFocus(refToFocus);
        break;

      case keyMap.Tab:
        e.preventDefault(); // Prevent tabbing outside of portal and outside of the DOM when `usePortal={true}`
        handleClose();
        setFocus((triggerRef || refEl)?.current); // Focus the trigger on close
        break;

      case keyMap.Escape:
        handleClose();
        setFocus((triggerRef || refEl)?.current); // Focus the trigger on close
        break;

      case keyMap.Space:
      case keyMap.Enter:
        if (!open) {
          setFocus(refs[0]);
        }
        break;
    }
  }

  useEventListener('keydown', handleKeyDown, { enabled: open });

  const popoverProps = {
    popoverZIndex,
    ...(usePortal
      ? {
          spacing,
          usePortal,
          portalClassName,
          portalContainer,
          scrollContainer,
        }
      : { spacing, usePortal }),
  };

  const providerData = useMemo(() => {
    return { theme, darkMode };
  }, [theme, darkMode]);

  const popoverContent = (
    <MenuContext.Provider value={providerData}>
      <Popover
        key="popover"
        active={open}
        align={align}
        justify={justify}
        refEl={refEl}
        adjustOnMutation={adjustOnMutation}
        {...popoverProps}
      >
        <div
          id={id}
          className={cx(
            rootMenuStyle,
            rootMenuThemeStyles[theme],
            css`
              max-height: ${maxMenuHeightValue};
            `,
            className,
          )}
        >
          {/* Need to stop propagation, otherwise Menu will closed automatically when clicked */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events*/}
          <ul
            {...rest}
            className={scrollContainerStyle}
            role="menu"
            ref={setPopoverNode}
            onClick={e => e.stopPropagation()}
          >
            {updatedChildren}
          </ul>
        </div>
      </Popover>
    </MenuContext.Provider>
  );

  if (trigger) {
    const triggerClickHandler = (event?: React.MouseEvent) => {
      setOpen((curr: boolean) => !curr);

      if (trigger && typeof trigger !== 'function') {
        trigger.props?.onClick?.(event);
      }

      // We stop the native event from bubbling, but allow the React.Synthetic event to bubble
      // This way click handlers on parent components will still fire,
      // but this click event won't propagate up to the document and immediately close the menu.
      event?.nativeEvent?.stopPropagation?.();
    };

    if (typeof trigger === 'function') {
      return trigger({
        onClick: triggerClickHandler,
        ref: triggerRef,
        children: popoverContent,
        ['aria-expanded']: open,
      });
    }

    const renderedTrigger = React.cloneElement(trigger, {
      ref: triggerRef,
      onClick: triggerClickHandler,
      children: (
        <>
          {trigger.props.children}
          {popoverContent}
        </>
      ),
      ['aria-expanded']: open,
    });

    return renderedTrigger;
  }

  return popoverContent;
}

Menu.displayName = 'Menu';

Menu.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  align: PropTypes.oneOf(Object.values(Align)),
  justify: PropTypes.oneOf(Object.values(Justify)),
  refEl: PropTypes.shape({
    current:
      typeof window !== 'undefined'
        ? PropTypes.instanceOf(Element)
        : PropTypes.any,
  }),
  usePortal: PropTypes.bool,
  trigger: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  darkMode: PropTypes.bool,
};

export default Menu;
