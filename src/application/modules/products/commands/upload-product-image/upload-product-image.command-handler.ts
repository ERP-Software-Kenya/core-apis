import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { PRODUCT_REPO } from '../../../../constants';
import { Product } from '../../domain';
import { IProductRepo } from '../..';
import { ProductImageStorage } from '../../storage';
import { UploadProductImageCommand } from './upload-product-image.command';

@CommandHandlerStrict(UploadProductImageCommand)
export class UploadProductImageCommandHandler
  implements ICommandHandler<UploadProductImageCommand, Product> {
  constructor(
    @Inject(PRODUCT_REPO) private readonly repo: IProductRepo,
    private readonly storage: ProductImageStorage,
    @InjectPinoLogger(UploadProductImageCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UploadProductImageCommand): Promise<Product> {
    this.logger.info(`Uploading image for product ${command.productId}`);
    const objectKey = `products/${command.productId}/image`;
    const storedKey = await this.storage.writeAsync(objectKey, command.buffer, command.mimeType);
    const imageUrl = await this.storage.getUrlAsync(storedKey);
    const product = await this.repo.getAsync(command.productId);
    product.imageUrl = imageUrl;
    return this.repo.updateAsync(product);
  }
}
