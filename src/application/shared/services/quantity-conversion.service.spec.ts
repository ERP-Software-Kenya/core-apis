import { fromScaledQuantity, toScaledQuantity } from '../helpers/quantity-decimal';

describe('quantity decimal arithmetic', () => {
  it('preserves decimal quantities without binary floating-point arithmetic', () => {
    expect(fromScaledQuantity(toScaledQuantity('18.125', 'Quantity'))).toBe('18.125');
  });

  it('sums 5 bags of 10 KG plus 18 KG as 68 KG', () => {
    const bags = toScaledQuantity('50', 'Base quantity');
    const kilograms = toScaledQuantity('18', 'Base quantity');
    expect(fromScaledQuantity(bags + kilograms)).toBe('68');
  });
});
