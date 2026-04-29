const MAX_PERC = 100;
const HALF_PERC = 50;
const MIN_SIX_DIGIT = 100000;
const RANGE = 900000;

export const randomBool = (truePercentage = HALF_PERC): boolean => Math.random() > truePercentage / MAX_PERC;

export const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min)) + min;

export const randomFloat = (min: number, max: number): number => randomInt(min, max) - 1 + Math.random();

export const randomSixDigitNumber = (): number => {
  return Math.floor(MIN_SIX_DIGIT + Math.random() * RANGE);
};

export const randomAlphaNumeric = (length: number): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
