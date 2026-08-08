import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
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
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(CreatePurchaseItemCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreatePurchaseItemCommand): Promise<PurchaseItem> {
    this.logger.info(`Executing ${CreatePurchaseItemCommand.name}`);
    const item = this.mapper.map(command, CreatePurchaseItemCommand, PurchaseItem);
    return this.repo.createAsync(item);
  }
}
