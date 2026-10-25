import { Inject, Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { EActivityAction } from '../../../infrastructure/persistence/entities/activity-log.entity';
import { NOTIFICATION_SETTING_REPO, INotificationSettingRepo } from '../../modules/notification-settings/i-notification-setting.repo';
import { AppMailService } from '../../../common/mail/app-mail.service';

const ACTION_LABELS: Partial<Record<EActivityAction, string>> = {
  [EActivityAction.SaleCreated]:                'New Sale Created',
  [EActivityAction.SaleVoided]:                 'Sale Voided',
  [EActivityAction.SalePaymentReceived]:        'Payment Received',
  [EActivityAction.SaleRefunded]:               'Sale Refunded',
  [EActivityAction.PurchaseOrderCreated]:       'Purchase Order Created',
  [EActivityAction.PurchaseOrderGoodsReceived]: 'Goods Received on Purchase Order',
  [EActivityAction.PurchaseOrderCancelled]:     'Purchase Order Cancelled',
  [EActivityAction.StockAdded]:                 'Stock Added',
  [EActivityAction.StockAdjusted]:              'Stock Adjusted',
  [EActivityAction.StockDamaged]:               'Stock Damaged',
  [EActivityAction.StockTransferred]:           'Stock Transferred',
  [EActivityAction.ProductCreated]:             'Product Created',
  [EActivityAction.ProductUpdated]:             'Product Updated',
  [EActivityAction.ProductDeleted]:             'Product Deleted',
  [EActivityAction.ProductPriceChanged]:        'Product Price Changed',
  [EActivityAction.CustomerCreated]:            'New Customer Added',
  [EActivityAction.CustomerCreditLimitChanged]: 'Customer Credit Limit Changed',
  [EActivityAction.UserCreated]:                'New Staff Added',
  [EActivityAction.UserRoleChanged]:            'Staff Role Changed',
};

export interface INotificationContext {
  action: EActivityAction;
  organizationId: string;
  entityType?: string;
  entityId?: string;
  actorName?: string;
  metadata?: Record<string, unknown>;
}

@Injectable()
export class NotificationDispatchService {
  public constructor(
    @Inject(NOTIFICATION_SETTING_REPO) private readonly settingRepo: INotificationSettingRepo,
    private readonly mailService: AppMailService,
    @InjectPinoLogger(NotificationDispatchService.name) private readonly logger: PinoLogger,
  ) {}

  public dispatch(ctx: INotificationContext): void {
    this.dispatchAsync(ctx).catch((err: unknown) =>
      this.logger.error({ err }, 'Failed to dispatch notification'),
    );
  }

  private async dispatchAsync(ctx: INotificationContext): Promise<void> {
    const setting = await this.settingRepo.findOneAsync(ctx.organizationId, ctx.action);
    if (!setting?.isEnabled) return;

    const adminEmails = await this.settingRepo.findOrgAdminEmailsAsync(ctx.organizationId);
    if (!adminEmails.length) return;

    const label = ACTION_LABELS[ctx.action] ?? ctx.action;
    const subject = `[ERP] ${label}`;
    const html = this.buildEmailHtml(label, ctx);

    for (const email of adminEmails) {
      await this.mailService.sendAsync({ to: email, subject, html });
    }
  }

  private buildEmailHtml(label: string, ctx: INotificationContext): string {
    const rows: string[] = [];
    if (ctx.actorName)  rows.push(`<tr><td style="padding:6px 12px 6px 0"><strong>Performed by</strong></td><td style="padding:6px 0">${ctx.actorName}</td></tr>`);
    if (ctx.entityType) rows.push(`<tr><td style="padding:6px 12px 6px 0"><strong>Module</strong></td><td style="padding:6px 0">${ctx.entityType}</td></tr>`);
    if (ctx.entityId)   rows.push(`<tr><td style="padding:6px 12px 6px 0"><strong>Record ID</strong></td><td style="padding:6px 0;font-family:monospace;font-size:12px">${ctx.entityId}</td></tr>`);
    rows.push(`<tr><td style="padding:6px 12px 6px 0"><strong>Time</strong></td><td style="padding:6px 0">${new Date().toLocaleString('en-GB')}</td></tr>`);

    return `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
        <div style="background:#1e3a5f;padding:20px 24px;border-radius:8px 8px 0 0">
          <h2 style="color:#fff;margin:0;font-size:18px">${label}</h2>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;padding:24px">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            ${rows.join('')}
          </table>
          <p style="margin-top:20px;font-size:12px;color:#6b7280">
            Automated notification from your ERP system.<br/>
            Manage preferences in <strong>Settings → Notification Settings</strong>.
          </p>
        </div>
      </div>`;
  }
}
