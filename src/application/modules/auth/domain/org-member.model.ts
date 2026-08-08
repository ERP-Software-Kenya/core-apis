import { AutoMap } from '@automapper/classes';
import { ERole } from '../../../../infrastructure/persistence/entities/role.entity';

export class OrgMember {
  @AutoMap() public id: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public userId: string;
  @AutoMap() public roleId: string;
  @AutoMap() public status: string;
  @AutoMap() public invitedById?: string;
  @AutoMap(() => Date) public joinedAt?: Date;

  role?: ERole;
}
