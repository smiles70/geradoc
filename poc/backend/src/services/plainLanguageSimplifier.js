const plainLanguageSimplifier = {
  async simplify(text) {
    const cleaned = text.replace(/\s+/g, ' ').trim();
    return {
      simple: cleaned.slice(0, 500),
      standard: cleaned.slice(0, 1200),
      detailed: cleaned.slice(0, 2500),
    };
  },
};
module.exports = plainLanguageSimplifier;
