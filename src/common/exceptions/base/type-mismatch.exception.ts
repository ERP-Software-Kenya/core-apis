import { RpcInternalServerErrorException } from "./rpc-internal-server-error.exception";

export class TypeMismatchException extends RpcInternalServerErrorException {
  constructor(objectOrError?: string | object, description = "Type Mismatch") {
    super(objectOrError, description);
  }
}
