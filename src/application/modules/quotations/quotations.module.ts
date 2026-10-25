import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from '../../shared';
import { QuotationsController } from './quotations.controller';
import { QuotationCommandHandlers } from './commands';
import { QuotationQueryHandlers } from './queries';
import { QuotationProfile } from './mapper';
import { MailOptions } from '../../../common';
import { ICoreApiConfig } from '../../../configuration';
import { QuotationsMailService } from './mail/quotations-mail.service';

@Module({
  imports: [CqrsModule, SharedModule],
  controllers: [QuotationsController],
  providers: [
    {
      provide: MailOptions,
      useFactory: (config: ConfigService<ICoreApiConfig>): MailOptions => {
        const cfg = config.get<ICoreApiConfig['mail']>('mail');
        return new MailOptions(cfg.host, cfg.port, cfg.secure, cfg.user, cfg.password, cfg.from);
      },
      inject: [ConfigService],
    },
    QuotationsMailService,
    ...QuotationCommandHandlers,
    ...QuotationQueryHandlers,
    QuotationProfile,
  ],
})
export class QuotationsModule {}
