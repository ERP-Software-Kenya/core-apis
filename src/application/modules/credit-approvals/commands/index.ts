export * from './approve-credit-approval';
export * from './reject-credit-approval';
export * from './mark-commission-paid';

import { ApproveCreditApprovalCommandHandler } from './approve-credit-approval';
import { RejectCreditApprovalCommandHandler } from './reject-credit-approval';
import { MarkCommissionPaidCommandHandler } from './mark-commission-paid';

export const CreditApprovalCommandHandlers = [
  ApproveCreditApprovalCommandHandler,
  RejectCreditApprovalCommandHandler,
  MarkCommissionPaidCommandHandler,
];
