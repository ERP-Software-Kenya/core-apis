import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { PURCHASE_ORDER_REPO } from '../../../../constants';
import { IPurchaseOrderRepo } from '../..';
import { DeletePurchaseOrderCommand } from './delete-purchaseorder.command';

@CommandHandlerStrict(DeletePurchaseOrderCommand)
export class DeletePurchaseOrderCommandHandler implements ICommandHandler<DeletePurchaseOrderCommand, boolean> {
  constructor(
    @Inject(PURCHASE_ORDER_REPO) private readonly repo: IPurchaseOrderRepo,
    @InjectPinoLogger(DeletePurchaseOrderCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: DeletePurchaseOrderCommand): Promise<boolean> {
    this.logger.info(`Executing ${DeletePurchaseOrderCommand.name} id=${command.id}`);
    await this.repo.deleteAsync(command.id);
    return true;
  }
}
