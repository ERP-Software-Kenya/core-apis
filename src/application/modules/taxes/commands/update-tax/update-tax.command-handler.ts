import { Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { TAX_REPO } from '../../../../constants';
import { Tax } from '../../domain';
import { ITaxRepo } from '../../i-tax.repo';
import { UpdateTaxCommand } from './update-tax.command';

@CommandHandlerStrict(UpdateTaxCommand)
export class UpdateTaxCommandHandler implements ICommandHandler<UpdateTaxCommand, Tax> {
  constructor(
    @Inject(TAX_REPO) private readonly repo: ITaxRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(UpdateTaxCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateTaxCommand): Promise<Tax> {
    this.logger.info(`Executing ${UpdateTaxCommand.name} id=${command.id}`);
    const existing = await this.repo.getAsync(command.id);
    if (!existing) {
      throw new NotFoundException(`Tax ${command.id} not found`);
    }
    const patch = this.mapper.map(command, UpdateTaxCommand, Tax);
    (Object.keys(patch) as Array<keyof Tax>).forEach((key) => {
      if (patch[key] !== undefined && patch[key] !== existing[key]) {
        (existing as unknown as Record<string, unknown>)[key] = patch[key];
      }
    });
    return this.repo.updateAsync(existing);
  }
}
