import { BadRequestException, Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { UNPUBLISHED_STOCK_PO_REPO } from '../../../../constants';
import { UnpublishedStockPurchaseOrder } from '../../domain';
import { IUnpublishedStockPORepo } from '../../i-unpublished-stock-po.repo';
import { UpdateUnpublishedStockPOCommand } from './update-unpublished-stock-po.command';
import { EPurchaseOrderStatus } from '../../../../shared/enums';

@CommandHandlerStrict(UpdateUnpublishedStockPOCommand)
export class UpdateUnpublishedStockPOCommandHandler
  implements ICommandHandler<UpdateUnpublishedStockPOCommand, UnpublishedStockPurchaseOrder>
{
  constructor(
    @Inject(UNPUBLISHED_STOCK_PO_REPO) private readonly repo: IUnpublishedStockPORepo,
    @InjectPinoLogger(UpdateUnpublishedStockPOCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateUnpublishedStockPOCommand): Promise<UnpublishedStockPurchaseOrder> {
    this.logger.info(`Executing ${UpdateUnpublishedStockPOCommand.name} id=${command.id}`);
    if (command.status && ![EPurchaseOrderStatus.Ordered, EPurchaseOrderStatus.Cancelled].includes(command.status)) {
      throw new BadRequestException(
        'Status transitions are managed by receive and allocate operations',
      );
    }
    return this.repo.updateDraftAsync(command.id, {
      expectedAt: command.expectedAt,
      notes: command.notes,
      status: command.status,
    });
  }
}
