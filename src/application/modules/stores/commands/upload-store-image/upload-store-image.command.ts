import { CommandBase } from 'src/common';

export class UploadStoreImageCommand extends CommandBase {
  public storeId: string;
  public buffer:  Buffer;
  public mimeType: string;
}
