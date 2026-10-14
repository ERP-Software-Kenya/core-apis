import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { PURCHASE_RETURN_REPO } from '../../../../constants';
import { PurchaseReturn } from '../../domain';
import { IPurchaseReturnRepo } from '../../i-purchase-return.repo';
import { FinalizePurchaseReturnCommand } from './finalize-purchase-return.command';

@CommandHandlerStrict(FinalizePurchaseReturnCommand)
export class FinalizePurchaseReturnCommandHandler
  implements ICommandHandler<FinalizePurchaseReturnCommand, PurchaseReturn>
{
  public constructor(
    @Inject(PURCHASE_RETURN_REPO) private readonly repo: IPurchaseReturnRepo,
    @InjectPinoLogger(FinalizePurchaseReturnCommandHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  public execute(command: FinalizePurchaseReturnCommand): Promise<PurchaseReturn> {
    this.logger.info(`Executing ${FinalizePurchaseReturnCommand.name} id=${command.id}`);
    return this.repo.finalizeAsync(command.id, command.performedById);
  }
}
