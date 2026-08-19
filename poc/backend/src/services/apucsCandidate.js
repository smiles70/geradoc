const replacements = [
  [/\bMedicare Advantage plan\b/g, 'Medicare plan'],
  [/\bmonthly premium\b/g, 'monthly cost'],
  [/\bproperty tax installment\b/g, 'property tax payment'],
  [/\bbecomes effective\b/g, 'starts'],
  [/\bmake healthcare decisions\b/g, 'make healthcare choices'],
];

function transform(text) {
  return replacements.reduce((result, [pattern, replacement]) => result.replace(pattern, replacement), text)
    .replace(/\s+/g, ' ')
    .trim();
}

const apucsCandidate = {
  async simplify(text) {
    const transformed = transform(text);
    const sentences = transformed.split(/(?<=[.!?])\s+/).filter(Boolean);
    return {
      simple: sentences.slice(0, 3).join(' '),
      standard: sentences.join(' '),
      detailed: text.replace(/\s+/g, ' ').trim(),
    };
  },
};

module.exports = apucsCandidate;
