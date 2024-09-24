import React, { ForwardedRef, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import {
  bodyTypeScaleStyles,
  useUpdatedBaseFontSize,
} from '@leafygreen-ui/typography';

import { LGIDS } from '../constants';
import { TableContextProvider } from '../TableContext';
import { LGRowData } from '../useLeafyGreenTable';
import { LeafyGreenVirtualTable } from '../useLeafyGreenVirtualTable/useLeafyGreenVirtualTable.types';

import {
  baseStyles,
  getVirtualDynamicStyles,
  getVirtualStyles,
  tableContainerStyles,
  themeStyles,
} from './Table.styles';
import { TableProps } from './Table.types';

// Inferred generic type from component gets used in place of `any`
const Table = forwardRef<HTMLDivElement, TableProps<any>>(
  <T extends LGRowData>(
    {
      children,
      className,
      shouldAlternateRowColor = false,
      baseFontSize: baseFontSizeProp,
      darkMode: darkModeProp,
      table,
      disableAnimations = false,
      'data-lgid': lgidProp = LGIDS.root,
      ...rest
    }: TableProps<T>,
    containerRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const baseFontSize: BaseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
    const { theme, darkMode } = useDarkMode(darkModeProp);
    const isVirtual =
      table && (table as LeafyGreenVirtualTable<T>).virtual ? true : false;
    const virtualTable =
      isVirtual && (table as LeafyGreenVirtualTable<T>)!.virtual;
    const virtualTableTotalSize = virtualTable && virtualTable.getTotalSize();
    const virtualTableStart =
      (virtualTable && virtualTable.getVirtualItems()[0]?.start) ?? 0;

    return (
      <div
        ref={containerRef}
        className={cx(tableContainerStyles, className)}
        // allow select by keyboard to allow scroll by keyboard
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        <div
          className={getVirtualStyles(
            isVirtual,
            virtualTableTotalSize as number,
          )}
        >
          <div
            className={getVirtualDynamicStyles(
              isVirtual,
              virtualTableStart as number,
            )}
          >
            <TableContextProvider
              shouldAlternateRowColor={shouldAlternateRowColor}
              darkMode={darkMode}
              table={table}
              disableAnimations={disableAnimations}
              isVirtual={isVirtual}
            >
              <table
                className={cx(
                  baseStyles,
                  themeStyles[theme],
                  bodyTypeScaleStyles[baseFontSize],
                )}
                data-lgid={lgidProp}
                {...rest}
              >
                {children}
              </table>
            </TableContextProvider>
          </div>
        </div>
      </div>
    );
  },
);

Table.propTypes = {
  darkMode: PropTypes.bool,
  baseFontSize: PropTypes.oneOf(Object.values(BaseFontSize)),
  shouldAlternateRowColor: PropTypes.bool,
};

Table.displayName = 'Table';

export default Table;
