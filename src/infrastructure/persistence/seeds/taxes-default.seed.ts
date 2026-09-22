import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { IsNull, Repository } from 'typeorm';
import { OrganizationEntity } from '../entities/organization.entity';
import { TaxEntity } from '../entities/tax.entity';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class TaxesDefaultSeed {
  constructor(
    @InjectRepository(OrganizationEntity) private readonly orgRepo: Repository<OrganizationEntity>,
    @InjectRepository(TaxEntity) private readonly taxRepo: Repository<TaxEntity>,
    @InjectRepository(ProductEntity) private readonly productRepo: Repository<ProductEntity>,
    @InjectPinoLogger(TaxesDefaultSeed.name) private readonly logger: PinoLogger,
  ) {}

  public async runAsync(): Promise<void> {
    this.logger.info('Running TaxesDefaultSeed...');
    const orgs = await this.orgRepo.find();
    for (const org of orgs) {
      const existingTax = await this.taxRepo.findOne({
        where: { organizationId: org.id, deletedAt: IsNull() },
      });
      if (existingTax) {
        this.logger.info(`Org ${org.id} already has a tax — skipping`);
        continue;
      }
      const tax = this.taxRepo.create({
        organizationId: org.id,
        name: 'Standard Tax',
        rate: 16,
        isActive: true,
      });
      await this.taxRepo.save(tax);
      this.logger.info(`Created Standard Tax for org ${org.id} with id ${tax.id}`);

      await this.productRepo
        .createQueryBuilder()
        .update(ProductEntity)
        .set({ taxId: tax.id })
        .where('organization_id = :orgId AND tax_id IS NULL AND deleted_at IS NULL', { orgId: org.id })
        .execute();
      this.logger.info(`Assigned tax ${tax.id} to products of org ${org.id}`);
    }
    this.logger.info('TaxesDefaultSeed complete');
  }
}
