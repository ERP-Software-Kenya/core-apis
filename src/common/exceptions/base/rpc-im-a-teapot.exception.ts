import { HttpStatus } from "@nestjs/common";
import { RpcBaseException } from "./rpc-base.exception";

export class RpcImATeapotException extends RpcBaseException {
  constructor(objectOrError?: string | object, description = "I'm a Teapot") {
    super(RpcBaseException.createPayload(objectOrError, description, HttpStatus.I_AM_A_TEAPOT), HttpStatus.I_AM_A_TEAPOT);
  }
}
