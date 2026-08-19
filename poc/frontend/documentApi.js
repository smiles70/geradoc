const DEFAULT_API_BASE = 'http://localhost:8000';

export function createDocumentApi({ baseUrl = DEFAULT_API_BASE, fetchImpl = fetch } = {}) {
  return {
    async processDocument(file) {
      const form = new FormData();
      form.append('document', file);
      const response = await fetchImpl(`${baseUrl}/api/process`, { method: 'POST', body: form });
      if (!response.ok) throw new Error('The document could not be processed.');
      return response.json();
    },

    async getProcessResult(id) {
      const response = await fetchImpl(`${baseUrl}/api/process/${encodeURIComponent(id)}`);
      if (!response.ok) throw new Error('The document result could not be loaded.');
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
