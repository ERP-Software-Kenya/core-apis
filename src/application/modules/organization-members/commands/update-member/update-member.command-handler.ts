import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { CommandHandlerStrict } from '../../../../../common';
import { LOCATION_REPO, ROLE_REPO } from '../../../../constants';
import { ERole, OrgMemberEntity, UserEntity, UserRoleEntity } from '../../../../../infrastructure';
import { ILocationRepo } from '../../../locations';
import { IRoleRepo } from '../../../roles';
import { OrganizationMemberResponse } from '../../models';
import { UpdateMemberCommand } from './update-member.command';

@CommandHandlerStrict(UpdateMemberCommand)
export class UpdateMemberCommandHandler implements ICommandHandler<UpdateMemberCommand, OrganizationMemberResponse> {
  constructor(
    @Inject(ROLE_REPO) private readonly roleRepo: IRoleRepo,
    @Inject(LOCATION_REPO) private readonly locationRepo: ILocationRepo,
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(UpdateMemberCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateMemberCommand): Promise<OrganizationMemberResponse> {
    this.logger.info(`Executing ${UpdateMemberCommand.name}`);
    const memberRepo = this.dataSource.getRepository(OrgMemberEntity);
    const member = await memberRepo.findOne({ where: { id: command.memberId }, relations: { user: true } });
    if (!member) throw new NotFoundException('Member not found');
    this.assertCanManage(command.currentRoles, command.currentOrganizationId, member.organizationId);
    if (command.roleId) {
      const role = await this.roleRepo.getAsync(command.roleId);
      if (!role) throw new NotFoundException('Role not found');
    }
    if (command.locationId) {
      const location = await this.locationRepo.getAsync(command.locationId);
      if (!location) throw new NotFoundException('Location not found');
      if ((location as { organizationId?: string }).organizationId !== member.organizationId) {
        throw new ForbiddenException('Location does not belong to this organization');
      }
    }
    await this.dataSource.transaction(async (manager) => {
      if (command.roleId) member.roleId = command.roleId;
      if (command.status) {
        member.status = command.status;
        member.user.isActive = command.status === 'active';
        await manager.save(UserEntity, member.user);
      }
      await manager.save(OrgMemberEntity, member);
      let ur = await manager.findOne(UserRoleEntity, { where: { userId: member.userId } });
      if (!ur) {
        ur = manager.create(UserRoleEntity, { userId: member.userId, roleId: command.roleId ?? member.roleId, locationId: command.locationId ?? undefined });
      } else {
        if (command.roleId) ur.roleId = command.roleId;
        if (command.locationId !== undefined) ur.locationId = command.locationId ?? (null as unknown as string);
      }
      await manager.save(UserRoleEntity, ur);
    });
    return this.buildMemberResponse(await memberRepo.findOne({
      where: { id: command.memberId }, relations: { user: { userRoles: { role: true, location: true } }, role: true },
    }));
  }

  private assertCanManage(roles: ERole[], currentOrgId: string | undefined, targetOrgId: string): void {
    if (!roles.includes(ERole.SuperAdmin) && currentOrgId !== targetOrgId) {
      throw new ForbiddenException('Resource belongs to another organization');
    }
  }

  private buildMemberResponse(member: OrgMemberEntity | null): OrganizationMemberResponse {
    if (!member) throw new NotFoundException('Member not found');
    const ur = member.user?.userRoles?.[0];
    const response = new OrganizationMemberResponse();
    response.id = member.id; response.userId = member.userId;
    response.email = member.user?.email ?? ''; response.firstName = member.user?.firstName;
    response.lastName = member.user?.lastName; response.roleId = member.roleId;
    response.roleName = member.role?.name ?? ur?.role?.name ?? '';
    response.locationId = ur?.locationId; response.locationName = ur?.location?.name;
    response.status = member.status; response.joinedAt = member.joinedAt;
    return response;
  }
}
