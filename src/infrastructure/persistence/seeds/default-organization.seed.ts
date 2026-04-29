import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { FindOptionsWhere, Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseSeed } from '../../../common';
import { OrganizationEntity } from '../entities';
import { UserEntity } from '../entities';

/**
 * Seeds a default "Demo Organization" + a super-admin user.
 * In production, override credentials via environment variables.
 *
 * ENV vars checked:
 *   SEED_ORG_NAME         (default: "Demo Organization")
 *   SEED_ADMIN_EMAIL      (default: "admin@demo.com")
 *   SEED_ADMIN_PASSWORD   (default: "Admin@12345!")   ← change in production!
 */
@Injectable()
export class DefaultOrganizationSeed extends BaseSeed<OrganizationEntity> {
  public get version(): number {
    return 1;
  }

  public get seedingData(): Partial<OrganizationEntity>[] {
    return [
      {
        id:       '00000000-0000-4000-8000-000000000001',
        name:     process.env.SEED_ORG_NAME ?? 'Demo Organization',
        slug:     'demo-organization',
        isActive: true,
      },
    ];
  }

  constructor(
    dataSource: DataSource,
    @InjectRepository(OrganizationEntity) repo: Repository<OrganizationEntity>,
    @InjectPinoLogger(DefaultOrganizationSeed.name) logger: PinoLogger,
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
  ) {
    super(dataSource, repo, logger);
  }

  protected equalityCheck(
    x: Partial<OrganizationEntity>,
    y: Partial<OrganizationEntity>,
  ): boolean {
    return x.name === y.name;
  }

  protected createFilter(): FindOptionsWhere<OrganizationEntity> {
    return {};
  }

  /** After the org is seeded, create the super-admin user if missing. */
  protected override async postSeedAsync(): Promise<void> {
    const org = await this.repo.findOne({
      where: { slug: 'demo-organization' },
    });
    if (!org) return;

    const email = process.env.SEED_ADMIN_EMAIL ?? 'admin@demo.com';
    const existing = await this.userRepo.findOne({ where: { email } });
    if (existing) {
      this.logger.info('Super-admin user already exists — skipping user seed');
      return;
    }

    const rawPassword = process.env.SEED_ADMIN_PASSWORD ?? 'Admin@12345!';
    const passwordHash = await bcrypt.hash(rawPassword, 12);

    const admin = this.userRepo.create({
      organizationId: org.id,
      firstName:      'Super',
      lastName:       'Admin',
      email,
      passwordHash,
      isActive:       true,
    });
    await this.userRepo.save(admin);
    this.logger.info(`Super-admin user seeded: ${email}`);
  }
}
