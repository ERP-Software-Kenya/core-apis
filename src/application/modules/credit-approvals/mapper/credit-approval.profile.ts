import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import {
  CommissionPayableEntity,
  CreditApprovalRequestEntity,
  CustomerCreditTransactionEntity,
} from '../../../../infrastructure/persistence/entities';
import {
  CommissionPayable,
  CreditApprovalRequest,
  CustomerCreditTransaction,
} from '../domain';
import { CommissionPayableResponse, CreditApprovalRequestResponse } from '../models';

@Injectable()
export class CreditApprovalProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  public get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CreditApprovalRequestEntity, CreditApprovalRequest);
      createMap(mapper, CreditApprovalRequest, CreditApprovalRequestEntity);
      createMap(mapper, CreditApprovalRequest, CreditApprovalRequestResponse);

      createMap(mapper, CustomerCreditTransactionEntity, CustomerCreditTransaction);
      createMap(mapper, CustomerCreditTransaction, CustomerCreditTransactionEntity);

      createMap(mapper, CommissionPayableEntity, CommissionPayable);
      createMap(mapper, CommissionPayable, CommissionPayableEntity);
      createMap(mapper, CommissionPayable, CommissionPayableResponse);
    };
  }
}
