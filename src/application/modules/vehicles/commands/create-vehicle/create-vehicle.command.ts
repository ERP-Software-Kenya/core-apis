import { CommandBase } from "src/common";
import { CreateVehicleRequest } from "../../models";


export class CreateVehicleCommand extends CommandBase {
  constructor(public readonly request: CreateVehicleRequest) {
    super();
  }
}
