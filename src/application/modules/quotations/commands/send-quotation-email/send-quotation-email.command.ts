import { CommandBase } from '../../../../../common';

export class SendQuotationEmailCommand extends CommandBase {
  public id: string;
  public recipientEmail?: string;
  public subject?: string;
  public body?: string;
  public pdfBase64?: string;
}
