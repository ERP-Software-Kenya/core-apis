import { BadRequestException } from '@nestjs/common';
import { QUANTITY_SCALE, fromScaledQuantity, toScaledQuantity } from '../../../../application/shared/helpers/quantity-decimal';

describe('toScaledQuantity', () => {
  it('converts a whole number string', () => {
    expect(toScaledQuantity('1', 'qty')).toBe(100_000_000n);
  });

  it('converts a numeric input', () => {
    expect(toScaledQuantity(50, 'qty')).toBe(50n * QUANTITY_SCALE);
  });

  it('converts a decimal with fewer than 8 places', () => {
    expect(toScaledQuantity('1.5', 'qty')).toBe(150_000_000n);
  });

  it('converts exactly 8 decimal places', () => {
    expect(toScaledQuantity('1.12345678', 'qty')).toBe(112_345_678n);
  });

  it('converts a large whole number', () => {
    expect(toScaledQuantity('1000', 'qty')).toBe(1000n * QUANTITY_SCALE);
  });

  it('trims whitespace from the input', () => {
    expect(toScaledQuantity('  2  ', 'qty')).toBe(200_000_000n);
  });

  it('throws for non-numeric input', () => {
    expect(() => toScaledQuantity('abc', 'qty')).toThrow(BadRequestException);
  });

  it('throws for more than 8 decimal places', () => {
    expect(() => toScaledQuantity('1.123456789', 'qty')).toThrow(BadRequestException);
  });

  it('throws for negative numbers', () => {
    expect(() => toScaledQuantity('-1', 'qty')).toThrow(BadRequestException);
  });

  it('throws for empty string', () => {
    expect(() => toScaledQuantity('', 'qty')).toThrow(BadRequestException);
  });

  it('uses the label in the error message', () => {
    expect(() => toScaledQuantity('bad', 'conversion factor')).toThrow('conversion factor');
  });
});

describe('fromScaledQuantity', () => {
  it('converts a scale unit back to "1"', () => {
    expect(fromScaledQuantity(QUANTITY_SCALE)).toBe('1');
  });

  it('strips trailing zeros from the fractional part', () => {
    expect(fromScaledQuantity(150_000_000n)).toBe('1.5');
  });

  it('preserves all significant decimal digits', () => {
    expect(fromScaledQuantity(112_345_678n)).toBe('1.12345678');
  });

  it('returns "0" for zero', () => {
    expect(fromScaledQuantity(0n)).toBe('0');
  });

  it('round-trips through toScaledQuantity', () => {
    const cases = ['1', '0.5', '100', '3.14159265', '0.00000001'];
    for (const input of cases) {
      expect(fromScaledQuantity(toScaledQuantity(input, 'v'))).toBe(input);
    }
  });
});
