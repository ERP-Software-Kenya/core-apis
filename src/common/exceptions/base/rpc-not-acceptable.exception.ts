import { HttpStatus } from "@nestjs/common";
import { RpcBaseException } from "./rpc-base.exception";

export class RpcNotAcceptableException extends RpcBaseException {
  constructor(objectOrError?: string | object, description = "Not Acceptable") {
    super(RpcBaseException.createPayload(objectOrError, description, HttpStatus.NOT_ACCEPTABLE), HttpStatus.NOT_ACCEPTABLE);
  }
}
