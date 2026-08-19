const GLOSSARY_VERSION = 'poc-en-es-v1';

const GLOSSARY_PAIRS = [
  { language: 'en', source: 'shall', replacement: 'must', partOfSpeech: 'modal', domain: 'general' },
  { language: 'en', source: 'utilize', replacement: 'use', partOfSpeech: 'verb', domain: 'general' },
  { language: 'en', source: 'approximately', replacement: 'about', partOfSpeech: 'adverb', domain: 'general' },
  { language: 'en', source: 'prior to', replacement: 'before', partOfSpeech: 'preposition', domain: 'general' },
  { language: 'en', source: 'subsequent to', replacement: 'after', partOfSpeech: 'preposition', domain: 'general' },
  { language: 'en', source: 'commence', replacement: 'start', partOfSpeech: 'verb', domain: 'general' },
  { language: 'en', source: 'terminate', replacement: 'end', partOfSpeech: 'verb', domain: 'general' },
  { language: 'en', source: 'in the event that', replacement: 'if', partOfSpeech: 'conjunction', domain: 'general' },
  { language: 'es', source: 'utilizar', replacement: 'usar', partOfSpeech: 'verb', domain: 'general' },
  { language: 'es', source: 'aproximadamente', replacement: 'cerca de', partOfSpeech: 'adverb', domain: 'general' },
  { language: 'es', source: 'antes de', replacement: 'previo a', partOfSpeech: 'preposition', domain: 'general' },
];

const THESAURUS_PAIRS = new Set([
  'en|shall|must', 'en|utilize|use', 'en|approximately|about',
  'en|prior to|before', 'en|subsequent to|after', 'en|commence|start',
  'en|terminate|end', 'en|in the event that|if',
  'es|utilizar|usar', 'es|aproximadamente|cerca de', 'es|antes de|previo a',
]);

const protectedPatterns = [
  /\b\d[\d,]*(?:\.\d+)?\b/g,
  /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\b/gi,
  /\b(?:enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\b/gi,
  /\b[A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+)*\b/g,
];

function canonicalizePair(pair) {
  return `${pair.language}|${pair.source.toLowerCase()}→${pair.replacement.toLowerCase()}`;
}

function isProtectedSpan(value) {
  return protectedPatterns.some(pattern => {
    pattern.lastIndex = 0;
    return pattern.test(value);
  });
}

function thesaurusAgrees(pair) {
  return THESAURUS_PAIRS.has(`${pair.language}|${pair.source}|${pair.replacement}`);
}

function validateSynonymPair(pair) {
  return Boolean(
    pair
      && pair.source !== pair.replacement
      && pair.language
      && pair.partOfSpeech
      && pair.domain
      && GLOSSARY_PAIRS.some(item => canonicalizePair(item) === canonicalizePair(pair))
      && thesaurusAgrees(pair)
      && !isProtectedSpan(pair.source)
      && !isProtectedSpan(pair.replacement),
  );
}

function applyApprovedSynonyms(text, { language = 'en', domain = 'general' } = {}) {
  let result = String(text || '');
  const applied = [];
  const rejected = [];
  for (const pair of GLOSSARY_PAIRS.filter(item => item.language === language && item.domain === domain)) {
    if (!validateSynonymPair(pair)) {
      rejected.push({ ...pair, reason: 'rubric-failed' });
      continue;
    }
    const pattern = new RegExp(`\\b${pair.source.replace(/ /g, '\\s+')}\\b`, 'gi');
    if (pattern.test(result)) {
      result = result.replace(pattern, pair.replacement);
      applied.push({ ...pair, key: canonicalizePair(pair) });
    }
  }
  return { text: result, applied, rejected, glossaryVersion: GLOSSARY_VERSION };
}

function isIdempotent(text, options) {
  const first = applyApprovedSynonyms(text, options).text;
  return applyApprovedSynonyms(first, options).text === first;
}

module.exports = { GLOSSARY_VERSION, GLOSSARY_PAIRS, THESAURUS_PAIRS, applyApprovedSynonyms, isIdempotent, validateSynonymPair };
