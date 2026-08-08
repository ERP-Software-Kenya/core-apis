import { ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from 'src/common';
import { DRIVER_REPO } from 'src/application/constants';
import { IDriverRepo } from '../../repositories/i-driver.repo';
import { DeleteDriverCommand } from './delete-driver.command';

@CommandHandlerStrict(DeleteDriverCommand)
export class DeleteDriverHandler implements ICommandHandler<DeleteDriverCommand, boolean> {
  public constructor(
    @Inject(DRIVER_REPO) private readonly driverRepo: IDriverRepo,
    @InjectPinoLogger(DeleteDriverHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: DeleteDriverCommand): Promise<boolean> {
    this.logger.info(`Executing Command '${DeleteDriverCommand.name}'`);
    const existing = await this.driverRepo.getAsync(command.id);
    if (!existing) {
      throw new NotFoundException(`Driver with ID ${command.id} not found`);
    }
    return this.driverRepo.deleteAsync(command.id);
  }
}
