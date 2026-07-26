import { IR2StorageOptions } from './i-r2-storage.options';

export class R2StorageOptions implements IR2StorageOptions {
  constructor(
    public readonly endpoint: string,
    public readonly region: string,
    public readonly accessKeyId: string,
    public readonly secretAccessKey: string,
    public readonly bucket: string,
    public readonly publicUrlBase?: string,
  ) {}
}
