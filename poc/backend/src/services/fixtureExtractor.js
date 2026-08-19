const fixtureExtractor = {
  async extract({ fileName }) {
    const text = `Fixture extraction for ${fileName}`;
    return {
      type: 'Insurance',
      title: 'Medicare Advantage Renewal Letter',
      pages: 2,
      language: 'en',
      layoutClass: 'single_column_prose',
      extractionConfidence: 1,
      text,
      fullText: text,
      pageText: [{ page: 1, text }, { page: 2, text: 'Synthetic second-page fixture content.' }],
      sourceReferences: [{ page: 1, label: 'Synthetic fixture page 1' }, { page: 2, label: 'Synthetic fixture page 2' }],
      keyInfo: [{ type: 'date', label: 'Decision Deadline', value: 'October 15, 2026', page: 1 }],
      actions: [{ id: 'poc-act-001', description: 'Review your current plan details', deadline: '2026-10-10', priority: 'high', steps: ['Open the letter', 'Compare current doctors'] }],
    };
  },
};
module.exports = fixtureExtractor;
