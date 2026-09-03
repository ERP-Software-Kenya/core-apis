import { createMap, Mapper, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../../../../infrastructure/persistence/entities/order.entity';
import { OrderItemEntity } from '../../../../infrastructure/persistence/entities/order-item.entity';
import { Order, OrderItem } from '../domain';
import { CreateOrderRequest, OrderResponse, SearchOrdersRequest } from '../models';
import { OrderItemResponse } from '../models/responses/order.response';
import { CreateOrderCommand } from '../commands';
import { SearchOrdersQuery } from '../queries/search-orders';

@Injectable()
export class OrderProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, OrderEntity, Order);
      createMap(mapper, Order, OrderEntity);
      createMap(mapper, OrderItemEntity, OrderItem);
      createMap(mapper, OrderItem, OrderItemResponse);
      createMap(
        mapper,
        CreateOrderRequest,
        CreateOrderCommand,
        forMember(
          (d) => d.items,
          mapFrom((s) =>
            (s.items ?? []).map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              taxAmount: item.taxAmount,
              packQuantity: item.packQuantity,
              packSizeSnapshot: item.packSizeSnapshot,
            })),
          ),
        ),
      );
      createMap(mapper, Order, OrderResponse);
      createMap(mapper, SearchOrdersRequest, SearchOrdersQuery);
    };
  }
}
