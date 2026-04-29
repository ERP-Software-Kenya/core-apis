import { RpcInternalServerErrorException } from "../../exceptions";

export class S3Exception extends RpcInternalServerErrorException {
  constructor(objectOrError?: string | object, description = "S3 Error") {
    super(objectOrError, description);
  }
}
