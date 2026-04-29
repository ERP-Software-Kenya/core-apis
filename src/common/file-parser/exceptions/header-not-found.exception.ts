import { RpcNotFoundException } from "../../exceptions";

export class HeaderNotFoundException extends RpcNotFoundException {
  constructor(objectOrError?: string | object, description = "Header Not Found") {
    super(objectOrError, description);
  }
}
