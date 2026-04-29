import { RpcForbiddenException } from "../index";

export class UserBlockedException extends RpcForbiddenException {
  constructor(objectOrError?: string | object, description = "User is Blocked") {
    super(objectOrError, description);
  }
}
