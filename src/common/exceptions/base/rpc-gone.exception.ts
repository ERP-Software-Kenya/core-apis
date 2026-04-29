import { HttpStatus } from "@nestjs/common";
import { RpcBaseException } from "./rpc-base.exception";

export class RpcGoneException extends RpcBaseException {
  constructor(objectOrError?: string | object, description = "Gone") {
    super(RpcBaseException.createPayload(objectOrError, description, HttpStatus.GONE), HttpStatus.GONE);
  }
}
