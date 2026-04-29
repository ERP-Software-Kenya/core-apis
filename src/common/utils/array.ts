import {
  difference as baseDifference,
  differenceWith,
  intersectionWith,
  intersection as baseIntersection,
  Comparator,
  reverse as mutReverse,
  slice,
  union as baseUnion,
  unionWith,
  uniq as baseUniq,
  uniqBy,
  uniqWith,
  ValueIteratee,
  xor,
  xorWith,
} from "lodash";

export const reverse = <T>(array: T[]): T[] => mutReverse(slice(array));

export const unique = <T>(array: T[], selector?: ValueIteratee<T>): T[] => {
  if (selector == null) {
    return baseUniq(array);
  }
  return uniqBy(array, selector);
};

export const distinct = <T>(array: T[], comparator?: Comparator<T>): T[] => {
  if (comparator == null) {
    return baseUniq(array);
  }
  return uniqWith(array, comparator);
};

export const difference = <T>(array: T[], other: T[], comparator?: Comparator<T>): T[] => {
  if (comparator == null) {
    return baseDifference(array, other);
  }
  return differenceWith(array, other, comparator);
};

export const symmetricDiff = <T>(array: T[], other: T[], comparator?: Comparator<T>): T[] => {
  if (comparator == null) {
    return xor(array, other);
  }
  return xorWith(array, other, comparator);
};

export const intersection = <T>(array: T[], other: T[], comparator?: Comparator<T>): T[] => {
  if (comparator == null) {
    return baseIntersection(array, other);
  }
  return intersectionWith(array, other, comparator);
};

export const union = <T>(array: T[], other: T[], comparator?: Comparator<T>): T[] => {
  if (comparator == null) {
    return baseUnion(array, other);
  }
  return unionWith(array, other, comparator);
};

/**
 * Finds the first value from an array that is not null or undefined.
 *
 * @param array The array to search.
 * @returns The first value that is not null or undefined, or undefined if no such value is found.
 */
export const coalesce = <T>(...array: T[]): T | undefined => array.find((x) => x !== undefined && x !== null);
