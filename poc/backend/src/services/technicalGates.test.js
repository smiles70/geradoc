const { canonicalize, extractAnchors, reconcile, anchorRecall } = require('./typedAnchors');
const { normalizeAction, actionRecall } = require('./structuredActions');
const { validateAdvice } = require('./adviceBoundary');
const { PresentationController } = require('./presentationController');
const { AuditChain } = require('./auditChain');

describe('APUCS technical gates', () => {
  it('canonicalizes typed anchors and reconciles extractor agreement', () => {
    expect(canonicalize('AMOUNT', '$1,200.00')).toBe('1200.00');
    const field = extractAnchors('The deadline is October 15, 2027 and the amount is $30.');
    const guided = field.map(item => ({ ...item, extractorId: 'field-guided' }));
    const holistic = field.map(item => ({ ...item, extractorId: 'document-guided' }));
    const reconciled = reconcile(guided, holistic);
    expect(reconciled.every(item => item.confidence === 0.95)).toBe(true);
    expect(anchorRecall(reconciled, 'The deadline is October 15, 2027 and the amount is $30.')).toBe(1);
  });

  it('compares structured action identity', () => {
    const action = normalizeAction({ id: 'contact-bank', description: 'Contact your bank within 60 days' });
    expect(action.actionId).toBe('contact-bank');
    expect(actionRecall([action], 'Contact your bank within 60 days.')).toBe(1);
  });

  it('rejects unsupported imperative advice', () => {
    expect(validateAdvice('You should dispute this charge.', 'The notice describes a charge.').pass).toBe(false);
    expect(validateAdvice('The notice describes a charge.', 'The notice describes a charge.').pass).toBe(true);
  });

  it('uses hysteresis and routes failed constraints to review', () => {
    const controller = new PresentationController({ upCount: 2, downCount: 2 });
    expect(controller.transition(0.9, { hardConstraintsPass: true })).toBe('SIMPLE');
    expect(controller.transition(0.9, { hardConstraintsPass: true })).toBe('STANDARD');
    expect(controller.transition(0.9, { hardConstraintsPass: false })).toBe('REVIEW');
  });

  it('verifies the audit chain and detects tampering', () => {
    const chain = new AuditChain();
    chain.append({ decision: 'SIMPLE', candidateHash: 'a' });
    chain.append({ decision: 'STANDARD', candidateHash: 'b' });
    expect(chain.verify()).toBe(true);
    chain.records[0].decision = 'DETAILED';
    expect(chain.verify()).toBe(false);
  });
});
