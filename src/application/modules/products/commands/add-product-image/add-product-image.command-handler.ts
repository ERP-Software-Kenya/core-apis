import { Inject } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict, IBaseRepo } from '../../../../../common';
import { PRODUCT_IMAGE_REPO } from '../../../../constants';
import { ProductImage } from '../../domain';
import { ProductImageResponse } from '../../models';
import { ProductImageStorage } from '../../storage';
import { AddProductImageCommand } from './add-product-image.command';

@CommandHandlerStrict(AddProductImageCommand)
export class AddProductImageCommandHandler implements ICommandHandler<AddProductImageCommand, ProductImageResponse> {
  constructor(
    @Inject(PRODUCT_IMAGE_REPO) private readonly imageRepo: IBaseRepo<ProductImage, string>,
    private readonly storage: ProductImageStorage,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(AddProductImageCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: AddProductImageCommand): Promise<ProductImageResponse> {
    this.logger.info(`Adding image for product ${command.productId}`);
    const objectKey = `products/${command.productId}/images/${Date.now()}`;
    const storedKey = await this.storage.writeAsync(objectKey, command.buffer, command.mimeType);
    const image = this.mapper.map(command, AddProductImageCommand, ProductImage);
    image.storageKey = storedKey;
    image.sortOrder  = image.sortOrder ?? 0;
    image.isPrimary  = image.isPrimary ?? false;
    const saved    = await this.imageRepo.createAsync(image);
    const response = this.mapper.map(saved, ProductImage, ProductImageResponse);
    response.url   = await this.storage.getUrlAsync(storedKey);
    return response;
  }
}
