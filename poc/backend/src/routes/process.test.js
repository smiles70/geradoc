const request = require('supertest');
const app = require('../server');

describe('POST /api/process', () => {
  it('rejects a request without a document', async () => {
    const response = await request(app).post('/api/process');
    expect(response.status).toBe(400);
  });

  it('accepts a PDF upload', async () => {
    const response = await request(app)
      .post('/api/process')
      .attach('document', Buffer.from('%PDF-1.4 test'), 'sample.pdf');
    expect(response.status).toBe(202);
    expect(response.body.status).toBe('accepted');
  });
});
