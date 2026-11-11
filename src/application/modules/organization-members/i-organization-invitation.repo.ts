import { Filter, IBaseRepo, PageableFilter } from '../../../common';
import { OrganizationInvitation } from './domain';

export type OrganizationInvitationFilter = {
  organizationId?: string;
  status?: string;
};

export const ORGANIZATION_INVITATION_REPO = 'ORGANIZATION_INVITATION_REPO';

export interface IOrganizationInvitationRepo
  extends IBaseRepo<OrganizationInvitation, string, PageableFilter<OrganizationInvitationFilter>, Filter<OrganizationInvitationFilter>> {
  findByTokenHashAsync(tokenHash: string): Promise<OrganizationInvitation | null>;
  findPendingByOrgAndEmailAsync(organizationId: string, emailNormalized: string): Promise<OrganizationInvitation | null>;
  listByOrganizationWithRelationsAsync(organizationId: string): Promise<OrganizationInvitation[]>;
  findWithRelationsAsync(id: string): Promise<OrganizationInvitation | null>;
  bulkExpirePendingForOrganizationAsync(organizationId: string): Promise<void>;
  bulkExpireByTokenHashAsync(tokenHash: string): Promise<void>;
}
