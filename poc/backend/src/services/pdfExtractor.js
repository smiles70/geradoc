const pdfParse = require('pdf-parse');

const pdfExtractor = {
  async extract({ buffer, fileName }) {
    const result = await pdfParse(buffer);
    return {
      type: 'Unknown',
      title: fileName,
      pages: result.numpages || 1,
      text: result.text,
      keyInfo: [],
      actions: [],
    };
  },
};
module.exports = pdfExtractor;
