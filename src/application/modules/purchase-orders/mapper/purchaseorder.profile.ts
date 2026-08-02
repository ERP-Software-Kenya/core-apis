import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { PurchaseOrderEntity } from '../../../../infrastructure/persistence/entities';
import { PurchaseOrder } from '../domain';
import { CreatePurchaseOrderRequest, PurchaseOrderResponse, UpdatePurchaseOrderRequest } from '../models';
import { CreatePurchaseOrderCommand, UpdatePurchaseOrderCommand } from '../commands';

@Injectable()
export class PurchaseOrderProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, PurchaseOrderEntity, PurchaseOrder);
      createMap(mapper, PurchaseOrder, PurchaseOrderEntity);
      createMap(mapper, CreatePurchaseOrderRequest, CreatePurchaseOrderCommand);
      createMap(mapper, CreatePurchaseOrderCommand, PurchaseOrder);
      createMap(mapper, UpdatePurchaseOrderRequest, UpdatePurchaseOrderCommand);
      createMap(mapper, UpdatePurchaseOrderCommand, PurchaseOrder);
      createMap(mapper, PurchaseOrder, PurchaseOrderResponse);
    };
  }
}
