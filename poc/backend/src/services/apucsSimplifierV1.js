const { extractProtectedAnchors, anchorRecall, actionRecall } = require('./simplifierEvaluator');
const { InteractionStateEstimator } = require('./interactionStateEstimator');

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

function provenanceFor(sourceText, outputText) {
  const sourceSentences = sentences(sourceText);
  return sentences(outputText).map((output, index) => ({
    outputIndex: index,
    sourceIndices: sourceSentences[index] === undefined ? [] : [index],
    sourceText: sourceSentences[index] || null,
    outputText: output,
  }));
}

function safeLevel(sourceText, candidateText, threshold, expectedAnchors = [], requiredActions = []) {
  const protected = expectedAnchors.length > 0 ? expectedAnchors : extractProtectedAnchors(sourceText);
  const anchorsPass = anchorRecall(sourceText, candidateText, protected) >= threshold;
  const actionsPass = actionRecall(requiredActions, candidateText) >= threshold;
  return anchorsPass && actionsPass ? candidateText : normalize(sourceText);
}

const apucsSimplifierV1 = {
  async simplify(text, {
    interactionObservation = {},
    anchorThreshold = 1,
    protectedAnchors = [],
    requiredActions = [],
  } = {}) {
    const estimator = new InteractionStateEstimator();
    const interactionState = estimator.update(interactionObservation);
    const transformed = transform(text);
    const sourceSentences = sentences(text);
    const simpleCandidate = sourceSentences.slice(0, 3).join(' ');
    const standardCandidate = transformed;
    const detailedCandidate = normalize(text);
    const levels = {
      simple: safeLevel(text, simpleCandidate, anchorThreshold, protectedAnchors, requiredActions),
      standard: safeLevel(text, standardCandidate, anchorThreshold, protectedAnchors, requiredActions),
      detailed: safeLevel(text, detailedCandidate, anchorThreshold, protectedAnchors, requiredActions),
    };

    return {
      simple: levels.simple,
      standard: levels.standard,
      detailed: levels.detailed,
      metadata: {
        algorithm: 'APUCS-v1-research',
        mode: 'shadow-only',
        interactionState,
        protectedAnchors: protectedAnchors.length > 0 ? protectedAnchors : extractProtectedAnchors(text),
        provenance: {
          simple: provenanceFor(text, levels.simple),
          standard: provenanceFor(text, levels.standard),
          detailed: provenanceFor(text, levels.detailed),
        },
      },
    };
  },
};

module.exports = apucsSimplifierV1;
