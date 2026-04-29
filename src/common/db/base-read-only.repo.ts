import { Mapper } from "@automapper/core";
import { DbException, filter, isArray, isEmpty, isNil, isUndefined, omit, reduce, toPairs, validateUuid } from "..";
import { Type } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import {
  Between,
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsWhere,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from "typeorm";
import { countPages, Filter, IPageable, PageableFilter } from "..";
import { EFilterOperation } from '..';
import { IReadOnlyRepo } from './i-read-only.repo';
import { ArgumentNilException } from "..";
import { EUserType } from "..";
import { isNilOrEmpty } from "..";

export abstract class BaseReadOnlyRepo<TEntity, T, TKey, TPageableFilter extends PageableFilter<any> = PageableFilter<T, TKey>, TFilter extends Filter<any> = Filter<T, TKey>>
  implements IReadOnlyRepo<T, TKey, TPageableFilter, TFilter>
{
  constructor(
    protected readonly internalRepo: Repository<TEntity>,
    protected readonly mapper: Mapper,
    protected readonly logger: PinoLogger,
    protected readonly entityType: Type<TEntity>,
    protected readonly domainType: Type<T>,
  ) {}

  public get idColumnName(): keyof TEntity {
    return "id" as keyof TEntity;
  }

  public get specialFilterFields(): (keyof TPageableFilter)[] {
    return ["$ids", "$order", "$orderBy", "$page", "$perPage", "$resolveImages", "userType"];
  }

  public get softDeleteEnabled(): boolean {
    return false;
  }

  public get softDeleteColumnName(): keyof TEntity {
    return "deletedAt" as keyof TEntity;
  }

  public getDefaultEqualityFields(): Set<string> {
    // Get entity metadata from the repository
    const metadata = this.internalRepo.metadata;
    // Filter columns that are of type 'enum'
    const enumColumns = metadata.columns.filter((column) => column.type === "enum").map((column) => column.propertyName);
    return new Set<string>(enumColumns);
  }

  public async getAsync(pk: TKey): Promise<T> {
    try {
      if (isNil(pk)) {
        throw new ArgumentNilException();
      }
      const key = typeof pk === "object" ? { ...pk } : { [this.idColumnName]: pk };
      const e = await this.internalRepo.findOneBy(key as any);
      if (this.isDeleted(e)) {
        return null;
      }
      return this.mapToModel(e);
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  public async allAsync(filterObj?: TFilter): Promise<T[]> {
    try {
      const opts = this.createFilterOpts(filterObj);
      const es = await this.internalRepo.find(opts);
      return this.mapToModelArray(es);
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  // Finds one record by filter
  public async findOneAsync(filter?: TFilter): Promise<T> {
    try {
      const opts = this.createFilterOpts(filter);
      const e = await this.internalRepo.findOneBy(opts.where);
      if (this.isDeleted(e)) {
        return null;
      }
      return this.mapToModel(e);
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  public async pagedAsync(filterObj?: TPageableFilter): Promise<IPageable<T>> {
    try {
      const opts = this.createFilterOpts(filterObj);
      const [es, count] = await this.internalRepo.findAndCount(opts);
      return {
        items: this.mapToModelArray(es),
        page: filterObj.$page,
        perPage: filterObj.$perPage,
        totalCount: count,
        totalPages: countPages(count, filterObj.$perPage),
      };
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  public async countAsync(filterObj?: TFilter): Promise<number> {
    try {
      const opts = this.createFilterOpts(filterObj);
      const count = await this.internalRepo.count(opts);
      return count;
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  public async existAsync(filterObj?: TFilter): Promise<boolean> {
    try {
      const opts = this.createFilterOpts(filterObj);
      // TODO: need to upgrade version of typeorm to use "exist" method
      const result = await this.internalRepo.findOne(opts);
      const exists = !isNilOrEmpty(result);
      return exists;
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  protected createFilterOpts(filterObj: TFilter | TPageableFilter): FindManyOptions<TEntity> {
    const userType = filterObj?.userType;
    if (isNilOrEmpty(filterObj)) {
      return null;
    }
    const where: any = reduce(
      filter(toPairs(omit(filterObj, this.specialFilterFields)), ([, value]) => !isUndefined(value)),
      (acc, item) => ({ ...acc, ...this.createPartialWhere(...item) }),
      {},
    );
    if (isArray(filterObj.$ids) && !isEmpty(filterObj.$ids)) {
      where[this.idColumnName] = In(filterObj.$ids);
    }
    const opts: any = { where, order: { [filterObj.$orderBy]: filterObj.$order } };
    const pf = filterObj as PageableFilter<TFilter>;
    if (!isNilOrEmpty(pf.$page) && !isNilOrEmpty(pf.$perPage)) {
      opts.skip = pf.$perPage * (pf.$page - 1);
      opts.take = pf.$perPage;
    }
    opts.order = this.transformOrderBy(opts.order);

    // Append user type to where clause if provided
    opts.where = {
      ...opts.where,
      ...this.appendUserTypeToWhere(where, userType),
    };

    this.modifyFindOption(opts, filterObj);
    if (this.softDeleteEnabled) {
      opts.where = {
        ...opts.where,
        ...this.softDeleteFilterOptions(),
      };
    }
    return opts;
  }

  protected modifyFindOption(findOpts: FindManyOptions<TEntity>, filterObj: TFilter | TPageableFilter): void {
    this.logger.debug([findOpts, filterObj], "Modify where options hook");
  }

  protected transformOrderBy(order: FindOptionsOrder<TEntity>): FindOptionsOrder<TEntity> {
    return order;
  }

  protected appendUserTypeToWhere(where: FindOptionsWhere<TEntity>, userType: EUserType, relationKey: string = "user"): FindOptionsWhere<TEntity> {
    if (isNilOrEmpty(userType)) {
      return where;
    }
    if (!Object.values(EUserType).includes(userType )) {
      throw new DbException(`Unsupported user type: ${userType}`);
    }

    return {
      ...where,
      [relationKey]: {
        roles: {
          role: {
            roleType: userType,
          },
        },
      },
    };
  }

  protected createPartialWhere(key: string, value: unknown, operation?: EFilterOperation): Record<string, unknown> {
    if (isUndefined(value)) {
      return {};
    }
    if (!isNilOrEmpty(operation)) {
      switch (operation) {
        case EFilterOperation.NotEquals:
          return { [key]: Not(value) };
        case EFilterOperation.Equals:
          return { [key]: value };
        case EFilterOperation.Like:
          return { [key]: Like("%" + (value as string) + "%") };
        case EFilterOperation.ILike:
          return { [key]: ILike("%" + (value as string) + "%") };
        case EFilterOperation.Starts:
          return { [key]: Like((value as string) + "%") };
        case EFilterOperation.IStarts:
          return { [key]: ILike((value as string) + "%") };
        case EFilterOperation.Ends:
          return { [key]: Like("%" + (value as string)) };
        case EFilterOperation.IEnds:
          return { [key]: ILike("%" + (value as string)) };
        case EFilterOperation.In:
          return { [key]: In(value as unknown[]) };
        case EFilterOperation.Less:
          return { [key]: LessThan(value) };
        case EFilterOperation.LessEq:
          return { [key]: LessThanOrEqual(value) };
        case EFilterOperation.More:
          return { [key]: MoreThan(value) };
        case EFilterOperation.MoreEq:
          return { [key]: MoreThanOrEqual(value) };
        case EFilterOperation.Between:
          // TODO: check lint
          // eslint-disable-next-line no-case-declarations
          const [from, to] = value as number[] | Date[];
          if (!isNil(from) && !isNil(to)) return { [key]: Between(from, to) };
          if (!isNil(from)) return { [key]: MoreThanOrEqual(from) };
          if (!isNil(to)) return { [key]: LessThanOrEqual(to) };
          return {};
        case EFilterOperation.IsNull:
          return { [key]: IsNull() };
        case EFilterOperation.IsNotNull:
          return { [key]: Not(IsNull()) };
      }
    }
    if (typeof value === "string") {
      return validateUuid(value) || this.getDefaultEqualityFields().has(key) ? { [key]: value } : { [key]: ILike("%" + value + "%") };
    }
    return { [key]: value };
  }

  protected mapToModel(entity: TEntity): T {
    return this.mapper.map(entity, this.entityType, this.domainType);
  }

  protected mapToModelArray(entities: TEntity[]): T[] {
    return this.mapper.mapArray(entities, this.entityType, this.domainType);
  }

  protected softDeleteFilterOptions(): Record<string, unknown> {
    return this.createPartialWhere(this.softDeleteColumnName as string, null, EFilterOperation.IsNull);
  }

  protected isDeleted(entity: TEntity): boolean {
    if (isNil(entity)) {
      return true;
    }
    return this.softDeleteEnabled && !isNil(entity[this.softDeleteColumnName]);
  }
}
