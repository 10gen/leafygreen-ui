import type { Optional } from './Optional';
/**
 * Constructs a type consisting of all properties of type `T`,
 * with a subset set of properties `K` marked required.
 *
 * The inverse of `Optional`
 */
export type PartialRequired<T, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>;
