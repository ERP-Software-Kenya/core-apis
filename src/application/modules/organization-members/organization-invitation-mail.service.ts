import { Inject, Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { EMAIL_TEMPLATE_REPO, EmailTemplateData, IEmailTemplateRepo, MailOptions, MailService } from '../../../common';

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char] as string);
}

@Injectable()
export class OrganizationInvitationMailService extends MailService {
  constructor(
    options: MailOptions,
    @Inject(EMAIL_TEMPLATE_REPO) private readonly templateRepo: IEmailTemplateRepo,
    @InjectPinoLogger(OrganizationInvitationMailService.name) logger: PinoLogger,
  ) { super(options, logger); }

  protected async findTemplateAsync(slug: string): Promise<EmailTemplateData | null> {
    const template = await this.templateRepo.findBySlugAsync(slug);
    return template ? { subject: template.subject, htmlBody: template.htmlBody } : null;
  }

  public async sendInvitation(params: { to: string; organizationName: string; roleName: string; inviteUrl: string; expiresAt: Date }): Promise<void> {
    const org = escapeHtml(params.organizationName);
    const role = escapeHtml(params.roleName.replace(/_/g, ' '));
    const url = escapeHtml(params.inviteUrl);
    await this.sendAsync({
      to: params.to,
      subject: `${params.organizationName} invited you to join their organization`,
      html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto"><h2>${org} would like to invite you</h2><p>You have been invited to join <strong>${org}</strong> as <strong>${role}</strong>.</p><p><a href="${url}" style="display:inline-block;padding:12px 20px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px">Accept invitation</a></p><p>This invitation expires on ${escapeHtml(params.expiresAt.toUTCString())}.</p><p>If the app is not installed, the link will show the available installation options. After installing, return to this email and open the invitation again.</p></div>`,
    });
  }
}
