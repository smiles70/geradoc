const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const processRouter = require('./routes/process');
const resultRepository = require('./services/resultRepository');

const app = express();
app.use(helmet());
app.use(cors());
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

if (require.main === module) {
  app.listen(process.env.PORT || 8000, () => console.log('POC API listening'));
}
module.exports = app;
