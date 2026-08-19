const { PDFParse } = require('pdf-parse');
const { detectLanguage } = require('./languageProfiles');
const { classifyLayout } = require('./layoutClassifier');

const pdfExtractor = {
  version: 'pdf-parse-v2',
  async extract({ buffer, fileName }) {
    const parser = new PDFParse({ data: buffer });
    try {
      const result = await parser.getText();
      const pages = (result.pages || []).map(page => ({
        page: page.num,
        text: page.text,
      }));
      return {
        type: 'Unknown',
        title: fileName,
        pages: result.total || pages.length || 1,
        text: result.text,
        language: detectLanguage(result.text),
        layoutClass: classifyLayout({ text: result.text, pages }),
        extractionConfidence: result.text?.trim() ? 1 : 0,
        fullText: result.text,
        pageText: pages,
        sourceReferences: pages.map(page => ({ page: page.page, label: `Page ${page.page}` })),
        keyInfo: [],
        actions: [],
      };
    } catch (error) {
      const normalized = new Error('We could not read this PDF. Please try a different PDF or scan.');
      normalized.code = 'PDF_PARSE_ERROR';
      normalized.cause = error;
      throw normalized;
    } finally {
      await parser.destroy();
    }
  },
};
module.exports = pdfExtractor;
