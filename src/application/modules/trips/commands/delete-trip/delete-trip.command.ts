import { CommandBase } from "src/common";


export class DeleteTripCommand extends CommandBase {
  constructor(public readonly id: string) {
    super();
  }
}
