const DIMENSIONS = ['comprehension', 'efficacy', 'strain', 'load', 'progress', 'uncertainty'];

function clamp(value) {
  return Math.max(0, Math.min(1, Number(value) || 0));
}

function diagonal(values, fallback = 0.1) {
  return Object.fromEntries(DIMENSIONS.map(name => [name, Number(values?.[name] ?? fallback)]));
}

class InteractionStateEstimator {
  constructor({ decay = 0.9, processNoise = 0.01, aleatoricDecay = 0.8, gapThreshold = 0.2, windowSize = 3, capabilityWeights } = {}) {
    this.decay = decay;
    this.processNoise = processNoise;
    this.aleatoricDecay = aleatoricDecay;
    this.gapThreshold = gapThreshold;
    this.windowSize = windowSize;
    this.capabilityWeights = capabilityWeights || { comprehension: 1 / 3, efficacy: 1 / 3, strain: 1 / 3 };
    this.state = Object.fromEntries(DIMENSIONS.map(name => [name, 0.2]));
    this.epistemicVariance = diagonal({}, 0.1);
    this.aleatoricVariance = diagonal({}, 0);
    this.selfReportHistory = [];
    this.successHistory = [];
    this.adjustmentLog = [];
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

    this.applyEfficacyBiasCorrection(observation);
    this.state.uncertainty = clamp(this.totalVariance().uncertainty);
    return this.snapshot(innovation);
  }

  applyEfficacyBiasCorrection(observation) {
    const selfReported = observation.selfReportedEfficacy;
    const demonstrated = observation.demonstratedSuccessRate;
    if (selfReported === undefined || demonstrated === undefined) return;
    this.selfReportHistory.push(clamp(selfReported));
    this.successHistory.push(clamp(demonstrated));
    this.selfReportHistory = this.selfReportHistory.slice(-this.windowSize);
    this.successHistory = this.successHistory.slice(-this.windowSize);
    if (this.selfReportHistory.length < this.windowSize) return;

    const report = this.selfReportHistory.reduce((sum, value) => sum + value, 0) / this.selfReportHistory.length;
    const success = this.successHistory.reduce((sum, value) => sum + value, 0) / this.successHistory.length;
    const gap = report - success;
    if (Math.abs(gap) >= this.gapThreshold) {
      this.state.efficacy = clamp((this.state.efficacy + success) / 2);
      this.adjustmentLog.push({ report, success, gap, adjustedEfficacy: this.state.efficacy });
    }
  }

  capability() {
    const { comprehension, efficacy, strain } = this.state;
    return clamp(
      this.capabilityWeights.comprehension * comprehension
      + this.capabilityWeights.efficacy * efficacy
      - this.capabilityWeights.strain * strain,
    );
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
      capability: Number(this.capability().toFixed(6)),
      stability: Number(this.stability().toFixed(6)),
      adjustmentLog: [...this.adjustmentLog],
      dimensions: [...DIMENSIONS],
    };
  }
}

module.exports = { DIMENSIONS, InteractionStateEstimator };
