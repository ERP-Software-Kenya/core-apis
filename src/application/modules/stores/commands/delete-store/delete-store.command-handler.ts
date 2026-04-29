import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { STORE_REPO } from '../../../../constants';
import { IStoreRepo } from '../..';
import { DeleteStoreCommand } from './delete-store.command';

@CommandHandlerStrict(DeleteStoreCommand)
export class DeleteStoreCommandHandler implements ICommandHandler<DeleteStoreCommand, boolean> {
  constructor(
    @Inject(STORE_REPO) private readonly repo: IStoreRepo,
    @InjectPinoLogger(DeleteStoreCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: DeleteStoreCommand): Promise<boolean> {
    this.logger.info(`Executing ${DeleteStoreCommand.name} id=${command.id}`);
    await this.repo.deleteAsync(command.id);
    return true;
  }
}
