const fixtureExtractor = {
  version: 'fixture-v1',
  async extract({ fileName }) {
    const text = `Your Medicare plan shall renew for 2026. The monthly premium will be $18. You must review your options before October 15, 2026. Contact Member Services if you need help.`;
    const secondPage = 'Your current doctors and pharmacy remain in the network. Review the plan details and compare your choices before making a decision.';
    return {
      type: 'Insurance',
      title: 'Medicare Advantage Renewal Letter',
      pages: 2,
      language: 'en',
      layoutClass: 'single_column_prose',
      extractionConfidence: 1,
      text,
      fullText: `${text} ${secondPage}`,
      pageText: [{ page: 1, text }, { page: 2, text: secondPage }],
      sourceReferences: [{ page: 1, label: 'Synthetic fixture page 1' }, { page: 2, label: 'Synthetic fixture page 2' }],
      keyInfo: [{ type: 'date', label: 'Decision Deadline', value: 'October 15, 2026', page: 1 }],
      actions: [{ id: 'poc-act-001', description: 'Review your current plan details', deadline: '2026-10-10', priority: 'high', steps: ['Open the letter', 'Compare current doctors'] }],
    };
  },
};
module.exports = fixtureExtractor;
