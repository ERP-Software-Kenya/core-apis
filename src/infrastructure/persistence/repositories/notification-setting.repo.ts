import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { EActivityAction } from '../../../infrastructure/persistence/entities/activity-log.entity';
import { ERole } from '../../../infrastructure/persistence/entities/role.entity';
import { NotificationSettingEntity } from '../entities/notification-setting.entity';
import { UserRoleEntity } from '../entities/user-role.entity';
import { NotificationSetting } from '../../../application/modules/notification-settings/domain';
import { INotificationSettingRepo } from '../../../application/modules/notification-settings/i-notification-setting.repo';

@Injectable()
export class NotificationSettingRepo implements INotificationSettingRepo {
  public constructor(
    @InjectRepository(NotificationSettingEntity) private readonly repo: Repository<NotificationSettingEntity>,
    @InjectRepository(UserRoleEntity) private readonly userRoleRepo: Repository<UserRoleEntity>,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(NotificationSettingRepo.name) private readonly logger: PinoLogger,
  ) {}

  public async findByOrgAsync(organizationId: string): Promise<NotificationSetting[]> {
    const entities = await this.repo.find({ where: { organizationId } });
    return this.mapper.mapArray(entities, NotificationSettingEntity, NotificationSetting);
  }

  public async findOneAsync(organizationId: string, event: EActivityAction): Promise<NotificationSetting | null> {
    const entity = await this.repo.findOne({ where: { organizationId, event } });
    if (!entity) return null;
    return this.mapper.map(entity, NotificationSettingEntity, NotificationSetting);
  }

  public async upsertAsync(organizationId: string, event: EActivityAction, isEnabled: boolean): Promise<NotificationSetting> {
    await this.repo.upsert({ organizationId, event, isEnabled }, ['organizationId', 'event']);
    const entity = await this.repo.findOne({ where: { organizationId, event } });
    return this.mapper.map(entity, NotificationSettingEntity, NotificationSetting);
  }

  public async upsertManyAsync(organizationId: string, items: { event: EActivityAction; isEnabled: boolean }[]): Promise<NotificationSetting[]> {
    const rows = items.map((item) => ({ organizationId, event: item.event, isEnabled: item.isEnabled }));
    await this.repo.upsert(rows, ['organizationId', 'event']);
    return this.findByOrgAsync(organizationId);
  }

  public async findOrgAdminEmailsAsync(organizationId: string): Promise<string[]> {
    const rows = await this.userRoleRepo
      .createQueryBuilder('ur')
      .innerJoin('ur.role', 'r', 'r.name = :roleName', { roleName: ERole.OrgAdmin })
      .innerJoin('ur.user', 'u', 'u.organization_id = :orgId AND u.is_active = true', { orgId: organizationId })
      .select('u.email', 'email')
      .distinct(true)
      .getRawMany<{ email: string }>();
    return rows.map((row) => row.email).filter(Boolean);
  }
}
