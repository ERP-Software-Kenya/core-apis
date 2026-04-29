/**
 * @description Defines a generalized type-specific comparison method that a value type or class implements to order or sort its instances.
 */
export interface IComparable<T, TOther = T> {
  /**
   * @description Compares the current instance with another object of the same type and returns an integer that indicates whether the current instance precedes, follows, or occurs in the same position in the sort order as the other object.
   * @param other The object to compare with the current object. By default, this is the same type as the current object.
   * @returns Less than zero — The current instance precedes the object specified by the CompareTo method in the sort order.
   * Zero — The current instance occurs in the same position in the sort order as the object specified by the CompareTo method.
   * Greater than zero — The current instance follows the object specified by the CompareTo method in the sort order.
   */
  compareTo(other: TOther): number;
}
