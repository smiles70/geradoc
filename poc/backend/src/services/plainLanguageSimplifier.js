const { applyApprovedSynonyms } = require('./synonymityRubric');

function normalize(text) {
  return String(text || '').replace(/\s+/g, ' ').trim();
}

function sentenceBreaks(text) {
  return text.split(/(?<=[.!?])\s+/).filter(Boolean).join('\n\n');
}

const plainLanguageSimplifier = {
  async simplify(text, { language = 'en', domain = 'general' } = {}) {
    const source = String(text || '').trim();
    const transformed = applyApprovedSynonyms(source, { language, domain }).text;
    return {
      simple: sentenceBreaks(transformed),
      standard: normalize(transformed),
      detailed: source,
    };
  },
};

module.exports = plainLanguageSimplifier;
