import { ConflictException } from '@nestjs/common';
import { EntityManager, In } from 'typeorm';
import {
  AccountingPeriodStatus,
  JournalLineInput,
  PostJournalInput,
  PostedJournal,
  assertBalancedJournal,
} from '../../../application/modules/accounting';
import {
  AccountEntity,
  AccountingPeriodEntity,
  BlackLedgerAccountEntity,
  BlackLedgerEntryEntity,
  BlackLedgerLineEntity,
  JournalEntryEntity,
  JournalLineEntity,
} from '../entities';

export interface JournalLineByCode extends Omit<JournalLineInput, 'accountId'> {
  accountCode: string;
}

export interface JournalByCode extends Omit<PostJournalInput, 'lines'> {
  lines: JournalLineByCode[];
}

export async function postOfficialJournal(
  manager: EntityManager,
  input: JournalByCode,
): Promise<PostedJournal> {
  const existing = await manager.findOneBy(JournalEntryEntity, {
    organizationId: input.organizationId,
    idempotencyKey: input.idempotencyKey,
  });
  if (existing) return toResult(existing);

  const postingDate = input.occurredAt.toISOString().slice(0, 10);
  const period = await manager
    .getRepository(AccountingPeriodEntity)
    .createQueryBuilder('period')
    .setLock('pessimistic_write')
    .where('period.organizationId = :organizationId', { organizationId: input.organizationId })
    .andWhere('period.status = :status', { status: AccountingPeriodStatus.Open })
    .andWhere('period.startsOn <= :postingDate', { postingDate })
    .andWhere('period.endsOn >= :postingDate', { postingDate })
    .getOne();
  if (!period) {
    throw new ConflictException('The journal posting date is not in an open accounting period');
  }

  await manager.query('SELECT pg_advisory_xact_lock(hashtext($1))', [
    `official-ledger:${input.organizationId}`,
  ]);
  const lines = await resolveLines(
    manager,
    AccountEntity,
    input.organizationId,
    input.lines,
  );
  assertBalancedJournal(lines);
  const entryNumber = await nextNumber(manager, JournalEntryEntity, input.organizationId);
  const entry = await manager.save(
    JournalEntryEntity,
    manager.create(JournalEntryEntity, { ...input, lines: undefined, entryNumber }),
  );
  await manager.save(
    JournalLineEntity,
    lines.map((line) =>
      manager.create(JournalLineEntity, {
        ...line,
        debit: String(line.debit),
        credit: String(line.credit),
        journalEntryId: entry.id,
      }),
    ),
  );
  return toResult(entry);
}

export async function postBlackJournal(
  manager: EntityManager,
  input: JournalByCode,
): Promise<PostedJournal> {
  const existing = await manager.findOneBy(BlackLedgerEntryEntity, {
    organizationId: input.organizationId,
    idempotencyKey: input.idempotencyKey,
  });
  if (existing) return toResult(existing);
  await manager.query('SELECT pg_advisory_xact_lock(hashtext($1))', [
    `black-ledger:${input.organizationId}`,
  ]);
  const lines = await resolveLines(
    manager,
    BlackLedgerAccountEntity,
    input.organizationId,
    input.lines,
  );
  assertBalancedJournal(lines);
  const entryNumber = await nextNumber(manager, BlackLedgerEntryEntity, input.organizationId);
  const entry = await manager.save(
    BlackLedgerEntryEntity,
    manager.create(BlackLedgerEntryEntity, { ...input, lines: undefined, entryNumber }),
  );
  await manager.save(
    BlackLedgerLineEntity,
    lines.map((line) => {
      return manager.create(BlackLedgerLineEntity, {
        ...line,
        debit: String(line.debit),
        credit: String(line.credit),
        entryId: entry.id,
      });
    }),
  );
  return toResult(entry);
}

async function resolveLines(
  manager: EntityManager,
  entity: typeof AccountEntity | typeof BlackLedgerAccountEntity,
  organizationId: string,
  lines: JournalLineByCode[],
): Promise<JournalLineInput[]> {
  const codes = [...new Set(lines.map((line) => line.accountCode))];
  const accounts = await manager.find(entity, {
    where: { organizationId, code: In(codes), isActive: true },
  });
  const byCode = new Map(accounts.map((account) => [account.code, account.id]));
  if (byCode.size !== codes.length) {
    throw new ConflictException('The organization chart of accounts is not initialized');
  }
  return lines.map(({ accountCode, ...line }) => ({ ...line, accountId: byCode.get(accountCode) }));
}

async function nextNumber(
  manager: EntityManager,
  entity: typeof JournalEntryEntity | typeof BlackLedgerEntryEntity,
  organizationId: string,
): Promise<number> {
  const row = await manager
    .getRepository(entity)
    .createQueryBuilder('entry')
    .select('COALESCE(MAX(entry.entryNumber), 0)', 'number')
    .where('entry.organizationId = :organizationId', { organizationId })
    .getRawOne<{ number: string }>();
  return Number(row?.number ?? 0) + 1;
}

function toResult(entry: JournalEntryEntity | BlackLedgerEntryEntity): PostedJournal {
  return { id: entry.id, entryNumber: Number(entry.entryNumber), idempotencyKey: entry.idempotencyKey };
}
