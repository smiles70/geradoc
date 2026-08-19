const request = require('supertest');
const app = require('./server');

describe('service readiness', () => {
  it('reports liveness', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('reports operational metrics without document content', async () => {
    const response = await request(app).get('/metrics');
    expect(response.status).toBe(200);
    expect(response.body.counters).toBeDefined();
  });

  it('reports repository readiness', async () => {
    const response = await request(app).get('/ready');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'ready',
      dependencies: { repository: 'ready', processor: 'ready', configuration: 'ready' },
    });
  });
});
