import { HttpStatus } from "@nestjs/common";
import { RpcBaseException } from "./rpc-base.exception";

export class RpcRequestTimeoutException extends RpcBaseException {
  constructor(objectOrError?: string | object, description = "Request Timeout") {
    super(RpcBaseException.createPayload(objectOrError, description, HttpStatus.REQUEST_TIMEOUT), HttpStatus.REQUEST_TIMEOUT);
  }
}
