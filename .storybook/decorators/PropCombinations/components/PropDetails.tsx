import React from 'react';
import { cx } from '@leafygreen-ui/emotion';
import { PropsWithChildren } from 'react';
import {
  combinationStyles,
  combinationStylesDarkModeProp,
} from '../PropCombinations.styles';

export function PropDetailsComponent({
  children,
  propName,
  val,
}: PropsWithChildren<{
  propName: string;
  val: any;
}>) {
  const isDarkModeProp = propName === 'darkMode';
  const Wrapper = isDarkModeProp ? 'table' : React.Fragment;

  const wrapperProps = {
    id: `${propName}-${val}`,
    className: cx(combinationStyles, {
      [combinationStylesDarkModeProp]: isDarkModeProp,
    }),
  };

  return <Wrapper {...wrapperProps}>{children}</Wrapper>;
}
