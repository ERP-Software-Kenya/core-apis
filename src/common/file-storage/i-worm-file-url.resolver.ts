export interface IWormFileUrlResolver {
  /**
   * @param path Relative path to storage
   * @returns Url to file
   */
  getUrlAsync(path: string, versionId?: string): Promise<string>;
}
