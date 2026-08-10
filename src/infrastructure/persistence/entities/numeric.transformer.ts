import { ValueTransformer } from 'typeorm';

/**
 * Postgres returns `decimal`/`numeric` columns as strings. Money fields are plain
 * `number` in TS (per the ERP money convention), so coerce on read.
 */
export const numericTransformer: ValueTransformer = {
  // `undefined` must stay `undefined` (not coerced to `null`) so TypeORM falls back to the column's DB DEFAULT
  // instead of inserting an explicit NULL, which breaks every NOT NULL numeric column relying on its default.
  to: (value?: number | null): number | null | undefined => (value === undefined ? undefined : value === null ? null : Number(value)),
  from: (value?: string | number | null): number | null => (value === undefined || value === null ? null : Number(value)),
};
