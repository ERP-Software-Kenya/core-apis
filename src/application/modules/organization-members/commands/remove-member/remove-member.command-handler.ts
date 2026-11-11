import { ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { CommandHandlerStrict } from '../../../../../common';
import { ERole, OrgMemberEntity, UserEntity, UserRoleEntity } from '../../../../../infrastructure';
import { RemoveMemberCommand } from './remove-member.command';

@CommandHandlerStrict(RemoveMemberCommand)
export class RemoveMemberCommandHandler implements ICommandHandler<RemoveMemberCommand, void> {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectPinoLogger(RemoveMemberCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: RemoveMemberCommand): Promise<void> {
    this.logger.info(`Executing ${RemoveMemberCommand.name}`);
    const memberRepo = this.dataSource.getRepository(OrgMemberEntity);
    const member = await memberRepo.findOne({ where: { id: command.memberId }, relations: { user: true } });
    if (!member) throw new NotFoundException('Member not found');
    this.assertCanManage(command.currentRoles, command.currentOrganizationId, member.organizationId);
    if (member.userId === command.currentUserId) throw new ConflictException('You cannot remove yourself');
    await this.dataSource.transaction(async (manager) => {
      await manager.delete(UserRoleEntity, { userId: member.userId });
      member.status = 'removed';
      await manager.save(OrgMemberEntity, member);
      member.user.organizationId = null as unknown as string;
      member.user.isActive = true;
      await manager.save(UserEntity, member.user);
    });
  }

  private assertCanManage(roles: ERole[], currentOrgId: string | undefined, targetOrgId: string): void {
    if (!roles.includes(ERole.SuperAdmin) && currentOrgId !== targetOrgId) {
      throw new ForbiddenException('Resource belongs to another organization');
    }
  }
}
