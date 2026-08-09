import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { EBillStatus } from '../../../../../infrastructure/persistence/entities';
import { BILL_REPO } from '../../../../constants';
import { Bill } from '../../domain';
import { applyBillTotals, generateBillNumber } from '../../helpers';
import { IBillRepo } from '../..';
import { CreateBillCommand } from './create-bill.command';

@CommandHandlerStrict(CreateBillCommand)
export class CreateBillCommandHandler implements ICommandHandler<CreateBillCommand, Bill> {
  constructor(
    @Inject(BILL_REPO) private readonly repo: IBillRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(CreateBillCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateBillCommand): Promise<Bill> {
    this.logger.info(`Executing ${CreateBillCommand.name}`);
    const bill = this.mapper.map(command, CreateBillCommand, Bill);
    bill.billNumber = generateBillNumber();
    bill.status     = EBillStatus.Initiated;
    applyBillTotals(bill);
    return this.repo.createAsync(bill);
  }
}
