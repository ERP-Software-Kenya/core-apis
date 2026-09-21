import { Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { BRANCH_REPO } from '../../../../constants';
import { PRODUCT_BRANCH_PRICE_REPO } from '../../i-product-branch-price.repo';
import { IProductBranchPriceRepo } from '../../i-product-branch-price.repo';
import { ProductBranchPrice } from '../../domain';
import { UpsertBranchProductPriceCommand } from './upsert-branch-product-price.command';
import { IBranchRepo } from 'src/application/modules/branches';

@CommandHandlerStrict(UpsertBranchProductPriceCommand)
export class UpsertBranchProductPriceCommandHandler
  implements ICommandHandler<UpsertBranchProductPriceCommand, ProductBranchPrice>
{
  constructor(
    @Inject(BRANCH_REPO) private readonly branchRepo: IBranchRepo ,
    @Inject(PRODUCT_BRANCH_PRICE_REPO) private readonly repo: IProductBranchPriceRepo,
    @InjectPinoLogger(UpsertBranchProductPriceCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpsertBranchProductPriceCommand): Promise<ProductBranchPrice> {
    this.logger.info(`Executing ${UpsertBranchProductPriceCommand.name} branchId=${command.branchId}`);

    const branch = await this.branchRepo.getAsync(command.branchId);
    if (!branch || branch.organizationId !== command.organizationId) {
      throw new NotFoundException(`Branch ${command.branchId} not found`);
    }

    const model = new ProductBranchPrice();
    model.branchId = command.branchId;
    model.productId = command.productId;
    model.organizationId = command.organizationId;
    model.costPrice = command.costPrice ?? null;
    model.retailPrice = command.retailPrice ?? null;
    model.loyaltyPrice = command.loyaltyPrice ?? null;
    model.wholesalePrice = command.wholesalePrice ?? null;
    model.transferPrice = command.transferPrice ?? null;

    return this.repo.upsertAsync(model);
  }
}
