import React, { useRef, useEffect, useCallback, SetStateAction } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { HTMLElementProps, createDataProp } from '@leafygreen-ui/lib';
import { TabProps } from '.';

export const tabTitleDataProp = createDataProp('tab-title-data-prop');

const listTitle = css`
  color: ${uiColors.gray.dark1};
  background-color: transparent;
  border: 0px;
  padding: 12px 16px;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: 150ms color ease-in-out;
  font-weight: bold;
  font-size: 16px;
`;

const listTitleStates = css`
  &:focus {
    outline: none;
    color: ${uiColors.blue.base};
  }

  &:hover {
    cursor: pointer;
  }

  &:hover:not(:focus) {
    color: ${uiColors.gray.dark3};
  }
`;

interface SharedTabTitleProps
  extends Omit<TabProps, 'default' | 'name' | 'href' | 'to' | 'value'> {
  setFocusedState: React.Dispatch<SetStateAction<Array<number>>>;
  as?: React.ElementType<any>;
}

interface LinkTabTitleProps extends HTMLElementProps<'a'>, SharedTabTitleProps {
  href: string;
}

interface ButtonTabTitleProps
  extends HTMLElementProps<'button'>,
    SharedTabTitleProps {
  href?: null;
}

type CustomElementButtonProps = SharedTabTitleProps & {
  as: React.ElementType<any>;
  [key: string]: any;
};

export type TabTitleProps =
  | LinkTabTitleProps
  | ButtonTabTitleProps
  | CustomElementButtonProps;

function usesCustomElement(
  props: TabTitleProps,
): props is CustomElementButtonProps {
  return (props as any).as != null;
}

function usesLinkElement(
  props: LinkTabTitleProps | ButtonTabTitleProps,
): props is LinkTabTitleProps {
  return props.href != null;
}

function TabTitle(props: TabTitleProps) {
  const {
    selected,
    children,
    className,
    disabled,
    onClick,
    ariaControl,
    setFocusedState,
    as,
    index,
    ...rest
  } = props;

  const titleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!disabled && selected && titleRef.current) {
      titleRef.current.focus();
    }
  }, [disabled, selected]);

  const onBlur = useCallback(() => {
    setFocusedState((curr: Array<number>) => curr.filter(el => index !== el));
  }, [index, setFocusedState]);

  const onFocus = useCallback(() => {
    setFocusedState((curr: Array<number>) => [...curr, index]);
  }, [index, setFocusedState]);

  const renderTabTitle = (Root: React.ElementType<any> = 'button') => (
    <Root
      {...tabTitleDataProp.prop}
      {...rest}
      ref={titleRef}
      className={cx(listTitle, { [listTitleStates]: !disabled }, className)}
      role="tab"
      onClick={onClick}
      aria-controls={ariaControl}
      aria-selected={selected}
      aria-disabled={disabled}
      tabIndex={selected ? 0 : -1}
      onBlur={onBlur}
      onFocus={onFocus}
    >
      {children}
    </Root>
  );

  if (usesCustomElement(props)) {
    return renderTabTitle(as);
  }

  if (usesLinkElement(props)) {
    return renderTabTitle('a');
  }

  return renderTabTitle();
}

TabTitle.displayName = 'TabTitle';

TabTitle.propTypes = {
  selected: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  ariaControl: PropTypes.string,
  as: PropTypes.string,
};

export default TabTitle;
