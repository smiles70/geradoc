const DATE_PATTERN = /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}\b/g;
const AMOUNT_PATTERN = /\$\s?\d[\d,]*(?:\.\d{2})?/g;
const NEGATION_PATTERN = /\b(?:not|no|never|cannot|can't|do not|does not|doesn't|only when)\b/gi;

function normalize(text) {
  return String(text || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

function unique(values) {
  return [...new Set(values.map(normalize).filter(Boolean))];
}

function extractProtectedAnchors(text, expectedAnchors = []) {
  const source = String(text || '');
  if (expectedAnchors.length > 0) return unique(expectedAnchors.map(anchor => anchor.value || anchor));
  return unique([
    ...(source.match(DATE_PATTERN) || []),
    ...(source.match(AMOUNT_PATTERN) || []),
    ...(source.match(NEGATION_PATTERN) || []),
  ]);
}

function anchorRecall(sourceText, candidateText, expectedAnchors = []) {
  const source = extractProtectedAnchors(sourceText, expectedAnchors);
  const candidate = normalize(candidateText);
  if (source.length === 0) return 1;
  return source.filter(anchor => candidate.includes(anchor)).length / source.length;
}

function contentWords(text) {
  return unique(String(text || '').match(/[a-z]{3,}/gi) || []);
}

function actionRecall(requiredActions = [], candidateText) {
  if (requiredActions.length === 0) return 1;
  const candidate = normalize(candidateText);
  const scores = requiredActions.map(action => {
    const words = contentWords(action);
    if (words.length === 0) return 1;
    return words.filter(word => candidate.includes(word)).length / words.length;
  });
  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

function tokenize(text) {
  return normalize(text).match(/[a-z0-9$]+/g) || [];
}

function distribution(tokens) {
  const counts = new Map();
  tokens.forEach(token => counts.set(token, (counts.get(token) || 0) + 1));
  const total = tokens.length || 1;
  return new Map([...counts].map(([token, count]) => [token, count / total]));
}

function jsDivergence(sourceText, candidateText, smoothing = 1e-9) {
  const source = distribution(tokenize(sourceText));
  const candidate = distribution(tokenize(candidateText));
  const vocabulary = new Set([...source.keys(), ...candidate.keys()]);
  let left = 0;
  let right = 0;
  for (const token of vocabulary) {
    const p = (source.get(token) || 0) + smoothing;
    const q = (candidate.get(token) || 0) + smoothing;
    const m = (p + q) / 2;
    left += 0.5 * p * Math.log2(p / m);
    right += 0.5 * q * Math.log2(q / m);
  }
  return left + right;
}

function countSyllables(word) {
  const normalized = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!normalized) return 0;
  const groups = normalized.match(/[aeiouy]+/g);
  const count = groups ? groups.length : 1;
  return Math.max(1, count - (normalized.endsWith('e') && count > 1 ? 1 : 0));
}

function readability(text) {
  const words = tokenize(text).filter(token => /[a-z]/.test(token));
  const sentences = Math.max(1, String(text || '').split(/[.!?]+/).filter(Boolean).length);
  const syllables = words.reduce((sum, word) => sum + countSyllables(word), 0);
  const wordCount = Math.max(1, words.length);
  const score = 0.39 * (wordCount / sentences) + 11.8 * (syllables / wordCount) - 15.59;
  return { words: words.length, sentences, syllables, fleschKincaidGrade: Number(score.toFixed(3)) };
}

function provenanceCoverage(provenance = []) {
  if (!Array.isArray(provenance)) return 'not_available';
  if (provenance.length === 0) return 1;
  const linked = provenance.filter(item => Array.isArray(item.sourceIndices) && item.sourceIndices.length > 0).length;
  return Number((linked / provenance.length).toFixed(4));
}

function evaluateCandidate(sourceText, candidateText, {
  protectedAnchors = [],
  requiredActions = [],
  provenance = [],
} = {}) {
  const anchors = anchorRecall(sourceText, candidateText, protectedAnchors);
  const actions = actionRecall(requiredActions, candidateText);
  return {
    anchorRecall: Number(anchors.toFixed(4)),
    actionRecall: Number(actions.toFixed(4)),
    jsDivergence: Number(jsDivergence(sourceText, candidateText).toFixed(6)),
    readability: readability(candidateText),
    provenanceCoverage: provenanceCoverage(provenance),
    contradictions: anchors < 1 ? ['protected-anchor-loss'] : [],
    shadowOnly: true,
  };
}

module.exports = {
  extractProtectedAnchors,
  anchorRecall,
  actionRecall,
  jsDivergence,
  readability,
  evaluateCandidate,
};
