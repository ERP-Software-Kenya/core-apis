import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, CLERK_SERVICE, IClerkService } from '../../../../../common';
import { ClerkOrganizationResponse } from '../../models';
import { ListOrganizationsQuery } from './list-organizations.query';

@QueryHandlerStrict(ListOrganizationsQuery)
export class ListOrganizationsQueryHandler implements IQueryHandler<ListOrganizationsQuery, ClerkOrganizationResponse[]> {
  public constructor(
    @Inject(CLERK_SERVICE) private readonly clerkService: IClerkService,
    @InjectPinoLogger(ListOrganizationsQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(): Promise<ClerkOrganizationResponse[]> {
    this.logger.info(`Executing ${ListOrganizationsQuery.name}`);
    return this.clerkService.listOrganizationsAsync();
  }
}
