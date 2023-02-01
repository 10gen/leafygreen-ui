import { AccessibleIconButtonProps } from '@leafygreen-ui/icon-button';
import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { SelectProps } from '@leafygreen-ui/select';

interface PaginationProps extends HTMLElementProps<'div'>, DarkModeProps {
  /**
   * Number of items visible on the current page.
   */
  itemsPerPage?: number;

  /**
   * Options to be shown in the Select to indicate items per page.
   */
  itemsPerPageOptions?: Array<number>;

  /**
   * onChange prop passed to the Select component that controls the items per page.
   */
  onItemsPerPageOptionChange?: SelectProps['onChange'];

  /**
   * Current index of page shown (starting from 1)
   */
  currentPage?: number;

  /**
   * onChange prop passed to the Select component that controls the current page index.
   */
  onCurrentPageOptionChange?: SelectProps['onChange'];

  /**
   * Total number of records.
   */
  numTotalItems?: number;

  /**
   * Function called when the forward arrow icon is clicked
   */
  onForwardArrowClick: AccessibleIconButtonProps['onClick'];

  /**
   * Function called when the back arrow icon is clicked
   */
  onBackArrowClick: AccessibleIconButtonProps['onClick'];
}

export type { PaginationProps };
