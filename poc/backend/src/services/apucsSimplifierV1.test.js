const candidate = require('./apucsSimplifierV1');

describe('apucsSimplifierV1', () => {
  it('preserves protected anchors and exposes provenance in shadow mode', async () => {
    const source = 'Your Medicare Advantage plan renews on October 15, 2027. The monthly premium is $30. Do not miss the deadline.';
    const result = await candidate.simplify(source);
    expect(result.metadata.algorithm).toBe('APUCS-v1-research');
    expect(result.metadata.mode).toBe('shadow-only');
    expect(result.simple).toContain('October 15, 2027');
    expect(result.simple).toContain('$30');
    expect(result.simple).toContain('Do not');
    expect(result.metadata.provenance.simple.length).toBeGreaterThan(0);
  });

  it('falls back to source text when a level would lose an anchor', async () => {
    const source = 'Review the plan. The deadline is October 15, 2027. The amount is $30. Do not miss it. Call Member Services.';
    const result = await candidate.simplify(source);
    expect(result.simple).toBe(source);
  });
});
