import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { BILL_REPO } from '../../../../constants';
import { Bill } from '../../domain';
import { IBillRepo } from '../../i-bill.repo';
import { EBillStatus } from '../../../../../infrastructure/persistence/entities/bill.entity';
import { UpdateBillCommand } from './update-bill.command';

@CommandHandlerStrict(UpdateBillCommand)
export class UpdateBillCommandHandler implements ICommandHandler<UpdateBillCommand, Bill> {
  constructor(
    @Inject(BILL_REPO) private readonly repo: IBillRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(UpdateBillCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateBillCommand): Promise<Bill> {
    this.logger.info(`Executing ${UpdateBillCommand.name} id=${command.id}`);
    const bill = await this.repo.getAsync(command.id);
    if (!bill) throw new NotFoundException(`Bill ${command.id} not found`);
    if (bill.status !== EBillStatus.INITIATED) {
      throw new BadRequestException(`Cannot update bill in ${bill.status} status`);
    }
    const patch  = this.mapper.map(command, UpdateBillCommand, Bill);
    const merged = Object.assign(bill, Object.fromEntries(
      Object.entries(patch as object).filter(([, val]) => val !== undefined),
    ));
    return this.repo.updateAsync(merged);
  }
}
