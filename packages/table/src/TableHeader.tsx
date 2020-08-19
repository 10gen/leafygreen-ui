import React from 'react';
import SortAscendingIcon from '@leafygreen-ui/icon/dist/SortAscending';
import SortDescendingIcon from '@leafygreen-ui/icon/dist/SortDescending';
import UnsortedIcon from '@leafygreen-ui/icon/dist/Unsorted';
import IconButton from '@leafygreen-ui/icon-button';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { commonCellStyles } from './styles';
import { useTableContext, TableActionTypes, DataType } from './TableContext';

const thStyle = css`
  width: 144px;
  border-width: 0px 1px 3px 1px;
  border-color: ${uiColors.gray.light2};
  border-style: solid;
`;

const flexDisplay = css`
  display: flex;
  justify-content: space-between;
`;

const labelStyle = css`
  display: flex;
  align-items: center;
  color: ${uiColors.gray.dark2};
  padding-right: 4px;
`;

const glyphColor = css`
  color: ${uiColors.blue.base};
`;

const glyphMap = {
  unsorted: UnsortedIcon,
  asc: SortAscendingIcon,
  desc: SortDescendingIcon,
} as const;

export function normalizeAccessor(accessor: string | Function) {
  let accessorFn = accessor;

  if (typeof accessor === 'string') {
    if (accessor.includes('.')) {
      const accessorArr = accessor.split('.');

      accessorFn = (data: any) => {
        return accessorArr.reduce((obj, access) => {
          return obj[access];
        }, data);
      };
    } else {
      accessorFn = (data: any) => data[accessor];
    }
  }

  return accessorFn as (data: string) => string;
}

interface TableHeaderInterface {
  label: React.ReactElement | string;
  onClick?: (colId: number, accessorValue: (data: any) => string) => void;
  index?: number;
  sortBy?: (data: any) => string | string;
  dataType?: DataType;
}

export type TableHeaderProps = Omit<
  React.ComponentPropsWithoutRef<'th'>,
  keyof TableHeaderInterface
> &
  TableHeaderInterface;

function TableHeader({
  label,
  onClick,
  index,
  className,
  dataType,
  sortBy,
  ...rest
}: TableHeaderProps) {
  const {
    state: { sort },
    dispatch,
  } = useTableContext();

  React.useEffect(() => {
    if (typeof index === 'number') {
      dispatch({
        type: TableActionTypes.RegisterColumn,
        payload: {
          // Offsetting 0-index
          index: index + 1,
          dataType,
        },
      });
    }
  }, []);

  const normalizedAccessor = sortBy && normalizeAccessor(sortBy);

  let glyph: 'unsorted' | 'asc' | 'desc';

  if (sort?.columnId === index) {
    glyph = sort?.direction ?? 'unsorted';
  } else {
    glyph = 'unsorted';
  }

  const Glyph = glyphMap[glyph];

  const sortRows = () => {
    if (typeof index === 'number' && normalizedAccessor) {
      dispatch({
        type: TableActionTypes.SortTableData,
        payload: {
          columnId: index,
          accessorValue: normalizedAccessor,
        },
      });
    }
  };

  return (
    <th {...rest} className={cx(thStyle, commonCellStyles, className)}>
      <div className={flexDisplay}>
        <span className={labelStyle}>{label}</span>
        {sortBy != null && (
          <IconButton
            aria-label="sort"
            onClick={sortRows}
            className={css`
              margin-bottom: 2px;
            `}
          >
            <Glyph
              size="small"
              title={`${glyph}-${index}`}
              className={cx({
                [glyphColor]: glyph === 'asc' || glyph === 'desc',
              })}
            />
          </IconButton>
        )}
      </div>
    </th>
  );
}

TableHeader.displayName = 'TableHeader';

export default TableHeader;
