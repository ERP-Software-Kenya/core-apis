import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { CLERK_STRATEGY } from '../constants';
import { shouldAllowAnonymous } from './should-allow-anonymous';

@Injectable()
export class ClerkAuthGuard extends AuthGuard(CLERK_STRATEGY) {
  private readonly logger = new Logger(ClerkAuthGuard.name);

  constructor(private readonly reflector: Reflector) {
    super();
  }

  public override handleRequest<TUser>(err: Error, user: TUser, info: unknown): TUser {
    if (err || !user) {
      const reason = err?.message ?? (info instanceof Error ? info.message : String(info ?? 'no info'));
      this.logger.warn(`JWT auth failed — ${reason}`);
      throw err || new UnauthorizedException('Invalid or missing Clerk session token');
    }
    return user;
  }

  public override canActivate(context: ExecutionContext) {
    if (shouldAllowAnonymous(context, this.reflector)) {
      return true;
    }
    return super.canActivate(context);
  }
}
