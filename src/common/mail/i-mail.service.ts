import { MailMessage } from './domain';

export const MAIL_SERVICE = 'IMailService';

export interface IMailService {
  sendAsync(message: MailMessage): Promise<void>;
  sendTemplatedAsync(
    to: string | string[],
    templateSlug: string,
    context: Record<string, unknown>,
    subject?: string,
  ): Promise<void>;
}
