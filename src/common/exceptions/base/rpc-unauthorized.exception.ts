import { HttpStatus } from "@nestjs/common";
import { RpcBaseException } from "./rpc-base.exception";

export class RpcUnauthorizedException extends RpcBaseException {
  constructor(objectOrError?: string | object, description = "Unauthorized") {
    super(RpcBaseException.createPayload(objectOrError, description, HttpStatus.UNAUTHORIZED), HttpStatus.UNAUTHORIZED);
  }
}
