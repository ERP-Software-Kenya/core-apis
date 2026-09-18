import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { CommandHandlerStrict } from '../../../../../common';
import { QUOTATION_REPO } from '../../../../constants';
import { IQuotationRepo } from '../../i-quotation.repo';
import { Quotation } from '../../domain';
import { UpdateQuotationCommand } from './update-quotation.command';
import { calculateQuotationTotals } from '../../helpers';
import { QuotationEntity, QuotationItemEntity } from '../../../../../infrastructure/persistence/entities';
import { EQuotationStatus } from '../../../../shared/enums';

@CommandHandlerStrict(UpdateQuotationCommand)
export class UpdateQuotationCommandHandler
  implements ICommandHandler<UpdateQuotationCommand, Quotation>
{
  constructor(
    private readonly dataSource: DataSource,
    @Inject(QUOTATION_REPO) private readonly quotationRepo: IQuotationRepo,
    @InjectPinoLogger(UpdateQuotationCommandHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateQuotationCommand): Promise<Quotation> {
    this.logger.info(`Executing ${UpdateQuotationCommand.name} for ${command.id}`);

    await this.dataSource.transaction(async (manager) => {
      const quotation = await manager.findOne(QuotationEntity, {
        where: { id: command.id },
      });

      if (!quotation) {
        throw new NotFoundException(`Quotation ${command.id} not found`);
      }

      if (quotation.status !== EQuotationStatus.Draft) {
        throw new BadRequestException(
          `Cannot edit quotation in ${quotation.status} status. Only DRAFT quotations can be edited. Use 'revise' to create a new version.`,
        );
      }

      if (command.locationId) quotation.locationId = command.locationId;
      if (command.customerId) quotation.customerId = command.customerId;
      if (command.notes !== undefined) quotation.notes = command.notes;
      if (command.status) quotation.status = command.status as EQuotationStatus;

      if (command.items && command.items.length > 0) {
        const totals = calculateQuotationTotals(command.items);
        quotation.subtotal = totals.subtotal;
        quotation.taxAmount = totals.taxAmount;
        quotation.totalAmount = totals.totalAmount;

        // Delete existing items and insert new
        await manager.delete(QuotationItemEntity, { quotationId: quotation.id });

        const itemEntities = totals.items.map((item) =>
          manager.create(QuotationItemEntity, {
            quotationId: quotation.id,
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

        await manager.save(QuotationItemEntity, itemEntities);
      }

      await manager.save(QuotationEntity, quotation);
    });

    const result = await this.quotationRepo.getWithDetailsAsync(command.id);
    if (!result) {
      throw new NotFoundException(`Quotation ${command.id} not found`);
    }
    return result;
  }
}
