import { SentryModuleOptions } from '@ntegral/nestjs-sentry';
import { Params } from 'nestjs-pino';
import { IDbOptions } from '../common';
import { IApiOptions } from './i-api.options';
import { IClerkOptions } from './i-clerk.options';
import { IMailOptions } from './i-mail.options';

export interface ICoreApiConfig {
  logger: Params;
  sentry: SentryModuleOptions;
  api: IApiOptions;
  database: IDbOptions;
  clerk: IClerkOptions;
  mail: IMailOptions;
}
