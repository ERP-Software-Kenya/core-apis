import { IQuery } from '@nestjs/cqrs';
import { CQBase } from './cq-base';

export abstract class QueryBase extends CQBase implements IQuery {}
