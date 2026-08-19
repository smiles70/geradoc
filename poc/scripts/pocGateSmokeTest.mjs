const baseUrl = process.env.POC_API_URL || 'http://localhost:8000';

async function request(path, options) {
  const response = await fetch(`${baseUrl}${path}`, options);
  const body = await response.json().catch(() => null);
  if (!response.ok) throw new Error(`${path} returned ${response.status}: ${body?.error || 'request failed'}`);
  return body;
}

const health = await request('/health');
const ready = await request('/ready');
if (health.status !== 'ok' || ready.status !== 'ready') throw new Error('POC is not healthy/ready');

const form = new FormData();
form.append('document', new Blob(['%PDF-1.4 approved POC fixture'], { type: 'application/pdf' }), 'poc-gate-fixture.pdf');
const job = await request('/api/process/jobs', {
  method: 'POST',
  headers: { 'Idempotency-Key': `poc-gate-${Date.now()}` },
  body: form,
});

let status = job;
for (let attempt = 0; attempt < 40; attempt += 1) {
  if (status.status === 'complete') break;
  if (['failed', 'review', 'cancelled'].includes(status.status)) throw new Error(`Job ended in ${status.status}`);
  await new Promise(resolve => setTimeout(resolve, 100));
  status = await request(`/api/process/jobs/${job.id}`);
}
if (status.status !== 'complete') throw new Error(`Job did not complete: ${status.status}`);

const result = await request(`/api/process/${status.resultId}`);
const required = ['sourceUrl', 'orientation', 'keyInfo', 'actions', 'pageText', 'summary'];
const missing = required.filter(key => result[key] === undefined);
if (missing.length) throw new Error(`Result missing: ${missing.join(', ')}`);
await request(result.sourceUrl);
console.log(JSON.stringify({ status: 'pass', jobId: job.id, resultId: result.id, pages: result.pages, keyInfo: result.keyInfo.length, actions: result.actions.length }));
