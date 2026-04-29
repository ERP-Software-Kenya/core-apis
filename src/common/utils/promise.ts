import { map } from "lodash";

export const tryPromiseAll = async <T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }> => {
  const results = await Promise.allSettled(values);
  const res = map(results, (x) => (x.status === "fulfilled" ? x.value : null));
  return res as unknown as { -readonly [P in keyof T]: Awaited<T[P]> };
};

export const wait = <T>(ms = 0, data?: T): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, ms);
  });
