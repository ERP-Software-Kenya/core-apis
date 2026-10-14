export function shouldApplySalesReturnLocationScope(
  accessibleLocationIds: string[] | undefined,
  requestedLocationId?: string,
): boolean {
  return accessibleLocationIds !== undefined && !requestedLocationId;
}
