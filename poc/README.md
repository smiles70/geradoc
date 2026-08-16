# ClarityDoc Real-Document POC

This POC is isolated from `demo/` and validates one real-document processing path.

## Contract
The API response must match `contracts/document-result.schema.json` and the data shape in `../demo/src/data/sampleDocuments.js`.

## Scope
In scope: upload validation, extraction, replaceable simplification adapter, persistence, API response, tests.
Out of scope: production auth, billing, medical documents, production AWS, and final UI migration.
