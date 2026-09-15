import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { ESalesReturnStatus } from '../../../../../infrastructure/persistence/entities';
import { SALES_RETURN_REPO } from '../../../../constants';
import { SalesReturn } from '../../domain';
import { ISalesReturnRepo } from '../../i-sales-return.repo';
import { CancelSalesReturnCommand } from './cancel-sales-return.command';

@CommandHandlerStrict(CancelSalesReturnCommand)
export class CancelSalesReturnCommandHandler implements ICommandHandler<CancelSalesReturnCommand, SalesReturn> {
  constructor(
    @Inject(SALES_RETURN_REPO) private readonly repo: ISalesReturnRepo,
    @InjectPinoLogger(CancelSalesReturnCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CancelSalesReturnCommand): Promise<SalesReturn> {
    this.logger.info(`Executing ${CancelSalesReturnCommand.name} id=${command.id}`);
    const ret = await this.repo.getWithItemsAsync(command.id);
    if (!ret) throw new NotFoundException(`Sales return ${command.id} not found`);
    if (ret.status === ESalesReturnStatus.Finalized) throw new BadRequestException('Finalized sales returns cannot be cancelled');
    if (ret.status === ESalesReturnStatus.Cancelled) return ret;
    ret.status = ESalesReturnStatus.Cancelled;
    await this.repo.updateAsync({ ...ret, items: undefined });
    return this.repo.getWithItemsAsync(command.id);
  }
}
