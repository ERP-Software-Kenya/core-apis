import { Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict, IBaseRepo } from '../../../../../common';
import { PRODUCT_SUPPLIER_REPO } from '../../../../constants';
import { ProductSupplier } from '../../domain';
import { UnlinkProductSupplierCommand } from './unlink-product-supplier.command';

@CommandHandlerStrict(UnlinkProductSupplierCommand)
export class UnlinkProductSupplierCommandHandler implements ICommandHandler<UnlinkProductSupplierCommand, boolean> {
  constructor(
    @Inject(PRODUCT_SUPPLIER_REPO) private readonly repo: IBaseRepo<ProductSupplier, string>,
    @InjectPinoLogger(UnlinkProductSupplierCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UnlinkProductSupplierCommand): Promise<boolean> {
    this.logger.info(`Unlinking supplier ${command.supplierId} from product ${command.productId}`);
    const existing = await this.repo.findOneAsync({ productId: command.productId, supplierId: command.supplierId });
    if (!existing) throw new NotFoundException(`Supplier ${command.supplierId} is not linked to product ${command.productId}`);
    await this.repo.deleteAsync(existing.id);
    return true;
  }
}
