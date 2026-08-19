class DocumentProcessor {
  constructor({ extractor, simplifier }) {
    this.extractor = extractor;
    this.simplifier = simplifier;
  }

  async process({ buffer, fileName, mimeType }) {
    const extracted = await this.extractor.extract({ buffer, fileName, mimeType });
    const summaries = await this.simplifier.simplify(extracted.text);
    return {
      id: `poc-${Date.now()}`,
      type: extracted.type || 'Unknown',
      title: extracted.title || fileName,
      fileName,
      pages: extracted.pages || 1,
      summary: summaries,
      keyInfo: extracted.keyInfo || [],
      actions: extracted.actions || [],
    };
  }
}
module.exports = DocumentProcessor;
