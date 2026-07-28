import { Inject, Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { AutoMap } from '@automapper/classes';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { EProductLogAction } from '../enums/e-product-log-action.enum';
import { PRODUCT_LOG_REPO } from '../../constants';
import { IProductLogRepo } from 'src/application/modules/product-logs';
import { ProductLog } from '../../../application/modules/product-logs/domain';

export class ProductLogEntry {
  @AutoMap(() => String) public action: EProductLogAction;
  @AutoMap() public organizationId: string;
  @AutoMap() public productId: string;
  @AutoMap() public performedById?: string;
  @AutoMap() public inventoryId?: string;
  @AutoMap() public locationId?: string;
  @AutoMap() public changedFields?: Array<{ field: string; oldValue: unknown; newValue: unknown }>;
  @AutoMap() public metadata?: Record<string, unknown>;
}

@Injectable()
export class ProductActivityLogger {
  constructor(
    @Inject(PRODUCT_LOG_REPO) private readonly repo: IProductLogRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(ProductActivityLogger.name) private readonly logger: PinoLogger,
  ) {}

  public async log(entry: ProductLogEntry): Promise<void> {
    try {
      const log = this.mapper.map(entry, ProductLogEntry, ProductLog);
      await this.repo.createAsync(log);
    } catch (err) {
      this.logger.error({ err }, 'Failed to write product activity log');
    }
  }

  public async logBatch(entries: ProductLogEntry[]): Promise<void> {
    await Promise.all(entries.map((entry) => this.log(entry)));
  }
}
