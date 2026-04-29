import { RpcNotFoundException } from "../../exceptions";

export class CloudFrontOptionNotFoundException extends RpcNotFoundException {
  constructor(objectOrError?: string | object, description = "CloudFront Option Not Found") {
    super(objectOrError, description);
  }
}
