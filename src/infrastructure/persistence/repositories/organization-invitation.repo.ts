import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, Filter, PageableFilter } from '../../../common';
import { EOrganizationInvitationStatus, OrganizationInvitationEntity } from '../entities';
import {
  IOrganizationInvitationRepo,
  OrganizationInvitation,
  OrganizationInvitationFilter,
} from '../../../application/modules/organization-members';

@Injectable()
export class OrganizationInvitationRepo
  extends BaseRepo<OrganizationInvitationEntity, OrganizationInvitation, string, PageableFilter<OrganizationInvitationFilter>, Filter<OrganizationInvitationFilter>>
  implements IOrganizationInvitationRepo {
  constructor(
    @InjectRepository(OrganizationInvitationEntity) internalRepo: Repository<OrganizationInvitationEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(OrganizationInvitationRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, OrganizationInvitationEntity, OrganizationInvitation);
  }

  public override get idColumnName(): keyof OrganizationInvitationEntity {
    return 'id';
  }

  public async findByTokenHashAsync(tokenHash: string): Promise<OrganizationInvitation | null> {
    const entity = await this.internalRepo.findOne({
      where: { tokenHash },
      relations: { organization: true, role: true, location: true },
    });
    if (!entity) return null;
    return this.mapToModel(entity);
  }

  public async findPendingByOrgAndEmailAsync(organizationId: string, emailNormalized: string): Promise<OrganizationInvitation | null> {
    const entity = await this.internalRepo.findOne({
      where: { organizationId, emailNormalized, status: EOrganizationInvitationStatus.Pending },
    });
    if (!entity) return null;
    return this.mapToModel(entity);
  }

  public async listByOrganizationWithRelationsAsync(organizationId: string): Promise<OrganizationInvitation[]> {
    const entities = await this.internalRepo.find({
      where: { organizationId },
      relations: { organization: true, role: true, location: true },
      order: { createdAt: 'DESC' },
    });
    return entities.map((entity) => this.mapToModel(entity));
  }

  public async findWithRelationsAsync(id: string): Promise<OrganizationInvitation | null> {
    const entity = await this.internalRepo.findOne({
      where: { id },
      relations: { organization: true, role: true, location: true },
    });
    if (!entity) return null;
    return this.mapToModel(entity);
  }

  public async bulkExpirePendingForOrganizationAsync(organizationId: string): Promise<void> {
    await this.internalRepo.createQueryBuilder()
      .update()
      .set({ status: EOrganizationInvitationStatus.Expired })
      .where('organization_id = :organizationId', { organizationId })
      .andWhere('status = :status', { status: EOrganizationInvitationStatus.Pending })
      .andWhere('expires_at <= NOW()')
      .execute();
  }

  public async bulkExpireByTokenHashAsync(tokenHash: string): Promise<void> {
    await this.internalRepo.createQueryBuilder()
      .update()
      .set({ status: EOrganizationInvitationStatus.Expired })
      .where('token_hash = :tokenHash', { tokenHash })
      .andWhere('status = :status', { status: EOrganizationInvitationStatus.Pending })
      .andWhere('expires_at <= NOW()')
      .execute();
  }
}
