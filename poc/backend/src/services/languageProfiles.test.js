const { detectLanguage, normalizeSpanishDate, normalizeAmount } = require('./languageProfiles');

test('normalizes English and Spanish technical anchors', () => {
  expect(detectLanguage('La fecha de pago para usted')).toBe('es');
  expect(detectLanguage('The payment date for your plan')).toBe('en');
  expect(normalizeSpanishDate('15 de octubre de 2027')).toBe('2027-10-15');
  expect(normalizeAmount('1.234,56 €', 'es')).toBe(1234.56);
  expect(normalizeAmount('$1,234.56', 'en')).toBe(1234.56);
});
