const DocumentProcessor = require('./documentProcessor');
const fixtureExtractor = require('./fixtureExtractor');
const fixtureSimplifier = require('./fixtureSimplifier');

test('returns the mocked-demo-compatible document shape', async () => {
  const processor = new DocumentProcessor({ extractor: fixtureExtractor, simplifier: fixtureSimplifier });
  const result = await processor.process({ buffer: Buffer.from('x'), fileName: 'sample.pdf', mimeType: 'application/pdf' });
  expect(result).toEqual(expect.objectContaining({ id: expect.any(String), type: 'Synthetic document', title: 'Synthetic POC Upload Fixture', pages: 2 }));
  expect(result.summary).toEqual(expect.objectContaining({ simple: expect.any(String), standard: expect.any(String), detailed: expect.any(String) }));
  expect(Array.isArray(result.keyInfo)).toBe(true);
  expect(Array.isArray(result.actions)).toBe(true);
});

test('rejects empty extraction instead of reporting completion', async () => {
  const processor = new DocumentProcessor({
    extractor: { extract: async () => ({ text: '   ' }) },
    simplifier: fixtureSimplifier,
  });
  await expect(processor.process({ buffer: Buffer.from('x'), fileName: 'empty.pdf', mimeType: 'application/pdf' })).rejects.toMatchObject({ code: 'EMPTY_EXTRACTION' });
});
