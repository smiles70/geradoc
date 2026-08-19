class PaddleOcrAdapter {
  constructor({ runner = null } = {}) {
    this.runner = runner;
  }

  supports({ mimeType } = {}) {
    return mimeType === 'application/pdf' || String(mimeType || '').startsWith('image/');
  }

  async extract(input) {
    if (!this.runner) {
      return {
        state: 'REVIEW',
        provider: 'paddleocr',
        reviewFlags: ['paddleocr-not-configured'],
        fileName: input.fileName,
        pages: [],
        fullText: '',
        sourceReferences: [],
        extractionConfidence: 0,
      };
    }
    return this.runner(input);
  }
}

module.exports = { PaddleOcrAdapter };
