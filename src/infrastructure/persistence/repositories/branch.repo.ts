import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryFailedError, Repository } from 'typeorm';
import { BaseRepo, DbException, Filter, PageableFilter } from '../../../common';
import { BranchEntity } from '../entities';
import { Branch, BranchFilter } from '../../../application/modules/branches/domain';
import { IBranchRepo } from 'src/application/modules/branches';

@Injectable()
export class BranchRepo
  extends BaseRepo<BranchEntity, Branch, string, PageableFilter<BranchFilter>, Filter<BranchFilter>>
  implements IBranchRepo
{
  constructor(
    @InjectRepository(BranchEntity) internalRepo: Repository<BranchEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(BranchRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, BranchEntity, Branch);
  }

  public override get idColumnName(): keyof BranchEntity {
    return 'id';
  }

  public override get softDeleteEnabled(): boolean {
    return true;
  }

  public async findMainAsync(organizationId: string): Promise<Branch | null> {
    const entity = await this.internalRepo.findOneBy({ organizationId, isMain: true });
    if (!entity) return null;
    return this.mapToModel(entity);
  }

  public async findByManagerIdAsync(userId: string): Promise<Branch | null> {
    const entity = await this.internalRepo.findOneBy({ userId });
    return entity ? this.mapToModel(entity) : null;
  }

  public async setMainAsync(branchId: string, organizationId: string): Promise<Branch> {
    return this.internalRepo.manager.transaction(async (manager) => {
      const repo = manager.getRepository(BranchEntity);
      await repo.update({ organizationId, isMain: true }, { isMain: false });
      await repo.update({ id: branchId, organizationId }, { isMain: true });
      const entity = await repo.findOneByOrFail({ id: branchId, organizationId });
      return this.mapToModel(entity);
    });
  }

  public async createBranchAsync(branch: Branch): Promise<Branch> {
    const entity = this.mapToEntity(branch);
    try {
      await this.internalRepo.save(entity);
      return this.mapToModel(entity);
    } catch (err) {
      const pgCode = (err as any).code ?? (err as any).driverError?.code;
      const pgConstraint = (err as any).constraint ?? (err as any).driverError?.constraint;
      if (err instanceof QueryFailedError && pgCode === '23505' && pgConstraint === 'UQ_branches_one_main_per_organization') {
        // A concurrent branch creation claimed the main-branch slot first. Retry as non-main.
        const retryEntity = this.mapToEntity({ ...branch, isMain: false } as Branch);
        await this.internalRepo.save(retryEntity);
        return this.mapToModel(retryEntity);
      }
      this.logger.error(err);
      throw new DbException(err);
    }
  }
}
