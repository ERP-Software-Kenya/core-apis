import { isEmpty } from '..';
import { parseBool } from "..";

export const useMocks = (name?: string): boolean =>
  isEmpty(name) ? parseBool(process.env.USE_MOCKS) : parseBool(process.env["USE_MOCKS_" + name]);
