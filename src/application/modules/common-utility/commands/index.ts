export * from './update-page-access/update-page-access.command';
export * from './update-page-access/update-page-access.command-handler';

import { UpdatePageAccessCommandHandler } from './update-page-access/update-page-access.command-handler';

export const CommonUtilityCommandHandlers = [UpdatePageAccessCommandHandler];
