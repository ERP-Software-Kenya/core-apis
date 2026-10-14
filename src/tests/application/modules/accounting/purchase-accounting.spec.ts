import {
  calculatePurchaseAllocationFunding,
  calculatePurchasePaymentFunding,
} from '../../../../application/modules/accounting';

describe('purchase accounting', () => {
  it('creates payable when allocating unpaid stock', () => {
    expect(calculatePurchaseAllocationFunding(0, 0, 250)).toEqual({
      advanceApplied: 0,
      payableCreated: 250,
    });
  });

  it('consumes supplier advance before creating payable', () => {
    expect(calculatePurchaseAllocationFunding(100, 300, 250)).toEqual({
      advanceApplied: 200,
      payableCreated: 50,
    });
  });

  it('pays payable before creating a supplier advance', () => {
    expect(calculatePurchasePaymentFunding(500, 100, 450)).toEqual({
      payablePaid: 400,
      advanceCreated: 50,
    });
  });

  it('records a full prepayment as supplier advance', () => {
    expect(calculatePurchasePaymentFunding(0, 0, 125)).toEqual({
      payablePaid: 0,
      advanceCreated: 125,
    });
  });
});
