import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { PURCHASE_ITEM_REPO } from '../../../../constants';
import { PurchaseItem } from '../../domain';
import { IPurchaseItemRepo } from '../..';
import { CreatePurchaseItemCommand } from './create-purchase-item.command';

@CommandHandlerStrict(CreatePurchaseItemCommand)
export class CreatePurchaseItemCommandHandler implements ICommandHandler<CreatePurchaseItemCommand, PurchaseItem> {
  constructor(
    @Inject(PURCHASE_ITEM_REPO) private readonly repo: IPurchaseItemRepo,
    @InjectPinoLogger(CreatePurchaseItemCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreatePurchaseItemCommand): Promise<PurchaseItem> {
    this.logger.info(`Executing ${CreatePurchaseItemCommand.name}`);
    const totalPrice = command.quantity * command.unitPrice;
    return this.repo.createAsync({ ...command, totalPrice } as any);
  }
}
