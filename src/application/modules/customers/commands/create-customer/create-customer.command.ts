import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class CreateCustomerCommand extends CommandBase {
  @AutoMap() public name: string;
  @AutoMap() public email?: string;
  @AutoMap() public phone?: string;
  @AutoMap() public gstin?: string;
}
