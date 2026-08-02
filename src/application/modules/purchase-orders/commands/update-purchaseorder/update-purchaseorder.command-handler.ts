import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
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
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(UpdatePurchaseOrderCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdatePurchaseOrderCommand): Promise<PurchaseOrder> {
    this.logger.info(`Executing ${UpdatePurchaseOrderCommand.name} id=${command.id}`);
    const existing = await this.repo.getAsync(command.id);
    const patch    = this.mapper.map(command, UpdatePurchaseOrderCommand, PurchaseOrder);
    (Object.keys(patch) as Array<keyof PurchaseOrder>).forEach((key) => {
      if (patch[key] !== undefined) {
        (existing as unknown as Record<string, unknown>)[key] = patch[key];
      }
    });
    return this.repo.updateAsync(existing);
  }
}
