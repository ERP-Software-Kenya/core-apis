import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import {
  AccountingPeriodStatus,
  IAccountingRepo,
  PostJournalInput,
  PostedJournal,
  assertBalancedJournal,
} from '../../../application/modules/accounting';
import {
  AccountEntity,
  AccountingPeriodEntity,
  JournalEntryEntity,
  JournalLineEntity,
} from '../entities';

@Injectable()
export class AccountingRepo implements IAccountingRepo {
  public constructor(
    @InjectRepository(JournalEntryEntity)
    private readonly journalEntries: Repository<JournalEntryEntity>,
  ) {}

  public async postJournal(input: PostJournalInput): Promise<PostedJournal> {
    assertBalancedJournal(input.lines);

    const existing = await this.findByIdempotencyKey(input.organizationId, input.idempotencyKey);
    if (existing) return this.toPostedJournal(existing);

    try {
      return await this.journalEntries.manager.transaction(async (manager) => {
        // Prevent two different idempotency keys from selecting the same per-org entry number.
        await manager.query('SELECT pg_advisory_xact_lock(hashtext($1))', [
          `official-ledger:${input.organizationId}`,
        ]);
        const postingDate = input.occurredAt.toISOString().slice(0, 10);
        const period = await manager
          .getRepository(AccountingPeriodEntity)
          .createQueryBuilder('period')
          .setLock('pessimistic_write')
          .where('period.organizationId = :organizationId', {
            organizationId: input.organizationId,
          })
          .andWhere('period.startsOn <= :postingDate', { postingDate })
          .andWhere('period.endsOn >= :postingDate', { postingDate })
          .getOne();

        if (!period || period.status !== AccountingPeriodStatus.Open) {
          throw new ConflictException('The journal posting date is not in an open accounting period');
        }

        const accountIds = [...new Set(input.lines.map((line) => line.accountId))];
        const validAccountCount = await manager
          .getRepository(AccountEntity)
          .createQueryBuilder('account')
          .where('account.organizationId = :organizationId', {
            organizationId: input.organizationId,
          })
          .andWhere('account.id IN (:...accountIds)', { accountIds })
          .andWhere('account.isActive = true')
          .getCount();

        if (validAccountCount !== accountIds.length) {
          throw new ConflictException('Every journal account must be active and belong to the organization');
        }

        const latest = await manager
          .getRepository(JournalEntryEntity)
          .createQueryBuilder('entry')
          .select('COALESCE(MAX(entry.entryNumber), 0)', 'number')
          .where('entry.organizationId = :organizationId', {
            organizationId: input.organizationId,
          })
          .getRawOne<{ number: string }>();
        const entryNumber = Number(latest?.number ?? 0) + 1;

        const entry = manager.getRepository(JournalEntryEntity).create({
          organizationId: input.organizationId,
          entryNumber,
          idempotencyKey: input.idempotencyKey,
          sourceType: input.sourceType,
          sourceId: input.sourceId,
          occurredAt: input.occurredAt,
          description: input.description,
          createdBy: input.createdBy,
        });
        const savedEntry = await manager.save(entry);

        const lines = input.lines.map((line) =>
          manager.getRepository(JournalLineEntity).create({
            ...line,
            debit: String(line.debit),
            credit: String(line.credit),
            journalEntryId: savedEntry.id,
          }),
        );
        await manager.save(lines);

        return this.toPostedJournal(savedEntry);
      });
    } catch (error) {
      if (error instanceof QueryFailedError && (error.driverError as { code?: string }).code === '23505') {
        const concurrent = await this.findByIdempotencyKey(input.organizationId, input.idempotencyKey);
        if (concurrent) return this.toPostedJournal(concurrent);
      }
      throw error;
    }
  }

  private findByIdempotencyKey(organizationId: string, idempotencyKey: string) {
    return this.journalEntries.findOneBy({ organizationId, idempotencyKey });
  }

  private toPostedJournal(entry: JournalEntryEntity): PostedJournal {
    return {
      id: entry.id,
      entryNumber: Number(entry.entryNumber),
      idempotencyKey: entry.idempotencyKey,
    };
  }
}
