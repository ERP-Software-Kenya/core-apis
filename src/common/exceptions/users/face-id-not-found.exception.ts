import { RpcNotFoundException } from "../index";

export class FaceIdNotFoundException extends RpcNotFoundException {
  constructor(objectOrError?: string | object, description = "Face ID Not Found") {
    super(objectOrError, description);
  }
}
