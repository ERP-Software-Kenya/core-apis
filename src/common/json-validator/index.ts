import { JsonValue } from "../types";

export function validateMetadataInput(input: unknown): JsonValue {
  let data: unknown;

  // Parse if string
  if (typeof input === "string") {
    try {
      data = JSON.parse(input);
    } catch {
      throw new Error("Invalid metadata: string is not valid JSON.");
    }
  } else {
    data = input;
  }

  // Validate object
  if (isPlainObject(data)) return data;

  // Validate array of objects
  if (Array.isArray(data) && data.every(isPlainObject)) {
    return data;
  }

  throw new Error("Invalid metadata: must be an object or array of objects.");
}

const isPlainObject = (val: unknown): val is JsonValue => typeof val === "object" && val !== null && !Array.isArray(val);
