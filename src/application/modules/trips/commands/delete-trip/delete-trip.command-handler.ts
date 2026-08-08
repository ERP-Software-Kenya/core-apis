import { ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from 'src/common';
import { TRIP_REPO } from 'src/application/constants';
import { ITripRepo } from '../../repositories/i-trip.repo';
import { DeleteTripCommand } from './delete-trip.command';

@CommandHandlerStrict(DeleteTripCommand)
export class DeleteTripHandler implements ICommandHandler<DeleteTripCommand, boolean> {
  public constructor(
    @Inject(TRIP_REPO) private readonly tripRepo: ITripRepo,
    @InjectPinoLogger(DeleteTripHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: DeleteTripCommand): Promise<boolean> {
    this.logger.info(`Executing Command '${DeleteTripCommand.name}'`);
    const existing = await this.tripRepo.getAsync(command.id);
    if (!existing) {
      throw new NotFoundException(`Trip with ID ${command.id} not found`);
    }
    return this.tripRepo.deleteAsync(command.id);
  }
}
