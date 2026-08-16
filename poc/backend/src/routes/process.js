const express = require('express');
const multer = require('multer');
const { v4: uuid } = require('uuid');

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['application/pdf', 'image/png', 'image/jpeg'];
    cb(null, allowed.includes(file.mimetype));
  },
});

router.post('/', upload.single('document'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Upload a PDF, PNG, or JPEG document.' });
  res.status(202).json({ jobId: uuid(), status: 'accepted', fileName: req.file.originalname });
});
module.exports = router;
