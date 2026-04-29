import { ICloudFrontQueryParams } from "./types";

export interface ICloudFrontCdnStorage {
  readCloudFrontAsync(path: string, query?: ICloudFrontQueryParams[]): Promise<string>;
}
