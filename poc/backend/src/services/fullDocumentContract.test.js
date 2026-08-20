const DocumentProcessor = require('./documentProcessor');
const fixtureExtractor = require('./fixtureExtractor');
const fixtureSimplifier = require('./plainLanguageSimplifier');

test('preserves complete source text and page records in all summary levels', async () => {
  const processor = new DocumentProcessor({ extractor: fixtureExtractor, simplifier: fixtureSimplifier });
  const result = await processor.process({ buffer: Buffer.from('%PDF synthetic'), fileName: 'multi-page.pdf', mimeType: 'application/pdf' });

  expect(result.processingStatus).toBe('complete');
  expect(result.fullText).toContain('Your Medicare plan shall renew');
  expect(result.pageText).toHaveLength(2);
  expect(result.sourceReferences).toHaveLength(2);
  expect(result.summary.simple).toContain('Your Medicare plan must renew');
  expect(result.summary.standard).toContain('Your Medicare plan must renew');
  expect(result.summary.detailed).toBe(result.fullText);
});
