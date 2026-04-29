import * as objectId from "bson-objectid";

export const bsonId = (): string => objectId.default().toHexString();

export const makeSequentialUuid = (num: number, offset: number): string => {
  const padstart = 12;
  return `00000000-0000-0000-0000-${(num + offset).toString().padStart(padstart, "0")}`;
};
