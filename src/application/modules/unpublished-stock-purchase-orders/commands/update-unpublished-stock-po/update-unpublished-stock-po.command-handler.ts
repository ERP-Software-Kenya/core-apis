import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { UNPUBLISHED_STOCK_PO_REPO } from '../../../../constants';
import { UnpublishedStockPurchaseOrder } from '../../domain';
import { IUnpublishedStockPORepo } from '../../i-unpublished-stock-po.repo';
import { UpdateUnpublishedStockPOCommand } from './update-unpublished-stock-po.command';

@CommandHandlerStrict(UpdateUnpublishedStockPOCommand)
export class UpdateUnpublishedStockPOCommandHandler
  implements ICommandHandler<UpdateUnpublishedStockPOCommand, UnpublishedStockPurchaseOrder>
{
  constructor(
    @Inject(UNPUBLISHED_STOCK_PO_REPO) private readonly repo: IUnpublishedStockPORepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(UpdateUnpublishedStockPOCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateUnpublishedStockPOCommand): Promise<UnpublishedStockPurchaseOrder> {
    this.logger.info(`Executing ${UpdateUnpublishedStockPOCommand.name} id=${command.id}`);
    const existing = await this.repo.getAsync(command.id);
    const patch    = this.mapper.map(command, UpdateUnpublishedStockPOCommand, UnpublishedStockPurchaseOrder);
    (Object.keys(patch) as Array<keyof UnpublishedStockPurchaseOrder>).forEach((key) => {
      if (patch[key] !== undefined) {
        (existing as unknown as Record<string, unknown>)[key] = patch[key];
      }
    });
    return this.repo.updateAsync(existing);
  }
}
