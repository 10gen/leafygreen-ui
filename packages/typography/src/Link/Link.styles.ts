import { css } from '@leafygreen-ui/emotion';

import { anchorClassName } from '../SharedLink/SharedLink.styles';

export const arrowRightIconPersist = css`
  transform: translate3d(3px, 0, 0);
`;

export const arrowRightIconHover = css`
  opacity: 0;
  transform: translate3d(-3px, 0, 0);
  transition: all 100ms ease-in;

  .${anchorClassName}:hover & {
    opacity: 1;
    transform: translate3d(3px, 0, 0);
  }
`;

export const openInNewTabStyles = css`
  position: relative;
  bottom: 4px;
  left: -1px;
  height: 12px;
`;
