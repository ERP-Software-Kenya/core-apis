import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { PurchaseItemAllocationEntity, PurchaseOrderEntity, PurchaseOrderPaymentEntity } from '../../../../infrastructure/persistence/entities';
import { PurchaseItemAllocation, PurchaseOrder, PurchaseOrderPayment } from '../domain';
import { CreatePurchaseOrderRequest, ListPurchaseOrdersRequest, PurchaseOrderPaymentResponse, PurchaseOrderResponse, SearchPurchaseOrdersRequest, UpdatePurchaseOrderRequest } from '../models';
import { CreatePurchaseOrderCommand, UpdatePurchaseOrderCommand } from '../commands';
import { ListPurchaseOrdersQuery, SearchPurchaseOrdersQuery } from '../queries';

function computePaymentStatus(amountPaid: number, totalAmount: number): string {
  const paid = Number(amountPaid ?? 0);
  const total = Number(totalAmount ?? 0);
  if (paid <= 0) return 'unpaid';
  if (paid >= total) return 'paid';
  return 'partial';
}

@Injectable()
export class PurchaseOrderProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, PurchaseOrderEntity, PurchaseOrder);
      createMap(mapper, PurchaseOrder, PurchaseOrderEntity);
      createMap(mapper, PurchaseItemAllocationEntity, PurchaseItemAllocation);
      createMap(mapper, PurchaseItemAllocation, PurchaseItemAllocationEntity);
      createMap(mapper, PurchaseOrderPaymentEntity, PurchaseOrderPayment);
      createMap(mapper, PurchaseOrderPayment, PurchaseOrderPaymentEntity);
      createMap(mapper, PurchaseOrderPayment, PurchaseOrderPaymentResponse);
      createMap(mapper, SearchPurchaseOrdersRequest, SearchPurchaseOrdersQuery);
      createMap(mapper, ListPurchaseOrdersRequest, ListPurchaseOrdersQuery);
      createMap(mapper, CreatePurchaseOrderRequest, CreatePurchaseOrderCommand);
      createMap(mapper, CreatePurchaseOrderCommand, PurchaseOrder);
      createMap(mapper, UpdatePurchaseOrderRequest, UpdatePurchaseOrderCommand);
      createMap(mapper, UpdatePurchaseOrderCommand, PurchaseOrder);
      createMap(
        mapper,
        PurchaseOrder,
        PurchaseOrderResponse,
        forMember(
          (dest) => dest.paymentStatus,
          mapFrom((src) => computePaymentStatus(src.amountPaid, src.totalAmount)),
        ),
      );
    };
  }
}
