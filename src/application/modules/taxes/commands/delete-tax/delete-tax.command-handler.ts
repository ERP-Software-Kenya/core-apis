import { Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { TAX_REPO } from '../../../../constants';
import { ITaxRepo } from '../../i-tax.repo';
import { DeleteTaxCommand } from './delete-tax.command';

@CommandHandlerStrict(DeleteTaxCommand)
export class DeleteTaxCommandHandler implements ICommandHandler<DeleteTaxCommand, boolean> {
  constructor(
    @Inject(TAX_REPO) private readonly repo: ITaxRepo,
    @InjectPinoLogger(DeleteTaxCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: DeleteTaxCommand): Promise<boolean> {
    this.logger.info(`Executing ${DeleteTaxCommand.name} id=${command.id}`);
    const result = await this.repo.softDeleteAsync(command.id);
    if (!result) {
      throw new NotFoundException(`Tax ${command.id} not found`);
    }
    return result;
  }
}
