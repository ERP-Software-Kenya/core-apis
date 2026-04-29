import { RpcConflictException } from "../../exceptions";

export class SameFileNamesConflictException extends RpcConflictException {
  constructor(objectOrError?: string | object, description = "Same File Names Conflict") {
    super(objectOrError, description);
  }
}
