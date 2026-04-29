import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { PURCHASE_ORDER_REPO } from '../../../../constants';
import { PurchaseOrder } from '../../domain';
import { IPurchaseOrderRepo } from '../..';
import { UpdatePurchaseOrderCommand } from './update-purchaseorder.command';

@CommandHandlerStrict(UpdatePurchaseOrderCommand)
export class UpdatePurchaseOrderCommandHandler implements ICommandHandler<UpdatePurchaseOrderCommand, PurchaseOrder> {
  constructor(
    @Inject(PURCHASE_ORDER_REPO) private readonly repo: IPurchaseOrderRepo,
    @InjectPinoLogger(UpdatePurchaseOrderCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdatePurchaseOrderCommand): Promise<PurchaseOrder> {
    this.logger.info(`Executing ${UpdatePurchaseOrderCommand.name} id=${command.id}`);
    const entity = await this.repo.getAsync(command.id);
    if(command.name) entity.name = command.name;
    return this.repo.updateAsync(entity);
  }
}
