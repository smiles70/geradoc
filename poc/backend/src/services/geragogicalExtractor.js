const MONTHS = '(?:January|February|March|April|May|June|July|August|September|October|November|December)';
const DATE_PATTERN = new RegExp(`\\b${MONTHS}\\s+\\d{1,2},?\\s+\\d{4}\\b|\\b\\d{1,2}\\s+${MONTHS}\\s+\\d{4}\\b`, 'gi');
const AMOUNT_PATTERN = /\$\s?\d[\d,]*(?:\.\d{2})?/g;
const ACTION_PATTERN = /\b(?:must|need to|required to|should|due|submit|call|pay|review|complete|respond|contact)\b/i;

function pageForText(text, pages, index) {
  const page = pages.find(item => item.text && item.text.includes(text));
  return page?.page || pages[index]?.page || 1;
}

function deriveGeragogicalFacts({ text = '', pageText = [], fileName = '' }) {
  const source = String(text || '').replace(/\s+/g, ' ').trim();
  const pages = pageText.length ? pageText : [{ page: 1, text: source }];
  const dates = [...source.matchAll(DATE_PATTERN)].map(match => match[0]);
  const amounts = [...source.matchAll(AMOUNT_PATTERN)].map(match => match[0]);
  const sentences = source.split(/(?<=[.!?])\s+/).filter(Boolean);
  const actionSentences = sentences.filter(sentence => ACTION_PATTERN.test(sentence));
  const keyInfo = [
    ...dates.map((value, index) => ({ type: 'date', label: 'Important date', value, page: pageForText(value, pages, index) })),
    ...amounts.map((value, index) => ({ type: 'amount', label: 'Amount mentioned', value, page: pageForText(value, pages, index) })),
  ];
  const actions = actionSentences.map((description, index) => ({
    id: `derived-action-${index + 1}`,
    description,
    priority: /\b(must|required|due|respond)\b/i.test(description) ? 'high' : 'medium',
    steps: [description],
    page: pageForText(description, pages, index),
  }));
  return {
    orientation: {
      title: fileName,
      whyItMatters: keyInfo.length || actions.length
        ? 'This document contains information or actions that may affect you.'
        : 'We could not identify the important parts safely yet.',
    },
    keyInfo,
    actions,
    reviewFlags: source ? [] : ['no-readable-text'],
  };
}

module.exports = { deriveGeragogicalFacts };
