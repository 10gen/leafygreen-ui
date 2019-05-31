import React, { useState, useCallback, EventHandler } from 'react';
import PropTypes from 'prop-types';
import Popover, { Align, Justify, PopoverProps } from '@leafygreen-ui/popover';
import { useDocumentEventListener } from './hooks';
import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';
import { cx } from 'emotion';

const { css } = emotion;

const rootMenuStyle = css`
  width: 200px;
  border-radius: 3px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  background-color: ${colors.mongodb.white};
`;

type ExcludeProps = Exclude<keyof PopoverProps, 'spacing'>;

type MenuTypes = Pick<PopoverProps, ExcludeProps>;

// type MenuTypes = Omit<PopoverProps, "spacing">

interface MenuProps extends MenuTypes {
  /**
   * A slot for the element used to trigger the Menu. Passing a trigger allows
   * Menu to control opening and closing itself internally.
   */
  trigger?: React.ReactElement;
}

/**
 * # Menu
 *
 * Menu component
 *
 * ```
<button>
  <Menu active={true}>
    <MenuItem>Hello World!</MenuItem>
  </Menu>
</button>
 * ```
 * @param props.children Content to appear inside of Menu.
 * @param props.active Boolean to describe whether or not Menu is active.
 * @param props.className Classname applied to Menu.
 * @param props.align Alignment of Menu relative to another element: `top`, `bottom`, `left`, `right`.
 * @param props.justify Justification of Menu relative to another element: `start`, `middle`, `end`.
 * @param props.refEl Reference element that Menu should be positioned against.
 * @param props.usePortal Boolean to describe if content should be portaled to end of DOM, or appear in DOM tree.
 * @param props.trigger Trigger element to set active state of Menu, makes component controlled
 */
function Menu({
  align = Align.Bottom,
  justify = Justify.End,
  usePortal = true,
  active,
  children,
  className,
  refEl,
  trigger,
  ...rest
}: MenuProps) {
  const [isActive, setActiveState] = useState(false);

  const popoverContent = (
    <Popover
      key="popover"
      active={trigger ? isActive : active}
      align={align}
      justify={justify}
      refEl={refEl}
      usePortal={usePortal}
      spacing={15}
    >
      <div {...rest} className={cx(rootMenuStyle, className)} role="menu">
        {children}
      </div>
    </Popover>
  );

  let triggerElement: React.ReactNode = null;

  const syntheticToggleEventHandler: EventHandler<
    React.SyntheticEvent
  > = useCallback(
    e => {
      e.nativeEvent.stopImmediatePropagation();
      setActiveState(!isActive);
    },
    [isActive],
  );

  const nativeToggleEventHandler = (e: Event) => {
    e.stopImmediatePropagation();
    setActiveState(!isActive);
  };

  const handleEscape = (e: KeyboardEvent) => {
    e.keyCode === 27 && nativeToggleEventHandler(e);
  };

  let enabled = false;

  if (trigger && isActive) {
    enabled = true;
  }

  useDocumentEventListener(
    enabled,
    'click',
    nativeToggleEventHandler,
    { once: true },
    [isActive, trigger],
  );

  useDocumentEventListener(enabled, 'keydown', handleEscape, { once: true }, [
    isActive,
    trigger,
  ]);

  if (trigger) {
    triggerElement = React.cloneElement(trigger, {
      onClick: syntheticToggleEventHandler,
      children: [...trigger.props.children, popoverContent],
    });
  }

  return triggerElement || popoverContent;
}

Menu.displayName = 'Menu';

Menu.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
  className: PropTypes.string,
  align: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  justify: PropTypes.oneOf(['start', 'middle', 'end']),
  refEl: PropTypes.object,
  usePortal: PropTypes.bool,
  trigger: PropTypes.node,
};

export default Menu;
