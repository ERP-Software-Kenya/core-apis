import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { EBillStatus } from '../../../../../infrastructure/persistence/entities';
import { BILL_REPO } from '../../../../constants';
import { BillCompletionService } from '../../../../shared/services/bill-completion.service';
import { Bill } from '../../domain';
import { IBillRepo } from '../..';
import { TransitionBillStatusCommand } from './transition-bill-status.command';

/** Terminal states cannot be re-opened. */
const ALLOWED_FROM: Record<EBillStatus, EBillStatus[]> = {
  [EBillStatus.Initiated]: [EBillStatus.Draft, EBillStatus.Completed, EBillStatus.Cancelled],
  [EBillStatus.Draft]:     [EBillStatus.Initiated, EBillStatus.Completed, EBillStatus.Cancelled],
  [EBillStatus.Completed]: [],
  [EBillStatus.Cancelled]: [],
};

@CommandHandlerStrict(TransitionBillStatusCommand)
export class TransitionBillStatusCommandHandler implements ICommandHandler<TransitionBillStatusCommand, Bill> {
  constructor(
    @Inject(BILL_REPO) private readonly repo: IBillRepo,
    private readonly completionService: BillCompletionService,
    @InjectPinoLogger(TransitionBillStatusCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: TransitionBillStatusCommand): Promise<Bill> {
    this.logger.info(`Executing ${TransitionBillStatusCommand.name}`);
    const bill = await this.repo.getAsync(command.id);
    if (!bill) {
      throw new NotFoundException(`Bill ${command.id} not found`);
    }

    if (bill.status !== command.status && !ALLOWED_FROM[bill.status]?.includes(command.status)) {
      throw new BadRequestException(`Cannot move bill from ${bill.status} to ${command.status}`);
    }

    if (command.status === EBillStatus.Completed) {
      return this.completionService.completeBill(bill.id, command.performedById, false);
    }

    bill.status = command.status;
    if (command.paymentMethod) {
      bill.paymentMethod = command.paymentMethod;
    }

    await this.repo.updateAsync({ ...bill, items: undefined });
    return this.repo.getAsync(command.id);
  }
}
