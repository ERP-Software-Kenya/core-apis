import { randomUUID } from 'crypto';

export function generateReturnNumber(prefix: 'SR' | 'PR', now: Date = new Date()): string {
  const day = now.toISOString().slice(0, 10).replace(/-/g, '');
  return `${prefix}-${day}-${randomUUID().replace(/-/g, '').slice(0, 8).toUpperCase()}`;
}

export function roundReturnMoney(value: number): number {
  return Math.round((Number(value ?? 0) + Number.EPSILON) * 1e4) / 1e4;
}
