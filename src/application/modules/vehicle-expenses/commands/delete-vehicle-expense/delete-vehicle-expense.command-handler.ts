import { ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from 'src/common';
import { VEHICLE_EXPENSE_REPO } from 'src/application/constants';
import { IVehicleExpenseRepo } from '../../repositories/i-vehicle-expense.repo';
import { DeleteVehicleExpenseCommand } from './delete-vehicle-expense.command';

@CommandHandlerStrict(DeleteVehicleExpenseCommand)
export class DeleteVehicleExpenseHandler implements ICommandHandler<DeleteVehicleExpenseCommand, boolean> {
  public constructor(
    @Inject(VEHICLE_EXPENSE_REPO) private readonly repo: IVehicleExpenseRepo,
    @InjectPinoLogger(DeleteVehicleExpenseHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: DeleteVehicleExpenseCommand): Promise<boolean> {
    this.logger.info(`Executing Command '${DeleteVehicleExpenseCommand.name}'`);
    const existing = await this.repo.getAsync(command.id);
    if (!existing) {
      throw new NotFoundException(`VehicleExpense with ID ${command.id} not found`);
    }
    return this.repo.deleteAsync(command.id);
  }
}
