const { applyApprovedSynonyms, isIdempotent, validateSynonymPair } = require('./synonymityRubric');

test('accepts only glossary/thesaurus-approved synonym pairs', () => {
  expect(validateSynonymPair({ source: 'shall', replacement: 'must', partOfSpeech: 'modal', domain: 'general' })).toBe(true);
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
