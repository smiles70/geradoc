const baseUrl = process.env.POC_API_URL || 'http://localhost:8000';

async function expectJson(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, options);
  const body = await response.json();
  if (!response.ok) throw new Error(`${path} returned ${response.status}: ${JSON.stringify(body)}`);
  return body;
}

const health = await expectJson('/health');
if (health.status !== 'ok') throw new Error('Health check failed');

const ready = await expectJson('/ready');
if (ready.status !== 'ready') throw new Error('Readiness check failed');

const form = new FormData();
form.append('document', new Blob(['%PDF-1.4 synthetic bridge validation'], { type: 'application/pdf' }), 'bridge-validation.pdf');
const result = await expectJson('/api/process', { method: 'POST', body: form });
if (!result.id || !result.summary?.simple || !Array.isArray(result.actions)) {
  throw new Error('Processing response did not match the bridge contract');
}

const retrieved = await expectJson(`/api/process/${encodeURIComponent(result.id)}`);
if (retrieved.id !== result.id) throw new Error('Result retrieval returned the wrong result');

console.log(JSON.stringify({
  health: 'passed',
  readiness: 'passed',
  processing: 'passed',
  retrieval: 'passed',
  resultId: result.id,
}, null, 2));
