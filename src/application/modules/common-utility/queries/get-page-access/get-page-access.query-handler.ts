import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { PAGE_ACCESS_REPO, IPageAccessRepo } from '../../i-page-access.repo';
import { PageAccessConfigResponse } from '../../models';
import { GetPageAccessQuery } from './get-page-access.query';

@QueryHandlerStrict(GetPageAccessQuery)
export class GetPageAccessQueryHandler
  implements IQueryHandler<GetPageAccessQuery, PageAccessConfigResponse[]>
{
  public constructor(
    @Inject(PAGE_ACCESS_REPO) private readonly repo: IPageAccessRepo,
    @InjectPinoLogger(GetPageAccessQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(_query: GetPageAccessQuery): Promise<PageAccessConfigResponse[]> {
    this.logger.info(`Executing ${GetPageAccessQuery.name}`);
    const records = await this.repo.findAllAsync();
    return records.map((r) => {
      const res        = new PageAccessConfigResponse();
      res.pageKey      = r.pageKey;
      res.allowedRoles = r.allowedRoles;
      return res;
    });
  }
}
