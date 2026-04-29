import { HttpStatus } from "@nestjs/common";
import { RpcBaseException } from "./rpc-base.exception";

export class RpcTooManyRequestsException extends RpcBaseException {
  constructor(objectOrError?: string | object, description = "Too Many Requests") {
    super(RpcBaseException.createPayload(objectOrError, description, HttpStatus.TOO_MANY_REQUESTS), HttpStatus.TOO_MANY_REQUESTS);
  }
}
