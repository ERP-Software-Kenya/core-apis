import { HttpStatus } from "@nestjs/common";
import { RpcBaseException } from "./rpc-base.exception";

export class RpcMethodNotAllowedException extends RpcBaseException {
  constructor(objectOrError?: string | object, description = "Method Not Allowed") {
    super(RpcBaseException.createPayload(objectOrError, description, HttpStatus.METHOD_NOT_ALLOWED), HttpStatus.METHOD_NOT_ALLOWED);
  }
}
