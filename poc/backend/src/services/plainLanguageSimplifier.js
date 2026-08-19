function normalize(text) {
  return String(text || '').replace(/\s+/g, ' ').trim();
}

const plainLanguageSimplifier = {
  async simplify(text) {
    const fullText = normalize(text);
    return {
      simple: fullText,
      standard: fullText,
      detailed: fullText,
    };
  },
};

module.exports = plainLanguageSimplifier;
