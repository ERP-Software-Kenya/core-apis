import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import {
  IBlackLedgerRepo,
  PostBlackLedgerJournalInput,
  PostedBlackLedgerJournal,
  assertBalancedJournal,
} from '../../../application/modules/accounting';
import {
  BlackLedgerAccountEntity,
  BlackLedgerEntryEntity,
  BlackLedgerLineEntity,
} from '../entities';

@Injectable()
export class BlackLedgerRepo implements IBlackLedgerRepo {
  public constructor(
    @InjectRepository(BlackLedgerEntryEntity)
    private readonly entries: Repository<BlackLedgerEntryEntity>,
  ) {}

  public async postJournal(input: PostBlackLedgerJournalInput): Promise<PostedBlackLedgerJournal> {
    assertBalancedJournal(input.lines);
    const existing = await this.findExisting(input.organizationId, input.idempotencyKey);
    if (existing) return this.toResult(existing);

    try {
      return await this.entries.manager.transaction(async (manager) => {
        // Serializes numbering per organization without coupling this private ledger to official periods.
        await manager.query('SELECT pg_advisory_xact_lock(hashtext($1))', [
          `black-ledger:${input.organizationId}`,
        ]);

        const accountIds = [...new Set(input.lines.map((line) => line.accountId))];
        const accountCount = await manager.getRepository(BlackLedgerAccountEntity).countBy({
          organizationId: input.organizationId,
          isActive: true,
          id: accountIds.length === 1 ? accountIds[0] : undefined,
        });
        const actualCount =
          accountIds.length === 1
            ? accountCount
            : await manager
                .getRepository(BlackLedgerAccountEntity)
                .createQueryBuilder('account')
                .where('account.organizationId = :organizationId', {
                  organizationId: input.organizationId,
                })
                .andWhere('account.isActive = true')
                .andWhere('account.id IN (:...accountIds)', { accountIds })
                .getCount();
        if (actualCount !== accountIds.length) {
          throw new ConflictException('Every black-ledger account must be active and belong to the organization');
        }

        const latest = await manager
          .getRepository(BlackLedgerEntryEntity)
          .createQueryBuilder('entry')
          .select('COALESCE(MAX(entry.entryNumber), 0)', 'number')
          .where('entry.organizationId = :organizationId', {
            organizationId: input.organizationId,
          })
          .getRawOne<{ number: string }>();

        const entry = await manager.save(
          BlackLedgerEntryEntity,
          manager.create(BlackLedgerEntryEntity, {
            organizationId: input.organizationId,
            entryNumber: Number(latest?.number ?? 0) + 1,
            idempotencyKey: input.idempotencyKey,
            sourceType: input.sourceType,
            sourceId: input.sourceId,
            occurredAt: input.occurredAt,
            description: input.description,
            createdBy: input.createdBy,
          }),
        );

        await manager.save(
          BlackLedgerLineEntity,
          input.lines.map((line) =>
            manager.create(BlackLedgerLineEntity, {
              ...line,
              debit: String(line.debit),
              credit: String(line.credit),
              entryId: entry.id,
            }),
          ),
        );
        return this.toResult(entry);
      });
    } catch (error) {
      if (error instanceof QueryFailedError && (error.driverError as { code?: string }).code === '23505') {
        const concurrent = await this.findExisting(input.organizationId, input.idempotencyKey);
        if (concurrent) return this.toResult(concurrent);
      }
      throw error;
    }
  }

  private findExisting(organizationId: string, idempotencyKey: string) {
    return this.entries.findOneBy({ organizationId, idempotencyKey });
  }

  private toResult(entry: BlackLedgerEntryEntity): PostedBlackLedgerJournal {
    return { id: entry.id, entryNumber: Number(entry.entryNumber), idempotencyKey: entry.idempotencyKey };
  }
}
