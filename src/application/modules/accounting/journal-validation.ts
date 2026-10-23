import { BadRequestException } from '@nestjs/common';
import { JournalLineInput } from './accounting.types';

const SCALE = 4;
const FACTOR = 10n ** BigInt(SCALE);

function toScaledAmount(value: string | number): bigint {
  const raw = String(value).trim();
  if (!/^\d+(\.\d{1,4})?$/.test(raw)) {
    throw new BadRequestException(`Invalid monetary amount: ${raw}`);
  }

  const [whole, fraction = ''] = raw.split('.');
  return BigInt(whole) * FACTOR + BigInt(fraction.padEnd(SCALE, '0'));
}

export function assertBalancedJournal(lines: JournalLineInput[]): void {
  if (lines.length < 2) {
    throw new BadRequestException('A journal entry requires at least two lines');
  }

  let debits = 0n;
  let credits = 0n;

  for (const line of lines) {
    const debit = toScaledAmount(line.debit);
    const credit = toScaledAmount(line.credit);

    if ((debit === 0n) === (credit === 0n)) {
      throw new BadRequestException('Each journal line must contain either a debit or a credit');
    }

    debits += debit;
    credits += credit;
  }

  if (debits !== credits) {
    throw new BadRequestException('Journal entry debits and credits must balance');
  }
}
