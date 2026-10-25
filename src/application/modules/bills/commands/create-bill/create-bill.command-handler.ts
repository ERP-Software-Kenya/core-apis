import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ForbiddenException, Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { EBillStatus, ERole, ESaleType } from '../../../../../infrastructure/persistence/entities';
import { EActivityAction } from '../../../../../infrastructure/persistence/entities/activity-log.entity';
import { BILL_REPO, LOCATION_REPO, PRODUCT_REPO } from '../../../../constants';
import { ActivityLogService } from '../../../../shared';
import { ILocationRepo } from '../../../locations';
import { IProductRepo } from '../../../products';
import { Product } from '../../../products/domain';
import { IProductBranchPriceRepo, PRODUCT_BRANCH_PRICE_REPO } from '../../../product-branch-prices';
import { ProductBranchPrice } from '../../../product-branch-prices/domain';
import { resolveBranchPrice } from '../../../product-branch-prices/helpers';
import { Bill, BillItem } from '../../domain';
import { applyBillTotals, generateBillNumber } from '../../helpers';
import { IBillRepo } from '../..';
import { CreateBillCommand, CreateBillItemCommand } from './create-bill.command';

interface ItemEnrichment {
  item: BillItem;
  product: Product | null;
  branchPrice: ProductBranchPrice | null;
}

const BLACK_SALE_ROLES = new Set([ERole.OrgAdmin, ERole.SuperAdmin]);

@CommandHandlerStrict(CreateBillCommand)
export class CreateBillCommandHandler implements ICommandHandler<CreateBillCommand, Bill> {
  constructor(
    @Inject(BILL_REPO) private readonly repo: IBillRepo,
    @Inject(PRODUCT_REPO) private readonly productRepo: IProductRepo,
    @Inject(LOCATION_REPO) private readonly locationRepo: ILocationRepo,
    @Inject(PRODUCT_BRANCH_PRICE_REPO) private readonly productBranchPriceRepo: IProductBranchPriceRepo,
    private readonly activityLog: ActivityLogService,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(CreateBillCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateBillCommand): Promise<Bill> {
    this.logger.info(`Executing ${CreateBillCommand.name}`);
    const saleType = command.saleType ?? ESaleType.Normal;

    if (saleType === ESaleType.Black && !(command.performedByRoles ?? []).some((r) => BLACK_SALE_ROLES.has(r))) {
      throw new ForbiddenException('Only Org Admin/Org Manager can create a black sale');
    }

    const bill = this.mapper.map(command, CreateBillCommand, Bill);
    bill.items = this.mapper.mapArray(command.items ?? [], CreateBillItemCommand, BillItem);
    bill.saleType         = saleType;
    bill.paymentMethod    = command.paymentMethod;
    bill.blackAmount      = 0;
    bill.commissionAmount = 0;
    bill.billNumber       = generateBillNumber();
    bill.status           = EBillStatus.Initiated;

    const branchId = await this.resolveBranchIdAsync(command.locationId);
    const enriched = await this.fetchItemEnrichmentsAsync(bill.items ?? [], branchId);

    for (const { item, product, branchPrice } of enriched) {
      if (item.taxRate == null) item.taxRate = product?.tax?.rate ?? 0;
      if (saleType !== ESaleType.Black && product) {
        item.unitPrice = resolveBranchPrice(branchPrice, product, command.customerType);
      }
    }

    applyBillTotals(bill);

    if (saleType === ESaleType.Black) {
      bill.blackAmount = enriched.reduce((acc, { item, product: prod, branchPrice: bp }) => {
        const officialPrice = prod ? resolveBranchPrice(bp, prod, command.customerType) : 0;
        return acc + Math.max(0, (Number(item.unitPrice) - officialPrice) * Number(item.quantity));
      }, 0);
      if ((command.facilitatorUserId || command.facilitatorName) && command.commissionPct) {
        bill.commissionAmount = (bill.blackAmount * command.commissionPct) / 100;
      }
    }

    const created = await this.repo.createAsync(bill);
    this.activityLog.record({
      action: EActivityAction.BillCreated,
      entityType: 'Bill',
      entityId: created.id,
      actorId: command.createdById,
      organizationId: command.organizationId,
      metadata: { billNumber: created.billNumber, totalAmount: created.totalAmount, saleType: created.saleType },
    });
    return created;
  }

  private async resolveBranchIdAsync(locationId?: string): Promise<string | null> {
    if (!locationId) return null;
    const location = await this.locationRepo.getAsync(locationId);
    return location?.branchId ?? null;
  }

  private async fetchItemEnrichmentsAsync(
    items: BillItem[],
    branchId: string | null,
  ): Promise<ItemEnrichment[]> {
    return Promise.all(
      items.map(async (item): Promise<ItemEnrichment> => {
        const [product, branchPrice] = await Promise.all([
          this.productRepo.getAsync(item.productId),
          branchId
            ? this.productBranchPriceRepo.getByBranchAndProductAsync(branchId, item.productId)
            : Promise.resolve(null),
        ]);
        return { item, product, branchPrice };
      }),
    );
  }
}
