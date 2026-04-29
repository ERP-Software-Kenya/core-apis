import { Injectable } from "@nestjs/common";
import { ESpreadsheetType } from "../types";
import { DuplicateNotAllowedException, HeaderNotFoundException, InvalidSpreadsheetTypeException, WorksheetNotFoundException } from "./exceptions";
import * as ExcelJS from "exceljs";
import { Readable } from "stream";
import { camelCase, filter, fromJson, isNilOrEmpty, isNull, isUndefined, map, toJson } from "..";
import { IFileParserService } from "./i-file-parser.service";
import { IFileParserOptions } from "./options";

@Injectable()
export class FileParserService implements IFileParserService {
  /**
   * Create Workbook
   * @returns
   */
  public createWorkbook(): ExcelJS.Workbook {
    return new ExcelJS.Workbook();
  }

  public async parseAsync<T extends Record<string, any>>(file: Express.Multer.File, options: IFileParserOptions<T>): Promise<T[]> {
    const { buffer, originalname: name } = file;
    const extension = name.split(".").pop()?.toLowerCase() as ESpreadsheetType;
    switch (extension) {
      case ESpreadsheetType.XLSX:
        return this.parseXlsxAsync<T>(buffer, options);
      case ESpreadsheetType.CSV:
        return this.parseCsvAsync<T>(buffer, options);
      default:
        throw new InvalidSpreadsheetTypeException(`Unsupported file type: ${extension}`);
    }
  }

  public async parseXlsxAsync<T extends Record<string, any>>(buffer: Buffer, options: IFileParserOptions<T>): Promise<T[]> {
    const workbook = this.createWorkbook();
    const readable = Readable.from(buffer);
    await workbook.xlsx.read(readable);

    const sheet = workbook.worksheets[0];
    if (!sheet) throw new WorksheetNotFoundException("Worksheet not found");

    return this.parseWorksheetAsync<T>(sheet, options);
  }

  public async parseCsvAsync<T extends Record<string, any>>(buffer: Buffer, options: IFileParserOptions<T>): Promise<T[]> {
    const workbook = this.createWorkbook();
    const readable = Readable.from(buffer);
    const firstLine = buffer.toString().split("\n")[0];
    const delimiter = firstLine.includes(";") ? ";" : ",";
    await workbook.csv.read(readable, {
      parserOptions: {
        delimiter,
        quote: '"',
        escape: "\\",
        trim: true,
        ignoreEmpty: true,
      },
    });

    const sheet = workbook.worksheets[0];
    if (!sheet) throw new WorksheetNotFoundException("Worksheet not found");

    return this.parseWorksheetAsync<T>(sheet, options);
  }

  public parseWorksheetAsync<T extends Record<string, any>>(sheet: ExcelJS.Worksheet, options: IFileParserOptions<T>): T[] {
    const headers: string[] = [];
    const data = [];

    const headerRow = sheet.getRow(1);
    if (isNilOrEmpty(headerRow.values)) throw new HeaderNotFoundException(`Header row (row 1) is missing or empty`);

    sheet.eachRow((row, rowNumber) => {
      const rowValues = row.values as string[];
      if (rowNumber === 1) {
        this.extractHeaders(headers, rowValues);
        this.normalizeHeaders(headers, options);
        this.validateHeaders(headers, options?.expectedHeaders);
      } else {
        const rowObj = this.mapRowToJson<T>(headers, rowValues);
        if (!this.isRowEmpty(rowObj)) data.push(rowObj);
      }
    });

    if (!isNilOrEmpty(options?.transform)) return map(data, (row) => options.transform(row));

    return data;
  }

  /**
   * Extract Headers From First Row
   * @param headers
   * @param rowValues
   */
  public extractHeaders(headers: string[], rowValues: string[]): string[] {
    rowValues.forEach((val, i) => {
      if (i === 0) return;
      const header = String(val ?? "").trim();
      if (isNilOrEmpty(header)) throw new HeaderNotFoundException(`Header not found at row: 1, column: ${i + 1}`);
      if (headers.includes(header)) throw new DuplicateNotAllowedException(`Duplicate header: ${header}`);
      headers.push(header);
    });
    return headers;
  }

  /**
   * Validate Headers
   * @param headers
   * @param expectedHeaders
   */
  public validateHeaders(headers: string[], expectedHeaders: string[]): void {
    const missing = filter(expectedHeaders, (h) => !headers.includes(h));
    if (!isNilOrEmpty(missing)) throw new Error(`Missing required headers: ${missing.join(", ")}`);
  }

  /**
   * Map data row to JSON object based on headers
   */
  public mapRowToJson<T extends Record<string, any>>(headers: string[], rowValues: string[]): T {
    const rowObj: Record<string, string> = {};
    headers.forEach((header, i) => {
      rowObj[header] = this.cleanValue(rowValues[i + 1]);
    });
    return fromJson(toJson(rowObj));
  }

  /**
   * Normalize and clean a single cell value
   */
  public cleanValue(value: any): string {
    if (isNull(value) || isUndefined(value)) return "";
    if (typeof value === "number") return value.toString();
    return String(value).trim();
  }

  /**
   * normalize headers (trim, lowercase, remove special chars)
   */
  public normalizeHeaders(headers: string[], options: IFileParserOptions): string[] {
    for (let i = 0; i < headers.length; i++) {
      headers[i] = headers[i].trim().replace(/\s+/g, "_");
      if (options?.normalizeCase) headers[i] = camelCase(headers[i]);
    }
    return headers;
  }

  /**
   * Check if row is empty
   */
  public isRowEmpty(rowObj: Record<string, string>): boolean {
    return Object.values(rowObj).every((v) => !v);
  }
}
