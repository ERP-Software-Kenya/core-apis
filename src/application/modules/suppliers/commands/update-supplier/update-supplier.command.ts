import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class UpdateSupplierCommand extends CommandBase {
  @AutoMap() public id: string;
  @AutoMap() public name?: string;
  @AutoMap() public contactPerson?: string;
  @AutoMap() public email?: string;
  @AutoMap() public phone?: string;
  @AutoMap() public address?: string;
  @AutoMap() public taxId?: string;
  @AutoMap() public isActive?: boolean;
}
