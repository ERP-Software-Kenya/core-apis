import { CommandBase } from "src/common";
import { UpdateVehicleRequest } from "../../models";


export class UpdateVehicleCommand extends CommandBase {
  public id: string;
  constructor(public readonly request: UpdateVehicleRequest) {
    super();
  }
}
