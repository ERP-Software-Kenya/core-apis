import { Inject, Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import * as Handlebars from 'handlebars';
import {
  MailService,
  EmailTemplateData,
  MailOptions,
  EMAIL_TEMPLATE_REPO,
  IEmailTemplateRepo,
} from '../../../../common';

export interface SendQuotationMailParams {
  to: string | string[];
  quoteNumber: string;
  subject?: string;
  htmlBody?: string;
  pdfBuffer?: Buffer;
  templateContext?: Record<string, unknown>;
}

@Injectable()
export class QuotationsMailService extends MailService {
  constructor(
    options: MailOptions,
    @Inject(EMAIL_TEMPLATE_REPO) private readonly templateRepo: IEmailTemplateRepo,
    @InjectPinoLogger(QuotationsMailService.name) logger: PinoLogger,
  ) {
    super(options, logger);
  }

  protected async findTemplateAsync(slug: string): Promise<EmailTemplateData | null> {
    const template = await this.templateRepo.findBySlugAsync(slug);
    if (!template) return null;
    return { subject: template.subject, htmlBody: template.htmlBody };
  }

  public async sendQuotationEmailAsync(params: SendQuotationMailParams): Promise<void> {
    const attachments = params.pdfBuffer
      ? [
          {
            filename: `Quotation_${params.quoteNumber}.pdf`,
            content: params.pdfBuffer,
            contentType: 'application/pdf',
          },
        ]
      : undefined;

    if (params.htmlBody) {
      await this.sendAsync({
        to: params.to,
        subject: params.subject ?? `Quotation ${params.quoteNumber}`,
        html: params.htmlBody,
        attachments,
      });
      return;
    }

    const template = await this.findTemplateAsync('quotation-sent');
    if (template && params.templateContext) {
      const subject = params.subject ?? template.subject;
      const compiledSubject = Handlebars.compile(subject)(params.templateContext);
      const compiledHtml = Handlebars.compile(template.htmlBody)(params.templateContext);
      await this.sendAsync({
        to: params.to,
        subject: compiledSubject,
        html: compiledHtml,
        attachments,
      });
      return;
    }

    const fallbackSubject = params.subject ?? `Quotation ${params.quoteNumber}`;
    const fallbackHtml = `<p>Please find attached quotation <strong>${params.quoteNumber}</strong>.</p>`;
    await this.sendAsync({
      to: params.to,
      subject: fallbackSubject,
      html: fallbackHtml,
      attachments,
    });
  }
}
