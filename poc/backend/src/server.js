const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const processRouter = require('./routes/process');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'claritydoc-poc' }));
app.use('/api/process', processRouter);

if (require.main === module) {
  app.listen(process.env.PORT || 8000, () => console.log('POC API listening'));
}
module.exports = app;
