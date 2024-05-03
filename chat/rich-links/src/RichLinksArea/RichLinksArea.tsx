import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import LeafygreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { RichLink } from '..';

import { baseStyles } from './RichLinksArea.styles';
import { type RichLinksAreaProps } from './RichLinksArea.types';

export function RichLinksArea({
  links,
  darkMode: darkModeProp,
  ...props
}: RichLinksAreaProps) {
  const { darkMode } = useDarkMode(darkModeProp);
  console.log('RichLinksArea -> links', links);
  return (
    <LeafygreenProvider darkMode={darkMode}>
      <div className={cx(baseStyles)} {...props}>
        {links.map(richLinkProps => {
          console.log('RichLinksArea -> richLinkProps', richLinkProps);
          return <RichLink key={richLinkProps.href} {...richLinkProps} />;
        })}
      </div>
    </LeafygreenProvider>
  );
}

RichLinksArea.displayName = 'RichLinksArea';
