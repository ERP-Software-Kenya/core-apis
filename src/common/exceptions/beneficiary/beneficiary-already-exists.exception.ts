import { RpcNotFoundException } from "../base";


export class BeneficiaryAlreadyExistsException extends RpcNotFoundException {
  constructor(errorOrObj?: string | object, description = "Beneficiary already exists.") {
    super(errorOrObj, description);
  }
}
