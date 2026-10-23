import { Inject } from '@nestjs/common';
import type { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import * as fs from 'fs/promises';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
import { CommandHandlerStrict, GEMINI_SERVICE, IGeminiService, IQdrantService, QdrantPoint, QDRANT_SERVICE } from '../../../../../common';
import { ConfigService } from '@nestjs/config';
import { ICoreApiConfig } from '../../../../../configuration';
import { SeedKnowledgeCommand } from './seed-knowledge.command';

const GEMINI_EMBEDDING_DIMS = 3072;
const CHUNK_MAX_CHARS = 1200;
const DOCS_SUBDIR = path.join('docs', 'chatbot');

interface KnowledgeChunk {
  text: string;
  source: string;
  title: string;
}

@CommandHandlerStrict(SeedKnowledgeCommand)
export class SeedKnowledgeCommandHandler implements ICommandHandler<SeedKnowledgeCommand, number> {
  private readonly collection: string;

  public constructor(
    @Inject(GEMINI_SERVICE) private readonly gemini: IGeminiService,
    @Inject(QDRANT_SERVICE) private readonly qdrant: IQdrantService,
    @InjectPinoLogger(SeedKnowledgeCommandHandler.name) private readonly logger: PinoLogger,
    config: ConfigService<ICoreApiConfig>,
  ) {
    this.collection = config.get<ICoreApiConfig['qdrant']>('qdrant').collection;
  }

  public async execute(_command: SeedKnowledgeCommand): Promise<number> {
    this.logger.info("Executing Command 'SeedKnowledgeCommand'");
    const chunks = await this.loadChunksAsync();
    this.logger.info(`Loaded ${chunks.length} chunks from docs/chatbot/`);
    await this.qdrant.deleteCollectionAsync(this.collection).catch(() => undefined);
    await this.qdrant.ensureCollectionAsync(this.collection, GEMINI_EMBEDDING_DIMS);
    const points = await this.embedChunksAsync(chunks);
    await this.qdrant.upsertAsync(this.collection, points);
    this.logger.info(`Seeded ${points.length} vectors into "${this.collection}"`);
    return points.length;
  }

  private async loadChunksAsync(): Promise<KnowledgeChunk[]> {
    const docsDir = path.join(process.cwd(), DOCS_SUBDIR);
    const files = await fs.readdir(docsDir);
    const mdFiles = files.filter((fn) => fn.endsWith('.md'));
    const nested = await Promise.all(mdFiles.map((fn) => this.parseFileAsync(docsDir, fn)));
    return nested.flat();
  }

  private async parseFileAsync(docsDir: string, filename: string): Promise<KnowledgeChunk[]> {
    const content = await fs.readFile(path.join(docsDir, filename), 'utf-8');
    const title = this.extractTitle(content, filename);
    return this.splitIntoChunks(content, filename, title);
  }

  private extractTitle(content: string, filename: string): string {
    const match = /^#\s+(.+)$/m.exec(content);
    return match ? match[1].trim() : filename.replace(/\.md$/, '');
  }

  private splitIntoChunks(content: string, source: string, title: string): KnowledgeChunk[] {
    const paragraphs = content.split(/\n{2,}/).map((pg) => pg.trim()).filter(Boolean);
    const chunks: KnowledgeChunk[] = [];
    let current = '';
    for (const paragraph of paragraphs) {
      if (current.length + paragraph.length > CHUNK_MAX_CHARS && current.length > 0) {
        chunks.push({ text: current.trim(), source, title });
        current = paragraph;
      } else {
        current = current ? `${current}\n\n${paragraph}` : paragraph;
      }
    }
    if (current.trim()) {
      chunks.push({ text: current.trim(), source, title });
    }
    return chunks;
  }

  private async embedChunksAsync(chunks: KnowledgeChunk[]): Promise<QdrantPoint[]> {
    const points: QdrantPoint[] = [];
    for (const chunk of chunks) {
      const vector = await this.gemini.embedAsync(chunk.text);
      points.push({ id: uuid(), vector, payload: chunk });
    }
    return points;
  }
}
