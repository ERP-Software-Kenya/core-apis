import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { EPurchaseReturnStatus } from '../../../../../infrastructure/persistence/entities';
import { PURCHASE_RETURN_REPO } from '../../../../constants';
import { PurchaseReturn } from '../../domain';
import { IPurchaseReturnRepo } from '../../i-purchase-return.repo';
import { CancelPurchaseReturnCommand } from './cancel-purchase-return.command';

@CommandHandlerStrict(CancelPurchaseReturnCommand)
export class CancelPurchaseReturnCommandHandler implements ICommandHandler<CancelPurchaseReturnCommand, PurchaseReturn> {
  constructor(
    @Inject(PURCHASE_RETURN_REPO) private readonly repo: IPurchaseReturnRepo,
    @InjectPinoLogger(CancelPurchaseReturnCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CancelPurchaseReturnCommand): Promise<PurchaseReturn> {
    this.logger.info(`Executing ${CancelPurchaseReturnCommand.name} id=${command.id}`);
    const ret = await this.repo.getWithItemsAsync(command.id);
    if (!ret) throw new NotFoundException(`Purchase return ${command.id} not found`);
    if (ret.status === EPurchaseReturnStatus.Finalized) throw new BadRequestException('Finalized purchase returns cannot be cancelled');
    if (ret.status === EPurchaseReturnStatus.Cancelled) return ret;
    ret.status = EPurchaseReturnStatus.Cancelled;
    await this.repo.updateAsync({ ...ret, items: undefined });
    return this.repo.getWithItemsAsync(command.id);
  }
}
