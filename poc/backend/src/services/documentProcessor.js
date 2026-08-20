const crypto = require('crypto');
const { deriveGeragogicalFacts } = require('./geragogicalExtractor');
const { fingerprint } = require('./configFingerprint');

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
    const language = extracted.language || 'en';
    const summaries = await this.simplifier.simplify(fullText, { language, domain: extracted.domain || 'general' });
    const configuration = fingerprint({ algorithmVersion: this.simplifier.version || 'baseline-poc', processingMode: this.extractor.version || 'fixture', language });
    const derived = deriveGeragogicalFacts({ text: fullText, pageText: extracted.pageText, fileName });
    const keyInfo = extracted.keyInfo?.length ? extracted.keyInfo : derived.keyInfo;
    const actions = extracted.actions?.length ? extracted.actions : derived.actions;
    const orientation = extracted.orientation || (keyInfo.length || actions.length
      ? { title: extracted.title || fileName, whyItMatters: 'This document contains information or actions that may affect you.' }
      : derived.orientation);
    return {
      id: `poc-${crypto.randomUUID()}`,
      type: extracted.type || 'Unknown',
      title: extracted.title || fileName,
      fileName,
      pages: extracted.pages || extracted.pageText?.length || 1,
      originalText: fullText,
      fullText,
      language,
      layoutClass: extracted.layoutClass || 'unknown',
      extractionConfidence: extracted.extractionConfidence ?? 1,
      pageText: extracted.pageText || [{ page: 1, text: fullText }],
      sourceReferences: extracted.sourceReferences || [],
      summary: summaries,
      orientation,
      keyInfo,
      actions,
      reviewFlags: extracted.reviewFlags || derived.reviewFlags,
      processingStatus: 'complete',
      configuration,
    };
  }
}
module.exports = DocumentProcessor;
