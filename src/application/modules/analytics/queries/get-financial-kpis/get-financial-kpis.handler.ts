import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetFinancialKpisQuery } from './get-financial-kpis.query';
import { Inject } from '@nestjs/common';
import { FUEL_TRANSACTION_REPO, MAINTENANCE_REPO, VEHICLE_EXPENSE_REPO } from '../../../../constants';
import { FinancialKpisResponse } from '../../models/responses/financial-kpis.response';

@QueryHandler(GetFinancialKpisQuery)
export class GetFinancialKpisHandler implements IQueryHandler<GetFinancialKpisQuery, FinancialKpisResponse> {
  constructor(
    @Inject(FUEL_TRANSACTION_REPO) private readonly fuelRepo: any,
    @Inject(MAINTENANCE_REPO) private readonly maintenanceRepo: any,
    @Inject(VEHICLE_EXPENSE_REPO) private readonly expenseRepo: any,
  ) {}

  async execute(): Promise<FinancialKpisResponse> {
    const fuelTransactions = await this.fuelRepo.allAsync();
    const maintenances = await this.maintenanceRepo.allAsync();
    const expenses = await this.expenseRepo.allAsync();

    const totalFuelCost = fuelTransactions.reduce((acc, curr) => acc + Number(curr.totalCost), 0);
    const totalMaintenanceCost = maintenances.reduce((acc, curr) => acc + Number(curr.cost), 0);
    const totalExpenses = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

    return {
      totalFuelCost,
      totalMaintenanceCost,
      totalExpenses,
    };
  }
}
