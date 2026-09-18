import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { CommandHandlerStrict } from '../../../../../common';
import { QUOTATION_REPO } from '../../../../constants';
import { IQuotationRepo } from '../../i-quotation.repo';
import { Quotation } from '../../domain';
import { ReviseQuotationCommand } from './revise-quotation.command';
import { QuotationEntity, QuotationItemEntity } from '../../../../../infrastructure/persistence/entities';
import { EQuotationStatus } from '../../../../shared/enums';

@CommandHandlerStrict(ReviseQuotationCommand)
export class ReviseQuotationCommandHandler
  implements ICommandHandler<ReviseQuotationCommand, Quotation>
{
  constructor(
    private readonly dataSource: DataSource,
    @Inject(QUOTATION_REPO) private readonly quotationRepo: IQuotationRepo,
    @InjectPinoLogger(ReviseQuotationCommandHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  public async execute(command: ReviseQuotationCommand): Promise<Quotation> {
    this.logger.info(`Executing ${ReviseQuotationCommand.name} for quotation ${command.id}`);

    const newQuotationId = await this.dataSource.transaction(async (manager) => {
      const original = await manager.findOne(QuotationEntity, {
        where: { id: command.id },
        relations: ['items'],
      });

      if (!original) {
        throw new NotFoundException(`Quotation ${command.id} not found`);
      }

      if (!original.isLatest || original.status === EQuotationStatus.Superseded) {
        throw new BadRequestException('Can only revise the latest version of a quotation');
      }

      if (original.status === EQuotationStatus.Converted) {
        throw new BadRequestException('Cannot revise a converted quotation');
      }

      if (original.status === EQuotationStatus.Cancelled) {
        throw new BadRequestException('Cannot revise a cancelled quotation');
      }

      // Determine next version number for this quotation family
      const maxVersionRecord = await manager
        .createQueryBuilder(QuotationEntity, 'q')
        .where('q.root_quotation_id = :rootId', { rootId: original.rootQuotationId })
        .orderBy('q.version_number', 'DESC')
        .getOne();

      const nextVersion = (maxVersionRecord?.versionNumber ?? original.versionNumber) + 1;
      const baseNumber = original.quoteNumber.replace(/-v\d+$/, '');
      const newQuoteNumber = `${baseNumber}-v${nextVersion}`;

      const newQuotation = manager.create(QuotationEntity, {
        quoteNumber: newQuoteNumber,
        versionNumber: nextVersion,
        rootQuotationId: original.rootQuotationId,
        parentQuotationId: original.id,
        isLatest: true,
        status: EQuotationStatus.Draft,
        organizationId: original.organizationId,
        locationId: original.locationId,
        customerId: original.customerId,
        subtotal: original.subtotal,
        taxAmount: original.taxAmount,
        totalAmount: original.totalAmount,
        notes: original.notes,
        createdByUserId: command.createdByUserId ?? original.createdByUserId,
      });

      const saved = await manager.save(QuotationEntity, newQuotation);

      // Clone line items
      if (original.items && original.items.length > 0) {
        const clonedItems = original.items.map((item) =>
          manager.create(QuotationItemEntity, {
            quotationId: saved.id,
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            unitPriceInclusive: item.unitPriceInclusive,
            unitTaxable: item.unitTaxable,
            taxRate: item.taxRate,
            taxAmount: item.taxAmount,
            lineTotal: item.lineTotal,
          }),
        );
        await manager.save(QuotationItemEntity, clonedItems);
      }

      // Predecessor is now superseded and no longer latest
      original.status = EQuotationStatus.Superseded;
      original.isLatest = false;
      await manager.save(QuotationEntity, original);

      return saved.id;
    });

    const result = await this.quotationRepo.getWithDetailsAsync(newQuotationId);
    if (!result) {
      throw new NotFoundException(`Revised quotation ${newQuotationId} not found`);
    }
    return result;
  }
}
