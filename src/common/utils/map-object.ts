import { camelCase, Options, pascalCase, snakeCase } from "change-case";
import { keys, isPlainObject, isArray, map } from "lodash";

const caseTransform = <T, TRes>(record: T, keyTransformer: (input: string, options?: Options) => string): TRes => {
  const objKeys = keys(record);
  const result: TRes = {} as unknown as TRes;
  for (let i = 0; i < objKeys.length; i++) {
    const key = objKeys[i];
    const transformedKey = keyTransformer(key);
    result[transformedKey] = record[key];
    const value = record[key];
    result[transformedKey] = isPlainObject(value)
      ? caseTransform(value, keyTransformer)
      : isArray(value)
      ? map(value, (item) => (item instanceof Object ? caseTransform(item, keyTransformer) : item))
      : value;
  }
  return result;
};

export const camelKeyTransform = <T, TRes>(record: T): TRes => caseTransform<T, TRes>(record, camelCase);
export { deepCamelKeys as deepCamelKeyTransform } from "string-ts";
export const snakeKeyTransform = <T, TRes>(record: T): TRes => caseTransform<T, TRes>(record, snakeCase);
export const pascalKeyTransform = <T, TRes>(record: T): TRes => caseTransform<T, TRes>(record, pascalCase);
