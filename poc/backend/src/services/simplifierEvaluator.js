const DATE_PATTERN = /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}\b/g;
const AMOUNT_PATTERN = /\$\s?\d[\d,]*(?:\.\d{2})?/g;
const NEGATION_PATTERN = /\b(?:not|no|never|cannot|can't|do not|does not|doesn't|only when)\b/gi;

function normalize(text) {
  return String(text || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

function unique(values) {
  return [...new Set(values.map(normalize).filter(Boolean))];
}

function extractProtectedAnchors(text) {
  const source = String(text || '');
  return unique([
    ...(source.match(DATE_PATTERN) || []),
    ...(source.match(AMOUNT_PATTERN) || []),
    ...(source.match(NEGATION_PATTERN) || []),
  ]);
}

function anchorRecall(sourceText, candidateText) {
  const source = extractProtectedAnchors(sourceText);
  const candidate = normalize(candidateText);
  if (source.length === 0) return 1;
  return source.filter(anchor => candidate.includes(anchor)).length / source.length;
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

function evaluateCandidate(sourceText, candidateText) {
  return {
    anchorRecall: Number(anchorRecall(sourceText, candidateText).toFixed(4)),
    jsDivergence: Number(jsDivergence(sourceText, candidateText).toFixed(6)),
    readability: readability(candidateText),
    provenanceCoverage: 'not_available',
    shadowOnly: true,
  };
}

module.exports = {
  extractProtectedAnchors,
  anchorRecall,
  jsDivergence,
  readability,
  evaluateCandidate,
};
