import { AutoMap } from '@automapper/classes';
import { CommandBase } from '../../../../../common';
import { ERole } from '../../../../../infrastructure';

export class UpdateMemberCommand extends CommandBase {
  @AutoMap() public memberId: string;
  @AutoMap() public roleId?: string;
  public locationId?: string | null;
  public status?: 'active' | 'suspended';
  public currentOrganizationId?: string;
  public currentRoles: ERole[];
}
