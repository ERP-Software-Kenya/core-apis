import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { FindManyOptions, In, Repository } from 'typeorm';
import { BaseRepo, DbException, Filter, PageableFilter } from '../../../common';
import { SalesReturn, SalesReturnFilter, ISalesReturnRepo } from '../../../application/modules/sales-returns';
import { SalesReturnEntity } from '../entities';

@Injectable()
export class SalesReturnRepo
  extends BaseRepo<SalesReturnEntity, SalesReturn, string, PageableFilter<SalesReturnFilter>, Filter<SalesReturnFilter>>
  implements ISalesReturnRepo
{
  constructor(
    @InjectRepository(SalesReturnEntity) internalRepo: Repository<SalesReturnEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(SalesReturnRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, SalesReturnEntity, SalesReturn);
  }

  public override get idColumnName(): keyof SalesReturnEntity {
    return 'id';
  }

  public override get specialFilterFields(): (keyof PageableFilter<SalesReturnFilter>)[] {
    return [...super.specialFilterFields, 'accessibleLocationIds'] as any;
  }

  public async getWithItemsAsync(id: string): Promise<SalesReturn | null> {
    try {
      const entity = await this.internalRepo.findOne({
        where: { id },
        relations: { items: true },
        order: { items: { createdAt: 'ASC' } },
      });
      return entity ? this.mapToModel(entity) : null;
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  public override async getAsync(id: string): Promise<SalesReturn> {
    return this.getWithItemsAsync(id);
  }

  protected override modifyFindOption(
    findOpts: FindManyOptions<SalesReturnEntity>,
    filterObj: Filter<SalesReturnFilter> | PageableFilter<SalesReturnFilter>,
  ): void {
    const filter = filterObj as SalesReturnFilter;
    if (filter?.accessibleLocationIds?.length && !filter.locationId) {
      findOpts.where = { ...(findOpts.where as object), locationId: In(filter.accessibleLocationIds) };
    }
  }
}
