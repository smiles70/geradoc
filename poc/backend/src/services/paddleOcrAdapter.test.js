const { PaddleOcrAdapter } = require('./paddleOcrAdapter');

test('routes unsupported PaddleOCR configuration to REVIEW without activating OCR', async () => {
  const adapter = new PaddleOcrAdapter();
  expect(adapter.supports({ mimeType: 'application/pdf' })).toBe(true);
  const result = await adapter.extract({ fileName: 'scan.pdf' });
  expect(result.state).toBe('REVIEW');
  expect(result.provider).toBe('paddleocr');
  expect(result.reviewFlags).toContain('paddleocr-not-configured');
});

test('supports an injected benchmark runner', async () => {
  const adapter = new PaddleOcrAdapter({ runner: async () => ({ state: 'TEXT_READY', pages: [{ page: 1, text: 'ok' }] }) });
  await expect(adapter.extract({ fileName: 'scan.pdf' })).resolves.toMatchObject({ state: 'TEXT_READY' });
});
