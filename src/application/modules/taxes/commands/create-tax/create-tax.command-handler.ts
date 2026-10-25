import { Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { TAX_REPO } from '../../../../constants';
import { Tax } from '../../domain';
import { ITaxRepo } from '../../i-tax.repo';
import { CreateTaxCommand } from './create-tax.command';

@CommandHandlerStrict(CreateTaxCommand)
export class CreateTaxCommandHandler implements ICommandHandler<CreateTaxCommand, Tax> {
  constructor(
    @Inject(TAX_REPO) private readonly repo: ITaxRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(CreateTaxCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateTaxCommand): Promise<Tax> {
    this.logger.info(`Executing ${CreateTaxCommand.name}`);
    const tax = this.mapper.map(command, CreateTaxCommand, Tax);
    tax.isActive = true;
    return this.repo.createAsync(tax);
  }
}
