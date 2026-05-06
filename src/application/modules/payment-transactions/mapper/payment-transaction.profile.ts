import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { PaymentTransactionEntity } from '../../../../infrastructure/persistence/entities';
import { PaymentTransaction } from '../domain';
import { CreatePaymentTransactionRequest, SearchPaymentTransactionsRequest, ListPaymentTransactionsRequest, PaymentTransactionResponse, UpdatePaymentTransactionRequest } from '../models';
import { CreatePaymentTransactionCommand, UpdatePaymentTransactionCommand } from '../commands';
import { SearchPaymentTransactionsQuery, ListPaymentTransactionsQuery } from '../queries';

@Injectable()
export class PaymentTransactionProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) { super(mapper); }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, PaymentTransactionEntity, PaymentTransaction);
      createMap(mapper, PaymentTransaction, PaymentTransactionEntity);
      createMap(mapper, PaymentTransaction, PaymentTransactionResponse);
      
      createMap(mapper, CreatePaymentTransactionRequest, CreatePaymentTransactionCommand);
      createMap(mapper, UpdatePaymentTransactionRequest, UpdatePaymentTransactionCommand);
      createMap(mapper, SearchPaymentTransactionsRequest, SearchPaymentTransactionsQuery);
      createMap(mapper, ListPaymentTransactionsRequest, ListPaymentTransactionsQuery);
    };
  }
}
