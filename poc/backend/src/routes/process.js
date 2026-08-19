const crypto = require('crypto');
const express = require('express');
const multer = require('multer');
const DocumentProcessor = require('../services/documentProcessor');
const extractor = process.env.POC_USE_REAL_PDF === 'true'
  ? require('../services/pdfExtractor')
  : require('../services/fixtureExtractor');
const simplifier = require('../services/plainLanguageSimplifier');
const resultRepository = require('../services/resultRepository');
const sourceRepository = require('../services/sourceRepository');
const jobRepository = require('../services/jobRepository');
const operationalMetrics = require('../services/operationalMetrics');

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    const allowed = ['application/pdf', 'image/png', 'image/jpeg'];
    if (!allowed.includes(file.mimetype)) {
      const error = new Error('Only PDF, PNG, and JPEG files are accepted.');
      error.code = 'UNSUPPORTED_FILE_TYPE';
      return callback(error);
    }
    callback(null, true);
  },
});
const processor = new DocumentProcessor({ extractor, simplifier });

async function processUploadedFile(file, jobId = null, requestId = null) {
  const result = await processor.process({
    buffer: file.buffer,
    fileName: file.originalname,
    mimeType: file.mimetype,
  });
  const source = await sourceRepository.save({
    id: result.id,
    buffer: file.buffer,
    fileName: file.originalname,
    mimeType: file.mimetype,
  });
  return resultRepository.save({
    ...result,
    jobId,
    requestId,
    mimeType: file.mimetype,
    sourceUrl: source.sourceUrl,
    processingMode: process.env.POC_USE_REAL_PDF === 'true' ? 'real-pdf' : 'fixture',
  });
}

router.post('/', upload.single('document'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Upload a document.' });
    operationalMetrics.increment('process.received');
    const saved = await processUploadedFile(req.file, null, req.requestId);
    operationalMetrics.increment('process.complete');
    res.status(200).json(saved);
  } catch (error) {
    next(error);
  }
});

router.post('/jobs', upload.single('document'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Upload a document.' });
    operationalMetrics.increment('jobs.received');
    const idempotencyKey = req.get('Idempotency-Key');
    const existing = await jobRepository.findByIdempotencyKey(idempotencyKey);
    if (existing) {
      operationalMetrics.increment('jobs.idempotent_replay');
      return res.status(202).json(existing);
    }
    const job = await jobRepository.save({
      id: `job-${crypto.randomUUID()}`,
      idempotencyKey: idempotencyKey || null,
      requestId: req.requestId,
      fileName: req.file.originalname,
      status: 'queued',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setImmediate(async () => {
      await jobRepository.update(job.id, { status: 'processing' });
      try {
        operationalMetrics.increment('jobs.processing');
        const result = await processUploadedFile(req.file, job.id, req.requestId);
        const current = await jobRepository.findById(job.id);
        if (current?.status !== 'cancelled') {
          operationalMetrics.increment('jobs.complete');
          await jobRepository.update(job.id, { status: 'complete', resultId: result.id, sourceUrl: result.sourceUrl });
        }
      } catch (error) {
        operationalMetrics.increment(error.code === 'EMPTY_EXTRACTION' ? 'jobs.review' : 'jobs.failed');
        await jobRepository.update(job.id, { status: error.code === 'EMPTY_EXTRACTION' ? 'review' : 'failed', error: error.message, errorCode: error.code || 'PROCESSING_ERROR' });
      }
    });
    res.status(202).json(job);
  } catch (error) {
    next(error);
  }
});

router.get('/jobs/:id', async (req, res, next) => {
  try {
    const job = await jobRepository.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Processing job not found.' });
    res.json(job);
  } catch (error) {
    next(error);
  }
});

router.delete('/jobs/:id', async (req, res, next) => {
  try {
    const job = await jobRepository.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Processing job not found.' });
    if (['complete', 'failed', 'review', 'cancelled'].includes(job.status)) return res.status(409).json({ error: 'This job can no longer be cancelled.' });
    const cancelled = await jobRepository.update(job.id, { status: 'cancelled' });
    res.json(cancelled);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/source', async (req, res, next) => {
  try {
    const result = await resultRepository.findById(req.params.id);
    const source = await sourceRepository.read(req.params.id, result?.fileName || 'source.pdf');
    if (!source) return res.status(404).json({ error: 'Source document is no longer available.' });
    res.set('Cache-Control', 'no-store');
    res.type(result?.mimeType || 'application/pdf').send(source.buffer);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const result = await resultRepository.findById(req.params.id);
    if (!result) return res.status(404).json({ error: 'Processing result not found.' });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
