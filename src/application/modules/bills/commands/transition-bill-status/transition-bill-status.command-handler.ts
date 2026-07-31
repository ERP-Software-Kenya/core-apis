import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CommandHandlerStrict, IBaseRepo, Filter, PageableFilter } from '../../../../../common';
import { BILL_ITEM_REPO, BILL_REPO, INVENTORY_REPO } from '../../../../constants';
import { Bill, BillItem } from '../../domain';
import { IBillRepo } from '../../i-bill.repo';
import { IInventoryRepo } from '../../../inventory/i-inventory.repo';
import { EBillStatus } from '../../../../../infrastructure/persistence/entities/bill.entity';
import { TransitionBillStatusCommand } from './transition-bill-status.command';

const ALLOWED: Record<EBillStatus, EBillStatus[]> = {
  [EBillStatus.INITIATED]:  [EBillStatus.DRAFT, EBillStatus.CANCELLED],
  [EBillStatus.DRAFT]:      [EBillStatus.COMPLETED, EBillStatus.CANCELLED],
  [EBillStatus.COMPLETED]:  [],
  [EBillStatus.CANCELLED]:  [],
};

@CommandHandlerStrict(TransitionBillStatusCommand)
export class TransitionBillStatusCommandHandler implements ICommandHandler<TransitionBillStatusCommand, Bill> {
  constructor(
    @Inject(BILL_REPO) private readonly billRepo: IBillRepo,
    @Inject(BILL_ITEM_REPO) private readonly itemRepo: IBaseRepo<BillItem, string, PageableFilter<BillItem>, Filter<BillItem>>,
    @Inject(INVENTORY_REPO) private readonly inventoryRepo: IInventoryRepo,
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(TransitionBillStatusCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: TransitionBillStatusCommand): Promise<Bill> {
    this.logger.info(`Executing ${TransitionBillStatusCommand.name} billId=${command.billId} → ${command.status}`);
    const bill = await this.billRepo.getAsync(command.billId);
    if (!bill) throw new NotFoundException(`Bill ${command.billId} not found`);

    if (!ALLOWED[bill.status]?.includes(command.status)) {
      throw new BadRequestException(`Cannot transition bill from ${bill.status} to ${command.status}`);
    }

    if (command.status === EBillStatus.COMPLETED) {
      const items = await this.itemRepo.allAsync({ billId: command.billId } as Filter<BillItem>);
      const runner = this.dataSource.createQueryRunner();
      await runner.connect();
      await runner.startTransaction();
      try {
        for (const item of items) {
          const inv = await this.inventoryRepo.findByOrgLocationProductAsync(
            bill.organizationId, bill.locationId, item.productId, runner.manager,
          );
          if (!inv) throw new BadRequestException(`No inventory found for product ${item.productId} at this location`);
          await this.inventoryRepo.deductStockAsync(inv.id, Number(item.quantity), runner.manager);
        }
        await runner.commitTransaction();
      } catch (err) {
        await runner.rollbackTransaction();
        throw err;
      } finally {
        await runner.release();
      }
      bill.billedAt = new Date();
    }

    bill.status = command.status;
    if (command.paymentMethod) bill.paymentMethod = command.paymentMethod;
    return this.billRepo.updateAsync(bill);
  }
}
