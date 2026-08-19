const GLOSSARY_VERSION = 'poc-en-v1';

const approvedPairs = [
  { source: 'shall', replacement: 'must', partOfSpeech: 'modal', domain: 'general' },
  { source: 'utilize', replacement: 'use', partOfSpeech: 'verb', domain: 'general' },
  { source: 'approximately', replacement: 'about', partOfSpeech: 'adverb', domain: 'general' },
  { source: 'prior to', replacement: 'before', partOfSpeech: 'preposition', domain: 'general' },
  { source: 'subsequent to', replacement: 'after', partOfSpeech: 'preposition', domain: 'general' },
  { source: 'commence', replacement: 'start', partOfSpeech: 'verb', domain: 'general' },
  { source: 'terminate', replacement: 'end', partOfSpeech: 'verb', domain: 'general' },
  { source: 'in the event that', replacement: 'if', partOfSpeech: 'conjunction', domain: 'general' },
];

const protectedPatterns = [
  /\b\d[\d,]*(?:\.\d+)?\b/g,
  /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\b/gi,
  /\b[A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+)*\b/g,
];

function canonicalizePair(pair) {
  return `${pair.source.toLowerCase()}→${pair.replacement.toLowerCase()}`;
}

function glossaryPairs() {
  return new Map(approvedPairs.map(pair => [pair.source, pair]));
}

function thesaurusAgrees(source, replacement) {
  return approvedPairs.some(pair => pair.source === source && pair.replacement === replacement);
}

function isProtectedSpan(value) {
  return protectedPatterns.some(pattern => {
    pattern.lastIndex = 0;
    return pattern.test(value);
  });
}

function validateSynonymPair(pair) {
  return Boolean(
    pair
      && pair.source !== pair.replacement
      && pair.partOfSpeech
      && pair.domain
      && glossaryPairs().has(pair.source)
      && thesaurusAgrees(pair.source, pair.replacement)
      && !isProtectedSpan(pair.source)
      && !isProtectedSpan(pair.replacement),
  );
}

function applyApprovedSynonyms(text) {
  let result = String(text || '');
  const applied = [];
  for (const pair of approvedPairs) {
    if (!validateSynonymPair(pair)) continue;
    const pattern = new RegExp(`\\b${pair.source.replace(/ /g, '\\s+')}\\b`, 'gi');
    if (pattern.test(result)) {
      result = result.replace(pattern, pair.replacement);
      applied.push({ ...pair, key: canonicalizePair(pair) });
    }
  }
  return { text: result, applied, glossaryVersion: GLOSSARY_VERSION };
}

function isIdempotent(text) {
  return applyApprovedSynonyms(applyApprovedSynonyms(text).text).text === applyApprovedSynonyms(text).text;
}

module.exports = { GLOSSARY_VERSION, applyApprovedSynonyms, isIdempotent, validateSynonymPair };
