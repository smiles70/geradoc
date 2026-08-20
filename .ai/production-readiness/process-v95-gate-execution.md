# Process v9.5 Executable Gate Result

**Date**: August 19, 2026  
**Branch**: `feature/process-v95-executable-gate`  
**Runtime mode**: POC fixture mode (`POC_USE_REAL_PDF=false`) for deterministic smoke/E2E

## Gate command

```bash
node poc/scripts/processV95Gate.mjs
```

## Result

```text
Process v9.5 gate: PASS
```

## Passed checks

```text
Requirements graph JSON
Artifact inventory JSON
Requirements graph integrity
Required Process/guide/E2E artifacts
Backend tests: 16 test files / 40 tests
Frontend build
Frontend lint
POC API smoke test
Playwright Firefox E2E: 3 tests passed
```

## Important runtime boundary

The deterministic gate runs fixture mode so the smoke test can use a synthetic PDF. Real native-text PDF mode remains a separate runtime test requiring a valid PDF fixture and `POC_USE_REAL_PDF=true`.

## Residual manual gates

- Manual visual evidence capture
- Screen-reader execution
- Human senior review
- OCR-provider benchmark/activation
- Production auth/persistence/operations
- APUCS calibration and legal/IP approval
