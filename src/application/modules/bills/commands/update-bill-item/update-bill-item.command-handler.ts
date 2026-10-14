import { Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { BILL_ITEM_REPO, BILL_REPO, LOCATION_REPO, PRODUCT_BRANCH_PRICE_REPO, PRODUCT_REPO } from '../../../../constants';
import { Bill } from '../../domain';
import { applyBillTotals, computeBillItemTotals } from '../../helpers';
import { IBillItemRepo, IBillRepo } from '../..';
import { ILocationRepo } from '../../../locations';
import { IProductRepo } from '../../../products';
import { IProductBranchPriceRepo } from '../../../product-branch-prices';
import { resolveBranchPrice } from '../../../product-branch-prices/helpers';
import { ESaleType } from '../../../../../infrastructure/persistence/entities';
import { UpdateBillItemCommand } from './update-bill-item.command';

const ITEM_FIELDS = ['productId', 'variantId', 'quantity', 'unitPrice', 'taxRate', 'discountAmount'] as const;

@CommandHandlerStrict(UpdateBillItemCommand)
export class UpdateBillItemCommandHandler implements ICommandHandler<UpdateBillItemCommand, Bill> {
  constructor(
    @Inject(BILL_REPO) private readonly repo: IBillRepo,
    @Inject(BILL_ITEM_REPO) private readonly itemRepo: IBillItemRepo,
    @Inject(LOCATION_REPO) private readonly locationRepo: ILocationRepo,
    @Inject(PRODUCT_REPO) private readonly productRepo: IProductRepo,
    @Inject(PRODUCT_BRANCH_PRICE_REPO) private readonly branchPriceRepo: IProductBranchPriceRepo,
    @InjectPinoLogger(UpdateBillItemCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateBillItemCommand): Promise<Bill> {
    this.logger.info(`Executing ${UpdateBillItemCommand.name}`);
    const bill = await this.repo.getAsync(command.billId);
    if (!bill) {
      throw new NotFoundException(`Bill ${command.billId} not found`);
    }

    const item = (bill.items ?? []).find((it) => it.id === command.itemId);
    if (!item) {
      throw new NotFoundException(`Item ${command.itemId} not found on bill ${command.billId}`);
    }

    for (const field of ITEM_FIELDS) {
      if (command[field] !== undefined) {
        Object.assign(item, { [field]: command[field] });
      }
    }
    if (bill.saleType !== ESaleType.Black) {
      const product = await this.productRepo.getAsync(item.productId);
      if (product) {
        const location = await this.locationRepo.getAsync(item.locationId ?? bill.locationId);
        const branchPrice = location?.branchId
          ? await this.branchPriceRepo.getByBranchAndProductAsync(location.branchId, item.productId)
          : null;
        item.unitPrice = resolveBranchPrice(branchPrice, product, bill.customerType);
      }
    }
    computeBillItemTotals(item);
    await this.itemRepo.updateAsync(item);

    applyBillTotals(bill);
    await this.repo.updateAsync({ ...bill, items: undefined });
    return this.repo.getAsync(bill.id);
  }
}
