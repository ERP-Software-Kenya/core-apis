jest.mock('@automapper/classes', () => ({ AutoMap: () => () => undefined }));

import { resolveBranchPrice } from '../../../../../application/modules/product-branch-prices/helpers/resolve-branch-price.helper';

describe('resolveBranchPrice', () => {
  const product = { retailPrice: 100, wholesalePrice: 80 } as never;

  it('uses the branch retail override for regular customers', () => {
    const branchPrice = { retailPrice: 110, wholesalePrice: 90 } as never;
    expect(resolveBranchPrice(branchPrice, product, 'regular' as never)).toBe(110);
  });

  it('uses the branch wholesale override for shop customers', () => {
    const branchPrice = { retailPrice: 110, wholesalePrice: 90 } as never;
    expect(resolveBranchPrice(branchPrice, product, 'shop' as never)).toBe(90);
  });

  it('falls back independently for null branch tiers', () => {
    const branchPrice = { retailPrice: null, wholesalePrice: null } as never;
    expect(resolveBranchPrice(branchPrice, product, 'regular' as never)).toBe(100);
    expect(resolveBranchPrice(branchPrice, product, 'big_customer' as never)).toBe(80);
  });
});
