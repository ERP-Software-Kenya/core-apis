import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class AddProductImageCommand extends CommandBase {
  @AutoMap()
  public productId: string;

  public buffer: Buffer;

  public mimeType: string;

  @AutoMap()
  public uploadedById?: string;
}
