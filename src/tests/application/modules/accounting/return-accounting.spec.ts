import {
  calculateCommissionReversal,
  calculatePurchaseReturnSettlement,
  calculateSupplierCreditOutstanding,
} from '../../../../application/modules/accounting';

describe('return accounting', () => {
  describe('calculatePurchaseReturnSettlement', () => {
    it('reduces accounts payable when the purchase is unpaid', () => {
      expect(calculatePurchaseReturnSettlement(1000, 0, 200, 300)).toEqual({
        payableReduction: 300,
        supplierCredit: 0,
      });
    });

    it('records a supplier credit when returned stock was already paid', () => {
      expect(calculatePurchaseReturnSettlement(1000, 0, 900, 300)).toEqual({
        payableReduction: 100,
        supplierCredit: 200,
      });
    });

    it('accounts for earlier finalized returns before reducing payable again', () => {
      expect(calculatePurchaseReturnSettlement(1000, 250, 600, 300)).toEqual({
        payableReduction: 150,
        supplierCredit: 150,
      });
    });

    it('puts the full return into supplier credit for a fully prepaid purchase', () => {
      expect(calculatePurchaseReturnSettlement(1000, 0, 1000, 125)).toEqual({
        payableReduction: 0,
        supplierCredit: 125,
      });
    });
  });

  describe('calculateSupplierCreditOutstanding', () => {
    it('subtracts prior refunds from the supplier credit', () => {
      expect(calculateSupplierCreditOutstanding(250, 75.25)).toBe(174.75);
    });

    it('never returns a negative credit balance', () => {
      expect(calculateSupplierCreditOutstanding(100, 125)).toBe(0);
    });
  });

  describe('calculateCommissionReversal', () => {
    it('reverses commission in proportion to the sales return', () => {
      expect(calculateCommissionReversal(100, 1000, 250)).toBe(25);
    });

    it('returns zero when there is no valid commission base', () => {
      expect(calculateCommissionReversal(100, 0, 25)).toBe(0);
      expect(calculateCommissionReversal(0, 1000, 25)).toBe(0);
    });
  });
});
