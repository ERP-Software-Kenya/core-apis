import { SetMetadata } from '@nestjs/common';
import { ALLOW_ANONYMOUS_META } from '../constants';

export const AllowAnonymous = (): MethodDecorator => SetMetadata(ALLOW_ANONYMOUS_META, true);
