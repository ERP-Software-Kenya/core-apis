import { numericTransformer } from './numeric.transformer';

describe('numericTransformer', () => {
  it('keeps undefined as undefined on write, so TypeORM falls back to the column DEFAULT', () => {
    expect(numericTransformer.to(undefined)).toBeUndefined();
  });

  it('keeps explicit null as null on write', () => {
    expect(numericTransformer.to(null)).toBeNull();
  });

  it('coerces numeric input on write', () => {
    expect(numericTransformer.to(5)).toBe(5);
  });

  it('coerces db string to number on read', () => {
    expect(numericTransformer.from('12.5000')).toBe(12.5);
  });
});
