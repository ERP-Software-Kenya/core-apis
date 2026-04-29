import { parseInt as internalParseInt } from "lodash";
import { isNilOrEmpty } from '..';

export const parseInt = (value: unknown, radix?: number): number => (!isNilOrEmpty(value) ? internalParseInt(value as string, radix) : null);

export const roundToTens = (x: number): number => {
  const TEN = 10;
  const BREAK = 2;
  let dec = 1;
  while (x > BREAK) {
    x /= TEN;
    dec *= TEN;
  }
  return dec;
};

export const roundNumber = (num: number, precision: number): number | null => {
  if (isNaN(num) || isNaN(precision)) {
    return null;
  }

  if (precision < 0) {
    return null;
  }

  const BASE_NUMBER = 10;
  const factor = Math.pow(BASE_NUMBER, precision);
  return Math.round(num * factor) / factor;
};
