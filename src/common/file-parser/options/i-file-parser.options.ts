export interface IFileParserOptions<T = Record<string, string>> {
  expectedHeaders: string[];
  /**
   * Normalize Case (camelCase)
   */
  normalizeCase?: boolean;
  /**
   * Transform Function (date conversion, etc)
   */
  transform?: (row: Record<keyof T, string>) => T;
}
