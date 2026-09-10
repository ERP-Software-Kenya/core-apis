import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { IFilterNormalizer, IPageable, QueryHandlerStrict } from '../../../../../common';
import { BRANCH_REPO, LOCATION_REPO } from '../../../../constants';
import { Branch, BranchFilter } from '../../domain';
import { IBranchRepo } from '../..';
import { ILocationRepo } from '../../../locations';
import { BranchFilterNormalizer } from '../../helpers';
import { SearchBranchesQuery } from './search-branches.query';

@QueryHandlerStrict(SearchBranchesQuery)
export class SearchBranchesQueryHandler implements IQueryHandler<SearchBranchesQuery, IPageable<Branch>> {
  constructor(
    @Inject(BRANCH_REPO) private readonly repo: IBranchRepo,
    @Inject(LOCATION_REPO) private readonly locationRepo: ILocationRepo,
    @Inject(BranchFilterNormalizer) private readonly filterNormalizer: IFilterNormalizer<BranchFilter>,
    @InjectPinoLogger(SearchBranchesQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: SearchBranchesQuery): Promise<IPageable<Branch>> {
    this.logger.info(`Executing ${SearchBranchesQuery.name}`);
    const filter = this.filterNormalizer.pageableNormalize(query);
    const page = await this.repo.pagedAsync(filter);
    const rows = await this.locationRepo.findByBranchIdsAsync(page.items.map((b) => b.id));
    const locMap = new Map<string, string[]>();
    for (const row of rows) {
      const list = locMap.get(row.branchId) ?? [];
      list.push(row.id);
      locMap.set(row.branchId, list);
    }
    return {
      ...page,
      items: page.items.map((b) => ({ ...b, locationIds: locMap.get(b.id) ?? [] })),
    };
  }
}
