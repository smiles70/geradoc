const STOP_WORDS = new Set(['the', 'a', 'an', 'to', 'of', 'your', 'you', 'if', 'is', 'are', 'this']);

function words(value) {
  return String(value || '').toLowerCase().match(/[a-z0-9$-]+/g) || [];
}

function normalizeAction(action, index = 0) {
  if (typeof action === 'string') return { actionId: `action-${index}`, text: action, terms: words(action).filter(w => !STOP_WORDS.has(w)) };
  return {
    actionId: action.actionId || action.id || `action-${index}`,
    actor: action.actor || 'user',
    verb: action.verb || null,
    object: action.object || null,
    deadline: action.deadline || null,
    condition: action.condition || null,
    text: action.text || action.description || '',
    terms: words(action.text || action.description).filter(w => !STOP_WORDS.has(w)),
  };
}

function actionRecall(sourceActions = [], candidateText) {
  if (!sourceActions.length) return 1;
  const candidate = words(candidateText);
  return sourceActions.map((action, index) => {
    const normalized = normalizeAction(action, index);
    const matched = normalized.terms.filter(term => candidate.includes(term)).length;
    return normalized.terms.length ? matched / normalized.terms.length : 1;
  }).reduce((sum, value) => sum + value, 0) / sourceActions.length;
}

module.exports = { normalizeAction, actionRecall };
