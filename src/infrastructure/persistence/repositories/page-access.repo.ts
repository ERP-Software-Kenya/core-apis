import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPageAccessRepo } from '../../../application/modules/common-utility/i-page-access.repo';
import { PageAccess } from '../../../application/modules/common-utility/domain';
import { PageAccessEntity } from '../entities';

@Injectable()
export class PageAccessRepo implements IPageAccessRepo {
  public constructor(
    @InjectRepository(PageAccessEntity)
    private readonly repo: Repository<PageAccessEntity>,
  ) {}

  public async findAllAsync(): Promise<PageAccess[]> {
    const entities = await this.repo.find({ order: { pageKey: 'ASC' } });
    return entities.map((e) => this.toModel(e));
  }

  public async upsertManyAsync(
    configs: ReadonlyArray<{ pageKey: string; allowedRoles: string[] }>,
  ): Promise<void> {
    const entities = configs.map((c) => {
      const entity = new PageAccessEntity();
      entity.pageKey      = c.pageKey;
      entity.allowedRoles = c.allowedRoles;
      return entity;
    });
    await this.repo.upsert(entities, { conflictPaths: ['pageKey'], skipUpdateIfNoValuesChanged: true });
  }

  private toModel(entity: PageAccessEntity): PageAccess {
    const model         = new PageAccess();
    model.id            = entity.id;
    model.pageKey       = entity.pageKey;
    model.allowedRoles  = (entity.allowedRoles ?? []).filter((r) => r.length > 0);
    model.updatedAt     = entity.updatedAt;
    return model;
  }
}
