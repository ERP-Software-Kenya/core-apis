import { InternalServerErrorException } from "@nestjs/common";
import { isNil, TimeSpan } from "..";
import { IConstructor } from "..";

export interface IRetryOptions<TRes> {
  executable: () => Promise<TRes>;
  handle: (ex: Error) => boolean;
  beforeTry?: (attemptNumber: number) => void;
  afterTry?: (ex: Error, timeSpan: TimeSpan, retryCount: number) => void;
  retryExceptionType?: IConstructor<Error>;
}

export interface IRetriesArray<TRes> extends IRetryOptions<TRes> {
  retries: Iterable<TimeSpan>;
}

export interface IRetriesCount<TRes> extends IRetryOptions<TRes> {
  retryCount: number;
  initialValue: TimeSpan;
  nextRetry: (initialVal: TimeSpan, val: TimeSpan, attempt: number) => TimeSpan;
}

export const DEFAULT_RETRY_ATTMENPTS = 5;

export const delayPromise = (ms: number): Promise<void> =>
  new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, ms),
  );

const defaultBeforeTry = (attemptNumber: number): void => {
  console.log(`Try number ${attemptNumber}`);
};

const defaultAfterTry = (ex: Error, timeSpan: TimeSpan, retryCount: number): void => {
  console.warn(`${timeSpan.toTimestamp()} error after ${retryCount} try.`, ex);
};

function* retryGenerator(count: number, initialVal: TimeSpan, nextRetry: (initialVal: TimeSpan, val: TimeSpan, attempt: number) => TimeSpan): Iterable<TimeSpan> {
  let attempt = 1;
  let val = initialVal;
  while (attempt <= count) {
    val = nextRetry(initialVal, val, attempt);
    yield val;
    attempt++;
  }
}

export const retryPolicy = async <TRes>(options: IRetriesArray<TRes> | IRetriesCount<TRes>): Promise<TRes> => {
  const { executable, handle, beforeTry = defaultBeforeTry, afterTry = defaultAfterTry, retryExceptionType = InternalServerErrorException } = options;
  let attempt = 1;
  let lastEx: Error = new retryExceptionType("Retry limit exceeded.");
  const retries: Iterable<TimeSpan> = !isNil((options as IRetriesCount<TRes>).retryCount)
    ? retryGenerator((options as IRetriesCount<TRes>).retryCount, (options as IRetriesCount<TRes>).initialValue, (options as IRetriesCount<TRes>).nextRetry)
    : (options as IRetriesArray<TRes>).retries;
  for (const retry of retries) {
    try {
      beforeTry(attempt);
      return await executable();
    } catch (ex) {
      if (!handle(ex)) throw ex;
      lastEx = ex;
      afterTry(ex, retry, attempt);
      attempt++;
      await delayPromise(retry.toTimestamp());
    }
  }
  throw lastEx;
};

export const logarithmic = (initialVal: TimeSpan, _val: TimeSpan, attempt: number): TimeSpan =>
  new TimeSpan(initialVal.toTimestamp() + Math.log(initialVal.toTimestamp() + attempt));

export const linear = (initialVal: TimeSpan, _val: TimeSpan, attempt: number): TimeSpan => new TimeSpan(initialVal.toTimestamp() * attempt);

export const quadratic = (initialVal: TimeSpan, val: TimeSpan): TimeSpan => new TimeSpan(initialVal.toTimestamp() * val.toTimestamp());
