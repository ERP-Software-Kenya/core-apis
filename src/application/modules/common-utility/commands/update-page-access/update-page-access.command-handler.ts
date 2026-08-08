import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { PAGE_ACCESS_REPO, IPageAccessRepo } from '../../i-page-access.repo';
import { UpdatePageAccessCommand } from './update-page-access.command';

@CommandHandlerStrict(UpdatePageAccessCommand)
export class UpdatePageAccessCommandHandler
  implements ICommandHandler<UpdatePageAccessCommand, void>
{
  public constructor(
    @Inject(PAGE_ACCESS_REPO) private readonly repo: IPageAccessRepo,
    @InjectPinoLogger(UpdatePageAccessCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdatePageAccessCommand): Promise<void> {
    this.logger.info(`Executing ${UpdatePageAccessCommand.name}`);
    await this.repo.upsertManyAsync(command.configs);
  }
}
