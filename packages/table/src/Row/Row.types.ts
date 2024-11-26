import {
  ComponentPropsWithRef,
  ForwardedRef,
  PropsWithoutRef,
  ReactElement,
  RefAttributes,
  WeakValidationMap,
} from 'react';
import React from 'react';
import { VirtualItem, Virtualizer } from '@tanstack/react-virtual';

import { MemoWithGenerics, Theme } from '@leafygreen-ui/lib';

import { LeafyGreenTableRow, LGRowData } from '../useLeafyGreenTable';

export interface InternalRowBaseProps extends ComponentPropsWithRef<'tr'> {
  /**
   * Determines whether the row is disabled
   */
  disabled?: boolean;
}

export interface InternalRowWithoutRTProps extends InternalRowBaseProps {}

export interface InternalRowWithRTBaseProps<T extends LGRowData>
  extends InternalRowBaseProps {
  /**
   * Row object passed from the `useLeafyGreenTable` hook.
   */
  row: LeafyGreenTableRow<T>;
  /**
   * Virtual row object passed from the `useLeafyGreenVirtualTable` hook
   */
  virtualRow?: VirtualItem;
}

export interface InternalRowWithRTProps<T extends LGRowData>
  extends InternalRowWithRTBaseProps<T> {
  /**
   * Determines whether alternating rows will have dark backgrounds.
   * @default false
   */
  shouldAlternateRowColor: boolean;

  /**
   * Whether the theme is dark or light
   */
  theme: Theme;

  /**
   * Function from TanStack Virtual that is called to dynamically measure the size of an item
   */
  measureElement?: Virtualizer<HTMLElement, Element>['measureElement'];

  /**
   * Whether the row is expanded
   */
  isExpanded: boolean;

  /**
   * Whether the parent row is expanded
   */
  isParentExpanded: boolean;

  /**
   * Whether the row is selected
   */
  isSelected: boolean;
}

export type RowProps<T extends LGRowData> = InternalRowWithoutRTProps &
  Partial<InternalRowWithRTBaseProps<T>>;

// https://stackoverflow.com/a/58473012
// React.forwardRef can only work with plain function types.
// This is an interface that restores the original function signature to work with generics.
/**
 * The RowComponentType that restores the original function signature to work with generics.
 *
 * row is optional
 */
// export interface RowComponentType {
//   <T extends LGRowData>(
//     props: RowProps<T>,
//     ref: ForwardedRef<HTMLTableRowElement>,
//   ): ReactElement | null;
//   displayName?: string;
//   propTypes?:
//     | WeakValidationMap<
//         PropsWithoutRef<RowProps<LGRowData> & RefAttributes<any>>
//       >
//     | undefined;
// }

// /**
//  * The RowComponentType that restores the original function signature to work with generics.
//  *
//  *  row is required
//  */
// export interface RowComponentWithRTType {
//   <T extends LGRowData>(
//     props: InternalRowWithRTProps<T>,
//     ref: ForwardedRef<HTMLTableRowElement>,
//   ): ReactElement | null;
//   displayName?: string;
//   propTypes?:
//     | WeakValidationMap<
//         PropsWithoutRef<InternalRowWithRTProps<LGRowData> & RefAttributes<any>>
//       >
//     | undefined;
// }

// This removes propTypes and displayName
export interface ForwardRefWithGenerics {
  <T, P = NonNullable<unknown>>(
    render: (props: P, ref: React.ForwardedRef<T>) => ReactElement | null,
  ): (
    props: React.PropsWithoutRef<P> & React.RefAttributes<T>,
  ) => ReactElement | null;
}

export const forwardRefWithGenerics =
  React.forwardRef as ForwardRefWithGenerics;

export const memoWithGenerics = React.memo as MemoWithGenerics;
