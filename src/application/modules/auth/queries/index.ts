import { GetMeQueryHandler } from './get-me';
import { GetTokenQueryHandler } from './get-token';

export * from './get-me';
export * from './get-token';

export const AuthQueryHandlers = [GetMeQueryHandler, GetTokenQueryHandler];
