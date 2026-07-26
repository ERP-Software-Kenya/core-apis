import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ClerkService, QueryHandlerStrict } from '../../../../../common';
import { GetTokenQuery } from './get-token.query';

@QueryHandlerStrict(GetTokenQuery)
export class GetTokenQueryHandler implements IQueryHandler<GetTokenQuery, string> {
  constructor(
    private readonly clerkService: ClerkService,
    @InjectPinoLogger(GetTokenQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetTokenQuery): Promise<string> {
    this.logger.info(`Minting token for user ${query.userId}`);
    return this.clerkService.getTokenForUser(query.userId);
  }
}
