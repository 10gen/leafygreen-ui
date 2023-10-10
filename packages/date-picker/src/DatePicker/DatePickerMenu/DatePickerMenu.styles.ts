import { css } from '@leafygreen-ui/emotion';
import { contentClassName } from '@leafygreen-ui/popover';
import { spacing } from '@leafygreen-ui/tokens';

export const menuWrapperStyles = css`
  width: 266px; // width of "September" select trigger

  & > .${contentClassName} {
    width: 100%;
  }
`;

export const menuContentStyles = css`
  display: grid;
  grid-auto-flow: row;
  grid-template-areas: 'header' 'calendar';
  align-items: center;
`;

export const menuHeaderStyles = css`
  grid-area: header;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom: ${spacing[3]}px;
  z-index: 1;
`;

export const menuHeaderSelectContainerStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[1]}px;
`;

export const menuCalendarGridStyles = css`
  grid-area: calendar;
  margin: auto;
`;

// Hardcoding the width
export const selectInputWidthStyles = css`
  width: 68.5px;
`;
