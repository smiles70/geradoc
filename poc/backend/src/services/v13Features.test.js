const { demand, presentationLoad, readabilityGap } = require('./demandFunction');
const candidate = require('./apucsSimplifierV1');

describe('APUCS v1.3 features', () => {
  it('computes demand and load as separate values', () => {
    const result = demand('The deadline is October 15, 2027.', { domain: 'insurance' });
    expect(result.value).toBeGreaterThan(0);
    expect(result.calibrated).toBe(false);
    expect(presentationLoad({ contentUnits: 2, simultaneousActions: 1 })).toBe(3);
    expect(readabilityGap('The deadline is October 15, 2027.', 0.5).gap).toBeGreaterThanOrEqual(0);
  });

  it('honors a valid user level override when hard constraints pass', async () => {
    const result = await candidate.simplify('Review the plan by October 15, 2027.', { userOverrideLevel: 'DETAILED' });
    expect(result.metadata.presentationState).toBe('DETAILED');
    expect(result.metadata.overrideHonored).toBe(true);
  });

  it('routes an override to REVIEW when hard constraints fail', async () => {
    const result = await candidate.simplify('Review the plan by October 15, 2027.', {
      protectedAnchors: [{ type: 'DATE', value: 'December 1, 2027' }],
      userOverrideLevel: 'DETAILED',
    });
    expect(result.metadata.presentationState).toBe('REVIEW');
    expect(result.metadata.overrideHonored).toBe(false);
  });
});
