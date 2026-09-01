import { Inject, NotFoundException } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { BRANCH_REPO, LOCATION_REPO } from '../../../../constants';
import { Branch } from '../../domain';
import { IBranchRepo } from '../..';
import { ILocationRepo } from '../../../locations';
import { loadBranchLocationIds } from '../../helpers/branch-location.util';
import { GetBranchQuery } from './get-branch.query';

@QueryHandlerStrict(GetBranchQuery)
export class GetBranchQueryHandler implements IQueryHandler<GetBranchQuery, Branch> {
  constructor(
    @Inject(BRANCH_REPO) private readonly repo: IBranchRepo,
    @Inject(LOCATION_REPO) private readonly locationRepo: ILocationRepo,
    @InjectPinoLogger(GetBranchQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetBranchQuery): Promise<Branch> {
    this.logger.info(`Executing ${GetBranchQuery.name} id=${query.id}`);
    const branch = await this.repo.getAsync(query.id);
    if (!branch) throw new NotFoundException(`Branch ${query.id} not found`);
    branch.locationIds = await loadBranchLocationIds(this.locationRepo, query.id);
    return branch;
  }
}
