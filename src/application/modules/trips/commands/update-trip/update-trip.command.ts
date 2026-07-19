import { CommandBase } from "src/common";
import { UpdateTripRequest } from "../../models";


export class UpdateTripCommand extends CommandBase {
  public id: string;
  constructor(public readonly request: UpdateTripRequest) {
    super();
  }
}
