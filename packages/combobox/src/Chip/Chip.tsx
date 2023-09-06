import React, { useContext, useEffect } from 'react';

import { Chip as LGChip } from '@leafygreen-ui/chip';
import { useForwardedRef } from '@leafygreen-ui/hooks';
import { keyMap } from '@leafygreen-ui/lib';

import { ChipProps, Overflow } from '../Combobox.types';
import { ComboboxContext } from '../ComboboxContext';

import { chipSizeStyles } from './Chip.styles';

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ displayName, isFocused, onRemove, onFocus }: ChipProps, forwardedRef) => {
    const {
      disabled,
      overflow,
      chipTruncationLocation = 'end',
      chipCharacterLimit = 12,
      popoverZIndex,
      size,
    } = useContext(ComboboxContext);

    const updatedChipTruncationLocation =
      overflow === Overflow.scrollX ? 'none' : chipTruncationLocation;

    const chipRef = useForwardedRef(forwardedRef, null);
    const buttonRef = chipRef.current?.querySelector('button');

    useEffect(() => {
      if (isFocused && !disabled) {
        buttonRef?.focus();
      }
    }, [disabled, buttonRef, isFocused]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (
        !disabled &&
        (e.keyCode === keyMap.Delete ||
          e.keyCode === keyMap.Backspace ||
          e.keyCode === keyMap.Enter ||
          e.keyCode === keyMap.Space)
      ) {
        onRemove();
      }
    };

    const handleChipClick = (e: React.MouseEvent) => {
      // Did not click button
      if (!buttonRef?.contains(e.target as Node)) {
        onFocus();
      }
    };

    const handleButtonClick = () => {
      if (!disabled) {
        onRemove();
      }
    };

    return (
      <LGChip
        label={displayName}
        className={chipSizeStyles[size]}
        role="option"
        aria-selected={isFocused}
        data-testid="lg-combobox-chip"
        onClick={handleChipClick}
        onKeyDown={handleKeyDown}
        onDismiss={handleButtonClick}
        size="default" //TODO: use var
        chipCharacterLimit={chipCharacterLimit}
        chipTruncationLocation={updatedChipTruncationLocation}
        popoverZIndex={popoverZIndex}
        variant="gray"
        ref={chipRef}
        disabled={disabled}
        tabIndex={-1}
      />
    );
  },
);
Chip.displayName = 'Chip';
