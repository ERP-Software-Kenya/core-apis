import { BadRequestException } from '@nestjs/common';

export const QUANTITY_SCALE = 100_000_000n;

export function toScaledQuantity(value: string | number, label: string): bigint {
  const raw = String(value).trim();
  if (!/^\d+(\.\d{1,8})?$/.test(raw)) {
    throw new BadRequestException(`${label} must be a positive decimal with at most 8 decimal places`);
  }
  const [whole, fraction = ''] = raw.split('.');
  return BigInt(whole) * QUANTITY_SCALE + BigInt(fraction.padEnd(8, '0'));
}

export function fromScaledQuantity(value: bigint): string {
  const whole = value / QUANTITY_SCALE;
  const fraction = (value % QUANTITY_SCALE).toString().padStart(8, '0').replace(/0+$/, '');
  return fraction ? `${whole}.${fraction}` : whole.toString();
}
