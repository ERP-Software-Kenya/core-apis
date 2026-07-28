import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from 'src/common';
import { LOCATION_REPO } from '../../../../constants';
import { ILocationRepo } from '../../i-location.repo';
import { DeleteLocationCommand } from './delete-location.command';

@CommandHandlerStrict(DeleteLocationCommand)
export class DeleteLocationCommandHandler implements ICommandHandler<DeleteLocationCommand, boolean> {
  constructor(
    @Inject(LOCATION_REPO) private readonly repo: ILocationRepo,
    @InjectPinoLogger(DeleteLocationCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: DeleteLocationCommand): Promise<boolean> {
    this.logger.info(`Executing ${DeleteLocationCommand.name} id=${command.id}`);
    return this.repo.deleteAsync(command.id);
  }
}
