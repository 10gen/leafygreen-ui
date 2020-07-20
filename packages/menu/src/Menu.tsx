import React, { useState, useRef, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import Popover, { Align, Justify, PopoverProps } from '@leafygreen-ui/popover';
import { useEventListener } from '@leafygreen-ui/hooks';
import { isComponentType, keyMap } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { transparentize } from 'polished';

const rootMenuStyle = css`
  width: 200px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 6px ${transparentize(0.8, uiColors.black)};
  background-color: ${uiColors.white};
  list-style: none;
  margin-block-start: 0px;
  margin-block-end: 0px;
  padding-inline-start: 0px;
  padding: 0px;
`;

interface MenuProps extends Omit<PopoverProps, 'active' | 'spacing'> {
  /**
   * A slot for the element used to trigger the Menu. Passing a trigger allows
   * Menu to control opening and closing itself internally.
   */
  trigger?: React.ReactElement | Function;

  /**
   * Determines the open state of the menu
   *
   * default: `false`
   */
  open?: boolean;

  /**
   * Callback to change the open state of the Menu.
   *
   */
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Distance between the content rendered inside of the Menu and the trigger
   *
   */
  spacing?: number;

  /**
   * Callback to determine whether or not Menu should close when user tries to close it.
   *
   */
  shouldClose?: () => boolean;
}

/**
 * # Menu
 *
 * Menu component
 *
 * ```
<button>
  <Menu open={true}>
    <MenuItem>Hello World!</MenuItem>
  </Menu>
</button>
```
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
 */
function Menu({
  align = Align.Bottom,
  justify = Justify.End,
  usePortal = true,
  adjustOnMutation = false,
  shouldClose = () => true,
  spacing,
  open: controlledOpen,
  setOpen: controlledSetOpen,
  children,
  className,
  refEl,
  trigger,
  ...rest
}: MenuProps) {
  const refs: Array<HTMLElement> = [];
  const titleArr: Array<string> = [];

  const hasSetInitialFocus = useRef(false);
  const hasSetInitialOpen = useRef(false);
  const [focused, setFocused] = useState<HTMLElement>(refs[0] || null);

  const [, setClosed] = useState(false);
  const [currentSubMenu, setCurrentSubMenu] = useState<React.ReactElement<
    HTMLLIElement
  > | null>(null);
  const [uncontrolledOpen, uncontrolledSetOpen] = useState(false);

  const setOpen =
    (typeof controlledOpen === 'boolean' && controlledSetOpen) ||
    uncontrolledSetOpen;
  const open = controlledOpen ?? uncontrolledOpen;

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

      const onFocus = ({ target }: { target: HTMLElement }) => {
        setFocused(target);
      };

      if (isComponentType<'SubMenu'>(child, 'SubMenu') && title) {
        if (titleArr.includes(title)) {
          throw new Error('SubMenu titles must be unique');
        }

        titleArr.push(title);

        if (props.active && !hasSetInitialOpen.current) {
          setCurrentSubMenu(child);
          hasSetInitialOpen.current = true;
        }

        const isCurrentSubMenu = currentSubMenu?.props.title === title;

        return React.cloneElement(child, {
          ref: setRef,
          open: isCurrentSubMenu,
          setOpen: (state: boolean) => {
            if (currentChildRef) {
              setFocused(currentChildRef);
            }

            setCurrentSubMenu(state ? child : null);
          },
          onKeyDown: (e: KeyboardEvent) => {
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

      if (
        isComponentType<'MenuItem'>(child, 'MenuItem') ||
        isComponentType<'FocusableMenuItem'>(child, 'FocusableMenuItem')
      ) {
        return React.cloneElement(child, {
          ref: setRef,
          onFocus,
        });
      }

      if (props?.children) {
        return React.cloneElement(child, {
          children: updateChildren(props.children),
        });
      }

      return child;
    });
  }

  // When a SubMenu becomes open, it's set to currentSubMenu, and we focus on the first child.
  useEffect(() => {
    const focusedRefIndex = refs.indexOf(focused);

    if (!currentSubMenu) {
      if (focusedRefIndex !== -1) {
        const subMenu = refs[focusedRefIndex];
        subMenu.focus();
      }
    } else {
      if (focusedRefIndex !== -1) {
        const subMenuFirstChild = refs[focusedRefIndex + 1];
        subMenuFirstChild?.focus();
      }
    }
  }, [currentSubMenu]);

  const updatedChildren = React.useMemo(() => {
    if (
      children == null ||
      ['boolean', 'number', 'string'].includes(typeof children)
    ) {
      return;
    }

    return updateChildren(children);
  }, [children, focused, currentSubMenu, open, refs]);

  const popoverRef: React.RefObject<HTMLUListElement> = useRef(null);

  const setFocus = (el: HTMLElement) => {
    if (el == null) {
      return;
    }

    setFocused(el);
    el.focus();
  };

  useMemo(() => {
    if (open === true) {
      hasSetInitialFocus.current = false;
      hasSetInitialOpen.current = false;
    }
  }, [open]);

  const handleClose = () => {
    if (shouldClose()) {
      setOpen(false);
    }
  };

  const handleBackdropClick = (e: MouseEvent) => {
    const popoverReference = popoverRef && popoverRef.current;

    if (
      popoverReference &&
      !popoverReference.contains(e.target as HTMLElement)
    ) {
      handleClose();
    }
  };

  useEventListener('click', handleBackdropClick, {
    enabled: open,
  });

  function trapLastMenuItem(refs: Array<HTMLElement>) {
    if (document.activeElement === refs[refs.length - 1]) {
      return true;
    }

    return false;
  }

  function trapFirstMenuItem() {
    const filteredRefs = refs.filter(ref => ref !== null);

    if (document.activeElement === filteredRefs[0]) {
      return true;
    }

    return false;
  }

  function handleKeyDown(e: KeyboardEvent) {
    const filteredRefs = refs.filter(ref => ref !== null);
    let refToFocus: HTMLElement;

    switch (e.keyCode) {
      case keyMap.ArrowDown:
        refToFocus = refs[(refs.indexOf(focused!) + 1) % refs.length];
        setFocus(refToFocus);
        break;

      case keyMap.ArrowUp:
        refToFocus =
          refs[(refs.indexOf(focused!) - 1 + refs.length) % refs.length];
        setFocus(refToFocus);
        break;

      case keyMap.Tab:
        if (!e.shiftKey && trapLastMenuItem(filteredRefs)) {
          e.preventDefault();
          setFocus(refs[0]);
        }

        if (e.shiftKey && trapFirstMenuItem()) {
          e.preventDefault();
          setFocus(filteredRefs[filteredRefs.length - 1]);
        }

        break;

      case keyMap.Escape:
        handleClose();
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

  const popoverContent = (
    <Popover
      key="popover"
      active={open}
      align={align}
      justify={justify}
      refEl={refEl}
      usePortal={usePortal}
      spacing={spacing}
      adjustOnMutation={adjustOnMutation}
    >
      {/* Need to stop propagation, otherwise Menu will closed automatically when clicked */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events*/}
      <ul
        {...rest}
        className={cx(rootMenuStyle, className)}
        role="menu"
        ref={popoverRef}
        onClick={e => e.stopPropagation()}
      >
        {updatedChildren}
      </ul>
    </Popover>
  );

  if (trigger) {
    if (typeof trigger === 'function') {
      return trigger({
        onClick: () => setOpen((curr: boolean) => !curr),
        children: popoverContent,
      });
    }

    const { children: triggerChildren } = trigger.props;

    return React.cloneElement(trigger, {
      onClick: (e: React.MouseEvent) => {
        setOpen((curr: boolean) => !curr);

        if (trigger.props.onClick) {
          trigger.props.onClick(e);
        }
      },
      children: triggerChildren
        ? [
            ...(triggerChildren instanceof Array
              ? triggerChildren
              : [triggerChildren]),
            popoverContent,
          ]
        : popoverContent,
    });
  }

  return popoverContent;
}

Menu.displayName = 'Menu';

// __TARGET__ is a global variable that indicates the webpack build target.
//
// We're typing this here because doing it globally was proving problematic.
// We should solve for this if we need to use __TARGET__ elsewhere.
declare const __TARGET__: 'web' | 'node';

Menu.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  align: PropTypes.oneOf(Object.values(Align)),
  justify: PropTypes.oneOf(Object.values(Justify)),
  refEl: PropTypes.shape({
    current:
      __TARGET__ === 'web' ? PropTypes.instanceOf(Element) : PropTypes.any,
  }),
  usePortal: PropTypes.bool,
  trigger: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default Menu;
