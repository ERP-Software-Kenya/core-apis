import { RpcNotFoundException } from '../base';

export class UnpublishedStockNotFoundException extends RpcNotFoundException {
  constructor(objectOrError?: string | object, description = 'Unpublished stock record not found.') {
    super(objectOrError, description);
  }
}
