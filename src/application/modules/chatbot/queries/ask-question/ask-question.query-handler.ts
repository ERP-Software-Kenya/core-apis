import { Inject } from '@nestjs/common';
import type { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict, GEMINI_SERVICE, IGeminiService, IQdrantService, KnowledgeChunkPayload, QDRANT_SERVICE } from '../../../../../common';
import { ConfigService } from '@nestjs/config';
import { ICoreApiConfig } from '../../../../../configuration';
import { ChatAnswer } from '../../domain';
import { AskQuestionQuery } from './ask-question.query';
import { DB_TOOL_DECLARATIONS, DbToolsService } from '../../db-tools';
import type { Tool } from '@google/generative-ai';

const SEARCH_LIMIT = 5;
const DB_TOOLS: Tool[] = [{ functionDeclarations: DB_TOOL_DECLARATIONS }];

@QueryHandlerStrict(AskQuestionQuery)
export class AskQuestionQueryHandler implements IQueryHandler<AskQuestionQuery, ChatAnswer> {
  private readonly collection: string;

  public constructor(
    @Inject(GEMINI_SERVICE) private readonly gemini: IGeminiService,
    @Inject(QDRANT_SERVICE) private readonly qdrant: IQdrantService,
    @InjectPinoLogger(AskQuestionQueryHandler.name) private readonly logger: PinoLogger,
    private readonly dbTools: DbToolsService,
    config: ConfigService<ICoreApiConfig>,
  ) {
    this.collection = config.get<ICoreApiConfig['qdrant']>('qdrant').collection;
  }

  public async execute(query: AskQuestionQuery): Promise<ChatAnswer> {
    this.logger.info("Executing Query 'AskQuestionQuery'");
    const vector = await this.gemini.embedAsync(query.question);
    const chunks = await this.qdrant.searchAsync(this.collection, vector, SEARCH_LIMIT);
    const systemPrompt = this.buildSystemPrompt(chunks);
    const answer = await this.gemini.generateWithToolsAsync(
      systemPrompt,
      query.question,
      DB_TOOLS,
      (name, args) => this.dbTools.executeAsync(name, args, query.organizationId),
    );
    const result = new ChatAnswer();
    result.answer = answer;
    result.sources = this.extractSources(chunks);
    return result;
  }

  private buildSystemPrompt(chunks: KnowledgeChunkPayload[]): string {
    const context = chunks.map((ch) => `[${ch.title}]\n${ch.text}`).join('\n\n---\n\n');
    return [
      'You are a helpful ERP assistant. You have two sources of information:',
      '1. KNOWLEDGE CONTEXT below — static documentation about ERP procedures.',
      '2. DB TOOLS — functions you can call to fetch live business data (sales, inventory, purchases).',
      'Use the knowledge context for how-to questions. Call a DB tool when the user asks about actual data.',
      'Never write to the database. Be concise and accurate.',
      '',
      '=== KNOWLEDGE CONTEXT ===',
      context,
      '=== END CONTEXT ===',
    ].join('\n');
  }

  private extractSources(chunks: KnowledgeChunkPayload[]): string[] {
    const seen = new Set<string>();
    return chunks
      .map((ch) => ch.title)
      .filter((title) => {
        if (seen.has(title)) return false;
        seen.add(title);
        return true;
      });
  }
}
