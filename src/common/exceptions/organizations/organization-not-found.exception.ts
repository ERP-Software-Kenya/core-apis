import { RpcNotFoundException } from "../index";

export class OrganizationNotFoundException extends RpcNotFoundException {
  constructor(errorOrObj?: string | object, description = "Organization not found.") {
    super(errorOrObj, description);
  }
}
