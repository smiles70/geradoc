const DocumentProcessor = require('./documentProcessor');
const fixtureExtractor = require('./fixtureExtractor');
const fixtureSimplifier = require('./fixtureSimplifier');

test('returns the mocked-demo-compatible document shape', async () => {
  const processor = new DocumentProcessor({ extractor: fixtureExtractor, simplifier: fixtureSimplifier });
  const result = await processor.process({ buffer: Buffer.from('x'), fileName: 'sample.pdf', mimeType: 'application/pdf' });
  expect(result).toEqual(expect.objectContaining({ id: expect.any(String), type: 'Insurance', title: expect.any(String), pages: 2 }));
  expect(result.summary).toEqual(expect.objectContaining({ simple: expect.any(String), standard: expect.any(String), detailed: expect.any(String) }));
  expect(Array.isArray(result.keyInfo)).toBe(true);
  expect(Array.isArray(result.actions)).toBe(true);
});
