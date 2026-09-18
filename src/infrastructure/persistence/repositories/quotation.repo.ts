import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { BaseRepo, countPages, DbException, Filter, IPageable, PageableFilter } from '../../../common';
import { QuotationEntity } from '../entities';
import { Quotation } from '../../../application/modules/quotations/domain';
import { IQuotationRepo, QuotationFilter } from '../../../application/modules/quotations/i-quotation.repo';

@Injectable()
export class QuotationRepo
  extends BaseRepo<QuotationEntity, Quotation, string, PageableFilter<QuotationFilter>, Filter<QuotationFilter>>
  implements IQuotationRepo
{
  constructor(
    @InjectRepository(QuotationEntity) internalRepo: Repository<QuotationEntity>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger(QuotationRepo.name) logger: PinoLogger,
  ) {
    super(internalRepo, mapper, logger, QuotationEntity, Quotation);
  }

  public override get idColumnName(): keyof QuotationEntity {
    return 'id';
  }

  public async getWithDetailsAsync(id: string): Promise<Quotation | null> {
    try {
      const entity = await this.internalRepo
        .createQueryBuilder('q')
        .leftJoinAndSelect('q.customer', 'c')
        .leftJoinAndSelect('q.location', 'loc')
        .leftJoinAndSelect('q.createdByUser', 'u')
        .leftJoinAndSelect('q.convertedOrder', 'o')
        .leftJoinAndSelect('q.items', 'qi')
        .leftJoinAndSelect('qi.product', 'p')
        .leftJoinAndSelect('qi.variant', 'pv')
        .where('q.id = :id', { id })
        .orderBy('qi.id', 'ASC')
        .getOne();

      if (!entity) return null;
      const model = this.mapToModel(entity);
      if (entity.customer) {
        model.customer = {
          id: entity.customer.id,
          name: entity.customer.name,
          phone: entity.customer.phone,
          email: entity.customer.email,
          address: entity.customer.address,
          gstin: entity.customer.gstin,
        };
      }
      if (entity.location) {
        model.location = {
          id: entity.location.id,
          name: entity.location.name,
          address: entity.location.address,
          phone: entity.location.phone,
        };
      }
      if (entity.createdByUser) {
        model.createdByUser = {
          id: entity.createdByUser.id,
          firstName: entity.createdByUser.firstName,
          lastName: entity.createdByUser.lastName,
          email: entity.createdByUser.email,
        };
      }
      return model;
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  public async searchPagedAsync(filter: PageableFilter<QuotationFilter>): Promise<IPageable<Quotation>> {
    try {
      const page = filter.$page ?? 1;
      const perPage = filter.$perPage ?? 20;

      const qb = this.internalRepo
        .createQueryBuilder('q')
        .leftJoinAndSelect('q.customer', 'c')
        .leftJoinAndSelect('q.location', 'loc')
        .leftJoinAndSelect('q.createdByUser', 'u')
        .leftJoinAndSelect('q.items', 'qi');

      if (filter.organizationId) {
        qb.andWhere('q.organization_id = :orgId', { orgId: filter.organizationId });
      }

      if (filter.locationId) {
        qb.andWhere('q.location_id = :locId', { locId: filter.locationId });
      }

      if (filter.customerId) {
        qb.andWhere('q.customer_id = :custId', { custId: filter.customerId });
      }

      if (filter.status) {
        qb.andWhere('q.status = :status', { status: filter.status });
      }

      if (filter.isLatest !== undefined) {
        qb.andWhere('q.is_latest = :isLatest', { isLatest: filter.isLatest });
      }

      if (filter.search?.trim()) {
        const q = `%${filter.search.trim()}%`;
        qb.andWhere('(q.quote_number ILIKE :q OR c.name ILIKE :q OR c.phone ILIKE :q)', { q });
      }

      qb.orderBy('q.createdAt', 'DESC');
      qb.skip((page - 1) * perPage).take(perPage);

      const [entities, totalCount] = await qb.getManyAndCount();

      const items = entities.map((entity) => {
        const model = this.mapToModel(entity);
        if (entity.customer) {
          model.customer = {
            id: entity.customer.id,
            name: entity.customer.name,
            phone: entity.customer.phone,
            email: entity.customer.email,
            address: entity.customer.address,
            gstin: entity.customer.gstin,
          };
        }
        if (entity.location) {
          model.location = {
            id: entity.location.id,
            name: entity.location.name,
            address: entity.location.address,
            phone: entity.location.phone,
          };
        }
        return model;
      });

      return {
        items,
        page,
        perPage,
        totalCount,
        totalPages: countPages(totalCount, perPage),
      };
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  public async getRevisionsAsync(rootQuotationId: string): Promise<Quotation[]> {
    try {
      const entities = await this.internalRepo
        .createQueryBuilder('q')
        .where('q.root_quotation_id = :rootQuotationId', { rootQuotationId })
        .orderBy('q.version_number', 'ASC')
        .getMany();

      return entities.map((entity) => this.mapToModel(entity));
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }
}
