export const QDRANT_SERVICE = 'IQdrantService';

export interface KnowledgeChunkPayload {
  text: string;
  source: string;
  title: string;
}

export interface QdrantPoint {
  id: string;
  vector: number[];
  payload: KnowledgeChunkPayload;
}

export interface IQdrantService {
  ensureCollectionAsync(name: string, vectorSize: number): Promise<void>;
  deleteCollectionAsync(name: string): Promise<void>;
  upsertAsync(collectionName: string, points: QdrantPoint[]): Promise<void>;
  searchAsync(collectionName: string, vector: number[], limit: number): Promise<KnowledgeChunkPayload[]>;
}
