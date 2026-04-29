import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { SentryModule, SentryModuleOptions } from '@ntegral/nestjs-sentry';
import { LoggerModule, Params } from 'nestjs-pino';
import { ApplicationModule } from './application';
import { configFactory, ICoreApiConfig } from './configuration';
import { InfrastructureModule } from './infrastructure';

@Module({})
export class AppModule {
  public static forRoot(): DynamicModule {
    return {
      global: true,
      module: AppModule,
      imports: [
        ConfigModule.forRoot({
          load: [configFactory],
          isGlobal: true,
        }),
        LoggerModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (config: ConfigService<ICoreApiConfig>) =>
            config.get<Params>('logger') || {},
        }),
        SentryModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (config: ConfigService<ICoreApiConfig>) =>
            config.get<SentryModuleOptions>('sentry'),
          inject: [ConfigService],
        }),
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
        ThrottlerModule.forRoot([
          {
            ttl: 60,
            limit: 100,
          },
        ]),
        ApplicationModule.forRoot(),
        InfrastructureModule.forRoot(),
      ],
      providers: [],
      exports: [],
    };
  }
}
