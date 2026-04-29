import { IFileParserOptions } from "./options";
import * as ExcelJS from "exceljs";

export interface IFileParserService {
  /**
   * Parse any supported spreadsheet file (XLSX/CSV)
   * and convert it into JSON data.
   *
   * @param file - Uploaded file object (via Multer)
   * @param options - Parsing options (headers, transforms, etc.)
   * @returns Promise resolving to parsed data as array of type T
   */
  parseAsync<T extends Record<string, any>>(file: Express.Multer.File, options: IFileParserOptions<T>): Promise<T[]>;

  /**
   * Parse XLSX buffer into typed JSON data.
   *
   * @param buffer - File buffer
   * @param options - Parsing options
   * @returns Promise resolving to parsed data as array of type T
   */
  parseXlsxAsync<T extends Record<string, any>>(buffer: Buffer, options: IFileParserOptions<T>): Promise<T[]>;

  /**
   * Parse CSV buffer into typed JSON data.
   *
   * @param buffer - File buffer
   * @param options - Parsing options
   * @returns Promise resolving to parsed data as array of type T
   */
  parseCsvAsync<T extends Record<string, any>>(buffer: Buffer, options: IFileParserOptions<T>): Promise<T[]>;

  /**
   * (Optional) Parse an already loaded worksheet directly.
   * Useful for internal extensions or advanced use cases.
   *
   * @param sheet - ExcelJS worksheet
   * @param options - Parsing options
   * @returns Promise resolving to parsed data as array of type T
   */
  parseWorksheetAsync<T extends Record<string, any>>(sheet: ExcelJS.Worksheet, options: IFileParserOptions<T>): T[];
}
