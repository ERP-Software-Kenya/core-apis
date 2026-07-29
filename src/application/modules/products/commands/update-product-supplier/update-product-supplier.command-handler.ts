import { Inject, NotFoundException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CommandHandlerStrict, IBaseRepo } from '../../../../../common';
import { PRODUCT_SUPPLIER_REPO } from '../../../../constants';
import { ProductSupplier } from '../../domain';
import { UpdateProductSupplierCommand } from './update-product-supplier.command';

@CommandHandlerStrict(UpdateProductSupplierCommand)
export class UpdateProductSupplierCommandHandler implements ICommandHandler<UpdateProductSupplierCommand, ProductSupplier> {
  constructor(
    @Inject(PRODUCT_SUPPLIER_REPO) private readonly repo: IBaseRepo<ProductSupplier, string>,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectPinoLogger(UpdateProductSupplierCommandHandler.name) private readonly logger: PinoLogger,
  ) {}

  public async execute(command: UpdateProductSupplierCommand): Promise<ProductSupplier> {
    this.logger.info(`Updating supplier ${command.supplierId} link for product ${command.productId}`);

    const existing = await this.repo.findOneAsync({ productId: command.productId, supplierId: command.supplierId } as Partial<ProductSupplier>);
    if (!existing) throw new NotFoundException(`Supplier ${command.supplierId} is not linked to product ${command.productId}`);

    if (command.isDefault) {
      const allLinks = await this.repo.allAsync({ productId: command.productId } as Partial<ProductSupplier>);
      for (const link of allLinks.filter((ln) => ln.isDefault && ln.id !== existing.id)) {
        link.isDefault = false;
        await this.repo.updateAsync(link);
      }
    }

    const patch = this.mapper.map(command, UpdateProductSupplierCommand, ProductSupplier);
    (Object.keys(patch) as Array<keyof ProductSupplier>).forEach((key) => {
      if (patch[key] !== undefined && patch[key] !== existing[key]) {
        (existing as unknown as Record<string, unknown>)[key] = patch[key];
      }
    });

    return this.repo.updateAsync(existing);
  }
}
