const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const baseline = require('./plainLanguageSimplifier');
const candidate = require('./apucsSimplifierV1');
const { evaluateCandidate } = require('./simplifierEvaluator');

async function run() {
  const corpusPath = path.join(__dirname, '../../../research/synthetic-corpus.json');
  const reportPath = path.join(__dirname, '../../../research/apucs-shadow-report.json');
  const corpus = JSON.parse(fs.readFileSync(corpusPath, 'utf8'));
  const results = [];

  for (const item of corpus) {
    const [baselineOutput, candidateOutput] = await Promise.all([
      baseline.simplify(item.sourceText),
      candidate.simplify(item.sourceText, {
        protectedAnchors: item.protectedAnchors,
        requiredActions: item.requiredActions,
      }),
    ]);
    const levels = {};
    for (const level of ['simple', 'standard', 'detailed']) {
      levels[level] = {
        baseline: evaluateCandidate(item.sourceText, baselineOutput[level], {
          protectedAnchors: item.protectedAnchors,
          requiredActions: item.requiredActions,
        }),
        candidate: evaluateCandidate(item.sourceText, candidateOutput[level], {
          protectedAnchors: item.protectedAnchors,
          requiredActions: item.requiredActions,
          provenance: candidateOutput.metadata.provenance[level],
        }),
      };
    }
    results.push({ id: item.id, documentType: item.documentType, levels });
  }

  const serialized = JSON.stringify(results);
  const candidateMetrics = results.flatMap(result => Object.values(result.levels).map(level => level.candidate));
  const minimum = key => Math.min(...candidateMetrics.map(metric => metric[key]));
  const summary = {
    outputsEvaluated: candidateMetrics.length,
    minimumAnchorRecall: minimum('anchorRecall'),
    minimumActionRecall: minimum('actionRecall'),
    minimumProvenanceCoverage: minimum('provenanceCoverage'),
    contradictionCount: candidateMetrics.reduce((sum, metric) => sum + metric.contradictions.length, 0),
    technicalShadowGate: candidateMetrics.every(metric => metric.anchorRecall === 1
      && metric.actionRecall === 1
      && metric.provenanceCoverage === 1
      && metric.contradictions.length === 0),
  };
  const report = {
    configVersion: 'APUCS-v1-shadow-2026-08-16',
    outputDigest: crypto.createHash('sha256').update(serialized).digest('hex'),
    generatedAt: new Date().toISOString(),
    mode: 'shadow-only',
    userVisibleSimplifierChanged: false,
    corpusSize: corpus.length,
    summary,
    results,
    interpretation: [
      'Metrics are screening signals, not proof of factual correctness.',
      'Provenance is measured for the research candidate and unavailable for the baseline string-only adapter.',
      'Human review and IP/legal review are required before production use.',
    ],
  };
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`Wrote ${reportPath}`);
  console.log(`Output digest: ${report.outputDigest}`);
}

if (require.main === module) run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

module.exports = run;
