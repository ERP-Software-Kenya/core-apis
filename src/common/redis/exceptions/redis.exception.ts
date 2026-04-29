import { RpcInternalServerErrorException } from "../../exceptions";

export class RedisException extends RpcInternalServerErrorException {
  constructor(objectOrError?: string | object, description = "Redis Service Exception") {
    super(objectOrError, description);
  }
}
