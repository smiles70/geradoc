const { applyApprovedSynonyms, isIdempotent, validateSynonymPair } = require('./synonymityRubric');

test('accepts only glossary/thesaurus-approved synonym pairs', () => {
  expect(validateSynonymPair({ language: 'en', source: 'shall', replacement: 'must', partOfSpeech: 'modal', domain: 'general' })).toBe(true);
  expect(validateSynonymPair({ source: 'may', replacement: 'must', partOfSpeech: 'modal', domain: 'general' })).toBe(false);
});

test('transformation is idempotent and preserves anchors', () => {
  const source = 'The provider shall utilize the form prior to October 15, 2027 for $240.';
  const result = applyApprovedSynonyms(source);
  expect(result.text).toContain('must use');
  expect(result.text).toContain('October 15, 2027');
  expect(result.text).toContain('$240');
  expect(isIdempotent(source)).toBe(true);
});

test('supports versioned Spanish approved pairs without changing numbers', () => {
  const result = applyApprovedSynonyms('Debe utilizar aproximadamente 1.234,56 € antes de la fecha.', { language: 'es' });
  expect(result.text).toContain('usar');
  expect(result.text).toContain('cerca de');
  expect(result.text).toContain('1.234,56');
  expect(isIdempotent('Debe utilizar aproximadamente 1.234,56 € antes de la fecha.', { language: 'es' })).toBe(true);
});
