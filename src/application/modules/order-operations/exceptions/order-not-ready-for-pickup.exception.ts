import { RpcBadRequestException } from '../../../../common';

export class OrderNotReadyForPickupException extends RpcBadRequestException {
  constructor(message = 'Order must be a packed pickup order to mark as collected') {
    super(message);
  }
}
