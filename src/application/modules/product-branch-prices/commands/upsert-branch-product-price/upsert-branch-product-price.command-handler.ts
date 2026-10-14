import { Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict } from '../../../../../common';
import { BRANCH_REPO, PRODUCT_REPO } from '../../../../constants';
import { PRODUCT_BRANCH_PRICE_REPO, IProductBranchPriceRepo } from '../../i-product-branch-price.repo';
import { ProductBranchPrice } from '../../domain';
import { UpsertBranchProductPriceCommand } from './upsert-branch-product-price.command';
import { IBranchRepo } from 'src/application/modules/branches';
import { IProductRepo } from 'src/application/modules/products';

@CommandHandlerStrict(UpsertBranchProductPriceCommand)
export class UpsertBranchProductPriceCommandHandler
  implements ICommandHandler<UpsertBranchProductPriceCommand, ProductBranchPrice>
{
  constructor(
    @Inject(BRANCH_REPO) private readonly branchRepo: IBranchRepo,
    @Inject(PRODUCT_REPO) private readonly productRepo: IProductRepo,
    @Inject(PRODUCT_BRANCH_PRICE_REPO) private readonly repo: IProductBranchPriceRepo,
    @InjectPinoLogger(UpsertBranchProductPriceCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpsertBranchProductPriceCommand): Promise<ProductBranchPrice> {
    this.logger.info(`Executing ${UpsertBranchProductPriceCommand.name} branchId=${command.branchId}`);

    const [branch, product] = await Promise.all([
      this.branchRepo.getAsync(command.branchId),
      this.productRepo.getAsync(command.productId),
    ]);

    if (!branch || branch.organizationId !== command.organizationId) {
      throw new NotFoundException(`Branch ${command.branchId} not found`);
    }

    if (!product || product.organizationId !== command.organizationId) {
      throw new NotFoundException(`Product ${command.productId} not found`);
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
