import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { IBaseRepo, QueryHandlerStrict } from '../../../../../common';
import { PRODUCT_IMAGE_REPO } from '../../../../constants';
import { ProductImage } from '../../domain';
import { ProductImageResponse } from '../../models';
import { ProductImageStorage } from '../../storage';
import { ListProductImagesQuery } from './list-product-images.query';

@QueryHandlerStrict(ListProductImagesQuery)
export class ListProductImagesQueryHandler implements IQueryHandler<ListProductImagesQuery, ProductImageResponse[]> {
  constructor(
    @Inject(PRODUCT_IMAGE_REPO) private readonly imageRepo: IBaseRepo<ProductImage, string>,
    private readonly storage: ProductImageStorage,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(ListProductImagesQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListProductImagesQuery): Promise<ProductImageResponse[]> {
    this.logger.info(`Listing images for product ${query.productId}`);
    const images = await this.imageRepo.allAsync({ productId: query.productId } as Partial<ProductImage>);
    return Promise.all(
      images.map(async (img) => {
        const response = this.mapper.map(img, ProductImage, ProductImageResponse);
        response.url   = await this.storage.getUrlAsync(img.storageKey);
        return response;
      }),
    );
  }
}
