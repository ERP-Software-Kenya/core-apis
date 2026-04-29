import { RpcInternalServerErrorException } from "../../exceptions";

export class CloudFrontCdnException extends RpcInternalServerErrorException {
  constructor(objectOrError?: string | object, description = "CloudFront CDN Error") {
    super(objectOrError, description);
  }
}
