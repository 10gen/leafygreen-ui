import React, { ForwardedRef, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { LGIDS } from '../constants';
import { TableContextProvider } from '../TableContext';
import { LGRowData } from '../useLeafyGreenTable';
import { LeafyGreenVirtualTable } from '../useLeafyGreenVirtualTable/useLeafyGreenVirtualTable.types';

import { getTableContainerStyles, getTableStyles } from './Table.styles';
import { TableProps } from './Table.types';

// Inferred generic type from component gets used in place of `any`
const Table = forwardRef<HTMLDivElement, TableProps<any>>(
  <T extends LGRowData>(
    {
      table,
      children,
      className,
      verticalAlignment = 'top',
      shouldAlternateRowColor = false,
      shouldTruncate = true,
      baseFontSize: baseFontSizeProp,
      darkMode: darkModeProp,
      'data-lgid': lgidProp = LGIDS.root,
      ...rest
    }: TableProps<T>,
    containerRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const baseFontSize: BaseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
    const { theme, darkMode } = useDarkMode(darkModeProp);

    const isVirtual =
      table && (table as LeafyGreenVirtualTable<T>).virtual ? true : false;
    const virtualTable = isVirtual
      ? (table as LeafyGreenVirtualTable<T>)!.virtual
      : undefined;
    const isSelectable = table ? table.hasSelectableRows : false;

    return (
      <div
        ref={containerRef}
        className={cx(getTableContainerStyles(isVirtual), className)}
        // allow select by keyboard to allow scroll by keyboard
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        <TableContextProvider
          shouldAlternateRowColor={shouldAlternateRowColor}
          darkMode={darkMode}
          isVirtual={isVirtual}
          isSelectable={isSelectable}
          shouldTruncate={shouldTruncate}
          virtualTable={virtualTable}
          verticalAlignment={verticalAlignment}
        >
          <table
            className={getTableStyles(theme, baseFontSize)}
            data-lgid={lgidProp}
            {...rest}
          >
            {children}
          </table>
        </TableContextProvider>
      </div>
    );
  },
);

// TODO: proptypes
Table.propTypes = {
  darkMode: PropTypes.bool,
  baseFontSize: PropTypes.oneOf(Object.values(BaseFontSize)),
  shouldAlternateRowColor: PropTypes.bool,
};

Table.displayName = 'Table';

export default Table;
