const { budgetProfile, complexityProfile, routeModel, costEvent } = require('./tokenomics');
const ledger = require('./tokenLedger');

test('routes low and high risk work inside v9.51 policy', () => {
  expect(routeModel(complexityProfile({ text: 'short text' })).modelId).toBe('local-small-v1');
  expect(routeModel({ complexity: 0.9, risk: 'high' }).modelId).toBe('strong-model-v1');
  expect(budgetProfile.hardStopTokens).toBeGreaterThan(budgetProfile.ceilingTokens);
});

test('cost events are deterministic and ledger records are idempotent', async () => {
  const event = costEvent({ requestId: `test-request-${Date.now()}-${Math.random()}`, modelId: 'baseline-poc-v1', inputTokens: 10, outputTokens: 5, epicId: 'TEST' });
  const first = await ledger.record(event);
  const second = await ledger.record(event);
  expect(first.replay).toBe(false);
  expect(second.replay).toBe(true);
  const totals = await ledger.totals();
  expect(totals.totalTokens).toBeGreaterThanOrEqual(15);
});
