export * from './create-customer';
export * from './update-customer';
export * from './delete-customer';

import { CreateCustomerCommandHandler } from './create-customer';
import { UpdateCustomerCommandHandler } from './update-customer';
import { DeleteCustomerCommandHandler } from './delete-customer';

export const CustomerCommandHandlers = [
  CreateCustomerCommandHandler,
  UpdateCustomerCommandHandler,
  DeleteCustomerCommandHandler,
];
