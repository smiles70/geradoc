const DIMENSIONS = ['comprehension', 'strain', 'load', 'progress', 'uncertainty'];

function clamp(value) {
  return Math.max(0, Math.min(1, Number(value) || 0));
}

class InteractionStateEstimator {
  constructor({ decay = 0.9, processNoise = 0.01 } = {}) {
    this.decay = decay;
    this.processNoise = processNoise;
    this.state = Object.fromEntries(DIMENSIONS.map(name => [name, 0.2]));
    this.variance = Object.fromEntries(DIMENSIONS.map(name => [name, 0.1]));
  }

  update(observation = {}) {
    for (const dimension of DIMENSIONS) {
      const observed = observation[dimension];
      const predicted = this.decay * this.state[dimension];
      this.state[dimension] = observed === undefined
        ? predicted
        : clamp(predicted + (1 - this.decay) * clamp(observed));
      this.variance[dimension] = this.decay * this.variance[dimension] + this.processNoise;
    }
    return this.snapshot();
  }

  stability() {
    const uncertainty = DIMENSIONS.reduce((sum, dimension) => sum + this.variance[dimension], 0);
    const strainPenalty = this.state.strain;
    return Math.exp(-uncertainty) * Math.exp(-strainPenalty);
  }

  snapshot() {
    return {
      state: { ...this.state },
      variance: { ...this.variance },
      stability: Number(this.stability().toFixed(6)),
      dimensions: [...DIMENSIONS],
    };
  }
}

module.exports = { DIMENSIONS, InteractionStateEstimator };
