import { RpcBadRequestException } from "../../exceptions";

export class InvalidFileTypeException extends RpcBadRequestException {
  constructor(objectOrError?: string | object, description = "Invalid File Type") {
    super(objectOrError, description);
  }
}
