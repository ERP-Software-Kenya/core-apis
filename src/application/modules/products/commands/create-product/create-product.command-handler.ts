import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { PRODUCT_REPO } from '../../../../constants';
import { Product } from '../../domain';
import { IProductRepo } from '../..';
import { CreateProductCommand } from './create-product.command';

@CommandHandlerStrict(CreateProductCommand)
export class CreateProductCommandHandler implements ICommandHandler<CreateProductCommand, Product> {
  constructor(
    @Inject(PRODUCT_REPO) private readonly repo: IProductRepo,
    @InjectPinoLogger(CreateProductCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateProductCommand): Promise<Product> {
    this.logger.info(`Executing ${CreateProductCommand.name}`);
    return this.repo.createAsync({ name: command.name } as Product);
  }
}
