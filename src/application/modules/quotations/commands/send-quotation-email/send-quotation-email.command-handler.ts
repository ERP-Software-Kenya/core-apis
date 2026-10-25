import { BadRequestException, Inject, NotFoundException, Optional } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import {
  CommandHandlerStrict,
  PDF_EXPORT_SERVICE,
  IPdfExportService,
} from '../../../../../common';
import { QUOTATION_REPO } from '../../../../constants';
import { IQuotationRepo } from '../../i-quotation.repo';
import { Quotation } from '../../domain';
import { SendQuotationEmailCommand } from './send-quotation-email.command';
import { QuotationsMailService } from '../../mail/quotations-mail.service';
import { EQuotationStatus } from '../../../../shared/enums';
import { buildQuotationPdfContext } from '../../helpers';
import { formatOrganizationCurrency, OrganizationSettingsService } from '../../../billing-settings/currency';

@CommandHandlerStrict(SendQuotationEmailCommand)
export class SendQuotationEmailCommandHandler
  implements ICommandHandler<SendQuotationEmailCommand, Quotation>
{
  constructor(
    @Inject(QUOTATION_REPO) private readonly quotationRepo: IQuotationRepo,
    private readonly mailService: QuotationsMailService,
    @Inject(PDF_EXPORT_SERVICE) private readonly pdfService: IPdfExportService,
    @InjectPinoLogger(SendQuotationEmailCommandHandler.name)
    private readonly logger: PinoLogger,
    @Optional() private readonly organizationSettings?: OrganizationSettingsService,
  ) {}

  public async execute(command: SendQuotationEmailCommand): Promise<Quotation> {
    this.logger.info(`Executing ${SendQuotationEmailCommand.name} for quotation ${command.id}`);

    const quotation = await this.quotationRepo.getWithDetailsAsync(command.id);
    if (!quotation) {
      throw new NotFoundException(`Quotation ${command.id} not found`);
    }
    if (quotation.organizationId !== command.organizationId) {
      throw new NotFoundException(`Quotation ${command.id} not found`);
    }

    if (quotation.status === EQuotationStatus.Cancelled) {
      throw new BadRequestException('Cannot send email for a CANCELLED quotation');
    }

    const recipient = command.recipientEmail?.trim() || quotation.customer?.email?.trim();
    if (!recipient) {
      throw new BadRequestException(
        'Recipient email address is required (customer has no email on file)',
      );
    }

    const attachments: Array<{ filename: string; content: Buffer; contentType: string }> = [];

    // PDF attachment: either use provided pdfBase64 or generate PDF automatically via pdfService
    if (command.pdfBase64) {
      const buffer = Buffer.from(command.pdfBase64, 'base64');
      attachments.push({
        filename: `Quotation_${quotation.quoteNumber}.pdf`,
        content: buffer,
        contentType: 'application/pdf',
      });
    } else {
      try {
        const currencyCode = await this.resolveCurrencyCode(quotation.organizationId);
        const pdfContext = buildQuotationPdfContext(quotation, undefined, currencyCode);
        const filename = `Quotation_${quotation.quoteNumber}.pdf`;
        const pdfDoc = await this.pdfService.generateFromTemplateAsync(
          'quotation',
          pdfContext,
          filename,
        );
        attachments.push({
          filename: pdfDoc.filename,
          content: pdfDoc.buffer,
          contentType: 'application/pdf',
        });
      } catch (pdfErr) {
        this.logger.warn(
          { error: (pdfErr as Error).message },
          'Failed to generate quotation PDF attachment via template; sending without attachment',
        );
      }
    }

    const subject =
      command.subject?.trim() ||
      `Quotation ${quotation.quoteNumber} from Pramukh Digital ERP`;
    const body = command.body?.trim() || await this.buildDefaultEmailBody(quotation);

    await this.mailService.sendAsync({
      to: recipient,
      subject,
      html: body,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    // If quotation was in DRAFT, promote to SENT
    if (quotation.status === EQuotationStatus.Draft) {
      return this.quotationRepo.markSentIfDraftAsync(quotation.id, command.organizationId);
    }
    return quotation;
  }

  private async buildDefaultEmailBody(quotation: Quotation): Promise<string> {
    const customerName = this.escapeHtml(quotation.customer?.name ?? 'Valued Customer');
    const currencyCode = await this.resolveCurrencyCode(quotation.organizationId);
    const totalFmt = formatOrganizationCurrency(Number(quotation.totalAmount), currencyCode);
    return `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #0284c7; margin-bottom: 8px;">Quotation ${quotation.quoteNumber}</h2>
        <p style="font-size: 14px; margin-bottom: 16px;">Dear <strong>${customerName}</strong>,</p>
        <p style="font-size: 14px; line-height: 1.5; color: #475569;">
          Thank you for your interest. Please find attached our quotation <strong>${quotation.quoteNumber}</strong> (v${quotation.versionNumber}) for your review.
        </p>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <div style="font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600;">Total Amount (Tax Inclusive)</div>
          <div style="font-size: 22px; font-weight: 800; color: #0f172a; margin-top: 4px;">${totalFmt}</div>
        </div>
        ${
          quotation.notes
            ? `<p style="font-size: 13px; color: #64748b; margin-top: 12px;"><strong>Notes:</strong><br/>${this.escapeHtml(quotation.notes).replace(/\n/g, '<br/>')}</p>`
            : ''
        }
        <p style="font-size: 14px; line-height: 1.5; color: #475569; margin-top: 20px;">
          If you have any questions or would like to proceed with this order, please feel free to reach out to us.
        </p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <p style="font-size: 12px; color: #94a3b8;">This is an automated notification from Pramukh Digital ERP.</p>
      </div>
    `;
  }

  private escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    })[character]);
  }

  private async resolveCurrencyCode(organizationId: string): Promise<string> {
    return this.organizationSettings ? this.organizationSettings.currencyCode(organizationId) : 'USD';
  }
}
