import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CLERK_STRATEGY } from '../constants';

@Injectable()
export class ClerkAuthGuard extends AuthGuard(CLERK_STRATEGY) {
  public override handleRequest<TUser>(err: Error, user: TUser): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid or missing Clerk session token');
    }
    return user;
  }

  public override canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
