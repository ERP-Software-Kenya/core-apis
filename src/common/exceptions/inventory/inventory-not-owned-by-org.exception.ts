import { RpcForbiddenException } from '../base';

export class InventoryNotOwnedByOrgException extends RpcForbiddenException {
  constructor(objectOrError?: string | object, description = 'Access denied: inventory record does not belong to your organization.') {
    super(objectOrError, description);
  }
}
