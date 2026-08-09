import { ValueTransformer } from 'typeorm';

/**
 * Postgres returns `decimal`/`numeric` columns as strings. Money fields are plain
 * `number` in TS (per the ERP money convention), so coerce on read.
 */
export const numericTransformer: ValueTransformer = {
  to: (value?: number | null): number | null => (value === undefined || value === null ? null : Number(value)),
  from: (value?: string | number | null): number | null => (value === undefined || value === null ? null : Number(value)),
};
