import { RpcInternalServerErrorException } from "../../exceptions";

export class FSException extends RpcInternalServerErrorException {
  constructor(objectOrError?: string | object, description = "Fyle System Error") {
    super(objectOrError, description);
  }
}
