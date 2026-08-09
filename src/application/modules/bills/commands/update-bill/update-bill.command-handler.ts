import { Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { BILL_REPO } from '../../../../constants';
import { Bill } from '../../domain';
import { IBillRepo } from '../..';
import { UpdateBillCommand } from './update-bill.command';

const HEADER_FIELDS = ['locationId', 'customerId', 'walkInName', 'walkInPhone', 'walkInGstin', 'notes'] as const;

@CommandHandlerStrict(UpdateBillCommand)
export class UpdateBillCommandHandler implements ICommandHandler<UpdateBillCommand, Bill> {
  constructor(
    @Inject(BILL_REPO) private readonly repo: IBillRepo,
    @InjectPinoLogger(UpdateBillCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateBillCommand): Promise<Bill> {
    this.logger.info(`Executing ${UpdateBillCommand.name}`);
    const bill = await this.repo.getAsync(command.id);
    if (!bill) {
      throw new NotFoundException(`Bill ${command.id} not found`);
    }

    for (const field of HEADER_FIELDS) {
      if (command[field] !== undefined) {
        Object.assign(bill, { [field]: command[field] ?? null });
      }
    }

    // Items are untouched here — saving them back would pointlessly re-cascade.
    await this.repo.updateAsync({ ...bill, items: undefined });
    return this.repo.getAsync(command.id);
  }
}
