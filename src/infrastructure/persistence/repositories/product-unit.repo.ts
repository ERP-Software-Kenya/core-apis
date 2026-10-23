import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter } from '../../../common';
import { ProductUnitEntity } from '../entities';
import { ProductUnit } from '../../../application/modules/products/domain';
import { IProductUnitRepo, ProductUnitFilter } from 'src/application/modules/products/i-product-unit.repo';

@Injectable()
export class ProductUnitRepo
  extends BaseRepo<ProductUnitEntity, ProductUnit, string, Filter<ProductUnitFilter>, Filter<ProductUnitFilter>>
  implements IProductUnitRepo
{
  constructor(
    @InjectRepository(ProductUnitEntity) internalRepo: Repository<ProductUnitEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(ProductUnitRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, ProductUnitEntity, ProductUnit);
  }

  public override get idColumnName(): keyof ProductUnitEntity {
    return 'id';
  }

  public async syncForProductAsync(productId: string, unitIds: string[], defaultUnitId?: string): Promise<void> {
    this.logger.info(`Syncing units for product ${productId}`);
    await this.internalRepo.delete({ productId });
    if (!unitIds.length) return;
    const entities = unitIds.map((unitId) =>
      this.internalRepo.create({ productId, unitId, isDefault: unitId === defaultUnitId }),
    );
    await this.internalRepo.save(entities);
  }
}
