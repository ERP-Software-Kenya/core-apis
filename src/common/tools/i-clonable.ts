/**
 * @description The resulting clone must be of the same type as, or compatible with, the original instance. An implementation of Clone can perform either a deep copy or a shallow copy.
 */
export interface IClonable<T> {
  /**
   * @description Creates a new object that is a copy of the current instance.
   */
  clone(): T;
}
