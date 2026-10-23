import { BadRequestException } from '@nestjs/common';
import { assertBalancedJournal } from '../../application/modules/accounting';

describe('assertBalancedJournal', () => {
  const accountId = '25d06ce5-6dc9-4578-b460-0a1ea3845bf8';

  it('accepts a balanced multi-line journal at four-decimal precision', () => {
    expect(() =>
      assertBalancedJournal([
        { accountId, debit: '100.1250', credit: 0 },
        { accountId, debit: 0, credit: '60.1000' },
        { accountId, debit: 0, credit: '40.025' },
      ]),
    ).not.toThrow();
  });

  it('rejects an unbalanced journal', () => {
    expect(() =>
      assertBalancedJournal([
        { accountId, debit: 100, credit: 0 },
        { accountId, debit: 0, credit: 99 },
      ]),
    ).toThrow('debits and credits must balance');
  });

  it.each([
    { debit: 0, credit: 0 },
    { debit: 10, credit: 10 },
  ])('rejects a line that does not have exactly one side: %o', ({ debit, credit }) => {
    expect(() =>
      assertBalancedJournal([
        { accountId, debit, credit },
        { accountId, debit: 10, credit: 0 },
      ]),
    ).toThrow(BadRequestException);
  });

  it.each(['-1', '1.00001', 'NaN', '1e3'])('rejects invalid monetary input %s', (amount) => {
    expect(() =>
      assertBalancedJournal([
        { accountId, debit: amount, credit: 0 },
        { accountId, debit: 0, credit: amount },
      ]),
    ).toThrow('Invalid monetary amount');
  });

  it('requires at least two lines', () => {
    expect(() => assertBalancedJournal([{ accountId, debit: 10, credit: 0 }])).toThrow(
      'at least two lines',
    );
  });
});
