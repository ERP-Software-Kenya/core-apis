import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { ProductImageUploadUrlResponse } from '../../models';
import { ProductImageStorage } from '../../storage';
import { GetProductImageUploadUrlQuery } from './get-product-image-upload-url.query';

const PRESIGNED_URL_TTL_SECONDS = 3600;

@QueryHandlerStrict(GetProductImageUploadUrlQuery)
export class GetProductImageUploadUrlQueryHandler
  implements IQueryHandler<GetProductImageUploadUrlQuery, ProductImageUploadUrlResponse> {
  constructor(
    private readonly storage: ProductImageStorage,
    @InjectPinoLogger(GetProductImageUploadUrlQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetProductImageUploadUrlQuery): Promise<ProductImageUploadUrlResponse> {
    this.logger.info(`Generating presigned upload URL for product ${query.productId}`);
    const key = `products/${query.productId}/image`;
    const uploadUrl = await this.storage.generateUploadUrlAsync(key, query.mimeType, PRESIGNED_URL_TTL_SECONDS);
    const publicUrl = await this.storage.getUrlAsync(key);
    return { uploadUrl, key, publicUrl };
  }
}
