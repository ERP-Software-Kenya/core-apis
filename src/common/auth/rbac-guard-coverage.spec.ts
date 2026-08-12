// src/common/auth/rbac-guard-coverage.spec.ts
import { readFileSync } from 'fs';
import { join } from 'path';

const MODULES_ROOT = join(__dirname, '../../application/modules');

// Guard/role list extraction below uses `[^)]*`, which breaks if a @UseGuards(...) or @Roles(...)
// argument is itself a call (e.g. `AuthGuard('jwt')`). Every controller in this plan uses bare
// guard classes and ERole.X identifiers only (see plan's Role tiers section), so this is fine for
// this plan's scope — but it will misreport silently if that convention changes later.

function readController(relativePath: string): string {
  return readFileSync(join(MODULES_ROOT, relativePath), 'utf8');
}

function hasClassGuard(source: string, guard: string): boolean {
  // Match @UseGuards and @Controller on consecutive decorator lines (in either order, with other decorators possibly between them)
  const decoratorBlockPattern = /((?:@\w+\([^)]*\)[\s\n]*)+)export\s+class/;
  const blockMatch = source.match(decoratorBlockPattern);
  if (!blockMatch) {
    return false;
  }
  const decorators = blockMatch[1];

  // Extract guards from @UseGuards. Absence of @UseGuards falls through here (guardsMatch is null).
  const guardsMatch = decorators.match(/@UseGuards\(([^)]*)\)/);
  if (!guardsMatch) {
    return false;
  }

  return guardsMatch[1].split(',').map((entry) => entry.trim()).includes(guard);
}

function methodDecorators(source: string, methodName: string): string {
  // Match decorators that may span multiple lines (like @ApiOperation with multi-line object literals)
  // Decorators can have nested parens/braces; match from @ to the closing ) that's followed by optional whitespace and newline
  const pattern = new RegExp(`((?:@\\w+\\([^()]*(?:\\([^)]*\\)[^()]*)*\\)[\\s\\n]*)+)\\s*public async ${methodName}\\(`, 's');
  const match = source.match(pattern);
  if (!match) {
    throw new Error(`method "${methodName}" not found in controller source`);
  }
  return match[1];
}

function hasMethodGuard(decorators: string, guard: string): boolean {
  const match = decorators.match(/@UseGuards\(([^)]*)\)/);
  if (!match) {
    return false;
  }
  return match[1].split(',').map((entry) => entry.trim()).includes(guard);
}

function methodRoles(decorators: string): string[] {
  const match = decorators.match(/@Roles\(([^)]*)\)/);
  if (!match) {
    return [];
  }
  return match[1].split(',').map((entry) => entry.trim()).filter((entry) => entry.length > 0);
}

describe('rbac guard coverage checker (proving against already-guarded controllers)', () => {
  it('detects the class-level guard chain on BillsController', () => {
    const source = readController('bills/bills.controller.ts');
    expect(hasClassGuard(source, 'ClerkAuthGuard')).toBe(true);
    expect(hasClassGuard(source, 'RolesGuard')).toBe(true);
  });

  it('detects the method-level role restriction on AuthController.inviteMember', () => {
    const source = readController('auth/auth.controller.ts');
    const decorators = methodDecorators(source, 'inviteMember');
    expect(hasMethodGuard(decorators, 'RolesGuard')).toBe(true);
    expect(methodRoles(decorators)).toEqual(['ERole.OrgAdmin', 'ERole.SuperAdmin']);
  });

  it('reports no class-level RolesGuard on AuthController itself (class only has ClerkAuthGuard)', () => {
    const source = readController('auth/auth.controller.ts');
    expect(hasClassGuard(source, 'ClerkAuthGuard')).toBe(true);
    expect(hasClassGuard(source, 'RolesGuard')).toBe(false);
  });
});

describe('user-roles controller', () => {
  const source = () => readController('user-roles/user-roles.controller.ts');

  it('requires Clerk authentication on the whole controller', () => {
    expect(hasClassGuard(source(), 'ClerkAuthGuard')).toBe(true);
  });

  it('restricts assigning a role to a user to org-admin tier', () => {
    const decorators = methodDecorators(source(), 'create');
    expect(hasMethodGuard(decorators, 'RolesGuard')).toBe(true);
    expect(methodRoles(decorators)).toEqual(['ERole.OrgAdmin', 'ERole.SuperAdmin']);
  });
});

describe('roles controller', () => {
  const source = () => readController('roles/roles.controller.ts');

  it('requires Clerk authentication on the whole controller', () => {
    expect(hasClassGuard(source(), 'ClerkAuthGuard')).toBe(true);
  });

  it('restricts defining a new role to platform tier', () => {
    const decorators = methodDecorators(source(), 'create');
    expect(hasMethodGuard(decorators, 'RolesGuard')).toBe(true);
    expect(methodRoles(decorators)).toEqual(['ERole.SuperAdmin']);
  });
});
