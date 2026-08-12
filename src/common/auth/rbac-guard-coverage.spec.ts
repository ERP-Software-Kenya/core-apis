// src/common/auth/rbac-guard-coverage.spec.ts
import { readFileSync } from 'fs';
import { join } from 'path';

const MODULES_ROOT = join(__dirname, '../../application/modules');

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

  // Check if both @Controller and @UseGuards exist in the block
  if (!decorators.includes('@Controller(') && !decorators.includes('@UseGuards(')) {
    return false;
  }

  // Extract guards from @UseGuards
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
