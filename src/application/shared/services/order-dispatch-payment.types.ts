import { RpcBadRequestException } from '../../../common';
import { EPaymentTiming } from '../../../infrastructure/persistence/entities';

export class OrderDispatchBlockedException extends RpcBadRequestException {
  constructor(message: string) {
    super(message);
  }
}

export type OrderDispatchPaymentEvaluation = {
  canDispatch: boolean;
  canFulfill: boolean;
  paymentTiming: EPaymentTiming;
  paymentLabel: string;
  amountPaid: number;
  amountRequired: number;
  blockReason?: string;
  creditApprovalPending: boolean;
};
