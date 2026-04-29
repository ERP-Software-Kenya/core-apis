import { HttpException } from '@nestjs/common';

export class RpcBaseException extends HttpException {
  public readonly payload: string | Record<string, unknown>;
  public readonly type: string;
  public readonly isRpc = true;

  constructor(
    payload: string | Record<string, any>,
    status: number,
    errorType?: string,
  ) {
    super(payload, status);
    this.payload = payload;
    this.type = errorType || this.constructor.name;
  }

  public getPayload(): string | Record<string, unknown> {
    return this.payload;
  }

  public getType(): string {
    return this.type;
  }

  public static createPayload(
    objectOrError: object | string | undefined,
    description?: string,
    statusCode?: number,
  ): object {
    if (!objectOrError) {
      return { statusCode, message: description };
    }
    return typeof objectOrError === 'object' && !Array.isArray(objectOrError)
      ? objectOrError
      : { statusCode, message: objectOrError, error: description };
  }
}
