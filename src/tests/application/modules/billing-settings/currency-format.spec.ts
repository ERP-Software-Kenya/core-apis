import { formatOrganizationCurrency } from '../../../../application/modules/billing-settings/currency-format';

describe('formatOrganizationCurrency', () => {
  it.each([
    ['USD', '$1,234.50'],
    ['INR', '₹1,234.50'],
    ['KES', 'KES 1,234.50'],
  ])('formats values with the organization currency %s', (currency, expected) => {
    expect(formatOrganizationCurrency(1234.5, currency, 'en')).toBe(expected);
  });
});
