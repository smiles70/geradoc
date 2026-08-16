const request = require('supertest');
const app = require('../server');

describe('POST /api/process', () => {
  it('rejects a request without a document', async () => {
    const response = await request(app).post('/api/process');
    expect(response.status).toBe(400);
  });

  it('processes a PDF upload through the fixture adapters', async () => {
    const response = await request(app)
      .post('/api/process')
      .attach('document', Buffer.from('%PDF-1.4 test'), 'sample.pdf');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({
      type: 'Insurance',
      title: 'Medicare Advantage Renewal Letter',
      fileName: 'sample.pdf',
      pages: 2,
      summary: expect.objectContaining({
        simple: expect.any(String),
        standard: expect.any(String),
        detailed: expect.any(String),
      }),
      keyInfo: expect.any(Array),
      actions: expect.any(Array),
    }));
  });
});
