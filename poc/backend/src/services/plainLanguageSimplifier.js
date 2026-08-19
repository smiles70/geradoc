const TRANSFORMS = [
  [/\bshall\b/gi, 'must'],
  [/\butilize\b/gi, 'use'],
  [/\bapproximately\b/gi, 'about'],
  [/\bin the event that\b/gi, 'if'],
  [/\bprior to\b/gi, 'before'],
  [/\bsubsequent to\b/gi, 'after'],
  [/\bterminate\b/gi, 'end'],
  [/\bcommence\b/gi, 'start'],
];

function normalize(text) {
  return String(text || '').replace(/\s+/g, ' ').trim();
}

function simplify(text) {
  return TRANSFORMS.reduce((result, [pattern, replacement]) => result.replace(pattern, replacement), normalize(text));
}

function sentenceBreaks(text) {
  return simplify(text).split(/(?<=[.!?])\s+/).filter(Boolean).join('\n\n');
}

const plainLanguageSimplifier = {
  async simplify(text) {
    const source = String(text || '').trim();
    return {
      simple: sentenceBreaks(source),
      standard: simplify(source),
      detailed: source,
    };
  },
};

module.exports = plainLanguageSimplifier;
