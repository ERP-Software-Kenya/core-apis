import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { FindOptionsWhere, Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { BaseSeed } from '../../../common';
import { EmailTemplateEntity } from '../entities';

const BILL_RECEIPT_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f7fb; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,.08); }
    .header { background: linear-gradient(135deg, #1a56db 0%, #0e3fa8 100%); padding: 36px 40px; }
    .header h1 { color: #fff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.3px; }
    .header p  { color: rgba(255,255,255,.80); margin: 4px 0 0; font-size: 13px; }
    .body { padding: 36px 40px; }
    .greeting { font-size: 15px; color: #374151; margin-bottom: 20px; }
    .info-box { background: #f8fafc; border-left: 4px solid #1a56db; border-radius: 6px; padding: 16px 20px; margin-bottom: 24px; }
    .info-box .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color: #6b7280; margin-bottom: 2px; }
    .info-box .value { font-size: 15px; color: #111827; font-weight: 600; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    table th { background: #f1f5f9; padding: 10px 12px; text-align: left; font-size: 12px; text-transform: uppercase; letter-spacing: 0.6px; color: #6b7280; }
    table td { padding: 12px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #374151; }
    .total-row td { font-weight: 700; font-size: 15px; color: #111827; border-bottom: none; }
    .badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; background: #d1fae5; color: #065f46; }
    .footer { background: #f8fafc; padding: 24px 40px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
    .footer a { color: #1a56db; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>{{organizationName}}</h1>
      <p>Bill Receipt — {{billNumber}}</p>
    </div>
    <div class="body">
      <p class="greeting">Dear {{customerName}},</p>
      <p style="color:#6b7280;font-size:14px;">Thank you for your purchase. Here is a summary of your bill.</p>

      <div class="info-box">
        <div class="label">Bill Number</div>
        <div class="value">{{billNumber}}</div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th style="text-align:right">Qty</th>
            <th style="text-align:right">Unit Price</th>
            <th style="text-align:right">Total</th>
          </tr>
        </thead>
        <tbody>
          {{#each items}}
          <tr>
            <td>{{this.name}}</td>
            <td style="text-align:right">{{this.quantity}}</td>
            <td style="text-align:right">{{this.unitPrice}}</td>
            <td style="text-align:right">{{this.total}}</td>
          </tr>
          {{/each}}
          <tr>
            <td colspan="3" style="text-align:right;color:#6b7280;font-size:13px;">Subtotal</td>
            <td style="text-align:right;font-size:13px;">{{subtotal}}</td>
          </tr>
          <tr>
            <td colspan="3" style="text-align:right;color:#6b7280;font-size:13px;">Tax</td>
            <td style="text-align:right;font-size:13px;">{{taxAmount}}</td>
          </tr>
          <tr class="total-row">
            <td colspan="3" style="text-align:right;">Total</td>
            <td style="text-align:right;color:#1a56db;">{{totalAmount}}</td>
          </tr>
        </tbody>
      </table>

      <p style="color:#6b7280;font-size:13px;margin-top:8px;">
        Payment Method: <strong>{{paymentMethod}}</strong> &nbsp;|&nbsp;
        Status: <span class="badge">{{status}}</span>
      </p>
      <p style="color:#6b7280;font-size:13px;">Date: {{billedAt}}</p>
    </div>
    <div class="footer">
      &copy; {{organizationName}} &mdash; This is an automated receipt. <a href="#">Unsubscribe</a>
    </div>
  </div>
</body>
</html>
`;

const INVOICE_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f7fb; margin: 0; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,.08); }
    .header { background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%); padding: 36px 40px; }
    .header h1 { color: #fff; margin: 0; font-size: 22px; font-weight: 700; }
    .header p  { color: rgba(255,255,255,.80); margin: 4px 0 0; font-size: 13px; }
    .body { padding: 36px 40px; }
    .due-box { background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 6px; padding: 14px 18px; margin-bottom: 24px; }
    .due-box .amount { font-size: 28px; font-weight: 800; color: #92400e; }
    .due-box .label  { font-size: 12px; color: #78350f; margin-top: 2px; }
    .footer { background: #f8fafc; padding: 20px 40px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Invoice from {{organizationName}}</h1>
      <p>Invoice #{{invoiceNumber}}</p>
    </div>
    <div class="body">
      <p style="color:#374151;font-size:15px;">Dear {{customerName}},</p>
      <p style="color:#6b7280;font-size:14px;">Please find your invoice details below.</p>
      <div class="due-box">
        <div class="amount">{{currency}} {{totalAmount}}</div>
        <div class="label">Due by {{dueDate}}</div>
      </div>
      <p style="color:#6b7280;font-size:13px;">Invoice Date: {{invoiceDate}}</p>
      <p style="color:#6b7280;font-size:14px;">{{notes}}</p>
    </div>
    <div class="footer">&copy; {{organizationName}}</div>
  </div>
</body>
</html>
`;

const EXPENSE_APPROVED_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f7fb; margin: 0; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,.08); }
    .header { background: linear-gradient(135deg, #059669 0%, #047857 100%); padding: 36px 40px; }
    .header h1 { color: #fff; margin: 0; font-size: 22px; }
    .body { padding: 36px 40px; }
    .check { font-size: 48px; text-align: center; margin-bottom: 20px; }
    .amount-box { background: #ecfdf5; border: 2px solid #6ee7b7; border-radius: 10px; padding: 20px; text-align: center; margin-bottom: 24px; }
    .amount-box .amount { font-size: 32px; font-weight: 800; color: #065f46; }
    .amount-box .label  { font-size: 13px; color: #047857; margin-top: 4px; }
    .footer { background: #f8fafc; padding: 20px 40px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header"><h1>Expense Approved ✓</h1></div>
    <div class="body">
      <div class="check">✅</div>
      <p style="color:#374151;font-size:15px;text-align:center;">Hi {{employeeName}}, your expense claim has been approved.</p>
      <div class="amount-box">
        <div class="amount">{{currency}} {{amount}}</div>
        <div class="label">{{expenseTitle}}</div>
      </div>
      <p style="color:#6b7280;font-size:13px;">Approved by: <strong>{{approverName}}</strong></p>
      <p style="color:#6b7280;font-size:13px;">Date: {{approvedAt}}</p>
      <p style="color:#6b7280;font-size:13px;">{{notes}}</p>
    </div>
    <div class="footer">&copy; {{organizationName}}</div>
  </div>
</body>
</html>
`;

const EXPENSE_REJECTED_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f7fb; margin: 0; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,.08); }
    .header { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 36px 40px; }
    .header h1 { color: #fff; margin: 0; font-size: 22px; }
    .body { padding: 36px 40px; }
    .reason-box { background: #fef2f2; border-left: 4px solid #ef4444; border-radius: 6px; padding: 14px 18px; margin: 20px 0; }
    .footer { background: #f8fafc; padding: 20px 40px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header"><h1>Expense Rejected</h1></div>
    <div class="body">
      <p style="color:#374151;font-size:15px;">Hi {{employeeName}},</p>
      <p style="color:#6b7280;font-size:14px;">Unfortunately, your expense claim of <strong>{{currency}} {{amount}}</strong> for <strong>{{expenseTitle}}</strong> has been rejected.</p>
      <div class="reason-box">
        <strong style="color:#7f1d1d;font-size:13px;">Reason:</strong>
        <p style="color:#991b1b;font-size:13px;margin:6px 0 0;">{{rejectionReason}}</p>
      </div>
      <p style="color:#6b7280;font-size:13px;">Rejected by: <strong>{{approverName}}</strong></p>
      <p style="color:#6b7280;font-size:13px;">Please resubmit with the required changes or contact your manager for clarification.</p>
    </div>
    <div class="footer">&copy; {{organizationName}}</div>
  </div>
</body>
</html>
`;

const WELCOME_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f7fb; margin: 0; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,.08); }
    .header { background: linear-gradient(135deg, #1a56db 0%, #0e3fa8 100%); padding: 48px 40px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 26px; font-weight: 800; }
    .header p  { color: rgba(255,255,255,.80); margin: 8px 0 0; font-size: 14px; }
    .body { padding: 40px; text-align: center; }
    .avatar { width: 72px; height: 72px; border-radius: 50%; background: #e0e7ff; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 32px; }
    .btn { display: inline-block; padding: 14px 32px; background: #1a56db; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 15px; margin-top: 24px; }
    .footer { background: #f8fafc; padding: 20px 40px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Welcome to {{organizationName}}! 🎉</h1>
      <p>Your ERP account is ready</p>
    </div>
    <div class="body">
      <p style="color:#374151;font-size:16px;">Hi <strong>{{userName}}</strong>,</p>
      <p style="color:#6b7280;font-size:14px;line-height:1.6;">
        We're excited to have you on board. Your account has been created and you're all set to start using the ERP system.
      </p>
      <p style="color:#374151;font-size:14px;margin-top:20px;"><strong>Your Role:</strong> {{role}}</p>
      <a href="{{loginUrl}}" class="btn">Get Started →</a>
    </div>
    <div class="footer">&copy; {{organizationName}}</div>
  </div>
</body>
</html>
`;

const ORDER_CONFIRMED_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f7fb; margin: 0; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,.08); }
    .header { background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%); padding: 36px 40px; }
    .header h1 { color: #fff; margin: 0; font-size: 22px; }
    .body { padding: 36px 40px; }
    .status-badge { display: inline-block; background: #d1fae5; color: #065f46; padding: 4px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; margin-bottom: 20px; }
    .footer { background: #f8fafc; padding: 20px 40px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header"><h1>Order Confirmed</h1></div>
    <div class="body">
      <span class="status-badge">✓ Confirmed</span>
      <p style="color:#374151;font-size:15px;">Hi {{customerName}}, your order has been confirmed.</p>
      <p style="color:#6b7280;font-size:14px;">Order Number: <strong>{{orderNumber}}</strong></p>
      <p style="color:#6b7280;font-size:14px;">Total: <strong>{{currency}} {{totalAmount}}</strong></p>
      <p style="color:#6b7280;font-size:13px;">Date: {{orderDate}}</p>
      <p style="color:#6b7280;font-size:13px;">{{notes}}</p>
    </div>
    <div class="footer">&copy; {{organizationName}}</div>
  </div>
</body>
</html>
`;

@Injectable()
export class EmailTemplatesSeed extends BaseSeed<EmailTemplateEntity> {
  public get version(): number {
    return 1;
  }

  public get seedingData(): Partial<EmailTemplateEntity>[] {
    return [
      {
        id: '00000000-0000-4001-8000-000000000001',
        slug: 'bill-receipt',
        name: 'Bill Receipt',
        subject: 'Your Bill Receipt — {{billNumber}} from {{organizationName}}',
        htmlBody: BILL_RECEIPT_HTML,
        category: 'billing',
        isActive: true,
      },
      {
        id: '00000000-0000-4001-8000-000000000002',
        slug: 'invoice-generated',
        name: 'Invoice Generated',
        subject: 'Invoice #{{invoiceNumber}} from {{organizationName}}',
        htmlBody: INVOICE_HTML,
        category: 'billing',
        isActive: true,
      },
      {
        id: '00000000-0000-4001-8000-000000000003',
        slug: 'expense-approved',
        name: 'Expense Approved',
        subject: 'Your expense of {{currency}} {{amount}} has been approved',
        htmlBody: EXPENSE_APPROVED_HTML,
        category: 'expenses',
        isActive: true,
      },
      {
        id: '00000000-0000-4001-8000-000000000004',
        slug: 'expense-rejected',
        name: 'Expense Rejected',
        subject: 'Action Required: Your expense claim was rejected',
        htmlBody: EXPENSE_REJECTED_HTML,
        category: 'expenses',
        isActive: true,
      },
      {
        id: '00000000-0000-4001-8000-000000000005',
        slug: 'welcome',
        name: 'Welcome Email',
        subject: 'Welcome to {{organizationName}} — Your account is ready',
        htmlBody: WELCOME_HTML,
        category: 'system',
        isActive: true,
      },
      {
        id: '00000000-0000-4001-8000-000000000006',
        slug: 'order-confirmed',
        name: 'Order Confirmed',
        subject: 'Order {{orderNumber}} Confirmed',
        htmlBody: ORDER_CONFIRMED_HTML,
        category: 'orders',
        isActive: true,
      },
    ];
  }

  constructor(
    dataSource: DataSource,
    @InjectRepository(EmailTemplateEntity) repo: Repository<EmailTemplateEntity>,
    @InjectPinoLogger(EmailTemplatesSeed.name) logger: PinoLogger,
  ) {
    super(dataSource, repo, logger);
  }

  protected equalityCheck(
    xx: Partial<EmailTemplateEntity>,
    yy: Partial<EmailTemplateEntity>,
  ): boolean {
    return xx.slug === yy.slug;
  }

  protected createFilter(): FindOptionsWhere<EmailTemplateEntity> {
    return {};
  }
}
