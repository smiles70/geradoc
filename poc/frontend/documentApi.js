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

export function createDocumentApi({ baseUrl = DEFAULT_API_BASE, fetchImpl = fetch } = {}) {
  const url = path => `${baseUrl}${path}`;

  return {
    async processDocument(file) {
      const form = new FormData();
      form.append('document', file);
      const response = await fetchImpl(url('/api/process'), { method: 'POST', body: form });
      if (!response.ok) await parseError(response, 'The document could not be processed.');
      return response.json();
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
