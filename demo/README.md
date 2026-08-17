# ClarityDoc Mocked Demo

## How to run

1. Install dependencies: `npm install`
2. Start: `npm run dev`
3. Open `http://localhost:5173`

## Demo flow

1. Choose "Try as a Senior"
2. Select the Medicare letter
3. Watch the processing screen
4. Read the simplified summary
5. Toggle between Simple / Standard / Detailed
6. View the key information cards
7. Mark an action as complete
8. Switch to "Try as a Caregiver"
9. View the gentle alert and shared documents

## Build for static distribution

```bash
npm run build
npx serve -s dist
```

## Notes

This is a purely front-end demo. No real documents are processed or stored.
