import { CommandBase } from "src/common";
import { CreateDriverRequest } from "../../models";


export class CreateDriverCommand extends CommandBase {
  constructor(public readonly request: CreateDriverRequest) {
    super();
  }
}
