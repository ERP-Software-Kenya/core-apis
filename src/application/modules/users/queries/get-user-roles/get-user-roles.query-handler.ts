import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, CLERK_SERVICE, IClerkService } from '../../../../../common';
import { ClerkUserRolesResponse } from '../../models';
import { GetUserRolesQuery } from './get-user-roles.query';

@QueryHandlerStrict(GetUserRolesQuery)
export class GetUserRolesQueryHandler implements IQueryHandler<GetUserRolesQuery, ClerkUserRolesResponse> {
  constructor(
    @Inject(CLERK_SERVICE) private readonly clerkService: IClerkService,
    @InjectPinoLogger(GetUserRolesQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetUserRolesQuery): Promise<ClerkUserRolesResponse> {
    this.logger.info(`Executing ${GetUserRolesQuery.name} clerkUserId=${query.clerkUserId}`);
    const roles           = await this.clerkService.getUserRolesAsync(query.clerkUserId);
    const response        = new ClerkUserRolesResponse();
    response.clerkUserId  = query.clerkUserId;
    response.roles        = roles;
    return response;
  }
}
