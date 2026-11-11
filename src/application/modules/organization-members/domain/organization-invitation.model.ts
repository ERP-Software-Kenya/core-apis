import { AutoMap } from '@automapper/classes';
import { EOrganizationInvitationStatus } from '../../../../infrastructure';

export class OrganizationInvitation {
  @AutoMap() public id: string;
  @AutoMap() public organizationId: string;
  @AutoMap() public organizationName: string;
  @AutoMap() public email: string;
  @AutoMap() public emailNormalized: string;
  @AutoMap() public firstName?: string;
  @AutoMap() public lastName?: string;
  @AutoMap() public roleId: string;
  @AutoMap() public roleName: string;
  @AutoMap() public locationId?: string;
  @AutoMap() public locationName?: string;
  @AutoMap() public invitedByUserId: string;
  @AutoMap() public tokenHash: string;
  @AutoMap(() => String) public status: EOrganizationInvitationStatus;
  @AutoMap() public revokedByUserId?: string;
  @AutoMap(() => Date) public revokedAt?: Date;
  @AutoMap(() => Date) public expiresAt: Date;
  @AutoMap(() => Date) public lastSentAt: Date;
  @AutoMap() public sendCount: number;
  @AutoMap() public failureReason?: string | null;
  @AutoMap(() => Date) public createdAt: Date;
}
