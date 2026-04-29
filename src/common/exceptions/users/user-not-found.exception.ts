import { RpcNotFoundException } from "../index";

export class UserNotFoundException extends RpcNotFoundException {
  constructor(objectOrError?: string | object, description = "User Not Found") {
    super(objectOrError, description);
  }
}
