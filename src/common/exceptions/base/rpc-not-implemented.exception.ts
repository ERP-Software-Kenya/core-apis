import { HttpStatus } from "@nestjs/common";
import { RpcBaseException } from "./rpc-base.exception";

export class RpcNotImplementedException extends RpcBaseException {
  constructor(objectOrError?: string | object, description = "Not Implemented") {
    super(RpcBaseException.createPayload(objectOrError, description, HttpStatus.NOT_IMPLEMENTED), HttpStatus.NOT_IMPLEMENTED);
  }
}
