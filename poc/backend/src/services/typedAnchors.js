const DATE_PATTERN = /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}\b/g;
const AMOUNT_PATTERN = /\$\s?\d[\d,]*(?:\.\d{2})?/g;
const NEGATION_PATTERN = /\b(?:not|no|never|cannot|can't|do not|does not|doesn't)\b/gi;
const CONDITION_PATTERN = /\b(?:if|unless|only when|provided that|when)\b[^.!?]*/gi;
const OBLIGATION_PATTERN = /\b(?:must|shall|required to|need to|may)\b[^.!?]*/gi;

function normalizeText(value) {
  return String(value || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

function canonicalize(type, value) {
  const normalized = normalizeText(value);
  if (['AMOUNT', 'PERCENTAGE'].includes(type)) return normalized.replace(/[$,%\s,]/g, '');
  if (type === 'DATE' || type === 'DEADLINE') {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? normalized : date.toISOString().slice(0, 10);
  }
  return normalized.replace(/[\s.,]+$/g, '');
}

function anchor(type, value, sourceSpan = null, confidence = 0.5, extractorId = 'rule-based') {
  return { type, value, canonicalValue: canonicalize(type, value), confidence, sourceSpan, extractorId };
}

function extractAnchors(text) {
  const source = String(text || '');
  const anchors = [];
  for (const value of source.match(DATE_PATTERN) || []) anchors.push(anchor('DATE', value));
  for (const value of source.match(AMOUNT_PATTERN) || []) anchors.push(anchor('AMOUNT', value));
  for (const value of source.match(NEGATION_PATTERN) || []) anchors.push(anchor('NEGATION', value));
  for (const value of source.match(CONDITION_PATTERN) || []) anchors.push(anchor('CONDITION', value));
  for (const value of source.match(OBLIGATION_PATTERN) || []) anchors.push(anchor('OBLIGATION', value));
  return anchors;
}

function reconcile(fieldGuided = [], documentGuided = []) {
  const all = [...fieldGuided, ...documentGuided];
  const groups = new Map();
  for (const item of all) {
    const key = `${item.type}:${item.canonicalValue}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  return [...groups.values()].map(matches => {
    const [first] = matches;
    const sameType = all.filter(item => item.type === first.type);
    const conflicting = sameType.some(item => item.canonicalValue !== first.canonicalValue);
    const bothPasses = matches.some(item => item.extractorId === 'field-guided')
      && matches.some(item => item.extractorId === 'document-guided');
    return {
      ...first,
      confidence: conflicting ? 0.2 : bothPasses ? 0.95 : 0.65,
      reviewFlag: conflicting ? 'anchor-disagreement' : bothPasses ? null : 'single-pass',
    };
  });
}

function anchorRecall(sourceAnchors, candidateText) {
  const candidate = normalizeText(candidateText);
  if (!sourceAnchors.length) return 1;
  return sourceAnchors.filter(item => candidate.includes(item.canonicalValue)
    || candidate.includes(normalizeText(item.value))).length / sourceAnchors.length;
}

module.exports = { canonicalize, extractAnchors, reconcile, anchorRecall };
