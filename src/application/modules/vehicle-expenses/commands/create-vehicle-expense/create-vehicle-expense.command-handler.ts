import { ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../common';
import { VEHICLE_EXPENSE_REPO } from '../../../../constants';
import { IVehicleExpenseRepo } from '../../repositories/i-vehicle-expense.repo';
import { VehicleExpense } from '../../domain';
import { CreateVehicleExpenseCommand } from './create-vehicle-expense.command';

@CommandHandlerStrict(CreateVehicleExpenseCommand)
export class CreateVehicleExpenseHandler implements ICommandHandler<CreateVehicleExpenseCommand, VehicleExpense> {
  public constructor(
    @Inject(VEHICLE_EXPENSE_REPO) private readonly repo: IVehicleExpenseRepo,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(CreateVehicleExpenseHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CreateVehicleExpenseCommand): Promise<VehicleExpense> {
    this.logger.info(`Executing Command '${CreateVehicleExpenseCommand.name}'`);
    const expense = this.mapper.map(command, CreateVehicleExpenseCommand, VehicleExpense);
    return this.repo.createAsync(expense);
  }
}
