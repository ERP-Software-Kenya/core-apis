import { IQueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from 'src/common';
import { VEHICLE_EXPENSE_REPO } from 'src/application/constants';
import { IVehicleExpenseRepo } from '../../repositories/i-vehicle-expense.repo';
import { VehicleExpense } from '../../domain';
import { GetVehicleExpenseQuery } from './get-vehicle-expense.query';

@QueryHandlerStrict(GetVehicleExpenseQuery)
export class GetVehicleExpenseHandler implements IQueryHandler<GetVehicleExpenseQuery, VehicleExpense> {
  public constructor(
    @Inject(VEHICLE_EXPENSE_REPO) private readonly repo: IVehicleExpenseRepo,
    @InjectPinoLogger(GetVehicleExpenseHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetVehicleExpenseQuery): Promise<VehicleExpense> {
    this.logger.info(`Executing Query '${GetVehicleExpenseQuery.name}'`);
    const expense = await this.repo.getAsync(query.id);
    if (!expense) {
      throw new NotFoundException(`VehicleExpense with ID ${query.id} not found`);
    }
    return expense;
  }
}
