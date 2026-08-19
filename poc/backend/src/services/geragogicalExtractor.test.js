const { deriveGeragogicalFacts } = require('./geragogicalExtractor');

test('derives senior-oriented key information and actions with page references', () => {
  const result = deriveGeragogicalFacts({
    fileName: 'notice.pdf',
    text: 'You must pay $240 by October 15, 2027. Call the office if you need help.',
    pageText: [{ page: 1, text: 'You must pay $240 by October 15, 2027. Call the office if you need help.' }],
  });
  expect(result.orientation.whyItMatters).toContain('contains');
  expect(result.keyInfo).toEqual(expect.arrayContaining([
    expect.objectContaining({ type: 'amount', value: '$240', page: 1 }),
    expect.objectContaining({ type: 'date', value: 'October 15, 2027', page: 1 }),
  ]));
  expect(result.actions).toEqual(expect.arrayContaining([
    expect.objectContaining({ priority: 'high', page: 1 }),
  ]));
});
