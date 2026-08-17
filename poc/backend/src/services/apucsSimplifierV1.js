const { extractAnchors, anchorRecall, canonicalize } = require('./typedAnchors');
const { normalizeAction, actionRecall } = require('./structuredActions');
const { validateAdvice } = require('./adviceBoundary');
const { InteractionStateEstimator } = require('./interactionStateEstimator');
const { PresentationController } = require('./presentationController');
const { AuditChain } = require('./auditChain');

const TRANSFORMS = [
  [/\bMedicare Advantage plan\b/g, 'Medicare plan'],
  [/\bmonthly premium\b/g, 'monthly cost'],
  [/\bproperty tax installment\b/g, 'property tax payment'],
  [/\bbecomes effective\b/g, 'starts'],
  [/\bmake healthcare decisions\b/g, 'make healthcare choices'],
];

function normalize(text) {
  return String(text || '').replace(/\s+/g, ' ').trim();
}

function sentences(text) {
  return normalize(text).split(/(?<=[.!?])\s+/).filter(Boolean);
}

function transform(text) {
  return TRANSFORMS.reduce((result, [pattern, replacement]) => result.replace(pattern, replacement), normalize(text));
}

function expectedAnchors(items, sourceText) {
  if (!items.length) return extractAnchors(sourceText);
  return items.map(item => ({
    ...item,
    canonicalValue: item.canonicalValue || canonicalize(item.type || 'TEXT', item.value),
  }));
}

function provenanceFor(sourceText, outputText) {
  const sourceSentences = sentences(sourceText);
  return sentences(outputText).map((output, index) => ({
    outputSentenceId: `output-${index}`,
    sourceSpan: sourceSentences[index] === undefined ? null : { sentenceIndex: index, text: sourceSentences[index] },
    outputText: output,
  }));
}

function validateCandidate(sourceText, candidateText, anchors, actions) {
  const advice = validateAdvice(candidateText, sourceText);
  const anchorScore = anchorRecall(anchors, candidateText);
  const actionScore = actionRecall(actions, candidateText);
  const provenance = provenanceFor(sourceText, candidateText);
  const provenanceScore = provenance.length && provenance.every(item => item.sourceSpan) ? 1 : 0;
  return {
    anchorRecall: anchorScore,
    actionRecall: actionScore,
    provenanceCoverage: provenanceScore,
    adviceViolations: advice.violations,
    contradictions: anchorScore < 1 ? ['protected-anchor-loss'] : [],
    pass: anchorScore === 1 && actionScore === 1 && provenanceScore === 1 && advice.violations === 0,
    advice,
    provenance,
  };
}

const apucsSimplifierV1 = {
  async simplify(text, {
    interactionObservation = {},
    protectedAnchors = [],
    requiredActions = [],
    anchorThreshold = 1,
  } = {}) {
    const estimator = new InteractionStateEstimator();
    const interactionState = estimator.update(interactionObservation);
    const anchors = expectedAnchors(protectedAnchors, text);
    const actions = requiredActions.map(normalizeAction);
    const sourceSentences = sentences(text);
    const candidates = {
      simple: sourceSentences.slice(0, 3).join(' '),
      standard: transform(text),
      detailed: normalize(text),
    };
    const audit = new AuditChain();
    const levels = {};
    const constraints = {};
    const provenance = {};

    for (const [level, candidate] of Object.entries(candidates)) {
      const validation = validateCandidate(text, candidate, anchors, actions);
      const safe = validation.anchorRecall >= anchorThreshold && validation.pass;
      levels[level] = safe ? candidate : normalize(text);
      constraints[level] = { ...validation, fallbackUsed: !safe };
      provenance[level] = safe ? validation.provenance : provenanceFor(text, normalize(text));
      audit.append({ algorithm: 'APUCS-v1.1-research', level, candidate: levels[level], constraints: constraints[level] });
    }

    const controller = new PresentationController();
    const hardPass = Object.values(constraints).every(item => item.pass);
    const presentationState = controller.transition(interactionState.stability, {
      hardConstraintsPass: hardPass,
      epistemicHigh: interactionState.epistemicVariance.uncertainty > 0.35,
      aleatoricHigh: interactionState.aleatoricVariance.strain > 0.2,
    });

    const reviewFlags = Object.values(constraints).flatMap(item => [
      ...item.contradictions,
      ...(item.adviceViolations > 0 ? ['advice-boundary-violation'] : []),
      ...(item.fallbackUsed ? ['candidate-fallback'] : []),
    ]);
    const confidence = Math.min(
      ...Object.values(constraints).map(item => Math.min(item.anchorRecall, item.actionRecall, item.provenanceCoverage)),
    );
    const metadata = {
      algorithm: 'APUCS-v1.1-research',
      mode: 'shadow-only',
      presentationState,
      interactionState,
      protectedAnchors: anchors,
      constraints,
      provenance,
      audit: audit.records,
      auditVerified: audit.verify(),
    };
    return {
      simple: levels.simple,
      standard: levels.standard,
      detailed: levels.detailed,
      metadata,
      researchMetadata: {
        algorithmVersion: 'APUCS-v1.1-research',
        mode: 'shadow-only',
        presentationState,
        preservedAnchors: anchors,
        confidence: Number(confidence.toFixed(4)),
        sourceReferences: anchors.map(anchor => anchor.sourceSpan).filter(Boolean),
        provenanceMap: provenance,
        reviewFlags: [...new Set(reviewFlags)],
        auditRecord: audit.records[audit.records.length - 1] || null,
      },
    };
  },
};

module.exports = apucsSimplifierV1;
