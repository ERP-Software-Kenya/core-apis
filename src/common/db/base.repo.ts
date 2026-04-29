import { Mapper } from "@automapper/core";
import { Type } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { Repository } from "typeorm";
import { RpcNotImplementedException } from "../exceptions";
import { Filter, PageableFilter } from "../filtering";
import { BaseReadOnlyRepo } from './base-read-only.repo';
import { IBaseRepo } from './i-base.repo';
import { ITransactional } from "./i-transactional";
import { includes, keys } from "lodash";
import { DbException } from "./db-exception";

export abstract class BaseRepo<TEntity, T, TKey, TPageableFilter = PageableFilter<T, TKey>, TFilter = Filter<T, TKey>>
  extends BaseReadOnlyRepo<TEntity, T, TKey, TPageableFilter, TFilter>
  implements IBaseRepo<T, TKey, TPageableFilter, TFilter>
{
  constructor(internalRepo: Repository<TEntity>, mapper: Mapper, logger: PinoLogger, entityType: Type<TEntity>, domainType: Type<T>) {
    super(internalRepo, mapper, logger, entityType, domainType);
  }

  protected get autoUpdatedAtEnabled(): boolean {
    return true;
  }

  public get transaction(): ITransactional {
    throw new RpcNotImplementedException("Transactions not implemened");
  }

  public async createAsync(entry: T): Promise<T> {
    try {
      const entity = this.mapToEntity(entry);
      await this.internalRepo.save(entity);
      return this.mapToModel(entity);
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  public async updateAsync(entry: T): Promise<T> {
    try {
      const entity: TEntity = this.mapToEntity(entry);
      if (includes(keys(entity), "updatedAt") && this.autoUpdatedAtEnabled) {
        entity["updatedAt"] = new Date();
      }
      await this.internalRepo.save(entity);
      return this.mapToModel(entity);
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  public async deleteAsync(pk: TKey, force = false): Promise<boolean> {
    try {
      const key = typeof pk === "object" ? { ...pk } : { [this.idColumnName]: pk };
      if (this.softDeleteEnabled && !force) {
        await this.internalRepo.softDelete(key as any);
      } else {
        await this.internalRepo.delete(key as any);
      }
      return true;
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  protected mapToEntity(entry: T): TEntity {
    return this.internalRepo.create(entry as unknown as TEntity);
  }
}
