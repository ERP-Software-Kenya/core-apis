import { instanceToPlain, plainToInstance, ClassTransformOptions } from "class-transformer";
/**
 * Deep clones and rehydrates a class instance by serializing & deserializing.
 * Supports circular reference handling, stripping metadata, and rehydrating
 * different input types into a target class.
 *
 * @param cls   Target class to rehydrate into
 * @param obj   Source object (can be same class instance or a plain object)
 * @param options Optional class-transformer options (default: { enableCircularCheck: true })
 */
export const cloneAs = <T, V>(cls: new (...args: any[]) => T, obj: V, options: ClassTransformOptions = { enableCircularCheck: true }): T => {
  const plain = instanceToPlain(obj, options);
  return plainToInstance(cls, plain, options);
};
