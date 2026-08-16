# ClarityDoc Product Requirements Document (PRD)

**Document Version**: 1.0  
**Created**: August 16, 2026  
**Status**: Approved  
**Based On**: BRD v1.0, Market Research, NONI UI/UX Principles  
**Approach**: Process v9.5 + Geragogy-First Product Design

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | August 16, 2026 | Process v9.5 + Kimberly Miles | Initial PRD creation |

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Product Vision](#product-vision)
3. [Market and User Research](#market-and-user-research)
4. [Target Users and Personas](#target-users-and-personas)
5. [Product Objectives and KPIs](#product-objectives-and-kpis)
6. [Product Features](#product-features)
7. [User Journeys and Flows](#user-journeys-and-flows)
8. [User Experience and Design](#user-experience-and-design)
9. [Product Roadmap](#product-roadmap)
10. [Go-to-Market Considerations](#go-to-market-considerations)
11. [Success Metrics and Analytics](#success-metrics-and-analytics)
12. [Risks and Mitigations](#risks-and-mitigations)
13. [Open Questions and Decisions](#open-questions-and-decisions)

---

## 1. Executive Summary

ClarityDoc is a geragogy-based information transformation platform that turns complex insurance, financial, government, and legal documents into plain-English explanations, prioritized actions, and step-by-step guidance for seniors (65+) and their caregivers.

This PRD defines the product features, user experience, roadmap, and success metrics needed to bring ClarityDoc to market. It is intended for product managers, designers, marketers, and executives.

**Product Positioning**: The first senior-first document clarity platform.  
**MVP Target**: 100 paying subscribers within 12-15 months.  
**Primary Differentiator**: Geragogy-based design that preserves agency, reduces anxiety, and builds confidence.

---

## 2. Product Vision

### 2.1 Vision Statement

> Every senior and caregiver should be able to understand the documents that affect their lives — without feeling stupid, without technology anxiety, and without giving up their independence.

### 2.2 Mission

ClarityDoc transforms confusion into clarity, one document at a time, using geragogy principles and AI-powered simplification designed specifically for older adults.

### 2.3 Why Now

- 61.2 million seniors in the US face increasing paperwork complexity
- Insurance, Medicare, and financial documents have become harder to navigate
- Adult child caregivers (63 million) need tools to help aging parents
- No existing product combines geragogy, document AI, and caregiver support

### 2.4 Success in 3 Years

- 50,000+ active subscribers
- 3-5 health plan partnerships
- Recognized category leader in senior document clarity
- Measurable health and financial outcomes for users

---

## 3. Market and User Research

### 3.1 Market Opportunity

**Total Addressable Market (TAM)**: $46.9 billion (senior care technology by 2031)  
**Serviceable Addressable Market (SAM)**: $3.7-5.6 billion  
**Serviceable Obtainable Market (SOM)**: $3.7-28 million

### 3.2 Target Segments

**Primary: Seniors 65+ (B2C)**
- Struggle with health literacy and complex documents
- Value independence and dignity
- Increasingly comfortable with technology but need it designed for them

**Secondary: Adult Child Caregivers 45-65**
- Help parents manage documents
- Time-constrained and stressed
- Need efficient ways to support parents

**Tertiary: Health Plans and Insurers (B2B2C)**
- Reduce support call volume
- Improve member satisfaction and health outcomes
- Seek value-based care enablement tools

### 3.3 Competitive Landscape

**Direct Competitors**: None with the same geragogy + document + caregiver combination

**Indirect Competitors**:
- Healthcare translation services (translate but don't simplify)
- Senior care coordination apps (track but don't explain)
- Patient education platforms (generic, not document-specific)
- AI clinical documentation tools (provider-facing, not patient-facing)

**Competitive Advantage**:
- Senior-first design from the ground up
- Evidence-linked, confidence-aware document processing
- Geragogy-based cognitive scaffolding
- Caregiver integration with privacy and agency

---

## 4. Target Users and Personas

### 4.1 Primary Persona: Margaret (Senior User)

**Demographics**:
- 72 years old, recently widowed
- Lives independently
- Low to moderate tech comfort
- Some vision decline, early cognitive concerns

**Goals**:
- Understand insurance and financial documents independently
- Avoid feeling stupid or overwhelmed
- Make confident decisions about her affairs
- Stay connected with family

**Pain Points**:
- Confusing insurance renewal letters
- Complex financial statements
- Fear of making wrong decisions
- Technology that makes her feel left behind

**Product Jobs-to-be-Done**:
- "Help me understand what this document means"
- "Tell me what I need to do and by when"
- "Don't make me feel dumb for asking"
- "Let my daughter help only when I want"

### 4.2 Secondary Persona: David (Caregiver)

**Demographics**:
- 52 years old, full-time job, two children
- Helps mother (78) with finances and healthcare
- High tech comfort but limited time

**Goals**:
- Help mother understand documents efficiently
- Ensure mother doesn't miss important actions
- Reduce his own stress and worry
- Maintain mother's independence

**Pain Points**:
- Mother's statements are full of jargon
- Limited time to provide explanations
- Worry about mother making mistakes
- Guilt about not being able to do more

**Product Jobs-to-be-Done**:
- "Show me what my mother needs help with"
- "Notify me when she's stuck"
- "Help me guide her without taking over"

### 4.3 Tertiary Persona: Enterprise Buyer (Health Plan)

**Demographics**:
- Director of Member Experience
- Manages Medicare Advantage member services
- Incentivized by CMS Star ratings

**Goals**:
- Reduce member confusion and support calls
- Improve medication and care plan adherence
- Increase member satisfaction
- Demonstrate health outcomes

**Product Jobs-to-be-Done**:
- "Help members understand their plan communications"
- "Reduce cost-to-serve for document-related calls"
- "Improve Star ratings through member experience"

---

## 5. Product Objectives and KPIs

### 5.1 Product Objectives (OKRs)

**Year 1**:
- Achieve 100 paying subscribers
- Reach NPS > 40
- Complete MVP development
- Begin 3 health plan conversations

**Year 2**:
- Achieve 5,000 subscribers
- Close 1-2 health plan partnerships
- Maintain churn < 4%
- Launch advanced document processing

**Year 3**:
- Achieve 50,000 subscribers
- 3-5 health plan partnerships
- Reach positive EBITDA
- Establish category leadership

### 5.2 Key Performance Indicators

**User Outcomes**:
- Comprehension improvement: 70%+ report ≥50% improvement
- Decision confidence: 7/10+ average
- Action completion: 75%+ of recommended actions completed in 30 days
- User satisfaction: NPS > 50

**Product Usage**:
- Monthly active users (MAU)
- Documents processed per user per month
- Feature adoption (caregiver, reminders, exports)
- Session frequency and duration

**Business Metrics**:
- Monthly recurring revenue (MRR)
- Customer acquisition cost (CAC)
- Customer lifetime value (LTV)
- Churn rate
- Trial-to-paid conversion

---

## 6. Product Features

### 6.1 Feature Summary

| Feature | Priority | User Value | Business Value | MVP? |
|---------|----------|------------|----------------|------|
| Document Upload | P0 | Access tool | Core utility | Yes |
| Text Simplification | P0 | Understanding | Core value | Yes |
| Key Information Extraction | P0 | Clarity | Trust | Yes |
| Action Item Prioritization | P0 | Action | Outcomes | Yes |
| Senior-Focused UI | P0 | Usability | Adoption | Yes |
| Cognitive Load Management | P1 | Confidence | Retention | Yes |
| Caregiver Coordination | P1 | Support | Network effect | Yes |
| Subscription Management | P1 | Revenue | Monetization | Yes |
| Reminders and Notifications | P1 | Adherence | Engagement | Yes |
| Advanced Document Processing | P2 | Accuracy | Scale | No |
| Health Plan Integration | P2 | B2B | Growth | No |
| Analytics Dashboard | P2 | Insights | Enterprise | No |

### 6.2 Detailed Feature Descriptions

**F-001: Document Upload**
- Drag-and-drop or click-to-upload
- Clear file type and size guidance
- Progress indication for large files
- Upload error handling in plain language

**F-002: Text Simplification**
- Convert complex language to plain English
- Three simplification levels
- Original text comparison view
- Confidence indicators

**F-003: Key Information Extraction**
- Highlight dates, amounts, deadlines, contacts
- Source-linked to document pages
- Low-confidence flagging
- Plain-language explanations

**F-004: Action Item Prioritization**
- Extract and list required actions
- Sort by urgency and importance
- Track completion status
- Set reminders and deadlines

**F-005: Senior-Focused UI**
- Large, readable text
- High contrast options
- Simple navigation
- 200% zoom support
- Full keyboard and screen reader support

**F-006: Cognitive Load Management**
- Backend-governed interface complexity
- Struggle detection
- Reassurance messaging
- User-controlled pace

**F-007: Caregiver Coordination**
- Caregiver invitations
- Permission-based document sharing
- Action assistance
- Struggle notifications (opt-in)

**F-008: Subscription Management**
- Monthly and annual plans
- Free trial
- Stripe payment processing
- Easy cancellation

**F-009: Reminders and Notifications**
- Action reminders
- Deadline warnings
- Processing completion
- Caregiver notifications

---

## 7. User Journeys and Flows

### 7.1 First-Time User Journey (Margaret)

```
1. Discovers ClarityDoc through caregiver or AARP
2. Visits landing page with large, reassuring text
3. Clicks "Try It Free" (clear and prominent)
4. Enters email and creates a simple password
5. Sees welcome screen explaining what to expect
6. Uploads first document (e.g., insurance letter)
7. Watches processing progress in plain language
8. Views simplified document and key actions
9. Marks one action as "will do"
10. Receives reassuring completion message
11. Returns later to continue
```

### 7.2 Returning User Journey (Margaret)

```
1. Logs in with simple credentials
2. Sees dashboard with recent documents and actions
3. Reviews an action item with a deadline approaching
4. Marks action complete
5. Uploads a new financial statement
6. Adjusts simplification level to her preference
7. Closes session feeling confident
```

### 7.3 Caregiver Journey (David)

```
1. Receives email invitation from mother
2. Accepts and creates a caregiver account
3. Mother approves document access
4. Views shared documents and action items
5. Sees mother's progress and any struggle alerts
6. Offers help on a specific action
7. Receives notification when action complete
```

### 7.4 Health Plan Journey (Phase 2)

```
1. Health plan evaluates ClarityDoc for members
2. Pilot with 1,000 members
3. Members access branded ClarityDoc portal
4. Plan sees reduced support calls
5. Reports show improved member understanding
6. Expands to full contract
```

---

## 8. User Experience and Design

### 8.1 Design Principles

1. **Clarity Over Cleverness**
   - Simple, direct language
   - One primary action per screen
   - Clear visual hierarchy

2. **Emotional Safety**
   - Normalize document confusion
   - Never shame users
   - Provide reassurance at every step

3. **Progressive Disclosure**
   - Start with the simplest view
   - Let users choose to see more detail
   - Avoid information overload

4. **Agency and Control**
   - Users control their pace
   - Users approve caregiver access
   - Users choose simplification level

### 8.2 NONI UI/UX Principles Applied

**Progressive Interface Complexity**:
- Backend determines appropriate complexity based on cognitive state
- Stable state maintained before interface changes
- Users can always override

**Emotional Safety First**:
- Reassurance messages throughout
- Encouraging language when users struggle
- Celebration of small wins

**Real-Life Relevance**:
- Document examples tied to real senior concerns
- Explanations reference real-life impact
- Actions connected to actual next steps

### 8.3 Accessibility Requirements

- WCAG 2.2 AA compliant
- 16pt+ base font, 18pt preferred
- 200% zoom support
- 4.5:1 contrast minimum
- Full keyboard navigation
- Screen reader compatible
- No automatic media playback

### 8.4 Key Screen Designs

**Dashboard Screen**:
- Welcome by name
- Recent documents (3-5 items)
- Upcoming actions (sorted by date)
- Large "Upload Document" button
- Simple navigation bar

**Document View Screen**:
- Document name and upload date
- Simplification level selector
- Plain-English summary
- Key information cards
- Action items list
- Source page references

**Action Item Screen**:
- Action description in plain language
- Deadline (if any)
- Step-by-step guidance
- "Mark Complete" button
- "I Need Help" button
- Reminder option

**Caregiver Screen**:
- List of seniors supported
- Documents shared
- Action items needing help
- Struggle alerts (if enabled)
- Recent activity

---

## 9. Product Roadmap

### 9.1 MVP Phase (Months 1-14)

**Q1**: Foundation
- Environment setup, CI/CD, team onboarding
- Basic frontend and backend scaffolding
- Document upload and storage

**Q2**: Core Processing
- Text extraction and simplification
- Key information extraction
- Document dashboard

**Q3**: Senior Experience
- Senior-focused UI
- Cognitive load management
- Accessibility compliance

**Q4**: Actions and Caregivers
- Action item extraction and tracking
- Caregiver invitations and permissions
- Reminders and notifications

**Q1+ (MVP Launch)**: Payments and Launch
- Stripe subscription integration
- Free trial and launch
- Beta testing and iteration

### 9.2 Phase 2 (Months 15-30)

**Advanced Processing**:
- Adobe PDF Services OCR
- Docspeed evidence-linked processing
- Multi-page document improvements

**B2B2C**:
- Health plan pilot
- Medicare Advantage focus
- White-label portal

**Scale**:
- Microservice architecture
- Multi-region deployment
- Advanced analytics

### 9.3 Phase 3 (Months 31-48)

**Market Leadership**:
- 50K+ subscribers
- 3-5 health plan partnerships
- Category expansion (e.g., medical under HIPAA)
- International expansion evaluation

---

## 10. Go-to-Market Considerations

### 10.1 Target Launch Strategy

**Initial Launch**: Direct-to-consumer  
**Secondary**: B2B2C through health plans  
**Tertiary**: B2B through senior living and clinics

### 10.2 Pricing

**B2C**:
- $15-25/month
- Free 14-day trial
- Annual discount

**B2B2C**:
- $0.50-2.00 PMPM
- Volume-based discounts
- Implementation fees

**B2B**:
- Custom enterprise licensing
- Annual contracts

### 10.3 Channel Strategy

**Year 1**:
- AARP and senior organization partnerships
- Adult child caregiver communities
- Organic content and SEO
- Caregiver-focused webinars

**Year 2**:
- Health plan channel development
- Physician and clinic referrals
- Senior living community partnerships
- Paid social media to adult children

### 10.4 Positioning Messages

**For Seniors**:
"Make sense of your paperwork without the stress."

**For Caregivers**:
"Help your parents understand their documents without doing everything for them."

**For Health Plans**:
"Reduce member confusion, improve outcomes, and lower support costs."

---

## 11. Success Metrics and Analytics

### 11.1 Product Analytics

**Activation**:
- First document uploaded within 7 days of signup
- First simplified document viewed
- First action item viewed

**Engagement**:
- Weekly active users
- Documents processed per month
- Action completion rate
- Feature usage (caregiver, reminders, export)

**Retention**:
- Day 1, Day 7, Day 30 retention
- Monthly churn
- Resurrection rate

### 11.2 Business Analytics

**Revenue**:
- MRR and ARR
- Average revenue per user
- Trial-to-paid conversion
- Annual plan uptake

**Acquisition**:
- CAC by channel
- Conversion rate by landing page
- Referral rate

### 11.3 Outcome Analytics

**Comprehension**:
- Pre/post test scores
- Time to understanding
- User-reported confidence

**Behavioral Outcomes**:
- Actions completed
- Deadlines met
- Support calls avoided

**Health Outcomes (B2B2C)**:
- Medication adherence
- Care plan follow-up
- Emergency visits reduced

### 11.4 Cognitive Load Analytics

- Average strain per session
- Complexity level distribution
- Help request frequency
- Stability threshold breaches
- Mastery progression over time

---

## 12. Risks and Mitigations

### 12.1 Product Risks

**Seniors don't adopt (low digital literacy)**
- **Probability**: Medium
- **Impact**: Critical
- **Mitigation**: WCAG 2.2 from day 1, weekly senior testing, caregiver-first marketing

**Churn >5%/month**
- **Probability**: Medium
- **Impact**: Critical
- **Mitigation**: Engagement features, NPS tracking, retention campaigns

**Simplification quality too low**
- **Probability**: Medium
- **Impact**: High
- **Mitigation**: Confidence scoring, human review loop, multiple provider fallbacks

### 12.2 Market Risks

**Health plans take 3+ years to close**
- **Probability**: High
- **Impact**: High
- **Mitigation**: Begin conversations Year 1, focus on Medicare Advantage, CMS mandate lever

**Competitors enter space**
- **Probability**: High
- **Impact**: High
- **Mitigation**: Early brand building, health outcomes data, partnerships create switching costs

### 12.3 Technical Risks

**External API reliability**
- **Probability**: Medium
- **Impact**: High
- **Mitigation**: Circuit breakers, fallback providers, queue-based retry

**WCAG delays launch**
- **Probability**: Medium
- **Impact**: High
- **Mitigation**: Accessibility consultant Month 1, 20-40% dev time for compliance

---

## 13. Open Questions and Decisions

### 13.1 Open Questions

1. **Which OCR/simplification provider for MVP?**
   - Options: GroupDocs, Adobe, Apryse, open-source
   - Owner: Technical Lead
   - Target Resolution: End of Phase 0

2. **Should we offer a freemium tier?**
   - Options: Free limited tier, free trial only
   - Owner: Product Manager
   - Target Resolution: Before MVP launch

3. **Which health plan segment first?**
   - Options: Medicare Advantage, Medicaid, employer plans
   - Owner: Founder/CEO
   - Target Resolution: Year 2 planning

4. **Cognitive load algorithm: build or buy?**
   - Options: Custom model, heuristic, third-party analytics
   - Owner: Technical Lead
   - Target Resolution: Phase 2

5. **Medical documents for Phase 2?**
   - Options: Include with HIPAA investment, continue to defer
   - Owner: Founder/CEO + Compliance Lead
   - Target Resolution: Year 2

### 13.2 Decisions Log

| Decision | Status | Date | Owner |
|----------|--------|------|-------|
| React/Node.js/PostgreSQL stack | Accepted | 2026-08-16 | Technical Lead |
| AWS multi-AZ deployment | Accepted | 2026-08-16 | Technical Lead |
| GroupDocs for MVP simplification | Proposed | 2026-08-16 | Technical Lead |
| WCAG 2.2 AA compliance | Accepted | 2026-08-16 | Product/UX |
| Senior-first product design | Accepted | 2026-08-16 | Founder/CEO |

---

## 14. Conclusion

The ClarityDoc PRD establishes a clear product direction grounded in geragogy, senior user needs, and market opportunity. It defines the features, user experience, roadmap, and metrics needed to move from BRD to implementation and launch.

**Current State**: BRD complete, FRD/PRD complete, ready to execute implementation plan.  
**Next Step**: Begin Phase 0 — Foundation setup and team onboarding.

---

**PRD Status**: Complete