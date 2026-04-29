/**
 * @description Defines methods to support the comparison of objects for equality.
 */
export interface IEqualityComparer<T, TOther = T> {
  /**
   * @description Determines whether the specified objects are equal.
   * @param x The object to compare
   * @param y The object to compare
   */
  equals(x: T, y: TOther): boolean;
}
