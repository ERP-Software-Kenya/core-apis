import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { PURCHASE_ORDER_REPO } from '../../../../constants';
import { PurchaseOrder } from '../../domain';
import { IPurchaseOrderRepo } from '../..';
import { CreatePurchaseOrderCommand } from './create-purchaseorder.command';

@CommandHandlerStrict(CreatePurchaseOrderCommand)
export class CreatePurchaseOrderCommandHandler implements ICommandHandler<CreatePurchaseOrderCommand, PurchaseOrder> {
  constructor(
    @Inject(PURCHASE_ORDER_REPO) private readonly repo: IPurchaseOrderRepo,
    @InjectPinoLogger(CreatePurchaseOrderCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreatePurchaseOrderCommand): Promise<PurchaseOrder> {
    this.logger.info(`Executing ${CreatePurchaseOrderCommand.name}`);
    return this.repo.createAsync({ name: command.name } as any);
  }
}
