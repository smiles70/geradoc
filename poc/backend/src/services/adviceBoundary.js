const IMPERATIVE = /^(you should|you must|you need to|call |contact |pay |file |dispute |choose |sign |send )/i;
const SOURCE_GROUNDED = /\b(?:the document|the notice|the letter|the statement)\b|\bmay\b|\bmust\b|\bshall\b|\bdeadline\b|\bdue\b/i;

function classifySentence(sentence, sourceText = '') {
  const text = String(sentence || '').trim();
  const source = String(sourceText || '').toLowerCase();
  const adviceLike = IMPERATIVE.test(text) && !source.includes(text.toLowerCase());
  if (!adviceLike) return { label: 'source-grounded', confidence: 0.95, review: false };
  if (SOURCE_GROUNDED.test(text) && source.includes(text.toLowerCase())) {
    return { label: 'source-grounded', confidence: 0.85, review: false };
  }
  return { label: 'advice-like', confidence: 0.8, review: false };
}

function validateAdvice(text, sourceText) {
  const sentences = String(text || '').split(/(?<=[.!?])\s+/).filter(Boolean);
  const classifications = sentences.map(sentence => classifySentence(sentence, sourceText));
  const violations = classifications.filter(item => item.label === 'advice-like').length;
  return { violations, classifications, pass: violations === 0 };
}

module.exports = { classifySentence, validateAdvice };
