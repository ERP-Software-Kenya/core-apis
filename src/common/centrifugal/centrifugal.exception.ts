import { RpcInternalServerErrorException } from "../exceptions";

export class CentrifugalException extends RpcInternalServerErrorException {
  constructor(objectOrError?: string | object, description = "Centrifugal Exception") {
    super(objectOrError, description);
  }
}
