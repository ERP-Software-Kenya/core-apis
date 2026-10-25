import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ProductBranchPriceEntity } from 'src/infrastructure/persistence/entities';
import { ProductBranchPrice } from '../domain';
import { ProductBranchPriceResponse } from '../models';

@Injectable()
export class ProductBranchPriceProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, ProductBranchPriceEntity, ProductBranchPrice);
      createMap(mapper, ProductBranchPrice, ProductBranchPriceResponse);
    };
  }
}
