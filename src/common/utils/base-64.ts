import { IConstructor } from "./i-constructor";
import { fromJson, toJson } from "./json-convert";

const encodeBuffer = (buffer: Buffer): string => {
  return buffer.toString("base64");
};

const encodeString = (str: string): string => {
  return encodeBuffer(Buffer.from(str, "utf8"));
};

const encodeData = (data: Record<string, unknown> | unknown[]): string => {
  return encodeString(toJson(data));
};

export const encodeB64 = (data: string | Buffer | Record<string, unknown> | unknown[]): string => {
  if (Buffer.isBuffer(data)) {
    return encodeBuffer(data);
  }
  if (typeof data === "string") {
    return encodeString(data);
  }
  return encodeData(data);
};

export const decodeB64 = <T>(str64: string, type?: IConstructor<T>): T => {
  const decoded: string = Buffer.from(str64, "base64").toString("utf8");
  return fromJson<T>(decoded, type, decoded as unknown as T);
};
