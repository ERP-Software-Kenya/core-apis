import { HttpStatus } from "@nestjs/common";
import { RpcBaseException } from "./rpc-base.exception";

export class RpcForbiddenException extends RpcBaseException {
  constructor(objectOrError?: string | object, description = "Forbidden") {
    super(RpcBaseException.createPayload(objectOrError, description, HttpStatus.FORBIDDEN), HttpStatus.FORBIDDEN);
  }
}
