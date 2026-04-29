import { IWormFile } from "./types";

export interface IWormFileStorage {
  /**
   * @param path Relative path to storage
   * @returns Status of file existance
   */
  existsAsync(path: string): Promise<boolean>;

  /**
   * @param path Relative path to storage, extension is not required <file_1.txt | file_1>
   * @param data File Buffer
   * @returns Relative path to storage with extension and Version ID
   */
  writeAsync(path: string, data: Buffer, contentType?: string): Promise<IWormFile>;

  /**
   * @param path Relative path to storage
   * @returns File Buffer
   */
  readAsync(path: string, versionId?: string): Promise<Buffer>;
}
