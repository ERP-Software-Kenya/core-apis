import { HttpStatus } from "@nestjs/common";
import { RpcBaseException } from "./rpc-base.exception";

export class RpcPayloadTooLargeException extends RpcBaseException {
  constructor(objectOrError?: string | object, description = "Payload Too Large") {
    super(RpcBaseException.createPayload(objectOrError, description, HttpStatus.PAYLOAD_TOO_LARGE), HttpStatus.PAYLOAD_TOO_LARGE);
  }
}
