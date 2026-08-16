const fixtureExtractor = {
  async extract({ fileName }) {
    return {
      type: 'Insurance',
      title: 'Medicare Advantage Renewal Letter',
      pages: 2,
      text: `Fixture extraction for ${fileName}`,
      keyInfo: [{ type: 'date', label: 'Decision Deadline', value: 'October 15, 2026', page: 1 }],
      actions: [{ id: 'poc-act-001', description: 'Review your current plan details', deadline: '2026-10-10', priority: 'high', steps: ['Open the letter', 'Compare current doctors'] }],
    };
  },
};
module.exports = fixtureExtractor;
