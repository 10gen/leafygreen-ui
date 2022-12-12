import React from 'react';

import RefreshIcon from '@leafygreen-ui/icon/dist/Refresh';
import { InputOption } from '@leafygreen-ui/internal-input-option';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';

import { loadingOptionIcon, loadingOptionStyles } from './LoadingOption.styles';

export const LoadingOption = () => {
  const { darkMode } = useDarkMode();

  return (
    <InputOption aria-label="Loading results" className={loadingOptionStyles}>
      <RefreshIcon
        color={darkMode ? palette.blue.light1 : palette.blue.base}
        className={loadingOptionIcon}
      />
      <span>Loading results</span>
    </InputOption>
  );
};
