import { SetMetadata } from '@nestjs/common';
import { ERole } from '../../../infrastructure/persistence/entities/role.entity';
import { ROLES_META_KEY } from '../constants';

export const Roles = (...roles: ERole[]) => SetMetadata(ROLES_META_KEY, roles);
