import { Module } from '@nestjs/common';
import { EmailTemplateProfile } from './mapper/email-template.profile';
import { MailController } from './mail.controller';

@Module({
  controllers: [MailController],
  providers: [EmailTemplateProfile],
  exports: [EmailTemplateProfile],
})
export class MailTemplatesModule {}
