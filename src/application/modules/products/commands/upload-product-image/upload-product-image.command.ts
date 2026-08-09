import { CommandBase } from '../../../../../common';

export class UploadProductImageCommand extends CommandBase {
  public productId: string;
  public buffer: Buffer;
  public mimeType: string;
}
