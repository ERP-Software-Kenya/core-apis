import { AutoMap } from '@automapper/classes';
import { MailAttachment } from './mail-attachment';

export class MailMessage {
  @AutoMap(() => String) public to: string | string[];
  @AutoMap() public subject: string;
  @AutoMap() public html?: string;
  @AutoMap() public text?: string;
  @AutoMap() public from?: string;
  @AutoMap(() => String) public cc?: string | string[];
  @AutoMap(() => String) public bcc?: string | string[];
  @AutoMap() public replyTo?: string;
  @AutoMap(() => [MailAttachment]) public attachments?: MailAttachment[];
}
