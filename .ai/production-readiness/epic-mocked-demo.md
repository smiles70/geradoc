# Epic: Create Mocked Demo for ClarityDoc

**Epic ID**: EPC-001  
**Status**: Ready for Development  
**Created**: August 16, 2026  
**Process v9.5 Reference**: Implementation Plan Phase 0, BRD v1.0, PRD v1.0, FRD v1.0  
**Target Completion**: 4-6 weeks  
**Priority**: P0 (Critical for fundraising and user validation)

---

## 1. Epic Overview

### 1.1 Objective

Create a fully mocked, interactive demo of ClarityDoc that demonstrates the core product experience for seniors and caregivers without requiring real backend services, AI integrations, or production infrastructure. The demo will be used for:

- **Investor and stakeholder presentations**
- **Senior user validation sessions** (without real data processing)
- **Caregiver feedback sessions**
- **Health plan partner demonstrations**
- **Team alignment on product vision and UX**

### 1.2 Scope

**In Scope**:
- Static/clickable frontend demo (React/Next.js)
- Mock document upload flow
- Simulated document processing with realistic delays
- Pre-loaded simplified document outputs
- Mock action items and prioritization
- Mock caregiver dashboard and notifications
- Senior-friendly UI with WCAG 2.2 AA targeting
- Cognitive load simulation (backend UI state examples)
- Demo script and walkthrough guide
- Local development environment only

**Out of Scope**:
- Real document processing or AI integration
- Real backend API
- Real database
- Real authentication
- Production deployment
- Real payment processing
- Medical document handling

### 1.3 Success Criteria

- Demo runs locally and can be shown in browser without backend
- All 4 primary user journeys work end-to-end
- UI demonstrates geragogy and accessibility principles
- 5+ sample senior documents included
- Demo can be completed in under 10 minutes
- Non-technical stakeholders can run the demo
- Senior users can navigate without assistance

---

## 2. Business Justification

**Why This Epic Matters**:

1. **Fundraising**: A working demo is essential for seed round conversations
2. **User Validation**: Real seniors can interact with the concept before engineering investment
3. **Team Alignment**: Engineers, designers, and founders see the same target experience
4. **Partner Demos**: Health plans can visualize the member experience
5. **Risk Reduction**: Validate UI/UX assumptions before building production services

**Alignment to BRD**:
- Demonstrates core value proposition (BRD Section 1)
- Brings personas to life (BRD Section 3)
- Illustrates MVP features (BRD Section 5)
- Validates senior-first design (BRD Section 8)

**Alignment to Implementation Plan**:
- Directly supports Phase 0: Foundation
- Informs Phase 1: Core Document Processing with validated UX
- Reduces risk in Phase 2: User Experience and Cognitive Load

---

## 3. User Stories

### 3.1 Epic-Level User Stories

#### Story 1: First-Time Senior Experience
> **As a** senior user, **I want** to upload a sample document and see it simplified, **so that** I can understand if ClarityDoc would help me with my paperwork.

**Acceptance Criteria**:
- [ ] User can register/login with a one-click demo account
- [ ] User can select from 5 pre-loaded sample documents
- [ ] User sees a simulated processing screen with reassuring messages
- [ ] User sees a simplified version of the document in plain English
- [ ] User sees key information extracted (dates, amounts, actions)
- [ ] User can toggle between 3 simplification levels
- [ ] User can view the original document side-by-side

**FRD Traceability**: FR-UM-001, FR-DU-001, FR-DP-004, FR-CL-003

---

#### Story 2: Action Item Guidance
> **As a** senior user, **I want** to see what actions I need to take from my document, **so that** I don't miss important deadlines.

**Acceptance Criteria**:
- [ ] System displays 3-5 action items from the sample document
- [ ] Action items are prioritized by urgency
- [ ] Each action has a deadline, description, and step guidance
- [ ] User can mark actions as complete
- [ ] Completed actions show positive reinforcement
- [ ] Overdue actions are highlighted with calm, helpful messaging

**FRD Traceability**: FR-AI-001, FR-AI-002, FR-AI-003

---

#### Story 3: Caregiver Coordination
> **As a** caregiver, **I want** to see my mother's document status and help her with actions, **so that** I can support without taking over.

**Acceptance Criteria**:
- [ ] Demo supports switching to a caregiver persona
- [ ] Caregiver sees shared documents and action items
- [ ] Caregiver can view one action and offer guidance
- [ ] Caregiver can see a simulated "struggle alert" (with opt-in context)
- [ ] Caregiver can send a supportive message to the senior

**FRD Traceability**: FR-CG-001, FR-CG-002, FR-CG-003

---

#### Story 4: Cognitive Load and Reassurance
> **As a** senior user, **I want** the interface to adapt to my needs and reassure me, **so that** I feel confident and not overwhelmed.

**Acceptance Criteria**:
- [ ] Demo shows progressive disclosure (simple view first, more detail on demand)
- [ ] Demo includes reassurance messages ("It's okay to take your time")
- [ ] Demo shows a cognitive load indicator (for demonstration only)
- [ ] Demo allows user to switch complexity levels
- [ ] Demo includes large text and high contrast options

**FRD Traceability**: FR-CL-002, FR-CL-003

---

#### Story 5: Accessibility Demonstration
> **As a** senior user with vision or mobility challenges, **I want** to navigate the demo using only my keyboard, **so that** I know the real product will work for me.

**Acceptance Criteria**:
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are clearly visible
- [ ] Demo includes a screen reader-friendly heading structure
- [ ] Demo supports 200% zoom without content loss
- [ ] Demo includes high contrast mode toggle
- [ ] Demo uses plain, jargon-free language throughout

**FRD Traceability**: UI/UX Requirements, FR-UM-004

---

#### Story 6: Demo Presentation Mode
> **As a** founder or sales person, **I want** a guided demo script and scenario, **so that** I can confidently show ClarityDoc to investors and partners.

**Acceptance Criteria**:
- [ ] Demo includes a "Start Guided Tour" mode
- [ ] Tour highlights 5 key product moments
- [ ] Each step has speaker notes
- [ ] Demo can reset to initial state
- [ ] Demo includes a "Investor View" with key talking points

---

## 4. Functional Requirements

### 4.1 Demo Environment

**FR-DEMO-001: One-Click Demo Login**
- The demo shall provide a "Start Demo" button that creates a temporary session
- The demo shall not require password creation
- The demo shall display a disclaimer that no real data is processed

**FR-DEMO-002: Sample Document Library**
- The demo shall include at least 5 sample documents:
  - Insurance renewal letter
  - Bank statement
  - Medicare/Social Security notice
  - Property tax bill
  - Legal document (simplified will summary)
- Each sample shall have a realistic scanned/PDF appearance
- Each sample shall have pre-generated simplified output

**FR-DEMO-003: Simulated Processing**
- The demo shall simulate document processing with a 3-8 second delay
- The demo shall show reassuring progress messages
- The demo shall handle "processing error" as an optional demonstration
- The demo shall not make real API calls

### 4.2 Simplified Output Display

**FR-DEMO-004: Plain-English Summary**
- The demo shall display a plain-English summary for each sample document
- The summary shall be generated by human authors (not AI)
- The summary shall be accurate and realistic

**FR-DEMO-005: Key Information Cards**
- The demo shall display key information as cards:
  - Dates
  - Amounts
  - Deadlines
  - Contacts
  - Important numbers
- Each card shall link to a source page reference

**FR-DEMO-006: Simplification Levels**
- The demo shall support three levels:
  - **Simple**: Shortest, most basic language
  - **Standard**: Balanced detail and clarity
  - **Detailed**: More thorough while still plain language

### 4.3 Action Items and Progress

**FR-DEMO-007: Pre-Generated Action Items**
- The demo shall include 3-5 action items per sample document
- Action items shall include deadlines and priority
- Action items shall be sortable by urgency
- Users can mark actions as complete (state persists during session)

**FR-DEMO-008: Positive Reinforcement**
- The demo shall display a positive message when an action is marked complete
- The message shall be senior-appropriate (not overly juvenile)

### 4.4 Caregiver View

**FR-DEMO-009: Persona Switching**
- The demo shall allow switching between "Senior" and "Caregiver" views
- The caregiver view shall show shared documents and actions
- The caregiver view shall demonstrate permission controls

**FR-DEMO-010: Struggle Alert Simulation**
- The demo shall include a toggle to simulate a struggle alert
- The alert shall be framed as opt-in and privacy-respecting
- The caregiver can see the alert and respond

### 4.5 Accessibility and Senior UX

**FR-DEMO-011: Accessibility Controls**
- The demo shall include a font size toggle
- The demo shall include a high contrast toggle
- The demo shall include a text spacing toggle

**FR-DEMO-012: Reassurance Messaging**
- The demo shall display at least 5 reassurance messages throughout the flow
- Messages shall normalize confusion and encourage progress

---

## 5. Non-Functional Requirements

### 5.1 Performance

- Demo shall load in under 3 seconds on a standard laptop
- Simulated processing shall take 3-8 seconds
- Transitions between screens shall take under 500ms

### 5.2 Usability

- Demo shall be runnable without technical setup (or with simple `npm run dev`)
- Demo shall include a reset button
- Demo shall work offline after initial load

### 5.3 Maintainability

- Demo code shall use the same React/Next.js stack as planned MVP
- Demo components shall be reusable for production where possible
- Demo code shall be clearly separated from production logic

### 5.4 Accessibility

- Demo shall target WCAG 2.2 AA
- Demo shall pass automated axe-core checks
- Demo shall support keyboard-only navigation

---

## 6. Technical Approach

### 6.1 Architecture for Demo

**Frontend**: React + Next.js 14 with App Router  
**Styling**: Tailwind CSS  
**State**: Local React state or lightweight store (no backend)  
**Mock Data**: JSON files for documents, simplifications, and action items  
**Routing**: Next.js App Router  
**Animations**: CSS transitions only (avoid motion-sensitive users)

### 6.2 Mock Data Structure

```json
{
  "documents": [
    {
      "id": "doc-001",
      "type": "insurance",
      "title": "Medicare Advantage Renewal Letter",
      "fileName": "medicare-renewal-2026.pdf",
      "pages": 2,
      "originalText": "...",
      "simplified": {
        "simple": "...",
        "standard": "...",
        "detailed": "..."
      },
      "keyInfo": [
        {"type": "date", "label": "Deadline", "value": "October 15, 2026", "page": 1}
      ],
      "actions": [
        {"id": "act-001", "description": "Review your plan", "deadline": "2026-10-15", "priority": "high", "status": "not_started"}
      ]
    }
  ]
}
```

### 6.3 Component Structure

```
demo/
├── components/
│   ├── DemoLayout.tsx
│   ├── DocumentUploader.tsx
│   ├── ProcessingScreen.tsx
│   ├── DocumentViewer.tsx
│   ├── SimplifiedView.tsx
│   ├── KeyInfoCards.tsx
│   ├── ActionItems.tsx
│   ├── CaregiverDashboard.tsx
│   ├── AccessibilityControls.tsx
│   └── ReassuranceBanner.tsx
├── data/
│   ├── sample-documents.json
│   ├── simplified-outputs.json
│   └── mock-users.json
├── pages/
│   ├── index.tsx (landing)
│   ├── demo.tsx (main demo)
│   ├── senior.tsx
│   └── caregiver.tsx
├── hooks/
│   └── useDemoState.ts
└── README.md
```

### 6.4 Demo vs. Production Code

- Demo components shall be in `app/demo/` or `src/demo/` to avoid mixing with production
- Mock services shall be clearly named (e.g., `mockDocumentProcessor.ts`)
- Reusable components should be moved to `src/components/` when production begins

---

## 7. UX/UI Requirements

### 7.1 Demo Flow

```
Landing Page
    ↓
"Start Demo" or "Guided Tour"
    ↓
Demo Dashboard (senior persona)
    ↓
Select or Upload Sample Document
    ↓
Simulated Processing Screen
    ↓
Simplified Document View
    ↓
View Key Information and Action Items
    ↓
Optional: Switch to Caregiver View
    ↓
Optional: Adjust Accessibility Settings
    ↓
End of Demo / Reset
```

### 7.2 Screen Requirements

**Landing Screen**:
- ClarityDoc logo and value proposition
- Large "Start Demo" button
- "Guided Tour" secondary button
- Brief explanation that no real data is processed

**Dashboard Screen**:
- Welcome message by persona
- Sample document cards with thumbnails
- Recent activity (mock)
- "Upload New Document" button (selects from sample library)

**Processing Screen**:
- Progress indicator with calm, reassuring message
- Estimated time remaining
- Cancel/Skip option
- No technical jargon

**Document View Screen**:
- Document name and type
- Simplification level tabs
- Plain-English summary
- Key information cards
- Action items list
- Source page indicators

**Caregiver View Screen**:
- List of supported seniors (one demo senior)
- Shared documents
- Action items needing help
- Simulated struggle alert

---

## 8. Mock Data Requirements

### 8.1 Sample Documents (Minimum 5)

1. **Medicare Advantage Renewal Letter**
   - Type: Insurance
   - Pages: 2
   - Key Info: Deadline, premium change, network changes
   - Actions: Review plan, compare options, call Medicare

2. **Bank Statement with Unusual Charge**
   - Type: Financial
   - Pages: 1
   - Key Info: Statement date, balance, suspicious charge
   - Actions: Review charges, contact bank, monitor account

3. **Social Security Income Verification**
   - Type: Government
   - Pages: 1
   - Key Info: Benefit amount, effective date, verification code
   - Actions: Save for taxes, update records, share with tax preparer

4. **Property Tax Bill**
   - Type: Government
   - Pages: 1
   - Key Info: Amount due, due date, payment options
   - Actions: Pay tax, set reminder, check exemptions

5. **Legal Document Summary (Healthcare Directive)**
   - Type: Legal
   - Pages: 3
   - Key Info: Effective date, healthcare agent, decision types
   - Actions: Review with family, update if needed, store safely

### 8.2 Sample Simplification Outputs

Each sample shall have:
- Simple (1-2 paragraphs)
- Standard (3-5 paragraphs)
- Detailed (6-8 paragraphs)

All written in plain English, Flesch-Kincaid Grade 6-8.

### 8.3 Sample Action Items

Each document shall have 3-5 pre-generated action items with:
- Description in plain language
- Deadline (where applicable)
- Priority (high, medium, low)
- Step-by-step guidance (2-4 steps)

---

## 9. Dependencies

### 9.1 Internal Dependencies

- **BRD v1.0** approved
- **PRD v1.0** approved
- **FRD v1.0** approved
- **Design tokens** established (or simple Tailwind defaults)

### 9.2 External Dependencies

- Node.js 20+ and npm
- React/Next.js installed
- No external API keys required
- No payment processor integration

### 9.3 Team Dependencies

- 1 Frontend Developer
- 1 UX/Senior Designer
- 1 Content Writer for sample simplifications
- Optional: 1 Product Manager for demo script

---

## 10. Definition of Done (DoD)

- [ ] All 6 epic-level user stories implemented
- [ ] Demo runs locally with `npm run dev`
- [ ] Demo includes 5 sample documents
- [ ] Demo passes axe-core accessibility scan
- [ ] Demo script and walkthrough guide created
- [ ] Demo tested with at least 3 non-technical users
- [ ] Demo tested with at least 1 senior user
- [ ] Demo code committed to repository
- [ ] Demo README includes setup and usage instructions
- [ ] Product team signs off on demo

---

## 11. Acceptance Criteria

### 11.1 Epic Acceptance Criteria

- [ ] A new user can start the demo in under 60 seconds
- [ ] A user can upload a sample document and see simplified output within 10 seconds
- [ ] A user can complete the senior journey without assistance
- [ ] A user can view the caregiver journey
- [ ] The demo demonstrates WCAG 2.2 AA principles
- [ ] The demo is suitable for investor and senior user presentations
- [ ] The demo can be reset and replayed

### 11.2 Demo Quality Criteria

- [ ] No broken links or 404s
- [ ] No JavaScript console errors
- [ ] Consistent senior-friendly typography and spacing
- [ ] All sample documents display correctly
- [ ] All action items can be marked complete

---

## 12. Timeline and Milestones

### 12.1 Suggested Sprint Breakdown

**Sprint 1: Setup and Shell**
- Set up demo project structure
- Create landing page and navigation
- Implement accessibility controls

**Sprint 2: Senior Journey**
- Implement document selection/upload
- Build simulated processing screen
- Create simplified document viewer
- Add key information cards

**Sprint 3: Actions and Caregiver**
- Build action item components
- Implement completion and reinforcement
- Build caregiver view
- Add struggle alert simulation

**Sprint 4: Content and Polish**
- Finalize 5 sample documents and simplifications
- Add reassurance messaging throughout
- Implement guided tour and demo script
- Run accessibility and usability testing

**Sprint 5: Demo and Iterate**
- Conduct senior user testing
- Iterate based on feedback
- Create demo script and speaker notes
- Final commit and demo day

### 12.2 Key Milestones

- **M1 (Week 1)**: Demo skeleton and navigation
- **M2 (Week 2)**: Senior document simplification flow
- **M3 (Week 3)**: Actions and caregiver view
- **M4 (Week 4)**: Content, accessibility, and guided tour
- **M5 (Week 5-6)**: Senior user testing and iteration

---

## 13. Risks and Mitigations

### 13.1 Risks

**R1: Content creation takes longer than expected**
- **Mitigation**: Use 3 documents for initial demo, add 2 more after feedback

**R2: Senior users find demo confusing despite simplicity**
- **Mitigation**: Weekly senior user testing starting Week 2

**R3: Demo scope expands into prototype**
- **Mitigation**: Strictly enforce "no real backend" rule

**R4: Accessibility issues discovered late**
- **Mitigation**: Run automated accessibility checks from Day 1

**R5: Reusable components get mixed with production code**
- **Mitigation**: Keep demo in separate directory, document clearly

---

## 14. Traceability

| Epic/Story | BRD Ref | PRD Ref | FRD Ref | Implementation Plan |
|------------|---------|---------|---------|---------------------|
| Story 1: First-Time Senior | §6, §8 | §6.1 F-002 | FR-DP-004 | Phase 1 |
| Story 2: Action Items | §6.4 | §6.1 F-004 | FR-AI-001 | Phase 1 |
| Story 3: Caregiver | §6.8 | §6.1 F-007 | FR-CG-002 | Phase 3 |
| Story 4: Cognitive Load | §7 | §6.1 F-006 | FR-CL-003 | Phase 2 |
| Story 5: Accessibility | §7.2 | §8.3 | UI/UX Req | Phase 0 |
| Story 6: Demo Script | §20 | §10 | N/A | Phase 0 |

---

## 15. Appendices

### 15.1 Demo Script Outline

**Opening (1 minute)**:
- "Meet Margaret. She's 72 and just received this Medicare letter."
- "Like millions of seniors, she finds this paperwork confusing."

**Upload (1 minute)**:
- "Margaret uploads her document just like taking a photo."
- "ClarityDoc processes it, keeping her information private."

**Simplification (2 minutes)**:
- "Here's the original letter and the simplified version."
- "Notice the plain language, the key info cards, and the source references."

**Actions (1 minute)**:
- "ClarityDoc extracts the actions Margaret needs to take."
- "She can mark them complete and get reminders."

**Caregiver (1 minute)**:
- "If Margaret wants, her son David can help."
- "He sees only what she shares and gets alerts if she's stuck."

**Closing (1 minute)**:
- "ClarityDoc turns confusion into confidence."
- "We're building the first senior-first document clarity platform."

### 15.2 Demo Narrative for Investors

1. **Problem**: 61.2M seniors struggle with complex documents
2. **Solution**: Geragogy-based AI simplification with caregiver support
3. **Demo**: Live walkthrough of senior and caregiver experience
4. **Market**: $46.9B opportunity, no direct competitor
5. **Ask**: $500K-1M seed to build MVP and validate with 100 users

---

## 16. Conclusion

This epic creates a mocked, interactive demo that validates the ClarityDoc product concept, supports fundraising, and provides a concrete user experience target for the engineering team. It is the highest-value, lowest-risk next step after completing the BRD, FRD, PRD, and implementation plan.

**Next Step**: Create user story tickets from this epic and begin Sprint 1.

---

**Epic Status**: Ready for Development