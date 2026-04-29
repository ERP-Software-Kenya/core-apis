import { HttpStatus } from "@nestjs/common";
import { RpcBaseException } from "./rpc-base.exception";

export class RpcUnprocessableEntityException extends RpcBaseException {
  constructor(objectOrError?: string | object, description = "Unprocessable Entity") {
    super(RpcBaseException.createPayload(objectOrError, description, HttpStatus.UNPROCESSABLE_ENTITY), HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
