import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ALLOW_PENDING_SESSION_META, CLERK_STRATEGY, SESSION_PENDING_CODE } from '../constants';
import { AuthenticatedUser } from '../types';
import { shouldAllowAnonymous } from './should-allow-anonymous';

@Injectable()
export class ClerkAuthGuard extends AuthGuard(CLERK_STRATEGY) {
  private readonly logger = new Logger(ClerkAuthGuard.name);

  constructor(private readonly reflector: Reflector) {
    super();
  }

  public override handleRequest<TUser>(err: Error, user: TUser, info: unknown, context?: ExecutionContext): TUser {
    if (err || !user) {
      const reason = err?.message ?? (info instanceof Error ? info.message : String(info ?? 'no info'));
      this.logger.warn(`JWT auth failed — ${reason}`);
      throw err || new UnauthorizedException('Invalid or missing Clerk session token');
    }

    const authUser = user as unknown as AuthenticatedUser;
    if (authUser.sessionStatus === 'pending' && !this.allowsPending(context)) {
      this.logger.warn(`Pending Clerk session blocked — user ${authUser.clerkUserId}, session ${authUser.clerkSessionId}`);
      throw new UnauthorizedException({
        code: SESSION_PENDING_CODE,
        message: 'Your account setup is not finished. Complete the remaining sign-in steps to continue.',
      });
    }
    return user;
  }

  public override canActivate(context: ExecutionContext) {
    if (shouldAllowAnonymous(context, this.reflector)) {
      return true;
    }
    return super.canActivate(context);
  }

  private allowsPending(context?: ExecutionContext): boolean {
    return !!context && !!this.reflector.get(ALLOW_PENDING_SESSION_META, context.getHandler());
  }
}
