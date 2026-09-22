export * from './create-tax';
export * from './update-tax';
export * from './delete-tax';

import { CreateTaxCommandHandler } from './create-tax';
import { UpdateTaxCommandHandler } from './update-tax';
import { DeleteTaxCommandHandler } from './delete-tax';

export const TaxCommandHandlers = [
  CreateTaxCommandHandler,
  UpdateTaxCommandHandler,
  DeleteTaxCommandHandler,
];
