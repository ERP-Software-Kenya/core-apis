import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { BRANCH_REPO, LOCATION_REPO } from '../../../../constants';
import { Branch } from '../../domain';
import { IBranchRepo } from '../..';
import { ILocationRepo } from '../../../locations';
import { ListBranchesQuery } from './list-branches.query';

@QueryHandlerStrict(ListBranchesQuery)
export class ListBranchesQueryHandler implements IQueryHandler<ListBranchesQuery, Branch[]> {
  constructor(
    @Inject(BRANCH_REPO) private readonly repo: IBranchRepo,
    @Inject(LOCATION_REPO) private readonly locationRepo: ILocationRepo,
    @InjectPinoLogger(ListBranchesQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: ListBranchesQuery): Promise<Branch[]> {
    this.logger.info(`Executing ${ListBranchesQuery.name}`);
    const branches = await this.repo.allAsync(query);
    const locMap = await this.loadLocationMap(branches);
    return branches.map((b) => ({ ...b, locationIds: locMap.get(b.id) ?? [] }));
  }

  private async loadLocationMap(branches: Branch[]): Promise<Map<string, string[]>> {
    const ids = branches.map((b) => b.id);
    const rows = await this.locationRepo.findByBranchIdsAsync(ids);
    const map = new Map<string, string[]>();
    for (const row of rows) {
      const list = map.get(row.branchId) ?? [];
      list.push(row.id);
      map.set(row.branchId, list);
    }
    return map;
  }
}
