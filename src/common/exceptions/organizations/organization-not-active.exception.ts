import { RpcBadRequestException } from "../index";

export class OrganizationNotActiveException extends RpcBadRequestException {
  constructor(errorOrObj?: string | object, description = "Organization not active.") {
    super(errorOrObj, description);
  }
}
