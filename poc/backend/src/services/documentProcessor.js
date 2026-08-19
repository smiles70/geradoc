class DocumentProcessor {
  constructor({ extractor, simplifier }) {
    this.extractor = extractor;
    this.simplifier = simplifier;
  }

  async process({ buffer, fileName, mimeType }) {
    const extracted = await this.extractor.extract({ buffer, fileName, mimeType });
    const fullText = extracted.fullText || extracted.text || '';
    if (!fullText.trim()) {
      const error = new Error('We could not find readable text in this document.');
      error.code = 'EMPTY_EXTRACTION';
      throw error;
    }
    const summaries = await this.simplifier.simplify(fullText);
    return {
      id: `poc-${Date.now()}`,
      type: extracted.type || 'Unknown',
      title: extracted.title || fileName,
      fileName,
      pages: extracted.pages || extracted.pageText?.length || 1,
      originalText: fullText,
      fullText,
      language: extracted.language || 'en',
      layoutClass: extracted.layoutClass || 'unknown',
      extractionConfidence: extracted.extractionConfidence ?? 1,
      pageText: extracted.pageText || [{ page: 1, text: fullText }],
      sourceReferences: extracted.sourceReferences || [],
      summary: summaries,
      keyInfo: extracted.keyInfo || [],
      actions: extracted.actions || [],
      processingStatus: 'complete',
    };
  }
}
module.exports = DocumentProcessor;
