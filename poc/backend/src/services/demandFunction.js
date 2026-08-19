const DEFAULT_COMMON_WORDS = new Set('the a an and or if when do not your you are is to of for on in with this that may must will plan amount date due contact review keep current'.split(' '));

function words(text) {
  return String(text || '').toLowerCase().match(/[a-z]+/g) || [];
}

function sentences(text) {
  return String(text || '').split(/[.!?]+/).filter(Boolean);
}

function frequencyPenalty(text, commonWords = DEFAULT_COMMON_WORDS) {
  const tokens = words(text);
  if (!tokens.length) return 0;
  return tokens.filter(token => !commonWords.has(token)).length / tokens.length;
}

function surprisal(text, probabilityMap = {}) {
  const tokens = words(text);
  if (!tokens.length) return 0;
  return tokens.reduce((sum, token) => sum + -Math.log2(probabilityMap[token] || 0.01), 0) / tokens.length;
}

function lengthPenalty(text) {
  const groups = sentences(text);
  if (!groups.length) return 0;
  return Math.min(1, groups.reduce((sum, sentence) => sum + words(sentence).length, 0) / groups.length / 30);
}

function embedPenalty(text) {
  const matches = String(text || '').match(/\b(?:which|that|because|although|unless|when|if)\b/gi) || [];
  return Math.min(1, matches.length / 4);
}

function referenceDistancePenalty(text) {
  const tokens = words(text);
  const pronouns = new Set(['it', 'this', 'that', 'they', 'them', 'he', 'she']);
  let lastNoun = -1;
  let total = 0;
  let count = 0;
  tokens.forEach((token, index) => {
    if (token.length > 4 && !pronouns.has(token)) lastNoun = index;
    if (pronouns.has(token) && lastNoun >= 0) {
      total += index - lastNoun;
      count += 1;
    }
  });
  return Math.min(1, count ? total / count / 20 : 0);
}

function genrePenalty(domain) {
  return ['insurance', 'financial', 'government', 'legal', 'medical'].includes(String(domain || '').toLowerCase()) ? 0.2 : 0;
}

function demand(text, { domain, weights = {}, probabilityMap, calibrated = false } = {}) {
  const terms = {
    frequency: frequencyPenalty(text),
    surprisal: surprisal(text, probabilityMap),
    length: lengthPenalty(text),
    embedding: embedPenalty(text),
    referenceDistance: referenceDistancePenalty(text),
    genre: genrePenalty(domain),
  };
  const w = { frequency: 1, surprisal: 1, length: 1, embedding: 1, referenceDistance: 1, genre: 1, ...weights };
  const total = Object.keys(terms).reduce((sum, key) => sum + w[key] * terms[key], 0);
  return { value: Number(total.toFixed(6)), terms, weights: w, calibrated, calibrationRequired: !calibrated };
}

function presentationLoad({ contentUnits = 0, simultaneousActions = 0, weights = { content: 1, actions: 1 } } = {}) {
  return Number((weights.content * contentUnits + weights.actions * simultaneousActions).toFixed(6));
}

function readabilityGap(text, capability, options = {}) {
  const result = demand(text, options);
  return { ...result, capability, gap: Math.max(0, Number((result.value - capability).toFixed(6))) };
}

module.exports = { demand, presentationLoad, readabilityGap };
