import { RpcBadRequestException } from "../../exceptions";

export class InvalidSpreadsheetTypeException extends RpcBadRequestException {
  constructor(objectOrError?: string | object, description = "Invalid Spreadsheet Type") {
    super(objectOrError, description);
  }
}
