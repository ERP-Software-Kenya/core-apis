import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { BILL_REPO } from '../../../../constants';
import { IBillRepo } from '../../i-bill.repo';
import { EBillStatus } from '../../../../../infrastructure/persistence/entities/bill.entity';
import { DeleteBillCommand } from './delete-bill.command';

@CommandHandlerStrict(DeleteBillCommand)
export class DeleteBillCommandHandler implements ICommandHandler<DeleteBillCommand, boolean> {
  constructor(
    @Inject(BILL_REPO) private readonly repo: IBillRepo,
    @InjectPinoLogger(DeleteBillCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: DeleteBillCommand): Promise<boolean> {
    this.logger.info(`Executing ${DeleteBillCommand.name} id=${command.id}`);
    const bill = await this.repo.getAsync(command.id);
    if (!bill) throw new NotFoundException(`Bill ${command.id} not found`);
    if (bill.status === EBillStatus.COMPLETED || bill.status === EBillStatus.CANCELLED) {
      throw new BadRequestException(`Cannot delete bill in ${bill.status} status`);
    }
    return this.repo.deleteAsync(command.id);
  }
}
