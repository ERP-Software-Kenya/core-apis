import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { PRODUCT_REPO } from '../../../../constants';
import { IProductRepo } from '../..';
import { DeleteProductCommand } from './delete-product.command';

@CommandHandlerStrict(DeleteProductCommand)
export class DeleteProductCommandHandler implements ICommandHandler<DeleteProductCommand, boolean> {
  constructor(
    @Inject(PRODUCT_REPO) private readonly repo: IProductRepo,
    @InjectPinoLogger(DeleteProductCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: DeleteProductCommand): Promise<boolean> {
    this.logger.info(`Executing ${DeleteProductCommand.name} id=${command.id}`);
    await this.repo.deleteAsync(command.id);
    return true;
  }
}
