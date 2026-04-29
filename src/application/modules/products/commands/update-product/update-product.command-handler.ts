import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
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
    @InjectPinoLogger(UpdateProductCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateProductCommand): Promise<Product> {
    this.logger.info(`Executing ${UpdateProductCommand.name} id=${command.id}`);
    const entity = await this.repo.getAsync(command.id);
    if(command.name) entity.name = command.name;
    return this.repo.updateAsync(entity);
  }
}
