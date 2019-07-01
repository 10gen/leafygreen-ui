import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

interface TabTitleProps {
  active: boolean;
  children: Array<React.ReactElement>;
  disabled?: boolean;
  className?: string;
  id?: string;
  dataTabId: string;
  onClick?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  ariaControls?: string;
}

function TabTitle({
  active,
  children,
  disabled,
  className,
  id,
  dataTabId,
  onClick,
  onKeyDown,
  ariaControls,
  setFocusedState,
  ...rest
}: TabTitleProps) {
  const titleRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (titleRef && titleRef.current && active && !disabled) {
      titleRef.current.focus();
    }

  });

  return (
    <li
      {...rest}
      ref={titleRef}
      className={className}
      id={id}
      role="tab"
      data-tab-id={dataTabId}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-controls={ariaControls}
      aria-selected={active}
      aria-disabled={disabled}
      tabIndex={active ? 0 : -1}
    >
      {children}
    </li>
  );
}

TabTitle.displayName = 'TabTitle';

TabTitle.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
  dataTabId: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  ariaControls: PropTypes.string,
};

export default TabTitle;
