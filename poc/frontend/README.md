# POC frontend seam

`documentApi.js` returns the same shape as `demo/src/data/sampleDocuments.js`.
The future production UI can replace the mock data import with `processDocument(file)`.
Do not edit `demo/` from this branch.

## Promoted bridge components

The reusable UX components currently promoted into `poc/frontend/components/` are copied from the completed demo as the initial bridge baseline. They continue to use fixture data and local state until the API-integration epic replaces those seams.

- `DocumentViewer`
- `KeyInfoCards`
- `ActionItems`
- `AccessibilityControls`
- `ProcessingScreen`
- `SeniorDashboard`
- `CaregiverDashboard`
- `LandingPage`

The source demo remains unchanged under `demo/`.
