import React, { createContext, PropsWithChildren, useContext } from 'react';

import { SearchInputProps } from './types';

export interface SearchInputContextProps
  extends Pick<SearchInputProps, 'state'> {}

const SearchInputContext = createContext<SearchInputContextProps>({});

export function SearchInputContextProvider({
  children,
  ...props
}: PropsWithChildren<SearchInputContextProps>) {
  return (
    <SearchInputContext.Provider value={props}>
      {children}
    </SearchInputContext.Provider>
  );
}

export function useSearchInputContext() {
  return useContext(SearchInputContext);
}
