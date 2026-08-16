# ADR-0001: Project Purpose and Scope

## Status

Accepted

## Date

August 16, 2026

## Context

The Application Charter for ClarityDoc was approved on August 13, 2026, establishing the strategic foundation for a geragogy-based information transformation platform. The charter identified a critical market gap: 61.2 million seniors with documented health literacy challenges struggle to understand complex documents (insurance letters, financial statements, legal documents, government forms), leading to poor decisions, missed deadlines, and unnecessary stress.

The market analysis revealed:
- $46.9 billion senior care technology market by 2031 (CAGR 7.4%)
- 63 million family caregivers struggling with information overload
- No existing competitor combining geragogy + documents + caregiver focus
- Regulatory tailwind from CMS health education mandates (2024+)

## Decision

**Project Purpose:**
ClarityDoc is a geragogy-based information transformation platform designed to convert complex, confusing documents into clear, actionable guidance for seniors (65+) and their caregivers.

**Vision Statement:**
"To be the trusted guide that transforms confusing documents into clear, actionable guidance—empowering seniors to maintain independence, make confident decisions, and live with dignity in a complex world."

**Mission Statement:**
"Build a geragogy-based information transformation platform that converts complex documents into clear, senior-friendly guidance—starting with insurance and financial documents, expanding to all categories—using evidence-based adult learning principles and human-centered design."

**Scope Definition (MVP Phase):**

**In Scope:**
- Document upload (PDF, image, email)
- Geragogy-based simplification engine
- Plain English summaries
- Extracted key information (dates, amounts, actions)
- Prioritized action items
- Emotional reassurance messages
- Senior dashboard
- Caregiver coordination tools
- Subscription management

**Document Types (MVP):**
- Insurance documents (policies, renewal letters, coverage explanations)
- Financial documents (bank statements, investment statements, billing)
- Government forms (Social Security, tax documents, pension information)
- Legal documents (simplified will/healthcare directive summaries)

**Out of Scope (Phase 1):**
- Medical document processing (HIPAA complexity deferred to Phase 2+)
- Medical advice or clinical decision support
- Real-time alerts or emergency response
- Integration with healthcare provider systems
- Telehealth or direct provider communication
- Prescription management
- AI chatbot for diagnosis

**Business Model:**
- Direct-to-Consumer: $15-25/month subscription
- B2B2C: Health plans, insurance companies (PMPM model)
- B2B: Healthcare clinics, senior living communities

## Consequences

**Positive Consequences:**
- Clear focus on a validated market problem with 61.2M potential users
- Defined scope prevents feature bloat and ensures MVP achievability
- Geragogy-first approach provides competitive differentiation
- Multiple revenue streams (B2C, B2B2C, B2B) reduce dependency on single channel
- WCAG 2.2 AA compliance from day 1 ensures accessibility foundation

**Negative Consequences:**
- Excluding medical documents in MVP may limit initial market appeal
- Narrow document type focus may require strong user education
- Senior-focused design may not appeal to broader market initially
- Compliance requirements (WCAG 2.2 AA, GDPR, SOC 2) increase development complexity

**Resource Implications:**
- Requires accessibility consultant engagement from Month 1
- 20-40% of development time allocated to compliance
- Need for senior user testing throughout development
- Healthcare advisor required for regulatory guidance

## Alternatives Considered

**Alternative 1: Broad Document Processing Platform**
- Process all document types including medical from day one
- **Rejected**: HIPAA complexity too high for MVP, would delay launch 12+ months

**Alternative 2: Healthcare Provider-Facing Tool**
- Build tools for doctors to simplify documents for patients
- **Rejected**: Misses direct senior market, longer sales cycles, lower revenue potential

**Alternative 3: Senior Social Platform with Document Features**
- Build broad senior community platform with document help as feature
- **Rejected**: Unfocused, high execution risk, dilutes core value proposition

**Alternative 4: Free-Only, Non-Profit Model**
- Build as free service funded by grants/donations
- **Rejected**: Not sustainable at scale, limits ability to build quality product, no incentive for user validation

**Chosen Approach:**
Narrow focus on insurance/financial/government/legal documents with direct-to-consumer subscription model, validated through POC before expansion.

## Related Decisions

- ADR-0002: Technology Framework Selection (React/Node.js/PostgreSQL)
- ADR-0003: Deployment Strategy (AWS HIPAA-eligible infrastructure)
- ADR-0004: Security Architecture (GDPR, SOC 2, WCAG 2.2 AA compliance)

---

*Generated with Process v9.5 - Nelson Repo Hygiene*