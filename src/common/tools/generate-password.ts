import { randomBytes } from "crypto";
import { isNil } from '..';
import { customAlphabet } from "nanoid";

export const generatePasswordAsync = (length = 20): Promise<string> => {
  return new Promise((resolve, reject) => {
    randomBytes(length, (ex, buff) => {
      if (!isNil(ex)) {
        reject(ex);
        return;
      }
      const result = buff.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
      resolve(result.substring(0, length));
    });
  });
};

const NUM_PASSWORD_ALPHABET = "0123456789";
const NUM_LEN = 5;

export const generateNumberPassword = customAlphabet(NUM_PASSWORD_ALPHABET, NUM_LEN);

export const generateNumberPasswordAsync = async (length = 5): Promise<string> => {
  return new Promise((resolve) => {
    resolve(generateNumberPassword(length));
  });
};
