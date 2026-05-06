import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from '../../../../../common';
import { CUSTOMER_REPO } from '../../../../constants';
import { Customer } from '../../domain';
import { ICustomerRepo } from '../..';
import { GetCustomerQuery } from './get-customer.query';

@QueryHandlerStrict(GetCustomerQuery)
export class GetCustomerQueryHandler implements IQueryHandler<GetCustomerQuery, Customer> {
  constructor(
    @Inject(CUSTOMER_REPO) private readonly repo: ICustomerRepo,
    @InjectPinoLogger(GetCustomerQueryHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetCustomerQuery): Promise<Customer> {
    this.logger.info(`Executing ${GetCustomerQuery.name} id=${query.id}`);
    return this.repo.getAsync(query.id);
  }
}
