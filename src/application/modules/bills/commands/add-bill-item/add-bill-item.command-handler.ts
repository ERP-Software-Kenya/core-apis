import { Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { BILL_ITEM_REPO, BILL_REPO, LOCATION_REPO, PRODUCT_BRANCH_PRICE_REPO, PRODUCT_REPO } from '../../../../constants';
import { IProductRepo } from '../../../products';
import { ILocationRepo } from '../../../locations';
import { IProductBranchPriceRepo } from '../../../product-branch-prices';
import { resolveBranchPrice } from '../../../product-branch-prices/helpers';
import { ESaleType } from '../../../../../infrastructure/persistence/entities';
import { Bill, BillItem } from '../../domain';
import { applyBillTotals, computeBillItemTotals } from '../../helpers';
import { IBillItemRepo, IBillRepo } from '../..';
import { AddBillItemCommand } from './add-bill-item.command';

@CommandHandlerStrict(AddBillItemCommand)
export class AddBillItemCommandHandler implements ICommandHandler<AddBillItemCommand, Bill> {
  constructor(
    @Inject(BILL_REPO) private readonly repo: IBillRepo,
    @Inject(BILL_ITEM_REPO) private readonly itemRepo: IBillItemRepo,
    @Inject(PRODUCT_REPO) private readonly productRepo: IProductRepo,
    @Inject(LOCATION_REPO) private readonly locationRepo: ILocationRepo,
    @Inject(PRODUCT_BRANCH_PRICE_REPO) private readonly branchPriceRepo: IProductBranchPriceRepo,
    @InjectPinoLogger(AddBillItemCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: AddBillItemCommand): Promise<Bill> {
    this.logger.info(`Executing ${AddBillItemCommand.name}`);
    const bill = await this.repo.getAsync(command.billId);
    if (!bill) {
      throw new NotFoundException(`Bill ${command.billId} not found`);
    }

    const item = new BillItem();
    item.billId         = bill.id;
    item.productId      = command.productId;
    item.variantId      = command.variantId;
    item.quantity       = command.quantity;
    item.unitPrice      = command.unitPrice;
    item.discountAmount = command.discountAmount;
    item.locationId     = command.locationId;

    const product = await this.productRepo.getAsync(command.productId);
    if (bill.saleType !== ESaleType.Black && product) {
      const location = await this.locationRepo.getAsync(command.locationId ?? bill.locationId);
      const branchPrice = location?.branchId
        ? await this.branchPriceRepo.getByBranchAndProductAsync(location.branchId, command.productId)
        : null;
      item.unitPrice = resolveBranchPrice(branchPrice, product, bill.customerType);
    }

    if (command.taxRate != null) {
      item.taxRate = command.taxRate;
    } else {
      item.taxRate = product?.tax?.rate ?? 0;
    }

    computeBillItemTotals(item);

    const created = await this.itemRepo.createAsync(item);

    bill.items = [...(bill.items ?? []), created];
    applyBillTotals(bill);
    await this.repo.updateAsync({ ...bill, items: undefined });
    return this.repo.getAsync(bill.id);
  }
}
