import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { CommandHandlerStrict } from '../../../../../common';
import { QUOTATION_REPO } from '../../../../constants';
import { IQuotationRepo } from '../../i-quotation.repo';
import { Quotation } from '../../domain';
import { SendQuotationEmailCommand } from './send-quotation-email.command';
import { QuotationsMailService } from '../../mail/quotations-mail.service';
import { QuotationEntity } from '../../../../../infrastructure/persistence/entities';
import { EQuotationStatus } from '../../../../shared/enums';

@CommandHandlerStrict(SendQuotationEmailCommand)
export class SendQuotationEmailCommandHandler
  implements ICommandHandler<SendQuotationEmailCommand, Quotation>
{
  constructor(
    private readonly dataSource: DataSource,
    @Inject(QUOTATION_REPO) private readonly quotationRepo: IQuotationRepo,
    private readonly mailService: QuotationsMailService,
    @InjectPinoLogger(SendQuotationEmailCommandHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  public async execute(command: SendQuotationEmailCommand): Promise<Quotation> {
    this.logger.info(`Executing ${SendQuotationEmailCommand.name} for quotation ${command.id}`);

    const quotation = await this.quotationRepo.getWithDetailsAsync(command.id);
    if (!quotation) {
      throw new NotFoundException(`Quotation ${command.id} not found`);
    }

    if (quotation.status === EQuotationStatus.Cancelled) {
      throw new BadRequestException('Cannot send email for a CANCELLED quotation');
    }

    const attachments: Array<{ filename: string; content: Buffer; contentType: string }> = [];

    if (command.pdfBase64) {
      const buffer = Buffer.from(command.pdfBase64, 'base64');
      attachments.push({
        filename: `Quotation_${quotation.quoteNumber}.pdf`,
        content: buffer,
        contentType: 'application/pdf',
      });
    }

    await this.mailService.sendAsync({
      to: command.recipientEmail,
      subject: command.subject,
      html: command.body,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    // If quotation was in DRAFT, promote to SENT
    if (quotation.status === EQuotationStatus.Draft) {
      await this.dataSource.transaction(async (manager) => {
        const entity = await manager.findOne(QuotationEntity, { where: { id: quotation.id } });
        if (entity && entity.status === EQuotationStatus.Draft) {
          entity.status = EQuotationStatus.Sent;
          await manager.save(QuotationEntity, entity);
        }
      });
    }

    const updated = await this.quotationRepo.getWithDetailsAsync(command.id);
    return updated!;
  }
}
