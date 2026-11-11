import { AutoMap } from '@automapper/classes';

export class MailAttachment {
  @AutoMap() public filename: string;
  @AutoMap(() => Object) public content: Buffer | string;
  @AutoMap() public contentType?: string;
  @AutoMap() public encoding?: string;
}
