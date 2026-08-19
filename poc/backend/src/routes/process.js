const express = require('express');
const multer = require('multer');
const DocumentProcessor = require('../services/documentProcessor');
const extractor = process.env.POC_USE_REAL_PDF === 'true'
  ? require('../services/pdfExtractor')
  : require('../services/fixtureExtractor');
const simplifier = require('../services/plainLanguageSimplifier');
const resultRepository = require('../services/resultRepository');

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

router.post('/', upload.single('document'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Upload a document.' });
    const result = await processor.process({
      buffer: req.file.buffer,
      fileName: req.file.originalname,
      mimeType: req.file.mimetype,
    });
    const saved = await resultRepository.save(result);
    res.status(200).json(saved);
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
