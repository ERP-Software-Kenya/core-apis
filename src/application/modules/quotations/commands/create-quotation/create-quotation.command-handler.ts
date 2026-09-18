import { Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { CommandHandlerStrict } from '../../../../../common';
import { CUSTOMER_REPO, LOCATION_REPO, QUOTATION_REPO } from '../../../../constants';
import { ILocationRepo } from '../../../locations';
import { ICustomerRepo } from '../../../customers/i-customer.repo';
import { IQuotationRepo } from '../../i-quotation.repo';
import { Quotation } from '../../domain';
import { CreateQuotationCommand } from './create-quotation.command';
import { calculateQuotationTotals } from '../../helpers';
import { QuotationEntity, QuotationItemEntity } from '../../../../../infrastructure/persistence/entities';
import { EQuotationStatus } from '../../../../shared/enums';

@CommandHandlerStrict(CreateQuotationCommand)
export class CreateQuotationCommandHandler
  implements ICommandHandler<CreateQuotationCommand, Quotation>
{
  constructor(
    private readonly dataSource: DataSource,
    @Inject(QUOTATION_REPO) private readonly quotationRepo: IQuotationRepo,
    @Inject(LOCATION_REPO) private readonly locationRepo: ILocationRepo,
    @Inject(CUSTOMER_REPO) private readonly customerRepo: ICustomerRepo,
    @InjectPinoLogger(CreateQuotationCommandHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateQuotationCommand): Promise<Quotation> {
    this.logger.info(`Executing ${CreateQuotationCommand.name}`);

    const location = await this.locationRepo.getAsync(command.locationId);
    if (!location) {
      throw new NotFoundException(`Location ${command.locationId} not found`);
    }

    const customer = await this.customerRepo.getAsync(command.customerId);
    if (!customer) {
      throw new NotFoundException(`Customer ${command.customerId} not found`);
    }

    const orgId = command.organizationId || location.organizationId;
    const totals = calculateQuotationTotals(command.items);

    const now = new Date();
    const ym = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
    const rand = Math.floor(Math.random() * 9000 + 1000);
    const quoteNumber = `QT-${ym}-${rand}`;

    const quotationId = await this.dataSource.transaction(async (manager) => {
      const quoteEntity = manager.create(QuotationEntity, {
        quoteNumber,
        versionNumber: 1,
        rootQuotationId: '00000000-0000-0000-0000-000000000000', // temporary placeholder, updated right below
        parentQuotationId: undefined,
        isLatest: true,
        status: EQuotationStatus.Draft,
        organizationId: orgId,
        locationId: command.locationId,
        customerId: command.customerId,
        subtotal: totals.subtotal,
        taxAmount: totals.taxAmount,
        totalAmount: totals.totalAmount,
        notes: command.notes,
        createdByUserId: command.createdByUserId,
      });

      const savedQuote = await manager.save(QuotationEntity, quoteEntity);

      // Root of v1 points to itself
      savedQuote.rootQuotationId = savedQuote.id;
      await manager.save(QuotationEntity, savedQuote);

      // Save line items
      const itemEntities = totals.items.map((item) =>
        manager.create(QuotationItemEntity, {
          quotationId: savedQuote.id,
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

      return savedQuote.id;
    });

    const result = await this.quotationRepo.getWithDetailsAsync(quotationId);
    if (!result) {
      throw new NotFoundException(`Quotation ${quotationId} could not be loaded`);
    }
    return result;
  }
}
