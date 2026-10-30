import { Module } from '@nestjs/common';
import { EmailTemplateProfile } from './mapper/email-template.profile';
import { MailController } from './mail.controller';
import { AppMailModule } from '../../../common/mail/app-mail.module';

@Module({
  imports:     [AppMailModule],
  controllers: [MailController],
  providers:   [EmailTemplateProfile],
  exports:     [EmailTemplateProfile],
})
export class MailTemplatesModule {}
