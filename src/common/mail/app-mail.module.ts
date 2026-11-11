import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppMailService } from './app-mail.service';
import { MailOptions } from './options';
import { ICoreApiConfig } from '../../configuration';

@Module({
  providers: [
    {
      provide:    MailOptions,
      useFactory: (config: ConfigService<ICoreApiConfig>): MailOptions => {
        const cfg = config.get<ICoreApiConfig['mail']>('mail');
        return new MailOptions(cfg.host, cfg.port, cfg.secure, cfg.user, cfg.password, cfg.from);
      },
      inject: [ConfigService],
    },
    AppMailService,
  ],
  exports: [AppMailService],
})
export class AppMailModule {}
