import { Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { BRANCH_REPO } from '../../../../constants';
import { Branch } from '../../domain';
import { IBranchRepo } from '../..';
import { SetMainBranchCommand } from './set-main-branch.command';

@CommandHandlerStrict(SetMainBranchCommand)
export class SetMainBranchCommandHandler implements ICommandHandler<SetMainBranchCommand, Branch> {
  constructor(
    @Inject(BRANCH_REPO) private readonly repo: IBranchRepo,
    @InjectPinoLogger(SetMainBranchCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: SetMainBranchCommand): Promise<Branch> {
    this.logger.info(`Executing ${SetMainBranchCommand.name} id=${command.id}`);

    const target = await this.repo.getAsync(command.id);
    if (!target) throw new NotFoundException(`Branch ${command.id} not found`);
    if (target.organizationId !== command.organizationId) {
      throw new NotFoundException(`Branch ${command.id} not found`);
    }

    const currentMain = await this.repo.findMainAsync(command.organizationId);
    if (currentMain && currentMain.id !== command.id) {
      currentMain.isMain = false;
      await this.repo.updateAsync(currentMain);
    }

    target.isMain = true;
    return this.repo.updateAsync(target);
  }
}
