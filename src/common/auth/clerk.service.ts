import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClerkClient } from '@clerk/backend';
import { ICoreApiConfig } from '../../configuration';

@Injectable()
export class ClerkService {
  private readonly client: ReturnType<typeof createClerkClient>;

  constructor(config: ConfigService<ICoreApiConfig>) {
    const clerkCfg = config.get<ICoreApiConfig['clerk']>('clerk');
    this.client = createClerkClient({ secretKey: clerkCfg.secretKey });
  }

  public async getTokenForUser(userId: string): Promise<string> {
    const result = await this.client.sessions.getSessionList({ userId, status: 'active' });
    if (!result.data.length) {
      throw new NotFoundException(`No active session found for user ${userId}`);
    }
    const tokenResult = await this.client.sessions.getToken(result.data[0].id);
    return tokenResult.jwt;
  }
}
