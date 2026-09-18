export * from './create-quotation/create-quotation.command';
export * from './create-quotation/create-quotation.command-handler';
export * from './update-quotation/update-quotation.command';
export * from './update-quotation/update-quotation.command-handler';
export * from './revise-quotation/revise-quotation.command';
export * from './revise-quotation/revise-quotation.command-handler';
export * from './convert-to-order/convert-to-order.command';
export * from './convert-to-order/convert-to-order.command-handler';
export * from './send-quotation-email/send-quotation-email.command';
export * from './send-quotation-email/send-quotation-email.command-handler';

import { CreateQuotationCommandHandler } from './create-quotation/create-quotation.command-handler';
import { UpdateQuotationCommandHandler } from './update-quotation/update-quotation.command-handler';
import { ReviseQuotationCommandHandler } from './revise-quotation/revise-quotation.command-handler';
import { ConvertToOrderCommandHandler } from './convert-to-order/convert-to-order.command-handler';
import { SendQuotationEmailCommandHandler } from './send-quotation-email/send-quotation-email.command-handler';

export const QuotationCommandHandlers = [
  CreateQuotationCommandHandler,
  UpdateQuotationCommandHandler,
  ReviseQuotationCommandHandler,
  ConvertToOrderCommandHandler,
  SendQuotationEmailCommandHandler,
];
