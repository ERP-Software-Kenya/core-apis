import { RpcNotFoundException } from "../index";

export class OrganizationMainAddressNotFoundException extends RpcNotFoundException {
  constructor(errorOrObj?: string | object, description = "Organization Main Address not found.") {
    super(errorOrObj, description);
  }
}
