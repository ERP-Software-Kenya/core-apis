import { AutoMap } from '@automapper/classes';
import { CommandBase } from 'src/common';

export class CreateSupplierCommand extends CommandBase {
  @AutoMap() public organizationId: string;
  @AutoMap() public name: string;
  @AutoMap() public contactPerson?: string;
  @AutoMap() public email?: string;
  @AutoMap() public phone?: string;
  @AutoMap() public address?: string;
  @AutoMap() public taxId?: string;
}
