import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { CATEGORY_REPO } from '../../../../constants';
import { ICategoryRepo } from '../..';
import { DeleteCategoryCommand } from './delete-category.command';

@CommandHandlerStrict(DeleteCategoryCommand)
export class DeleteCategoryCommandHandler implements ICommandHandler<DeleteCategoryCommand, boolean> {
  constructor(
    @Inject(CATEGORY_REPO) private readonly repo: ICategoryRepo,
    @InjectPinoLogger(DeleteCategoryCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: DeleteCategoryCommand): Promise<boolean> {
    this.logger.info(`Executing ${DeleteCategoryCommand.name} id=${command.id}`);
    await this.repo.deleteAsync(command.id);
    return true;
  }
}
