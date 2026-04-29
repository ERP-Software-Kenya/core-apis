import { first, isInteger, parseInt } from "lodash";
import { isNilOrEmpty } from '..';

const ADJ_SUN_MON = 6;

export const parseDate = (str?: string, defVal?: Date): Date => {
  const date = str as unknown as Date;
  if (date instanceof Date) {
    return date;
  }

  const t = typeof str === "string" ? new Date(str) : defVal;

  return t;
};

export const parseTimestamp = (str: string, defVal?: Date): Date => {
  if (isNilOrEmpty(str)) {
    return defVal;
  }
  const timestamp = parseInt(str);
  return isInteger(timestamp) ? new Date(timestamp) : defVal;
};

export const stringIsDate = (value: string): boolean => /^((?:(\d{4}-\d{2}-\d{2})(T(\d{2}:\d{2}:\d{2}(?:\.\d+)?))?)(Z|[+-]\d{2}:\d{2})?)$/.test(value) && isNaN(Date.parse(value));

export const startOfWeek = (date: Date): Date => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -ADJ_SUN_MON : 1);
  const res = new Date(date);
  res.setDate(diff);
  return res;
};

export const endOfWeek = (date: Date): Date => {
  const days = startOfWeek(date).getDate();
  const res = new Date(date);
  res.setDate(days + ADJ_SUN_MON);
  return res;
};

export const startOfMonth = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), 1);

export const endOfMonth = (date: Date): Date => new Date(new Date(date.getFullYear(), date.getMonth() + 1, 1).getTime() - 1);

export const startOfYear = (date: Date): Date => new Date(date.getFullYear(), 0, 1);

export const endOfYear = (date: Date): Date => new Date(new Date(date.getFullYear() + 1, 0, 1).getTime() - 1);

export const toDateString = (date: Date): string => first(date.toISOString().split("T"));

export const endDate = (date: Date) => new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).getTime() - 1);

export const nextDay = (date: Date) => new Date(date.setDate(date.getDate() + 1));

export const toStartOfDay = (dateStr: string): Date => {
  const date = parseDate(dateStr);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const toEndOfDay = (dateStr: string): Date => {
  const date = parseDate(dateStr);
  date.setHours(23, 59, 59, 999);
  return date;
};

export const toUSDateFormat = (input: string | Date, includeTime: boolean = false): string => {
  if (!input) return "-";
  const date = new Date(input);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }
  // Constants to improve code readability in date formatting
  const ONE = 1; // Offset for zero-based months
  const TWO = 2; // Padding length for single-digit numbers
  const TWELVE = 12; // Upper limit for 12-hour time format
  const month = (date.getMonth() + ONE).toString().padStart(TWO, "0");
  const day = date.getDate().toString().padStart(TWO, "0");
  const year = date.getFullYear();

  if (!includeTime) {
    return `${month}/${day}/${year}`;
  }

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(TWO, "0");
  const seconds = date.getSeconds().toString().padStart(TWO, "0");
  const ampm = hours >= TWELVE ? "PM" : "AM";

  hours = hours % TWELVE || TWELVE;
  const formattedHours = hours.toString().padStart(TWO, "0");

  return `${month}/${day}/${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
};

export const addDays = (date: Date, days: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

export const addMonths = (date: Date, months: number): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
};

export const subtractDays = (date: Date, days: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() - days);
  return newDate;
};

export const addYears = (date: Date, years: number): Date => {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
};

export const subtractYears = (date: Date, years: number): Date => {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() - years);
  return newDate;
};
