# APUCS User Journeys v1.3

## End-to-End Walkthroughs with Worked Math

**Companion to**: APUCS Technical Specification v1.3  
**Status**: Research walkthroughs; numbers are illustrative placeholders, not calibration values  
**Language**: English examples  
**Purpose**: Trace extraction, estimation, demand/capability comparison, constraints, stability, override, review, output, and audit behavior.

> Every weight, threshold, decay factor, covariance, and capability coefficient below is illustrative. None is a production default. Real comprehension-outcome data, approved telemetry, and calibration are required before absolute thresholds are used.

---

## Journey 1 — Cold Start: First Document, No History

**User**: first-time user with no prior telemetry.  
**Document**: English insurance renewal notice with a clean PDF text layer.

### Source

> “Your premium will increase to $1,240 effective October 15, 2027. If you do not wish to renew, you must notify us in writing at least 30 days before that date.”

### Extraction

| Anchor | Field-guided | Document-guided | Result |
|---|---|---|---|
| Amount | `$1,240` | `$1,240` | High-confidence agreement |
| Deadline | `2027-10-15` | `2027-10-15` | High-confidence agreement |
| Condition | Notify in writing at least 30 days before | Same | High-confidence agreement |

No review route is triggered.

### Initial estimate

Illustrative cold-start state:

```text
x̂₀ = [c=.5, e=.5, r=.5, l=.5, q=0, u=.5]ᵀ
P₀ = .4I
```

Using illustrative `φ=.9` and `Q=.05I`:

```text
x̂₁⁻ = [.45, .45, .45, .45, 0, .45]ᵀ
P₁⁻ = .81(.4I) + .05I = .374I
```

A 45-second dwell with no help request is ambiguous. The example maps it to a small strain/uncertainty change rather than assuming difficulty:

```text
x̂₁ ≈ [.45, .45, .52, .45, .1, .48]ᵀ
```

Epistemic uncertainty dominates. The system keeps the current simple presentation and gathers more signal.

### Demand and capability

Candidate A is near-verbatim. Candidate B splits and rephrases the condition:

```text
A: If you do not wish to renew, you must notify us in writing at least 30 days before October 15, 2027.
B: You have until September 15, 2027 to tell us in writing if you do not want to renew.
```

Illustrative demand values:

```text
demand(A) = .5225
demand(B) = .1645
```

With illustrative `κ₁=.5`, `κ₂=.3`, `κ₃=.2`:

```text
capability = .5(.45) + .3(.45) − .2(.52) = .256
R(A) = max(0, .5225 − .256) = .267
R(B) = max(0, .1645 − .256) = 0
```

### Safety note on derived dates

`September 15, 2027` is a derived action date, not a replacement for the protected source deadline `October 15, 2027`. The output must preserve the source deadline and label the derived date as a calculated interpretation with provenance. If the system cannot establish the 30-day calculation under the document's date/calendar rules, it must route to review rather than present the derived date as fact.

### Result

```json
{
  "level": "SIMPLE",
  "preserved_anchors": ["AMOUNT:$1,240", "DEADLINE:2027-10-15", "CONDITION:30-day written notice"],
  "review_flags": [],
  "confidence": 0.83,
  "mode": "shadow-only"
}
```

---

## Journey 2 — Self-Efficacy Correction Across Sessions

**User**: fourth session with the same document class. The user repeatedly selects “simple,” while task outcomes show increasing success.

| Session | Self-report | Error-free completion |
|---|---:|---:|
| 1 | .2 | No |
| 2 | .2 | Yes |
| 3 | .2 | Yes |
| 4 | .2 | Yes |

```text
average self-report = .2
demonstrated success = 3/4 = .75
gap = |.2 − .75| = .55
```

With illustrative `τ_gap=.3`, the bias-correction rule fires after the configured trailing window:

```text
efficacy: .45 → approximately .68
adjustment_log = {
  session: 4,
  self_report: .2,
  demonstrated_success: .75,
  gap: .55,
  correction_applied: true
}
```

With illustrative values:

```text
capability = .5(.58) + .3(.68) − .2(.30) = .434
```

Illustrative stability trajectory:

| Session | Stability |
|---|---:|
| 1 | .31 |
| 2 | .58 |
| 3 | .71 |
| 4 | .79 |

With `τ_up=.75` and `N_up=2`, the system can move from SIMPLE to STANDARD after two consecutive qualifying estimates. This is system-initiated and therefore must pass hysteresis.

---

## Journey 3 — Anchor Disagreement Routes to REVIEW

**Document**: scanned tax notice with a smudge over a deadline digit.

| Anchor | Field-guided | Document-guided | Result |
|---|---|---|---|
| Deadline | `2027-10-15` | `2027-10-05` | Disagreement |
| Amount | `$340` | `$340` | Agreement |

The deadline is not committed:

```text
field_guided != document_guided
→ confidence = low
→ no anchor commit
→ REVIEW state
```

No candidate touching the disputed deadline can be presented. The amount may remain available only if the resulting output has complete provenance and does not imply the disputed deadline is settled.

```json
{
  "level": "REVIEW",
  "text": null,
  "review_flags": [{
    "anchor_type": "DEADLINE",
    "field_guided_value": "2027-10-15",
    "document_guided_value": "2027-10-05",
    "reason": "extraction_disagreement",
    "source_reference": {"page": 1, "bbox": "..."}
  }]
}
```

Exit requires a new extraction that resolves the disagreement or an explicit lower-confidence user request. The latter may show source text or a clearly flagged extraction, but may not approve an unsafe transformed value.

---

## Journey 4 — Explicit User Override

**User**: currently at STANDARD. Stability is `.52`, below the illustrative upgrade threshold `.75`. The user selects “Show me everything.”

```text
explicit request = DETAILED
stability gate = bypassed
hard constraints = still required
```

If hard constraints pass:

```json
{
  "level": "DETAILED",
  "override_log": {
    "requested_level": "DETAILED",
    "stability_at_request": .52,
    "override_honored": true
  }
}
```

If a candidate fails anchor, action, provenance, contradiction, or advice checks, the override cannot approve it:

```text
explicit request + hard-constraint failure → REVIEW
```

One override does not permanently change calibration. It becomes telemetry that may inform later state estimation, but it does not directly promote future sessions.

---

## Journey 5 — Steady State: Nothing Flagged

**User**: ten sessions in, stable STANDARD presentation, consistent self-report and task success.  
**Document**: clean native-text English PDF.

Extraction agrees on `$85` and `2027-11-01`. Telemetry is nominal:

```text
x̂₁₀ ≈ [.72, .70, .15, .55, .65, .10]ᵀ
capability = .5(.72) + .3(.70) − .2(.15) = .54
```

For a short template sentence:

```text
demand(C) = .21
R(C) = max(0, .21 − .54) = 0
S_t ≈ .81
```

No bias correction fires because self-report and performance differ by only `.03`. No presentation transition is pending. All constraints pass quietly:

```json
{
  "level": "STANDARD",
  "text": "Your payment of $85 is due November 1, 2027.",
  "preserved_anchors": ["AMOUNT:$85", "DEADLINE:2027-11-01"],
  "confidence": .94,
  "review_flags": [],
  "override_log": null
}
```

This is the expected steady-state majority path: every check runs, but no exceptional action is required.

---

## Journey-to-Spec Traceability

| Question | Governing section | Journey |
|---|---|---|
| Was a fact extracted consistently? | §2.3 | 1, 3 |
| Is the candidate too demanding? | §6.5 + capability | 1 |
| Should self-report be corrected? | §3.4 | 2 |
| Can complexity escalate? | §6.1/§6.2 | 2 |
| What happens under uncertainty? | §9 | 3 |
| Can a user request override gating? | §6.3 | 4 |
| What does normal traffic look like? | §§2–8 | 5 |
| Can a critical fact be lost? | §5.1 | All |

---

## Validation Status

These journeys are explanatory and contain illustrative mathematics. They do not establish calibrated values or production behavior.

Current repository alignment:

- The research estimator supports six dimensions and self-efficacy adjustment.
- The demand function reports uncalibrated demand and load.
- The controller honors valid explicit overrides while preserving hard constraints.
- The technical shadow test suite covers the core paths.
- Full extraction ensemble behavior, calibrated demand weights, real comprehension outcomes, and production rendering remain open.
