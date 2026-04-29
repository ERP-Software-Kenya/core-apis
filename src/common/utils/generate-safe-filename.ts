import * as path from "path";
import { uuid } from "..";

const MAX_BASENAME_LENGTH = 100;

export const generateSafeFilename = (original: string): string => {
  const ext = path.extname(original);

  let base = path
    .basename(original, ext)
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-_]/g, "")
    .toLowerCase();

  if (!base) {
    base = "file";
  }

  base = base.slice(0, MAX_BASENAME_LENGTH);

  return `${uuid()}-${base}${ext}`;
};
