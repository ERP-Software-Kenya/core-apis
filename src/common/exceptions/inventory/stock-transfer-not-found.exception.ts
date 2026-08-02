import { RpcNotFoundException } from '../base';

export class StockTransferNotFoundException extends RpcNotFoundException {
  constructor(objectOrError?: string | object, description = 'Stock transfer record not found.') {
    super(objectOrError, description);
  }
}
