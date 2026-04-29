/**
 * @description Exposes a method that compares two objects.
 */
export interface IComparer<T, TOther = T> {
  /**
   * @description Compares two objects and returns a value indicating whether one is less than, equal to, or greater than the other.
   * @param x The object to compare
   * @param y The object to compare
   */
  compare(x: T, y: TOther): number;
}
