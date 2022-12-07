import { prefersReducedMotion } from '@leafygreen-ui/a11y';
import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';
import { getIndentLevelStyle, sideNavItemSidePadding } from '../SideNav/styles';

export const buttonClassName = createUniqueClassName('side-nav-group-button');

export const listItemStyle = css`
  display: flex;
  flex-direction: column;
  position: relative;

  & ~ & > .${buttonClassName} {
    padding: ${spacing[3]}px ${sideNavItemSidePadding}px ${spacing[2]}px
      ${sideNavItemSidePadding}px;
  }
`;

export const baseStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0;
  margin-bottom: 0;
  padding: ${spacing[3]}px ${spacing[3]}px ${spacing[2]}px;
`;

export const themeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.green.dark2};
  `,
  [Theme.Dark]: css`
    color: ${palette.green.light1};
  `,
};

export const collapsibleBaseStyle = css`
  background-color: transparent;
  border: none;
  margin: 0px;
  transition: ${transitionDuration.faster}ms ease-in-out;
  transition-property: border-color, background-color, color;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const collapsibleThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    border-bottom: 1px solid ${palette.gray.light2};

    &:hover {
      background-color: ${palette.gray.light2};
      border-color: ${palette.green.dark1};
    }
  `,
  [Theme.Dark]: css`
    border-bottom: 1px solid ${palette.gray.dark1};

    &:hover {
      background-color: ${palette.gray.dark3};
      border-color: ${palette.green.base};
    }
  `,
};

export const collapsibleFocusStyle = css`
  &:focus {
    color: ${palette.blue.dark3};
    border-color: ${palette.blue.light1};
    background-color: ${palette.blue.light2};

    & svg {
      color: ${palette.blue.base};
    }
  }
`;

export const expandIconStyle = css`
  transition: ${transitionDuration.default}ms all ease-in-out;
  margin-left: ${spacing[2]}px;

  ${prefersReducedMotion(`
    transition: none;
  `)}
`;

export const openExpandIconStyle = css`
  transform: rotate(90deg);
`;

export const collapsibleGroupBaseStyles = css`
  max-height: 0;
  overflow: hidden;
  opacity: 1;
  transition: ${transitionDuration.default}ms ease-in-out;
  transition-property: opacity, max-height;

  ${prefersReducedMotion(`
    transition: opacity ${transitionDuration.default}ms ease-in-out;
  `)}
`;

export const transitionStyles = {
  entering: css`
    opacity: 0;
  `,
  entered: '',
  exiting: css`
    opacity: 0;
  `,
  exited: css`
    opacity: 0;
  `,
  unmounted: undefined,
};

export const indentedStyle = (indentLevel: number, darkMode: boolean) =>
  cx(
    getIndentLevelStyle(indentLevel, darkMode),
    css`
      padding-top: 16px;
      padding-bottom: 8px;
    `,
  );
