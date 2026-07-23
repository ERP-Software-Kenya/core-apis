import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { USER_REPO, ORGANIZATION_REPO, ORG_MEMBER_REPO } from '../../../../constants';
import { User } from '../../../users/domain';
import { IUserRepo } from '../../../users';
import { Organization } from '../../../organizations/domain';
import { IOrganizationRepo } from '../../../organizations';
import { IOrgMemberRepo } from '../../i-org-member.repo';
import { OrgMember } from '../../domain';
import { GetMeQuery } from './get-me.query';

export class MeResult {
  user: User;
  organization?: Organization;
  membership?: OrgMember;
}

@QueryHandlerStrict(GetMeQuery)
export class GetMeQueryHandler implements IQueryHandler<GetMeQuery, MeResult> {
  constructor(
    @Inject(USER_REPO) private readonly userRepo: IUserRepo,
    @Inject(ORGANIZATION_REPO) private readonly orgRepo: IOrganizationRepo,
    @Inject(ORG_MEMBER_REPO) private readonly orgMemberRepo: IOrgMemberRepo,
    @InjectPinoLogger(GetMeQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetMeQuery): Promise<MeResult> {
    const user = await this.userRepo.findByClerkIdAsync(query.clerkUserId);
    if (!user) throw new NotFoundException('User not found — call POST /auth/sync first');

    let organization: Organization | undefined;
    let membership: OrgMember | undefined;

    if (user.organizationId) {
      organization = await this.orgRepo.getAsync(user.organizationId);
      membership = await this.orgMemberRepo.findByUserAndOrgAsync(user.id, user.organizationId);
    }

    return { user, organization, membership };
  }
}
