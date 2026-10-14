import { shouldApplySalesReturnLocationScope } from '../../../../application/modules/sales-returns/helpers';

describe('shouldApplySalesReturnLocationScope', () => {
  it('applies an empty location scope so access fails closed', () => {
    expect(shouldApplySalesReturnLocationScope([], undefined)).toBe(true);
  });

  it('applies a populated branch location scope', () => {
    expect(shouldApplySalesReturnLocationScope(['location-1'], undefined)).toBe(true);
  });

  it('does not replace an explicitly authorized location filter', () => {
    expect(shouldApplySalesReturnLocationScope(['location-1'], 'location-1')).toBe(false);
  });

  it('does not scope organization-wide access', () => {
    expect(shouldApplySalesReturnLocationScope(undefined, undefined)).toBe(false);
  });
});
