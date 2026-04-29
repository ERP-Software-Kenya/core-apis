import { RpcNotFoundException } from "../../exceptions";

export class FileNotFoundException extends RpcNotFoundException {
  constructor(objectOrError?: string | object, description = "File Not Found") {
    super(objectOrError, description);
  }
}
