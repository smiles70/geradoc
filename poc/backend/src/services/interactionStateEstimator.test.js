const { InteractionStateEstimator } = require('./interactionStateEstimator');

describe('InteractionStateEstimator', () => {
  it('keeps state dimensions bounded and reports uncertainty', () => {
    const estimator = new InteractionStateEstimator();
    const result = estimator.update({ comprehension: 1, strain: 0.8, load: 0.7, progress: 0.4 });
    expect(result.state.comprehension).toBeGreaterThan(0.2);
    expect(result.state.strain).toBeLessThan(1);
    expect(result.variance.uncertainty).toBeGreaterThan(0);
    expect(result.stability).toBeGreaterThan(0);
    expect(result.stability).toBeLessThanOrEqual(1);
  });
});
