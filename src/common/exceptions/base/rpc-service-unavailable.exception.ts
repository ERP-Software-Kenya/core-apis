import { HttpStatus } from "@nestjs/common";
import { RpcBaseException } from "./rpc-base.exception";

export class RpcServiceUnavailableException extends RpcBaseException {
  constructor(objectOrError?: string | object, description = "Service Unavailable") {
    super(RpcBaseException.createPayload(objectOrError, description, HttpStatus.SERVICE_UNAVAILABLE), HttpStatus.SERVICE_UNAVAILABLE);
  }
}
