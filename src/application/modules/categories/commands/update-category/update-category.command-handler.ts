import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { CATEGORY_REPO } from '../../../../constants';
import { Category } from '../../domain';
import { ICategoryRepo } from '../..';
import { UpdateCategoryCommand } from './update-category.command';

@CommandHandlerStrict(UpdateCategoryCommand)
export class UpdateCategoryCommandHandler implements ICommandHandler<UpdateCategoryCommand, Category> {
  constructor(
    @Inject(CATEGORY_REPO) private readonly repo: ICategoryRepo,
    @InjectPinoLogger(UpdateCategoryCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateCategoryCommand): Promise<Category> {
    this.logger.info(`Executing ${UpdateCategoryCommand.name} id=${command.id}`);
    const entity = await this.repo.getAsync(command.id);
    if(command.name) entity.name = command.name;
    return this.repo.updateAsync(entity);
  }
}
