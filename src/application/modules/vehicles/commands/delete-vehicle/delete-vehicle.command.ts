import { CommandBase } from "src/common";


export class DeleteVehicleCommand extends CommandBase {
  constructor(public readonly id: string) {
    super();
  }
}
