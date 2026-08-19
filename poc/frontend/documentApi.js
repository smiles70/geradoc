const DEFAULT_API_BASE = '';

async function parseError(response, fallback) {
  try {
    const body = await response.json();
    throw new Error(body.error || fallback);
  } catch (error) {
    if (error.message !== fallback) throw error;
    throw new Error(fallback);
  }
}

const wait = milliseconds => new Promise(resolve => window.setTimeout(resolve, milliseconds));

export function createDocumentApi({ baseUrl = DEFAULT_API_BASE, fetchImpl = fetch } = {}) {
  const url = path => `${baseUrl}${path}`;

  return {
    async processDocument(file) {
      const form = new FormData();
      form.append('document', file);
      const idempotencyKey = window.crypto?.randomUUID?.() || `${Date.now()}-${file.name}`;
      const response = await fetchImpl(url('/api/process/jobs'), {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey },
        body: form,
      });
      if (!response.ok) await parseError(response, 'The document could not be processed.');
      const job = await response.json();
      for (let attempt = 0; attempt < 120; attempt += 1) {
        if (job.status === 'complete') return this.getProcessResult(job.resultId);
        if (['failed', 'review', 'cancelled'].includes(job.status)) throw new Error(job.error || 'The document needs review before it can be shown.');
        await wait(250);
        const statusResponse = await fetchImpl(url(`/api/process/jobs/${encodeURIComponent(job.id)}`));
        if (!statusResponse.ok) await parseError(statusResponse, 'The processing status could not be loaded.');
        Object.assign(job, await statusResponse.json());
      }
      throw new Error('Processing is taking longer than expected. Please try again.');
    },

    async getProcessResult(id) {
      const response = await fetchImpl(url(`/api/process/${encodeURIComponent(id)}`));
      if (!response.ok) await parseError(response, 'The document result could not be loaded.');
      return response.json();
    },
  };
}

export const documentApi = createDocumentApi({
  baseUrl: import.meta.env.VITE_CLARITYDOC_API_URL || DEFAULT_API_BASE,
});

export async function processDocument(file) {
  return documentApi.processDocument(file);
}
