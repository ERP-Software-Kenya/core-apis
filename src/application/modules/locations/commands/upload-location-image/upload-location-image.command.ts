import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class UploadLocationImageCommand extends CommandBase {
  @AutoMap() public locationId: string;
  public buffer: Buffer;
  public mimeType: string;
}
