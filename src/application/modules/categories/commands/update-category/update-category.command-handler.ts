import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
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
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(UpdateCategoryCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateCategoryCommand): Promise<Category> {
    this.logger.info(`Executing ${UpdateCategoryCommand.name} id=${command.id}`);
    const existing = await this.repo.getAsync(command.id);
    const patch    = this.mapper.map(command, UpdateCategoryCommand, Category);

    (Object.keys(patch) as Array<keyof Category>).forEach((key) => {
      if (patch[key] !== undefined && patch[key] !== existing[key]) {
        (existing as unknown as Record<string, unknown>)[key] = patch[key];
      }
    });

    return this.repo.updateAsync(existing);
  }
}
