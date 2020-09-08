import React, { useRef, useEffect, useCallback, SetStateAction } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { Variant } from '.';

const colorVariant = {
  default: {
    listTitleColor: css`
      color: ${uiColors.gray.dark1};
    `,
    listTitleStates: css`
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
    `,
  },

  light: {
    listTitleColor: css`
      color: ${uiColors.gray.light1};
    `,
    listTitleStates: css`
      &:focus {
        outline: none;
        color: #43b1e5;
      }

      &:hover {
        cursor: pointer;
      }

      &:hover:not(:focus) {
        color: ${uiColors.white};
      }
    `,
  },
};

const listTitle = css`
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

interface BaseTabProps {
  ariaControl: string;
  setFocusedState: React.Dispatch<SetStateAction<Array<number>>>;
  variant: Variant;
  index: number;
  selected?: boolean;
  href?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const TabTitle: ExtendableBox<BaseTabProps, 'button'> = ({
  selected,
  children,
  className,
  disabled,
  ariaControl,
  setFocusedState,
  index,
  variant,
  ...rest
}: BaseTabProps) => {
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

  const sharedTabProps = {
    ref: titleRef,
    className: cx(
      listTitle,
      colorVariant[variant].listTitleColor,
      { [colorVariant[variant].listTitleStates]: !disabled },
      className,
    ),
    role: 'tab',
    ['aria-controls']: ariaControl,
    ['aria-selected']: selected,
    ['aria-disabled']: disabled,
    tabIndex: selected ? 0 : -1,
    onBlur: onBlur,
    onFocus: onFocus,
    ...rest,
  };

  if (typeof rest.href === 'string') {
    <Box as="a" {...sharedTabProps}>
      {children}
    </Box>;
  }

  return <Box {...sharedTabProps}>{children}</Box>;
};

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
