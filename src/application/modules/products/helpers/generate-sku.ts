/** Deterministic SKU from a product name and its 1-based sequence within the org (e.g. "Wireless Mouse" + 7 -> "WIR-0007"). */
export function generateSku(name: string, sequence: number): string {
  const prefix = name.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4) || 'SKU';
  return `${prefix}-${sequence.toString().padStart(4, '0')}`;
}
