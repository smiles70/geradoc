const fixtureExtractor = {
  version: 'fixture-v1',
  async extract({ fileName }) {
    const text = `Your document shall be reviewed before October 15, 2026. The amount shown is $18. You must review the information and contact the office if you need help.`;
    const secondPage = 'Review the details on this page and compare your choices before making a decision.';
    return {
      type: 'Synthetic document',
      title: 'Synthetic POC Upload Fixture',
      pages: 2,
      language: 'en',
      layoutClass: 'single_column_prose',
      extractionConfidence: 1,
      text,
      fullText: `${text} ${secondPage}`,
      pageText: [{ page: 1, text }, { page: 2, text: secondPage }],
      sourceReferences: [{ page: 1, label: 'Synthetic fixture page 1' }, { page: 2, label: 'Synthetic fixture page 2' }],
      keyInfo: [{ type: 'date', label: 'Important date', value: 'October 15, 2026', page: 1 }],
      actions: [{ id: 'poc-act-001', description: 'Review the document details', deadline: '2026-10-15', priority: 'high', steps: ['Read the document', 'Contact the office if you need help'] }],
    };
  },
};
module.exports = fixtureExtractor;
