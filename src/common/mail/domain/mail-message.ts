import { AutoMap } from '@automapper/classes';
import { MailAttachment } from './mail-attachment';

export class MailMessage {
  @AutoMap(() => Object) public to: string | string[];
  @AutoMap() public subject: string;
  @AutoMap() public html?: string;
  @AutoMap() public text?: string;
  @AutoMap() public from?: string;
  @AutoMap(() => Object) public cc?: string | string[];
  @AutoMap(() => Object) public bcc?: string | string[];
  @AutoMap() public replyTo?: string;
  @AutoMap(() => [MailAttachment]) public attachments?: MailAttachment[];
}
