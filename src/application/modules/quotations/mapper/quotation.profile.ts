import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { QuotationEntity } from '../../../../infrastructure/persistence/entities/quotation.entity';
import { QuotationItemEntity } from '../../../../infrastructure/persistence/entities/quotation-item.entity';
import { Quotation, QuotationItem } from '../domain';
import { QuotationItemResponse, QuotationResponse } from '../models';

@Injectable()
export class QuotationProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, QuotationEntity, Quotation);
      createMap(mapper, Quotation, QuotationEntity);
      createMap(mapper, QuotationItemEntity, QuotationItem);
      createMap(mapper, QuotationItem, QuotationItemEntity);
      createMap(mapper, QuotationItem, QuotationItemResponse);
      createMap(mapper, Quotation, QuotationResponse);
    };
  }
}
