import { RpcNotFoundException } from "./base";

export class AddressNotFoundException extends RpcNotFoundException {
  constructor(objectOrError?: string | object, description = "Address not found") {
    super(objectOrError, description);
  }
}
