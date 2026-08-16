const fs = require('fs');
const path = require('path');
const baseline = require('./plainLanguageSimplifier');
const candidate = require('./apucsCandidate');
const { evaluateCandidate } = require('./simplifierEvaluator');

async function run() {
  const corpusPath = path.join(__dirname, '../../../research/synthetic-corpus.json');
  const reportPath = path.join(__dirname, '../../../research/apucs-shadow-report.json');
  const corpus = JSON.parse(fs.readFileSync(corpusPath, 'utf8'));
  const results = [];

  for (const item of corpus) {
    const [baselineOutput, candidateOutput] = await Promise.all([
      baseline.simplify(item.sourceText),
      candidate.simplify(item.sourceText),
    ]);
    const levels = {};
    for (const level of ['simple', 'standard', 'detailed']) {
      levels[level] = {
        baseline: evaluateCandidate(item.sourceText, baselineOutput[level]),
        candidate: evaluateCandidate(item.sourceText, candidateOutput[level]),
      };
    }
    results.push({ id: item.id, documentType: item.documentType, levels });
  }

  const report = {
    generatedAt: new Date().toISOString(),
    mode: 'shadow-only',
    userVisibleSimplifierChanged: false,
    corpusSize: corpus.length,
    results,
    interpretation: [
      'Metrics are screening signals, not proof of factual correctness.',
      'Provenance is unavailable in the current string-only contract.',
      'Human review and IP/legal review are required before production use.',
    ],
  };
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`Wrote ${reportPath}`);
}

if (require.main === module) run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

module.exports = run;
