const escapeLiteral = (v: string): string => v.replace(/'/g, "''");
const escapeIdent = (v: string): string => v.replace(/"/g, '""');

export const makeEnumAddValues = (schema: string, typeName: string, valuesToAdd: string[]): string => {
  const s = escapeIdent(schema);
  const t = escapeIdent(typeName);
  return valuesToAdd.map((v) => `ALTER TYPE "${s}"."${t}" ADD VALUE IF NOT EXISTS '${escapeLiteral(v)}';`).join("\n");
};

export const makeEnumDownRemoveValues = (schema: string, typeName: string, tableName: string, columnName: string, valuesToRemove: string[], newDefault?: string): string => {
  const removeLines = valuesToRemove.map((v) => `        v_labels := array_remove(v_labels, '${escapeLiteral(v)}');`).join("\n");
  const s = escapeIdent(schema);
  const t = escapeIdent(typeName);
  const tbl = escapeIdent(tableName);
  const col = escapeIdent(columnName);

  const defaultHandling = newDefault
    ? `
  -- Drop old default
  EXECUTE 'ALTER TABLE "${s}"."${tbl}" ALTER COLUMN "${col}" DROP DEFAULT';
`
    : "";

  const setDefault = newDefault
    ? `
  -- Set new valid default
  EXECUTE 'ALTER TABLE "${s}"."${tbl}" ALTER COLUMN "${col}" SET DEFAULT ''${escapeLiteral(newDefault)}''';
`
    : "";

  return `
DO $$
DECLARE
  v_labels text[];
BEGIN
  SELECT array_agg(e.enumlabel ORDER BY e.enumsortorder)
  INTO v_labels
  FROM pg_enum e
  JOIN pg_type t ON t.oid = e.enumtypid
  JOIN pg_namespace n ON n.oid = t.typnamespace
  WHERE t.typname = '${escapeLiteral(typeName)}'
    AND n.nspname = '${escapeLiteral(schema)}';

${removeLines}

${defaultHandling}

  EXECUTE 'ALTER TYPE "${s}"."${t}" RENAME TO "${t}_old"';

  EXECUTE format(
    'CREATE TYPE "${s}"."${t}" AS ENUM (%s)',
    array_to_string(ARRAY(SELECT quote_literal(x) FROM unnest(v_labels) AS x), ', ')
  );

  EXECUTE '
    ALTER TABLE "${s}"."${tbl}"
    ALTER COLUMN "${col}"
    TYPE "${s}"."${t}"
    USING "${col}"::text::"${s}"."${t}"
  ';

${setDefault}

  EXECUTE 'DROP TYPE "${s}"."${t}_old"';
END
$$;
`;
};

export const makeEnumUpsertValues = (schema: string, typeName: string, tableName: string, columnName: string, valuesToAdd: string[]): string => {
  const s = escapeIdent(schema);
  const t = escapeIdent(typeName);
  const tbl = escapeIdent(tableName);
  const col = escapeIdent(columnName);

  const addLines = valuesToAdd
    .map(
      (v) => `IF NOT v_labels @> ARRAY['${escapeLiteral(v)}'] THEN
  v_labels := array_append(v_labels, '${escapeLiteral(v)}');
END IF;`,
    )
    .join("\n");

  return `
DO $$
DECLARE
  v_labels text[];
BEGIN
  SELECT array_agg(e.enumlabel ORDER BY e.enumsortorder)
  INTO v_labels
  FROM pg_enum e
  JOIN pg_type t ON t.oid = e.enumtypid
  JOIN pg_namespace n ON n.oid = t.typnamespace
  WHERE t.typname = '${escapeLiteral(typeName)}'
    AND n.nspname = '${escapeLiteral(schema)}';

${addLines}

  EXECUTE 'ALTER TYPE "${s}"."${t}" RENAME TO "${t}_old"';

  EXECUTE format(
    'CREATE TYPE "${s}"."${t}" AS ENUM (%s)',
    array_to_string(
      ARRAY(SELECT quote_literal(x) FROM unnest(v_labels) AS x),
      ', '
    )
  );

  EXECUTE '
    ALTER TABLE "${s}"."${tbl}"
    ALTER COLUMN "${col}"
    TYPE "${s}"."${t}"
    USING "${col}"::text::"${s}"."${t}"
  ';

  EXECUTE 'DROP TYPE "${s}"."${t}_old"';
END
$$;
`;
};
