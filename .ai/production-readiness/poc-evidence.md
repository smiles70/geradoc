# ClarityDoc Real-Document POC Evidence

## Scope
One approved synthetic PDF processed through upload, extraction, simplification adapter, and JSON response.

## Verified
- Upload validation rejects unsupported types and oversized files.
- API health endpoint responds.
- Processor returns the mocked-demo-compatible document contract.
- Fixture and local extraction paths are replaceable through adapters.
- Automated contract tests pass.

## Not Yet Proven
- Production OCR quality across document classes.
- Production simplification quality.
- Authentication, PostgreSQL, S3, malware scanning, and queue operations.
- HIPAA compliance or medical document processing.

## Merge boundary
POC changes are isolated under `poc/`. The mocked demo remains under `demo/` and is merged independently.
