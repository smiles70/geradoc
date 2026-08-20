const crypto = require('crypto');

const budgetProfile = {
  id: 'v9.51-rgc-poc-v1',
  floorTokens: 400000,
  ceilingTokens: 805000,
  contingencyTokens: 966000,
  hardStopTokens: 1000000,
};

function complexityProfile({ text = '', risk = 'low', protectedAnchorCount = 0, actionCount = 0 } = {}) {
  const words = String(text).trim().split(/\s+/).filter(Boolean).length;
  const complexity = Math.min(1, (words / 2000) + (protectedAnchorCount / 20) + (actionCount / 10));
  return { complexity: Number(complexity.toFixed(4)), risk, protectedAnchorCount, actionCount, words };
}

function routeModel(profile) {
  if (profile.risk === 'high' || profile.complexity > 0.7) return { modelId: 'strong-model-v1', reason: 'risk-or-complexity' };
  if (profile.complexity <= 0.3 && profile.risk === 'low') return { modelId: 'local-small-v1', reason: 'low-complexity-low-risk' };
  return { modelId: 'baseline-poc-v1', reason: 'safe-baseline' };
}

function costEvent({ requestId, modelId, inputTokens = 0, outputTokens = 0, epicId = null }) {
  const totalTokens = inputTokens + outputTokens;
  const idempotencyKey = crypto.createHash('sha256').update(`${requestId}|${modelId}|${inputTokens}|${outputTokens}`).digest('hex');
  return { eventId: `cost-${idempotencyKey.slice(0, 16)}`, idempotencyKey, requestId, modelId, inputTokens, outputTokens, totalTokens, epicId, budgetProfileVersion: budgetProfile.id };
}

module.exports = { budgetProfile, complexityProfile, routeModel, costEvent };
