import { RpcNotFoundException } from '../base';

export class InventoryNotFoundException extends RpcNotFoundException {
  constructor(objectOrError?: string | object, description = 'Inventory record not found.') {
    super(objectOrError, description);
  }
}
