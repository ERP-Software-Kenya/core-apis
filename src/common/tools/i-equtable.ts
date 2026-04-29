/**
 * @description Defines a generalized method that a value type or class implements to create a type-specific method for determining equality of instances.
 */
export interface IEquatable<T> {
  /**
   * @description Determines whether the specified object is equal to the current object.
   * @param other The object to compare with the current object.
   */
  equals(other: T): boolean;
}
