import { Injectable } from '@nestjs/common';
import { QdrantClient } from '@qdrant/js-client-rest';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { IQdrantService, KnowledgeChunkPayload, QdrantPoint } from './i-qdrant.service';
import { QdrantOptions } from './qdrant.options';

@Injectable()
export class QdrantService implements IQdrantService {
  private readonly client: QdrantClient;

  public constructor(
    private readonly options: QdrantOptions,
    @InjectPinoLogger(QdrantService.name) private readonly logger: PinoLogger,
  ) {
    this.client = new QdrantClient({
      url: options.url,
      ...(options.apiKey ? { apiKey: options.apiKey } : {}),
    });
  }

  public async ensureCollectionAsync(name: string, vectorSize: number): Promise<void> {
    try {
      await this.client.getCollection(name);
      this.logger.info(`Qdrant collection "${name}" already exists`);
    } catch {
      this.logger.info(`Creating Qdrant collection "${name}" (dims=${vectorSize})`);
      await this.client.createCollection(name, {
        vectors: { size: vectorSize, distance: 'Cosine' },
      });
    }
  }

  public async deleteCollectionAsync(name: string): Promise<void> {
    await this.client.deleteCollection(name);
    this.logger.info(`Qdrant collection "${name}" deleted`);
  }

  public async upsertAsync(collectionName: string, points: QdrantPoint[]): Promise<void> {
    await this.client.upsert(collectionName, {
      wait: true,
      points: points.map((pt) => ({
        id: pt.id,
        vector: pt.vector,
        payload: pt.payload as unknown as Record<string, unknown>,
      })),
    });
    this.logger.info(`Upserted ${points.length} points into "${collectionName}"`);
  }

  public async searchAsync(
    collectionName: string,
    vector: number[],
    limit: number,
  ): Promise<KnowledgeChunkPayload[]> {
    const result = await this.client.query(collectionName, {
      query: { nearest: vector },
      limit,
      with_payload: true,
    });
    return result.points
      .filter((pt) => pt.payload != null)
      .map((pt) => pt.payload as unknown as KnowledgeChunkPayload);
  }
}
