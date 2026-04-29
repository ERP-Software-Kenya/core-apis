import { createHash as ch } from "crypto";

const HASH_ALGORITHM = "sha256";

export const createHash = (data: string): string => {
  const hash = ch(HASH_ALGORITHM).update(data).digest("hex");
  return hash;
};
