import { fiscalPeriodContaining } from '../../application/modules/accounting';

describe('fiscalPeriodContaining', () => {
  it('uses April through March by default configuration', () => {
    expect(fiscalPeriodContaining(new Date('2026-10-14T00:00:00Z'), 4)).toEqual({
      startsOn: '2026-04-01',
      endsOn: '2027-03-31',
    });
  });

  it('uses the prior year when the date precedes the start month', () => {
    expect(fiscalPeriodContaining(new Date('2026-02-01T00:00:00Z'), 4)).toEqual({
      startsOn: '2025-04-01',
      endsOn: '2026-03-31',
    });
  });

  it('supports calendar-year organizations', () => {
    expect(fiscalPeriodContaining(new Date('2026-06-01T00:00:00Z'), 1)).toEqual({
      startsOn: '2026-01-01',
      endsOn: '2026-12-31',
    });
  });
});
