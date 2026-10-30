import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { BRANCH_REPO } from '../../../../constants';
import { PRODUCT_BRANCH_PRICE_REPO, IProductBranchPriceRepo } from '../../i-product-branch-price.repo';
import { CopyMainBranchPricesCommand } from './copy-main-branch-prices.command';
import { IBranchRepo } from 'src/application/modules/branches';

@CommandHandlerStrict(CopyMainBranchPricesCommand)
export class CopyMainBranchPricesCommandHandler implements ICommandHandler<CopyMainBranchPricesCommand, void> {
  constructor(
    @Inject(BRANCH_REPO) private readonly branchRepo: IBranchRepo,
    @Inject(PRODUCT_BRANCH_PRICE_REPO) private readonly repo: IProductBranchPriceRepo,
    @InjectPinoLogger(CopyMainBranchPricesCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: CopyMainBranchPricesCommand): Promise<void> {
    this.logger.info(`Executing ${CopyMainBranchPricesCommand.name} targetBranchId=${command.targetBranchId}`);

    const [mainBranch, targetBranch] = await Promise.all([
      this.branchRepo.findMainAsync(command.organizationId),
      this.branchRepo.getAsync(command.targetBranchId),
    ]);

    if (!mainBranch) {
      throw new BadRequestException('No main branch is set for this organisation.');
    }

    if (!targetBranch || targetBranch.organizationId !== command.organizationId) {
      throw new NotFoundException(`Branch ${command.targetBranchId} not found`);
    }
    if (!mainBranch.isActive || !targetBranch.isActive) {
      throw new BadRequestException('Prices can only be copied between active branches.');
    }
    if (mainBranch.id === targetBranch.id) {
      throw new BadRequestException('The target branch is already the main branch.');
    }

    await this.repo.copyFromMainBranchAsync(mainBranch.id, command.targetBranchId, command.organizationId);
  }
}
