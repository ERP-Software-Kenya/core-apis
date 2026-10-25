import { classes } from "@automapper/classes";
import { AutomapperModule } from "@automapper/nestjs";
import { DynamicModule, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { SentryModule, SentryModuleOptions } from "@ntegral/nestjs-sentry";
import { LoggerModule, Params } from "nestjs-pino";
import { ApplicationModule } from "./application";
import { configFactory, ICoreApiConfig } from "./configuration";
import { InfrastructureModule } from "./infrastructure";

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
          useFactory: (config: ConfigService<ICoreApiConfig>) => config.get<Params>("logger") || {},
        }),
        SentryModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (config: ConfigService<ICoreApiConfig>) => config.get<SentryModuleOptions>("sentry"),
          inject: [ConfigService],
        }),
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
        ThrottlerModule.forRoot([
          {
            ttl: 60_000,
            limit: 1_000,
          },
        ]),
        ApplicationModule.forRoot(),
        InfrastructureModule.forRoot(),
      ],
      providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
      exports: [],
    };
  }
}
