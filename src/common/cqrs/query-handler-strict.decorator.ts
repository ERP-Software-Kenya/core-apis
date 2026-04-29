import 'reflect-metadata';
import { QueryBase } from '..';

export const QUERY_METADATA         = '__query__';
export const QUERY_HANDLER_METADATA = '__queryHandler__';

let _seq = 0;
const nextId = () => `cqrs_q_${++_seq}`;

/**
 * Drop-in replacement for @nestjs/cqrs `@QueryHandler` that works
 * with our local `QueryBase` subclasses.
 */
export const QueryHandlerStrict = (query: new (...args: any[]) => QueryBase): ClassDecorator => {
  return (target: object) => {
    if (!Reflect.hasOwnMetadata(QUERY_METADATA, query)) {
      Reflect.defineMetadata(QUERY_METADATA, { id: nextId() }, query);
    }
    Reflect.defineMetadata(QUERY_HANDLER_METADATA, query, target);
  };
};
