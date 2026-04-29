import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { CATEGORY_REPO } from '../../../../constants';
import { Category } from '../../domain';
import { ICategoryRepo } from '../..';
import { CreateCategoryCommand } from './create-category.command';

@CommandHandlerStrict(CreateCategoryCommand)
export class CreateCategoryCommandHandler implements ICommandHandler<CreateCategoryCommand, Category> {
  constructor(
    @Inject(CATEGORY_REPO) private readonly repo: ICategoryRepo,
    @InjectPinoLogger(CreateCategoryCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateCategoryCommand): Promise<Category> {
    this.logger.info(`Executing ${CreateCategoryCommand.name}`);
    return this.repo.createAsync({ name: command.name } as Category);
  }
}
