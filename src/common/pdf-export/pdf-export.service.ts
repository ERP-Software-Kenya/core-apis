import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import * as puppeteer from 'puppeteer';
import { IPdfExportService } from './i-pdf-export.service';
import { PdfDocument, PdfOptions } from './domain';
import { PdfExportException } from './exceptions';

const TEMPLATES_DIR = path.join(__dirname, 'templates');
const PDF_VIEWPORT_WIDTH = 1280;
const PDF_VIEWPORT_HEIGHT = 720;
const PDF_PUPPETEER_TIMEOUT = 90000;

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
    let browser: puppeteer.Browser | null = null;
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
        ],
      });

      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(PDF_PUPPETEER_TIMEOUT);
      page.setDefaultTimeout(PDF_PUPPETEER_TIMEOUT);
      await page.setViewport({ width: PDF_VIEWPORT_WIDTH, height: PDF_VIEWPORT_HEIGHT });
      await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: PDF_PUPPETEER_TIMEOUT });

      const pdfBuffer = options?.width
        ? await page.pdf({
            width: options.width,
            height: await this.measureContentHeight(page),
            printBackground: options?.printBackground ?? true,
            margin: options?.margin ?? { top: '0', right: '0', bottom: '0', left: '0' },
            timeout: PDF_PUPPETEER_TIMEOUT,
          })
        : await page.pdf({
            format: options?.format ?? 'A4',
            landscape: options?.landscape ?? false,
            printBackground: options?.printBackground ?? true,
            margin: options?.margin ?? {
              top: '20mm',
              right: '15mm',
              bottom: '20mm',
              left: '15mm',
            },
            timeout: PDF_PUPPETEER_TIMEOUT,
          });

      await page.close();
      return Buffer.from(pdfBuffer);
    } catch (err) {
      const error = err as Error;
      this.logger.error({ error: error.message }, 'Puppeteer PDF rendering failed');
      throw new PdfExportException(error.message);
    } finally {
      if (browser) await browser.close();
    }
  }

  private async measureContentHeight(page: puppeteer.Page): Promise<string> {
    const scrollHeightPx = await page.evaluate(() => document.documentElement.scrollHeight);
    const PX_PER_MM = 96 / 25.4;
    const heightMm = Math.ceil(scrollHeightPx / PX_PER_MM) + 4;
    return `${heightMm}mm`;
  }
}
