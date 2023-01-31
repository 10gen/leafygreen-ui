import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import ChevronLeft from '@leafygreen-ui/icon/dist/ChevronLeft';
import ChevronRight from '@leafygreen-ui/icon/dist/ChevronRight';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Option, Select } from '@leafygreen-ui/select';
import { Body } from '@leafygreen-ui/typography';

import { baseStyles, flexSectionStyles } from './Pagination.styles';
import { PaginationProps } from './Pagination.types';

const DEFAULT_ITEMS_PER_PAGE_OPTIONS = [10, 25, 50];

function Pagination({
  id: idProp,
  className,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE_OPTIONS[0],
  itemsPerPageOptions = DEFAULT_ITEMS_PER_PAGE_OPTIONS,
  onItemsPerPageOptionChange,
  currentPage = 1,
  onCurrentPageOptionChange,
  numTotalItems,
  onBackArrowClick,
  onForwardArrowClick,
  darkMode: darkModeProp,
  ...rest
}: PaginationProps) {
  const { darkMode } = useDarkMode(darkModeProp);
  const itemsPerPageLabelId = useIdAllocator({
    prefix: 'lg-pagination-items-per-page-label',
    id: idProp,
  });
  const itemsPerPageSelectId = useIdAllocator({
    prefix: 'lg-pagination-items-per-page-select',
    id: idProp,
  });

  const getCurrentRangeString = () => {
    return `${itemsPerPage * (currentPage - 1) + 1} - ${Math.min(
      itemsPerPage * currentPage,
      numTotalItems ?? itemsPerPage * currentPage,
    )}`;
  };

  const getRangeMaxString = () => {
    return numTotalItems ? `${numTotalItems} items` : 'many';
  };

  const getTotalNumPages = (numItems: number) => {
    return Math.ceil(numItems / itemsPerPage);
  };

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <div className={cx(baseStyles, className)} {...rest}>
        <div className={flexSectionStyles}>
          {onItemsPerPageOptionChange !== undefined && (
            <>
              <Body
                as="label"
                id={itemsPerPageLabelId}
                htmlFor={itemsPerPageSelectId}
              >
                Items per page:
              </Body>
              <Select
                onChange={onItemsPerPageOptionChange}
                aria-labelledby={itemsPerPageLabelId}
                value={String(itemsPerPage)}
                id={itemsPerPageSelectId}
                allowDeselect={false}
                size="xsmall"
              >
                {itemsPerPageOptions.map((option: number) => (
                  <Option key={option} value={String(option)}>
                    {option}
                  </Option>
                ))}
              </Select>
            </>
          )}
        </div>
        <div className={flexSectionStyles}>
          <Body data-testid="lg-pagination-item-range">
            {getCurrentRangeString()} of {getRangeMaxString()}
          </Body>
        </div>
        <div className={flexSectionStyles}>
          {onCurrentPageOptionChange !== undefined && numTotalItems ? (
            <>
              {/* @ts-expect-error no label element */}
              <Select
                onChange={onCurrentPageOptionChange}
                aria-label="Set current page"
                value={String(currentPage)}
                allowDeselect={false}
                size="xsmall"
                data-testid="lg-pagination-page-select"
              >
                {Array.from(Array(getTotalNumPages(numTotalItems)).keys()).map(
                  (pageIndex: number) => {
                    return (
                      <Option key={pageIndex} value={String(pageIndex + 1)}>
                        {pageIndex + 1}
                      </Option>
                    );
                  },
                )}
              </Select>
              <Body>of {getTotalNumPages(numTotalItems)}</Body>
            </>
          ) : (
            <Body data-testid="lg-pagination-page-range">
              {currentPage} of{' '}
              {numTotalItems ? getTotalNumPages(numTotalItems) : 'many'}
            </Body>
          )}
          {(1 < currentPage || numTotalItems === undefined) && (
            <IconButton aria-label="Previous page" onClick={onBackArrowClick}>
              <ChevronLeft />
            </IconButton>
          )}
          {(numTotalItems === undefined ||
            currentPage < getTotalNumPages(numTotalItems)) && (
            <IconButton aria-label="Next page" onClick={onForwardArrowClick}>
              <ChevronRight />
            </IconButton>
          )}
        </div>
      </div>
    </LeafyGreenProvider>
  );
}

Pagination.displayName = 'Pagination';

export default Pagination;
