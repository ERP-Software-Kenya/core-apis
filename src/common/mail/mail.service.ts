import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import * as Handlebars from 'handlebars';
import { IMailService } from './i-mail.service';
import { MailMessage } from './domain';
import { MailOptions } from './options';
import { MailSendException } from './exceptions';
import { EMAIL_TEMPLATE_REPO, IEmailTemplateRepo } from '../../application/modules/mail-templates';

@Injectable()
export class MailService implements IMailService, OnApplicationBootstrap {
  private transporter: Transporter;

  constructor(
    private readonly options: MailOptions,
    @Inject(EMAIL_TEMPLATE_REPO) private readonly templateRepo: IEmailTemplateRepo,
    @InjectPinoLogger(MailService.name) private readonly logger: PinoLogger,
  ) {}

  public onApplicationBootstrap(): void {
    this.transporter = nodemailer.createTransport({
      host: this.options.host,
      port: this.options.port,
      secure: this.options.secure,
      auth: {
        user: this.options.user,
        pass: this.options.password,
      },
    });
    this.logger.info('Mail transporter initialized');
  }

  public async sendAsync(message: MailMessage): Promise<void> {
    this.logger.info({ to: message.to, subject: message.subject }, 'Sending email');
    try {
      const toAddress = Array.isArray(message.to) ? message.to.join(', ') : message.to;

      await this.transporter.sendMail({
        from: message.from ?? this.options.defaultFrom,
        to: toAddress,
        cc: this.normalizeAddresses(message.cc),
        bcc: this.normalizeAddresses(message.bcc),
        replyTo: message.replyTo,
        subject: message.subject,
        html: message.html,
        text: message.text,
        attachments: message.attachments?.map((att) => ({
          filename: att.filename,
          content: att.content,
          contentType: att.contentType,
          encoding: att.encoding,
        })),
      });

      this.logger.info({ to: toAddress }, 'Email sent successfully');
    } catch (err) {
      const error = err as Error;
      this.logger.error({ error: error.message }, 'Failed to send email');
      throw new MailSendException(error.message);
    }
  }

  public async sendTemplatedAsync(
    to: string | string[],
    templateSlug: string,
    context: Record<string, unknown>,
    subject?: string,
  ): Promise<void> {
    this.logger.info({ to, templateSlug }, 'Sending templated email');

    const template = await this.templateRepo.findBySlugAsync(templateSlug);
    if (!template) {
      throw new MailSendException(`Email template "${templateSlug}" not found`);
    }

    const compiledSubject = Handlebars.compile(subject ?? template.subject)(context);
    const compiledHtml = Handlebars.compile(template.htmlBody)(context);

    await this.sendAsync({ to, subject: compiledSubject, html: compiledHtml });
  }

  private normalizeAddresses(value?: string | string[]): string | undefined {
    if (!value) return undefined;
    return Array.isArray(value) ? value.join(', ') : value;
  }
}
