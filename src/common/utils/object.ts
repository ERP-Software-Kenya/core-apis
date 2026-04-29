export const objectToMap = <TValue>(obj: Record<string, TValue>): Map<string, TValue> => {
  const map = new Map<string, TValue>();
  for (const key in obj) {
    const value = obj[key];
    map.set(key, value);
  }
  return map;
};
