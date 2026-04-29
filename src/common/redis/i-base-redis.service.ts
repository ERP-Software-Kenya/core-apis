import { IExternalService } from "../types";

export interface IBaseRedisService extends IExternalService {
  setAsync<T>(key: string, value: T, expiration?: number, prefix?: string): Promise<T>;
  getAsync<T>(key: string): Promise<T | null>;
  keys(pattern: string): Promise<string[]>;
  deleteAsync(key: string): Promise<boolean>;
  deleteBulkAsync(keys: string[]): Promise<number>;
  getKeyExpirationTimeAsync(key: string): Promise<number>;
  deleteByPrefixAsync(pattern: string): Promise<boolean>;

  hsetAsync(key: string, field: string, value: string): Promise<number>;
  hgetAsync(key: string, field: string): Promise<string>;

  zAdd(key: string, score: number, member: string): Promise<number>;
  zRem(key: string, member: string): Promise<number>;
  zRangeByScore(key: string, min: string | number, max: string | number): Promise<string[]>;
  expire(key: string, seconds: number): Promise<boolean>;
  zCard(key: string): Promise<number>;
  zRemRangeByScore(key: string, min: string | number, max: string | number): Promise<number>;
}
