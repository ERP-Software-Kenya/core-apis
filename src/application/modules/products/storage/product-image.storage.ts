import { Injectable } from '@nestjs/common';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import {isNilOrEmpty, R2FileStorage,R2StorageOptions } from '../../../../common';

@Injectable()
export class ProductImageStorage extends R2FileStorage {
  public get isPublic(): boolean {
    return !isNilOrEmpty(this.storageOptions.publicUrlBase);
  }

  constructor(
    options: R2StorageOptions,
    @InjectPinoLogger(ProductImageStorage.name) logger: PinoLogger,
    @InjectSentry() sentry: SentryService,
  ) {
    super(options, logger, sentry);
  }
}
