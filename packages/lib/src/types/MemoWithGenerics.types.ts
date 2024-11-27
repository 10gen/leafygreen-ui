import { ReactElement } from 'react';

/**
 * Type signature that enhances React.memo to support generics more effectively. This type signature preserves type inference for the props, instead of defaulting to `unknown`.
 *
 * React.memo returns a function, but it adds properties like displayName and some internal React properties. Because of this TypeScript no longer sees it as a pure function with a single call signature, and inference fails for generic parameters.
 *
 * This removes the public properties `propTypes` and `displayName`.
 *
 * You can still use `propTypes` but you have to silence the TS error with `@ts-expect-error`.
 *
 * `displayName` can be replaced by a named function.
 *
 * E.g.
 *
 * ```
 * const memoWithGenerics: MemoWithGenerics = React.memo;
 *
 * export const MemoizedRow = memoWithGenerics(Row, (prevProps, nextProps) => {})
 *
 * // @ts-expect-error
 * MemoizedRow.propTypes = {};
 * ```
 */

export interface MemoWithGenerics {
  <P extends object>(
    Component: (props: P) => ReactElement | null,
    propsAreEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean,
  ): (props: P) => ReactElement | null;
}
