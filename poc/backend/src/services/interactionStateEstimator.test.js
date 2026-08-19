const { InteractionStateEstimator } = require('./interactionStateEstimator');

describe('InteractionStateEstimator', () => {
  it('keeps state dimensions bounded and reports uncertainty', () => {
    const estimator = new InteractionStateEstimator();
    const result = estimator.update({ comprehension: 1, efficacy: 0.8, strain: 0.8, load: 0.7, progress: 0.4 });
    expect(result.state.comprehension).toBeGreaterThan(0.2);
    expect(result.state.efficacy).toBeGreaterThan(0.2);
    expect(result.state.strain).toBeLessThan(1);
    expect(result.variance.uncertainty).toBeGreaterThan(0);
    expect(result.capability).toBeGreaterThanOrEqual(0);
    expect(result.stability).toBeGreaterThan(0);
    expect(result.stability).toBeLessThanOrEqual(1);
  });

  it('caps a single efficacy adjustment', () => {
    const estimator = new InteractionStateEstimator({ windowSize: 1, gapThreshold: 0, maxEfficacyAdjustment: 0.05 });
    const before = estimator.state.efficacy;
    const result = estimator.update({ selfReportedEfficacy: 0, demonstratedSuccessRate: 1 });
    expect(Math.abs(result.adjustmentLog[0].delta)).toBeLessThanOrEqual(0.05);
    expect(result.state.efficacy - before).toBeLessThanOrEqual(0.05);
  });

  it('bias-corrects repeated self-report underestimation toward demonstrated success', () => {
    const estimator = new InteractionStateEstimator({ windowSize: 2, gapThreshold: 0.2 });
    estimator.update({ selfReportedEfficacy: 0.1, demonstratedSuccessRate: 0.9 });
    const result = estimator.update({ selfReportedEfficacy: 0.1, demonstratedSuccessRate: 0.9 });
    expect(result.adjustmentLog.length).toBe(1);
    expect(result.state.efficacy).toBeGreaterThan(0.2);
  });
});
