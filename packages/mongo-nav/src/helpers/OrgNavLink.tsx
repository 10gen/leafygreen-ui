import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { textLoadingStyle, anchorOverrides } from '../styles';

const orgNavAnchorOverrides = css`
  a:visited,
  a:active,
  a:link {
    color: ${uiColors.gray.dark3};
  }
`;

const linkText = css`
  text-decoration: none;
  color: ${uiColors.gray.dark3};
  padding: 4px;

  span {
    position: relative;

    &:after {
      content: '';
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      opacity: 0;
      transform: scale(0.8, 1);
      transition: 150ms ease-in-out;
      height: 3px;
      border-radius: 50px;
    }
  }

  &:hover {
    span:after {
      opacity: 1;
      transform: scale(1);
      background-color: ${uiColors.gray.light2};
    }
  }
`;

const activeLink = css`
  font-weight: bold;
  color: ${uiColors.green.base};

  &:hover {
    span:after {
      background-color: ${uiColors.green.light2};
    }
  }
`;

const navItemFocusStyle = css`
  &:focus {
    outline: none;
    color: ${uiColors.blue.base};

    span:after {
      background-color: #9dd0e7;
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const displayFlex = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const resetButtonStyles = css`
  border: none;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

interface OrgNavLinkProps {
  isActive?: boolean;
  href?: string;
  children?: React.ReactNode;
  className?: string;
  loading?: boolean;
  withIcon?: boolean;
  onClick?: React.MouseEventHandler;
}

function OrgNavLink({
  isActive = false,
  loading = false,
  href,
  children,
  className,
  withIcon,
  ...rest
}: OrgNavLinkProps) {
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();

  const Component = href ? 'a' : 'button';

  return (
    <Component
      href={href}
      aria-disabled={loading}
      className={cx(
        resetButtonStyles,
        anchorOverrides,
        orgNavAnchorOverrides,
        linkText,
        {
          [activeLink]: isActive,
          [navItemFocusStyle]: showFocus,
          [textLoadingStyle]: loading,
        },
        className,
      )}
      {...rest}
    >
      <span
        className={cx(
          css`
            position: relative;
          `,
          {
            [displayFlex]: withIcon,
          },
        )}
      >
        {children}
      </span>
    </Component>
  );
}

export default OrgNavLink;
