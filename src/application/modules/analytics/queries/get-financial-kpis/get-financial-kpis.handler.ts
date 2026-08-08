import { IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryHandlerStrict } from 'src/common';
import { FUEL_TRANSACTION_REPO, MAINTENANCE_REPO, VEHICLE_EXPENSE_REPO } from 'src/application/constants';
import { IFuelTransactionRepo } from '../../../maintenance/repositories/i-fuel-transaction.repo';
import { IMaintenanceRepo } from '../../../maintenance/repositories/i-maintenance.repo';
import { IVehicleExpenseRepo } from '../../../vehicle-expenses/repositories/i-vehicle-expense.repo';
import { GetFinancialKpisQuery } from './get-financial-kpis.query';
import { FinancialKpisResponse } from '../../models/responses/financial-kpis.response';

@QueryHandlerStrict(GetFinancialKpisQuery)
export class GetFinancialKpisHandler implements IQueryHandler<GetFinancialKpisQuery, FinancialKpisResponse> {
  public constructor(
    @Inject(FUEL_TRANSACTION_REPO) private readonly fuelRepo: IFuelTransactionRepo,
    @Inject(MAINTENANCE_REPO) private readonly maintenanceRepo: IMaintenanceRepo,
    @Inject(VEHICLE_EXPENSE_REPO) private readonly expenseRepo: IVehicleExpenseRepo,
    @InjectPinoLogger(GetFinancialKpisHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(): Promise<FinancialKpisResponse> {
    this.logger.info(`Executing Query '${GetFinancialKpisQuery.name}'`);
    const fuelTransactions = await this.fuelRepo.allAsync();
    const maintenances     = await this.maintenanceRepo.allAsync();
    const expenses         = await this.expenseRepo.allAsync();

    const totalFuelCost        = fuelTransactions.reduce((acc, curr) => acc + Number(curr.totalCost), 0);
    const totalMaintenanceCost = maintenances.reduce((acc, curr) => acc + Number(curr.cost), 0);
    const totalExpenses        = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

    return { totalFuelCost, totalMaintenanceCost, totalExpenses };
  }
}
