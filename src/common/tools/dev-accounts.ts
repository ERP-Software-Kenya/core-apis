import { first, isArray, last, map, some } from "lodash";
import { nanoid } from "nanoid";
import { isNilOrEmpty } from "..";

const DEV_ID_SIZE = 5;

export const DEV_ACCOUNT_BIO_ID = "dev";

const DEV_ACCOUNTS = map(process.env?.DEV_ACCOUNTS?.split(",") ?? [], (x) => (x.includes("*") ? x.toLowerCase().split("*") : x.toLowerCase()));

export const isDevAccount = (phone: string): boolean => {
  phone = phone?.toLowerCase();
  return some(DEV_ACCOUNTS, (pattern) => (isArray(pattern) ? phone?.startsWith(first(pattern)) && phone?.endsWith(last(pattern)) : phone === pattern));
};

export const generateDevBioId = (): string => "dev-" + nanoid(DEV_ID_SIZE);

export const generateId = (): string => nanoid(DEV_ID_SIZE);

export const isDevBioId = (bioId: string): boolean => bioId?.startsWith("dev-") ?? false;

export const isTestAccount = (email: string): boolean => {
  if (isNilOrEmpty(email)) return false;
  const testAccounts = process.env?.TEST_ACCOUNTS?.split(",") ?? [];
  return some(testAccounts, (account) => account.trim().toLowerCase() === email.trim().toLowerCase());
};
