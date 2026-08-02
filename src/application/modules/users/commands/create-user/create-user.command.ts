import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';

export class CreateUserCommand extends CommandBase {
  @AutoMap() public email: string;
  @AutoMap() public passwordHash: string;
  @AutoMap() public firstName: string;
  @AutoMap() public lastName: string;
  @AutoMap() public phone?: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public locationId?: string;
  @AutoMap() public isActive?: boolean;
}
