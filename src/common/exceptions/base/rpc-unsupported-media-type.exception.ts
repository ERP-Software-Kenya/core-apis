import { HttpStatus } from "@nestjs/common";
import { RpcBaseException } from "./rpc-base.exception";

export class RpcUnsupportedMediaTypeException extends RpcBaseException {
  constructor(objectOrError?: string | object, description = "Unsupported Media Type") {
    super(RpcBaseException.createPayload(objectOrError, description, HttpStatus.UNSUPPORTED_MEDIA_TYPE), HttpStatus.UNSUPPORTED_MEDIA_TYPE);
  }
}
