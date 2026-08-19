const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const processRouter = require('./routes/process');
const resultRepository = require('./services/resultRepository');

const app = express();
app.use(helmet());
app.use(cors());
app.use((req, res, next) => {
  const requestId = req.get('X-Request-ID') || crypto.randomUUID();
  res.set('X-Request-ID', requestId);
  req.requestId = requestId;
  next();
});
app.use(express.json({ limit: '1mb' }));
app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'claritydoc-poc' }));
app.get('/ready', async (_req, res) => {
  try {
    await resultRepository.readAll();
    res.json({
      status: 'ready',
      dependencies: { repository: 'ready', processor: 'ready', configuration: 'ready' },
    });
  } catch (error) {
    res.status(503).json({ status: 'not_ready', dependencies: { repository: 'not_ready' } });
  }
});
app.use('/api/process', processRouter);
app.use((error, _req, res, _next) => {
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'This file is too large. Please choose a file smaller than 10 MB.', code: error.code });
  }
  if (error.code === 'UNSUPPORTED_FILE_TYPE') {
    return res.status(415).json({ error: error.message, code: error.code });
  }
  if (error.code === 'EMPTY_EXTRACTION' || error.code === 'PDF_PARSE_ERROR') {
    return res.status(422).json({ error: error.message, code: error.code });
  }
  console.error('POC request failed:', error.message);
  return res.status(500).json({ error: 'We could not complete that request. Please try again.', code: 'INTERNAL_ERROR' });
});

if (require.main === module) {
  app.listen(process.env.PORT || 8000, () => console.log('POC API listening'));
}
module.exports = app;
