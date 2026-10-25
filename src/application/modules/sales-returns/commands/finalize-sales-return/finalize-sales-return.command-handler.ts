import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { SALES_RETURN_REPO } from '../../../../constants';
import { SalesReturn } from '../../domain';
import { ISalesReturnRepo } from '../../i-sales-return.repo';
import { FinalizeSalesReturnCommand } from './finalize-sales-return.command';

@CommandHandlerStrict(FinalizeSalesReturnCommand)
export class FinalizeSalesReturnCommandHandler
  implements ICommandHandler<FinalizeSalesReturnCommand, SalesReturn>
{
  public constructor(
    @Inject(SALES_RETURN_REPO) private readonly repo: ISalesReturnRepo,
    @InjectPinoLogger(FinalizeSalesReturnCommandHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  public execute(command: FinalizeSalesReturnCommand): Promise<SalesReturn> {
    this.logger.info(`Executing ${FinalizeSalesReturnCommand.name} id=${command.id}`);
    return this.repo.finalizeAsync(command.id, command.performedById);
  }
}
