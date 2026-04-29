import { RpcNotAcceptableException } from "../../exceptions";

export class DuplicateNotAllowedException extends RpcNotAcceptableException {
  constructor(objectOrError?: string | object, description = "Duplicate Not Allowed") {
    super(objectOrError, description);
  }
}
