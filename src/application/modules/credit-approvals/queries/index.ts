export * from './list-pending-credit-approvals';
export * from './get-black-ledger';

import { ListPendingCreditApprovalsQueryHandler } from './list-pending-credit-approvals';
import { GetBlackLedgerQueryHandler } from './get-black-ledger';

export const CreditApprovalQueryHandlers = [
  ListPendingCreditApprovalsQueryHandler,
  GetBlackLedgerQueryHandler,
];
