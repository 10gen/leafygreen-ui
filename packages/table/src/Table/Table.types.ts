import { DarkModeProps, HTMLElementProps, LgIdProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { LeafyGreenTable, LGRowData } from '../useLeafyGreenTable';
import { LeafyGreenVirtualTable } from '../useLeafyGreenVirtualTable/useLeafyGreenVirtualTable.types';

export interface TableProps<T extends LGRowData>
  extends HTMLElementProps<'table'>,
    DarkModeProps,
    LgIdProps {
  /**
   * Determines whether alternating rows will have dark backgrounds.
   * @default false
   */
  shouldAlternateRowColor?: boolean;

  /**
   * The base font size of the title and text rendered in children.
   * @default 13
   */
  baseFontSize?: BaseFontSize;

  /**
   * The `useLeafyGreenTable` or `useLeafyGreenVirtualTable` return value
   */
  table?: LeafyGreenTable<T> | LeafyGreenVirtualTable<T>;

  /**
   * Whether all rows will truncate. If true, cells will truncate at one line. If false then there will be no height limit and cells will not truncate.
   * @default true
   */
  shouldTruncate?: boolean;
}
