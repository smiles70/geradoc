const {
  anchorRecall,
  evaluateCandidate,
  extractProtectedAnchors,
} = require('./simplifierEvaluator');

describe('simplifierEvaluator', () => {
  const source = 'Your plan renews on October 15, 2026. The premium is $18. Do not miss the deadline.';

  it('extracts protected dates, amounts, and negations', () => {
    expect(extractProtectedAnchors(source)).toEqual([
      'october 15, 2026',
      '$18',
      'do not',
    ]);
  });

  it('rejects candidates that lose protected anchors', () => {
    expect(anchorRecall(source, 'Your plan renews soon.')).toBe(0);
  });

  it('returns shadow-only evaluation metrics', () => {
    const result = evaluateCandidate(source, source);
    expect(result.anchorRecall).toBe(1);
    expect(result.shadowOnly).toBe(true);
    expect(result.provenanceCoverage).toBe('not_available');
    expect(result.readability.words).toBeGreaterThan(0);
  });
});
