import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { IsNull, Repository } from 'typeorm';
import { OrganizationEntity } from '../entities/organization.entity';
import { TaxEntity } from '../entities/tax.entity';
import { ProductEntity } from '../entities/product.entity';

const VERSION = 2;

@Injectable()
export class TaxesDefaultSeed {
  public get version(): number {
    return VERSION;
  }

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
      let defaultTax = await this.taxRepo.findOne({
        where: { organizationId: org.id, name: 'Standard Tax', deletedAt: IsNull() },
        order: { createdAt: 'ASC' },
      });
      if (!defaultTax) {
        defaultTax = this.taxRepo.create({
          organizationId: org.id,
          name: 'Standard Tax',
          rate: 16,
          isActive: true,
        });
        await this.taxRepo.save(defaultTax);
        this.logger.info(`Created Standard Tax for org ${org.id} with id ${defaultTax.id}`);
      }

      await this.productRepo
        .createQueryBuilder()
        .update(ProductEntity)
        .set({ taxId: defaultTax.id })
        .where('organization_id = :orgId AND tax_id IS NULL AND deleted_at IS NULL', { orgId: org.id })
        .execute();
      this.logger.info(`Assigned tax ${defaultTax.id} to unassigned products of org ${org.id}`);
    }
    this.logger.info('TaxesDefaultSeed complete');
  }
}
