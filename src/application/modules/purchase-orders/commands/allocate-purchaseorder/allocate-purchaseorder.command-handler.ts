import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import {
  PURCHASE_ORDER_REPO,
} from '../../../../constants';
import { PurchaseOrder } from '../../domain';
import { IPurchaseOrderRepo } from '../..';
import { AllocatePurchaseOrderCommand } from './allocate-purchaseorder.command';

@CommandHandlerStrict(AllocatePurchaseOrderCommand)
export class AllocatePurchaseOrderCommandHandler implements ICommandHandler<AllocatePurchaseOrderCommand, PurchaseOrder> {
  constructor(
    @Inject(PURCHASE_ORDER_REPO) private readonly poRepo: IPurchaseOrderRepo,
    @InjectPinoLogger(AllocatePurchaseOrderCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: AllocatePurchaseOrderCommand): Promise<PurchaseOrder> {
    this.logger.info(`Executing ${AllocatePurchaseOrderCommand.name} poId=${command.purchaseOrderId}`);

    return this.poRepo.allocateAsync({
      purchaseOrderId: command.purchaseOrderId,
      organizationId: command.organizationId,
      allocations: command.allocations,
      performedById: command.performedById,
      notes: command.notes,
    });
  }
}
