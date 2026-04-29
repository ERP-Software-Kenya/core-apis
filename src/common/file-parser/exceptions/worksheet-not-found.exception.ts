import { RpcNotFoundException } from "../../exceptions";

export class WorksheetNotFoundException extends RpcNotFoundException {
  constructor(objectOrError?: string | object, description = "Worksheet Not Found") {
    super(objectOrError, description);
  }
}
