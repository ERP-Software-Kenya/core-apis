import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import {
  UnpublishedStockPurchaseOrderEntity,
  UnpublishedStockPurchaseItemEntity,
  UnpublishedStockPurchaseItemAllocationEntity,
  UnpublishedStockPOPaymentEntity,
} from '../../../../infrastructure/persistence/entities';
import {
  UnpublishedStockPurchaseOrder,
  UnpublishedStockPurchaseItem,
  UnpublishedStockPurchaseItemAllocation,
  UnpublishedStockPOPayment,
} from '../domain';
import {
  CreateUnpublishedStockPORequest,
  UpdateUnpublishedStockPORequest,
  ListUnpublishedStockPOsRequest,
  SearchUnpublishedStockPOsRequest,
  UnpublishedStockPOItemResponse,
  UnpublishedStockPOResponse,
} from '../models';
import { PurchaseOrderPaymentResponse } from '../../purchase-orders/models';
import {
  CreateUnpublishedStockPOCommand,
  UpdateUnpublishedStockPOCommand,
} from '../commands';
import {
  ListUnpublishedStockPOsQuery,
  SearchUnpublishedStockPOsQuery,
} from '../queries';

function computePaymentStatus(amountPaid: number, totalAmount: number): string {
  const paid  = Number(amountPaid ?? 0);
  const total = Number(totalAmount ?? 0);
  if (paid <= 0) return 'unpaid';
  if (paid >= total) return 'paid';
  return 'partial';
}

@Injectable()
export class UnpublishedStockPOProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, UnpublishedStockPurchaseOrderEntity, UnpublishedStockPurchaseOrder);
      createMap(mapper, UnpublishedStockPurchaseOrder, UnpublishedStockPurchaseOrderEntity);
      createMap(mapper, UnpublishedStockPurchaseItemEntity, UnpublishedStockPurchaseItem);
      createMap(mapper, UnpublishedStockPurchaseItem, UnpublishedStockPurchaseItemEntity);
      createMap(mapper, UnpublishedStockPurchaseItemAllocationEntity, UnpublishedStockPurchaseItemAllocation);
      createMap(mapper, UnpublishedStockPurchaseItemAllocation, UnpublishedStockPurchaseItemAllocationEntity);
      createMap(mapper, CreateUnpublishedStockPORequest, CreateUnpublishedStockPOCommand);
      createMap(mapper, CreateUnpublishedStockPOCommand, UnpublishedStockPurchaseOrder);
      createMap(mapper, UpdateUnpublishedStockPORequest, UpdateUnpublishedStockPOCommand);
      createMap(mapper, UpdateUnpublishedStockPOCommand, UnpublishedStockPurchaseOrder);
      createMap(mapper, UnpublishedStockPurchaseItem, UnpublishedStockPOItemResponse);
      createMap(mapper, UnpublishedStockPOPaymentEntity, UnpublishedStockPOPayment);
      createMap(mapper, UnpublishedStockPOPayment, UnpublishedStockPOPaymentEntity);
      createMap(mapper, UnpublishedStockPOPayment, PurchaseOrderPaymentResponse);
      createMap(mapper, ListUnpublishedStockPOsRequest, ListUnpublishedStockPOsQuery);
      createMap(mapper, SearchUnpublishedStockPOsRequest, SearchUnpublishedStockPOsQuery);
      createMap(
        mapper,
        UnpublishedStockPurchaseOrder,
        UnpublishedStockPOResponse,
        forMember(
          (dest) => dest.paymentStatus,
          mapFrom((src) => computePaymentStatus(src.amountPaid, src.totalAmount)),
        ),
      );
    };
  }
}
