import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { FindManyOptions, FindOptionsWhere, ILike, IsNull, Repository } from 'typeorm';
import { IPageable } from '../../../common';
import { TaxEntity } from '../entities';
import { Tax, TaxFilter } from '../../../application/modules/taxes/domain';
import { ITaxRepo } from '../../../application/modules/taxes/i-tax.repo';

@Injectable()
export class TaxRepo implements ITaxRepo {
  constructor(
    @InjectRepository(TaxEntity) private readonly internalRepo: Repository<TaxEntity>,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(TaxRepo.name) private readonly logger: PinoLogger,
  ) {}

  public async getAsync(id: string): Promise<Tax | null> {
    const entity = await this.internalRepo.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['organization'],
    });
    if (!entity) {
      return null;
    }
    return this.mapper.map(entity, TaxEntity, Tax);
  }

  public async listAsync(filter: TaxFilter): Promise<Tax[]> {
    const where: FindOptionsWhere<TaxEntity> = { deletedAt: IsNull() };
    if (filter.organizationId) {
      where.organizationId = filter.organizationId;
    }
    if (filter.isActive !== undefined) {
      where.isActive = filter.isActive;
    }
    const entities = await this.internalRepo.find({ where });
    return this.mapper.mapArray(entities, TaxEntity, Tax);
  }

  public async searchAsync(filter: TaxFilter): Promise<IPageable<Tax>> {
    const baseWhere: FindOptionsWhere<TaxEntity> = { deletedAt: IsNull() };
    if (filter.organizationId) {
      baseWhere.organizationId = filter.organizationId;
    }
    if (filter.isActive !== undefined) {
      baseWhere.isActive = filter.isActive;
    }

    const findOpts: FindManyOptions<TaxEntity> = {};

    if (filter.search) {
      findOpts.where = [
        { ...baseWhere, name: ILike(`%${filter.search}%`) },
      ];
    } else {
      findOpts.where = baseWhere;
    }

    const page = filter.page ?? 1;
    const perPage = filter.perPage ?? 20;
    findOpts.skip = perPage * (page - 1);
    findOpts.take = perPage;

    const [entities, totalCount] = await this.internalRepo.findAndCount(findOpts);
    return {
      items: this.mapper.mapArray(entities, TaxEntity, Tax),
      page,
      perPage,
      totalCount,
      totalPages: Math.ceil(totalCount / perPage),
    };
  }

  public async createAsync(entity: Tax): Promise<Tax> {
    const taxEntity = this.mapper.map(entity, Tax, TaxEntity);
    await this.internalRepo.save(taxEntity);
    return this.mapper.map(taxEntity, TaxEntity, Tax);
  }

  public async updateAsync(entity: Tax): Promise<Tax> {
    const taxEntity = this.mapper.map(entity, Tax, TaxEntity);
    taxEntity.updatedAt = new Date();
    await this.internalRepo.save(taxEntity);
    return this.mapper.map(taxEntity, TaxEntity, Tax);
  }

  public async softDeleteAsync(id: string): Promise<boolean> {
    const result = await this.internalRepo.softDelete({ id });
    return (result.affected ?? 0) > 0;
  }
}
