const simplifier = require('./plainLanguageSimplifier');

test('keeps complete content while making plain-language levels visibly distinct', async () => {
  const result = await simplifier.simplify('The provider shall utilize the form prior to commencement. The total is $10.');
  expect(result.detailed).toContain('shall utilize');
  expect(result.standard).toContain('must use');
  expect(result.simple).toContain('must use');
  expect(result.simple).toContain('$10');
  expect(result.simple).toContain('\n\n');
});
