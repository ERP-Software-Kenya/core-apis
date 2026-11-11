import { SetMetadata } from '@nestjs/common';
import { ALLOW_PENDING_SESSION_META } from '../constants';

/**
 * Lets a Clerk session with unfinished tasks (sts: "pending", e.g. no active organization yet)
 * reach this handler. Use only on onboarding/self-service endpoints; every other route rejects
 * pending sessions with code SESSION_PENDING.
 */
export const AllowPendingSession = (): MethodDecorator => SetMetadata(ALLOW_PENDING_SESSION_META, true);
