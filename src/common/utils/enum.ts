import { indexOf, keys, values } from "lodash";

export const enumKeyName = <T>(enumType: Record<string, T>, value: T): string => keys(enumType)[indexOf(values(enumType), value)];
