import { CommandBase } from "src/common";
import { CreateMaintenanceRequest } from "../../models";


export class CreateMaintenanceCommand extends CommandBase {
  constructor(public readonly request: CreateMaintenanceRequest) {
    super();
  }
}
