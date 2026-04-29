export class ResponseMetadata<T> {
  requestId: string;
  timestamp: string;
  retryAfter?: number;
  throttleInfo?: T;
}
