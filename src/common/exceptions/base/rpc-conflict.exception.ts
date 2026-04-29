import { HttpStatus } from "@nestjs/common";
import { RpcBaseException } from "./rpc-base.exception";

export class RpcConflictException extends RpcBaseException {
  constructor(objectOrError?: string | object, description = "Conflict") {
    super(RpcBaseException.createPayload(objectOrError, description, HttpStatus.CONFLICT), HttpStatus.CONFLICT);
  }
}
