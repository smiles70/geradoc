const request = require('supertest');
const app = require('../server');

describe('POST /api/process', () => {
  it('rejects a request without a document', async () => {
    const response = await request(app).post('/api/process');
    expect(response.status).toBe(400);
  });

  it('processes a PDF upload through the fixture adapters and persists it', async () => {
    const response = await request(app)
      .post('/api/process')
      .attach('document', Buffer.from('%PDF-1.4 test'), 'sample.pdf');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({
      id: expect.any(String),
      type: 'Insurance',
      title: 'Medicare Advantage Renewal Letter',
      fileName: 'sample.pdf',
      pages: 2,
      sourceUrl: expect.stringContaining('/api/process/'),
      processingMode: 'fixture',
      savedAt: expect.any(String),
      summary: expect.objectContaining({
        simple: expect.any(String),
        standard: expect.any(String),
        detailed: expect.any(String),
      }),
      keyInfo: expect.any(Array),
      actions: expect.any(Array),
      orientation: expect.objectContaining({ whyItMatters: expect.any(String) }),
    }));

    const retrieved = await request(app).get(`/api/process/${response.body.id}`);
    expect(retrieved.status).toBe(200);
    expect(retrieved.body.id).toBe(response.body.id);

    const source = await request(app).get(`/api/process/${response.body.id}/source`);
    expect(source.status).toBe(200);
    expect(source.headers['content-type']).toContain('application/pdf');
    expect(source.body).toEqual(Buffer.from('%PDF-1.4 test'));
  });

  it('creates and completes an idempotent asynchronous processing job', async () => {
    const key = `test-${Date.now()}`;
    const created = await request(app)
      .post('/api/process/jobs')
      .set('Idempotency-Key', key)
      .attach('document', Buffer.from('%PDF-1.4 async test'), 'async.pdf');
    expect(created.status).toBe(202);
    expect(created.body.status).toBe('queued');

    const duplicate = await request(app)
      .post('/api/process/jobs')
      .set('Idempotency-Key', key)
      .attach('document', Buffer.from('%PDF-1.4 async test'), 'async.pdf');
    expect(duplicate.status).toBe(202);
    expect(duplicate.body.id).toBe(created.body.id);

    let status = created.body;
    for (let attempt = 0; attempt < 20 && status.status !== 'complete'; attempt += 1) {
      await new Promise(resolve => setTimeout(resolve, 20));
      status = (await request(app).get(`/api/process/jobs/${created.body.id}`)).body;
    }
    expect(status.status).toBe('complete');
    expect(status.resultId).toEqual(expect.any(String));
  });

  it('rejects unsupported file types with an actionable error', async () => {
    const response = await request(app)
      .post('/api/process')
      .attach('document', Buffer.from('not a supported document'), 'notes.txt');
    expect(response.status).toBe(415);
    expect(response.body.error).toContain('PDF');
  });

  it('returns 404 for an unknown result', async () => {
    const response = await request(app).get('/api/process/missing-result');
    expect(response.status).toBe(404);
  });
});
