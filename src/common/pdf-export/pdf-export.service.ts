import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import type { Browser } from 'puppeteer';
import { IPdfExportService } from './i-pdf-export.service';
import { PdfDocument, PdfOptions } from './domain';
import { PdfExportException } from './exceptions';

const TEMPLATES_DIR = path.join(__dirname, 'templates');

@Injectable()
export class PdfExportService implements IPdfExportService {
  constructor(
    @InjectPinoLogger(PdfExportService.name) private readonly logger: PinoLogger,
  ) {}

  public async generateFromHtmlAsync(
    html: string,
    filename: string,
    options?: PdfOptions,
  ): Promise<PdfDocument> {
    this.logger.info({ filename }, 'Generating PDF from HTML');
    const buffer = await this.renderPdf(html, options);
    this.logger.info({ filename, bytes: buffer.byteLength }, 'PDF generated');
    return new PdfDocument(buffer, filename);
  }

  public async generateFromTemplateAsync(
    templateName: string,
    context: Record<string, unknown>,
    filename: string,
    options?: PdfOptions,
  ): Promise<PdfDocument> {
    this.logger.info({ templateName, filename }, 'Generating PDF from template');

    const templatePath = path.join(TEMPLATES_DIR, `${templateName}.hbs`);
    if (!fs.existsSync(templatePath)) {
      throw new PdfExportException(`Template "${templateName}" not found at ${templatePath}`);
    }

    const source = fs.readFileSync(templatePath, 'utf-8');
    const compile = Handlebars.compile(source);
    const html = compile({ ...context, generatedAt: new Date().toLocaleString() });

    return this.generateFromHtmlAsync(html, filename, options);
  }

  private async renderPdf(html: string, options?: PdfOptions): Promise<Buffer> {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const puppeteer = require('puppeteer') as { launch: (opts: Record<string, unknown>) => Promise<Browser> };
    let browser: Browser | null = null;
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      });

      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'load' });

      const pdfBuffer = await page.pdf({
        format: options?.format ?? 'A4',
        landscape: options?.landscape ?? false,
        printBackground: options?.printBackground ?? true,
        margin: options?.margin ?? {
          top: '20mm',
          right: '15mm',
          bottom: '20mm',
          left: '15mm',
        },
      });

      return Buffer.from(pdfBuffer);
    } catch (err) {
      const error = err as Error;
      this.logger.error({ error: error.message }, 'Puppeteer PDF rendering failed');
      throw new PdfExportException(error.message);
    } finally {
      if (browser) await browser.close();
    }
  }
}
