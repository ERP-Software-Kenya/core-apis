import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { PRODUCT_REPO } from '../../../../constants';
import { Product } from '../../domain';
import { IProductRepo } from '../..';
import { UpdateProductCommand } from './update-product.command';

@CommandHandlerStrict(UpdateProductCommand)
export class UpdateProductCommandHandler implements ICommandHandler<UpdateProductCommand, Product> {
  constructor(
    @Inject(PRODUCT_REPO) private readonly repo: IProductRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(UpdateProductCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateProductCommand): Promise<Product> {
    this.logger.info(`Executing ${UpdateProductCommand.name} id=${command.id}`);
    const existing = await this.repo.getAsync(command.id);
    const patch = this.mapper.map(command, UpdateProductCommand, Product);
    (Object.keys(patch) as Array<keyof Product>).forEach((key) => {
      if (patch[key] !== undefined) {
        (existing as unknown as Record<string, unknown>)[key] = patch[key];
      }
    });
    return this.repo.updateAsync(existing);
  }
}
