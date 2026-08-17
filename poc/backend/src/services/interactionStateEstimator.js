const DIMENSIONS = ['comprehension', 'strain', 'load', 'progress', 'uncertainty'];

function clamp(value) {
  return Math.max(0, Math.min(1, Number(value) || 0));
}

function diagonal(values, fallback = 0.1) {
  return Object.fromEntries(DIMENSIONS.map(name => [name, Number(values?.[name] ?? fallback)]));
}

class InteractionStateEstimator {
  constructor({ decay = 0.9, processNoise = 0.01, aleatoricDecay = 0.8 } = {}) {
    this.decay = decay;
    this.processNoise = processNoise;
    this.aleatoricDecay = aleatoricDecay;
    this.state = Object.fromEntries(DIMENSIONS.map(name => [name, 0.2]));
    this.epistemicVariance = diagonal({}, 0.1);
    this.aleatoricVariance = diagonal({}, 0);
  }

  update(observation = {}) {
    const predicted = {};
    for (const dimension of DIMENSIONS) {
      predicted[dimension] = this.decay * this.state[dimension] + (1 - this.decay) * 0.2;
      this.epistemicVariance[dimension] = this.decay * this.epistemicVariance[dimension] + this.processNoise;
    }

    const innovation = {};
    for (const dimension of DIMENSIONS) {
      const observed = observation[dimension];
      innovation[dimension] = observed === undefined ? 0 : clamp(observed) - predicted[dimension];
      if (observed !== undefined) {
        this.state[dimension] = clamp(predicted[dimension] + (1 - this.decay) * innovation[dimension]);
        const squaredInnovation = innovation[dimension] ** 2;
        this.aleatoricVariance[dimension] = this.aleatoricDecay * this.aleatoricVariance[dimension]
          + (1 - this.aleatoricDecay) * squaredInnovation;
      } else {
        this.state[dimension] = predicted[dimension];
      }
    }
    return this.snapshot(innovation);
  }

  stability() {
    const uncertainty = DIMENSIONS.reduce((sum, dimension) => sum + this.totalVariance()[dimension], 0);
    return Math.exp(-uncertainty) * Math.exp(-this.state.strain);
  }

  totalVariance() {
    return Object.fromEntries(DIMENSIONS.map(name => [
      name,
      Math.max(0, this.epistemicVariance[name] + this.aleatoricVariance[name]),
    ]));
  }

  snapshot(innovation = {}) {
    return {
      state: { ...this.state },
      epistemicVariance: { ...this.epistemicVariance },
      aleatoricVariance: { ...this.aleatoricVariance },
      variance: this.totalVariance(),
      innovation: { ...innovation },
      stability: Number(this.stability().toFixed(6)),
      dimensions: [...DIMENSIONS],
    };
  }
}

module.exports = { DIMENSIONS, InteractionStateEstimator };
