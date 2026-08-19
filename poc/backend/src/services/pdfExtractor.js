const { PDFParse } = require('pdf-parse');

const pdfExtractor = {
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
        fullText: result.text,
        pageText: pages,
        sourceReferences: pages.map(page => ({ page: page.page, label: `Page ${page.page}` })),
        keyInfo: [],
        actions: [],
      };
    } finally {
      await parser.destroy();
    }
  },
};
module.exports = pdfExtractor;
