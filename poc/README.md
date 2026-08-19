# ClarityDoc Real-Document POC

This POC is isolated from `demo/` and validates one real-document processing path.

## Contract
The API response must match `contracts/document-result.schema.json` and the data shape in `../demo/src/data/sampleDocuments.js`.

## Scope
In scope: upload validation, extraction, replaceable simplification adapter, JSON persistence, API response, tests.
Out of scope: production auth, billing, medical documents, production AWS, PostgreSQL/S3 migration, and final UI migration.

## D2 Persistence

`backend/src/services/resultRepository.js` is the POC persistence boundary. It stores synthetic processing results in `backend/data/results.json`, which is ignored by Git. The API exposes `GET /api/process/:id` for retrieval. PostgreSQL should replace this repository behind the same interface in a later epic.
