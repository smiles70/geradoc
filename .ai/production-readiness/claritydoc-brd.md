# ClarityDoc Business Requirements Document (BRD)

**Document Version**: 1.0  
**Created**: August 16, 2026  
**Status**: Complete  
**Prepared By**: Process v9.5 + Kimberly Miles  
**Approach**: Geragogy-Based Information Transformation Platform

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | August 16, 2026 | Process v9.5 + Kimberly Miles | Initial BRD creation |

---

## Executive Summary

ClarityDoc is a geragogy-based information transformation platform designed to convert complex, confusing documents into clear, actionable guidance for seniors (65+) and their caregivers. This BRD provides comprehensive requirements for building a platform that addresses the documented market gap where 61.2 million seniors with health literacy challenges struggle with insurance letters, financial statements, legal documents, and government forms.

**Market Opportunity**: $46.9 billion senior care technology market by 2031 (CAGR 7.4%)  
**Target Launch**: MVP within 12-15 months  
**Capital Required**: $2.5-6M total ($500K-1M seed round)  
**Timeline to Profitability**: Year 3-4

This BRD incorporates research-based insights from existing document processing solutions, NONI UI/UX design principles for senior-focused interfaces, and comprehensive technical architecture based on established microservice patterns.

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Business Objectives and Success Criteria](#business-objectives-and-success-criteria)
3. [Market Analysis and Competitive Landscape](#market-analysis-and-competitive-landscape)
4. [Target User Personas](#target-user-personas)
5. [Business Model and Pricing Strategy](#business-model-and-pricing-strategy)
6. [Product Scope and Features](#product-scope-and-features)
7. [User Stories and Acceptance Criteria](#user-stories-and-acceptance-criteria)
8. [UI/UX Requirements](#uiux-requirements)
9. [Functional Specifications](#functional-specifications)
10. [Technical Architecture](#technical-architecture)
11. [Non-Functional Requirements](#non-functional-requirements)
12. [Security and Compliance Requirements](#security-and-compliance-requirements)
13. [Integration Requirements](#integration-requirements)
14. [Data Requirements and Models](#data-requirements-and-models)
15. [Performance and Scalability Requirements](#performance-and-scalability-requirements)
16. [Monitoring and Reporting Requirements](#monitoring-and-reporting-requirements)
17. [Support and Maintenance Requirements](#support-and-maintenance-requirements)
18. [Deployment and Migration Requirements](#deployment-and-migration-requirements)
19. [Risk Mitigation and Contingency Planning](#risk-mitigation-and-contingency-planning)

---

## 1. Business Objectives and Success Criteria

### 1.1 Primary Business Objectives

**Strategic Objectives:**
- Establish ClarityDoc as the leading senior-focused document simplification platform
- Achieve 50K active subscribers by Year 3
- Build defensible market position through geragogy-based design and AI integration
- Establish strategic partnerships with 3-5 health plans by Year 2

**Financial Objectives:**
- Year 1: $900K revenue with 100 paying subscribers
- Year 2: $3.6M revenue with 5K customers
- Year 3: $9M revenue with 50K customers
- Year 4: Positive EBITDA ($2M+)
- Year 5: $36M+ revenue, $12M+ EBITDA

**Impact Objectives:**
- Help 500K+ seniors understand their documents by Year 5
- Enable 1M+ successful document-based actions
- Reduce family caregiver burden by 30% for users
- Measurable improvements in health outcomes for partner health plans

### 1.2 Success Criteria

**Product Success Metrics:**
- **Comprehension Improvement**: 70%+ of users report ≥50% comprehension improvement
- **User Satisfaction**: NPS >50, "Would recommend" >80%, Ease of use 8/10+
- **Behavioral Outcomes**: 75%+ of recommended actions completed in 30 days
- **Decision Confidence**: 7/10+ average decision confidence

**Business Success Metrics:**
- **Customer Acquisition**: Year 1: 100 DTC subscribers, Year 2: 500+ DTC subscribers
- **Retention**: Monthly churn <4% (healthcare SaaS average: 7.5%)
- **Economics**: CAC <$200 (Year 1), <$150 (Year 2+), LTV $281+
- **Partnerships**: Year 2: 3+ health plan contracts signed

**Go/No-Go Decision Gates:**
- **4 months (POC)**: GO if 80%+ comprehension improvement, <5% churn, ≥30% WTP
- **18 months (MVP)**: GO if 100+ paying customers, NPS >40, <4% churn, health plan interest

---

## 2. Market Analysis and Competitive Landscape

### 2.1 Market Opportunity

**Total Addressable Market (TAM)**: $46.9 billion (Senior care technology market by 2031)  
**Serviceable Addressable Market (SAM)**: $3.7-5.6 billion (Healthcare information + senior health literacy platforms)  
**Serviceable Obtainable Market (SOM)**: $3.7-28 million (0.1-0.5% of SAM with focused execution)

### 2.2 Target Market Segments

**Primary Market**: Seniors 65+ with health literacy challenges
- 61.2 million seniors in the US
- 50-60% have documented health literacy gaps
- Average out-of-pocket healthcare burden: $7,242/year

**Secondary Market**: Adult children caregivers (45-65)
- 63 million family caregivers in the US (50% increase since 2015)
- 1 in 5 experience high financial strain from caregiving
- Seeking tools to help parents effectively

**Enterprise Market**: Healthcare systems and health plans
- High volume of patient support calls about document confusion
- Value-based care models fail when patients don't understand instructions
- CMS mandates health education (2024+) but lacks effective senior-friendly tools

### 2.3 Competitive Analysis

**Direct Competitors**: None combining geragogy + documents + caregiver focus

**Indirect Competitors**:
- **Healthcare Translation Services**: Translate medical documents to English, but don't simplify for comprehension
- **Senior Care Platforms**: Track health records and coordinate care, but don't help understand documents
- **Patient Education Programs**: Generic health literacy training, not document-specific
- **AI Medical Documentation**: Auto-summarizes clinical conversations, provider-facing not patient-facing

**Competitive Advantages**:
- Geragogy-first approach based on research-backed principles
- Senior-specific UI/UX design from NONI patterns
- Evidence-linked document processing for trust and transparency
- Caregiver integration with user control
- Real-life relevance in every interaction

---

## 3. Target User Personas

### 3.1 Primary Persona: Margaret (Senior User)

**Demographics**:
- Age: 72
- Status: Recently widowed, living independently
- Tech Comfort: Low to moderate
- Health: Some vision decline, early cognitive concerns

**Goals**:
- Understand insurance letters and financial statements
- Maintain independence in managing affairs
- Avoid feeling stupid or overwhelmed by paperwork
- Stay connected to family through technology

**Pain Points**:
- Confusing insurance renewal letters
- Complex financial statements after husband's death
- Fear of making wrong decisions
- Technology anxiety when systems require digital navigation

**Success Criteria**:
- Can upload and understand documents independently
- Feels confident in document-related decisions
- Experiences reduced anxiety around paperwork
- Maintains sense of independence and dignity

### 3.2 Secondary Persona: David (Adult Child Caregiver)

**Demographics**:
- Age: 52
- Status: Helping 78-year-old mother after father's death
- Tech Comfort: High
- Time Availability: Limited due to work and family commitments

**Goals**:
- Help mother understand important documents
- Ensure mother makes good decisions
- Reduce own burden and stress
- Feel confident that mother is safe and supported

**Pain Points**:
- Mother's bank statements are full of terminology he doesn't have time to explain
- Worried mother might make financial mistakes
- Limited time to provide thorough explanations
- Guilt about not being able to help more

**Success Criteria**:
- Mother can understand documents independently when possible
- Can help mother at a higher level when needed
- Reduced stress about mother's welfare
- Efficient use of limited time

---

## 4. Business Model and Pricing Strategy

### 4.1 Revenue Streams

**Direct-to-Consumer (B2C)**:
- **Pricing**: $15-25/month subscription
- **Billing**: Monthly subscription with annual discount
- **Features**: Unlimited document processing, priority support, caregiver access

**B2B2C (Health Plans, Insurance Companies)**:
- **Pricing**: $0.50-2.00 PMPM (Per Member Per Month)
- **Contract**: Enterprise agreements with minimum commitments
- **Features**: Branded interface, integration with member portals, bulk pricing

**B2B (Healthcare Clinics, Senior Living Communities)**:
- **Pricing**: Custom enterprise licensing
- **Contract**: Annual enterprise agreements
- **Features**: White-label solutions, custom integrations, dedicated support

### 4.2 Unit Economics

**Customer Lifetime Value (LTV)**: $281 (based on 25-month lifetime, 4% churn)  
**Customer Acquisition Cost (CAC)**: $150 (digital marketing blend)  
**LTV:CAC Ratio**: 1.87:1 (target 3:1 through optimization)

---

## 5. Product Scope and Features

### 5.1 MVP Scope (In Scope)

**Document Types**:
- Insurance documents (policies, renewal letters, coverage explanations)
- Financial documents (bank statements, investment statements, billing)
- Government forms (Social Security, tax documents, pension information)
- Legal documents (simplified will/healthcare directive summaries)

**Core Features**:
- Document upload (PDF, image, email)
- Geragogy-based simplification engine
- Plain English summaries
- Extracted key information (dates, amounts, actions)
- Prioritized action items
- Emotional reassurance messages
- Senior dashboard
- Caregiver coordination tools
- Subscription management

### 5.2 Out of Scope (Phase 1)

**Will NOT Include**:
- Medical document processing (HIPAA complexity deferred)
- Medical advice or clinical decision support
- Real-time alerts or emergency response
- Integration with healthcare provider systems
- Telehealth or direct provider communication
- Prescription management
- AI chatbot for diagnosis

---

## 6. User Stories and Acceptance Criteria

*Note: Detailed user stories and acceptance criteria are provided in the Functional Requirements document. This section provides a summary by feature area.*

### 6.1 Document Upload and Ingestion
- US-1.1: Easy document upload without technical barriers
- US-1.2: Clear post-upload status and next steps
- US-1.3: Caregiver-initiated uploads with user permission

### 6.2 Document Processing and Analysis
- US-2.1: Automatic document type identification
- US-2.2: Key information extraction and display
- US-2.3: Clear notification of processing issues

### 6.3 Document Simplification
- US-3.1: Complex language simplification
- US-3.2: Meaning preservation in simplification
- US-3.3: Adjustable simplification levels

### 6.4 Action Items and Prioritization
- US-4.1: Clear required actions display
- US-4.2: Action completion tracking
- US-4.3: Reminder functionality

### 6.5 Emotional Support and Reassurance
- US-5.1: Normalization of document confusion
- US-5.2: User-controlled information pace
- US-5.3: Trust and transparency indicators

### 6.6 Senior-Focused User Interface
- US-6.1: Large text and high contrast
- US-6.2: Simple navigation patterns
- US-6.3: Consistent interface behavior

### 6.7 Cognitive Load Management
- US-7.1: Struggle detection and support offers
- US-7.2: User-controlled complexity levels
- US-7.3: Gradual complexity progression

### 6.8 Caregiver Coordination
- US-8.1: Caregiver document status dashboard
- US-8.2: Collaborative assistance on specific actions
- US-8.3: Struggle notification with user opt-in

### 6.9 Search and Document Management
- US-9.1: Simple document search and access
- US-9.2: Progress tracking and history

---

## 7. UI/UX Requirements

### 7.1 NONI UI/UX Principles Applied

**Progressive Interface Complexity**:
- Backend governs all UI state transitions
- Cognitive load monitoring determines appropriate complexity
- Stability thresholds control interface progression
- User maintains control over pace and approach

**Emotional Safety First**:
- Normalizing messages throughout interface
- No pressure to understand everything immediately
- Multiple explanation levels available
- Option to ask for help without judgment

**Agency and Control**:
- User always maintains control over document understanding
- Simplification is a tool, not a replacement for reading
- User chooses when to use document assistance
- Caregiver access only with user permission

### 7.2 WCAG 2.2 AA Compliance Requirements

**Typography**:
- Minimum 16pt body text (18pt preferred)
- 200% zoom support without content loss
- High contrast ratio (4.5:1 minimum, 7:1 preferred)
- CSS clamp() for fluid typography
- Text spacing override support (1.4.12)

**Navigation**:
- Full keyboard navigation support
- Screen reader compatibility throughout
- One primary action per screen
- Large, clearly labeled buttons
- Consistent navigation patterns

**Content**:
- Plain language throughout interface
- Technical terms explained when first used
- Clear visual hierarchy
- Progress indicators for multi-step processes

---

## 8. Functional Specifications

*Note: Detailed functional specifications are provided in the Functional Requirements document. This section provides a summary by functional area.*

### 8.1 Document Processing Functions
- FR-1.1 through FR-1.6: Document upload and ingestion
- FR-2.1 through FR-2.7: Document processing and analysis
- FR-3.1 through FR-3.6: Document simplification

### 8.2 User Interface Functions
- FR-6.1 through FR-6.7: Senior-focused user interface
- FR-7.1 through FR-7.6: Cognitive load management

### 8.3 Collaboration Functions
- FR-8.1 through FR-8.6: Caregiver coordination

### 8.4 Data Management Functions
- FR-9.1 through FR-9.5: Search and document management

### 8.5 Integration Functions
- FR-10.1 through FR-10.12: Technical integration requirements

---

## 9. Technical Architecture

### 9.1 Technology Stack

**Frontend**: React.js + Next.js 14 (App Router)  
**Backend**: Node.js 20+ with Express.js  
**Database**: PostgreSQL 15+ with pgBouncer connection pooling  
**Cache**: Redis for session management and caching  
**File Storage**: AWS S3 with encryption  
**Queue**: Bull (Redis-based) for async job processing

### 9.2 Architecture Pattern

**Microservice Architecture**:
- Document ingestion service
- Document processing service
- Cognitive load management service
- User management service
- Notification service

**API Architecture**:
- RESTful with OpenAPI 3.1 specification
- Async and sync processing modes
- Backend authority for UI state transitions

**Data Architecture**:
- PostgreSQL for relational data
- Redis for caching and session management
- AWS S3 for document storage
- Database read replicas for performance

### 9.3 External API Integration

**MVP Integration**:
- GroupDocs.Rewriter Cloud API for text simplification
- Basic PDF parsing using Node.js libraries

**Phase 2 Integration**:
- Adobe PDF Services API for enhanced OCR
- Docspeed for evidence-linked processing
- Dapr microservice architecture

---

## 10. Non-Functional Requirements

### 10.1 Performance Requirements

- Document upload response time < 2 seconds
- Document processing time < 30 seconds (MVP), < 15 seconds (Phase 2)
- UI response time < 1 second for all interactions
- System uptime 99.9% (MVP), 99.95% (Phase 2)
- Support 1,000 concurrent users (MVP), 10,000 (Phase 2)

### 10.2 Scalability Requirements

- Horizontal scaling of stateless services
- Queue-based processing for burst loads
- Database read replicas for query performance
- CDN for static content delivery

### 10.3 Usability Requirements

- System usable by seniors with no prior training
- Keyboard-only navigation support
- Screen reader compatibility
- Mobile and desktop browser support
- Load completely on 3G connections within 10 seconds

---

## 11. Security and Compliance Requirements

### 11.1 Security Architecture

**Authentication**: JWT-based authentication with refresh tokens  
**Authorization**: Role-based access control (RBAC)  
**Encryption**: AES-256 at rest, TLS 1.3 in transit  
**Key Management**: AWS KMS for encryption keys

### 11.2 Compliance Requirements

**GDPR**: Data minimization, right to be forgotten, consent management  
**SOC 2**: Audit logging, access controls, change management  
**WCAG 2.2 AA**: Accessibility compliance in all UI components

---

## 12. Integration Requirements

### 12.1 External API Integrations

**MVP**:
- GroupDocs.Rewriter Cloud API for text simplification
- Stripe for payment processing

**Phase 2**:
- Adobe PDF Services API for enhanced OCR
- Docspeed for evidence-linked processing
- Dapr microservice patterns

### 12.2 Integration Specifications

**API Standards**:
- RESTful architecture
- OpenAPI 3.1 specification
- Async/sync processing modes
- Comprehensive error handling

---

## 13. Data Requirements and Models

### 13.1 Database Schema

**Core Tables**:
- Users (user accounts and preferences)
- Documents (uploaded document metadata)
- Simplified_Contents (processed document versions)
- Action_Items (extracted action items)
- Cognitive_States (user cognitive tracking)

### 13.2 Data Retention

- User documents: 1 year after account closure
- Processing logs: 90 days
- Audit logs: 7 years (compliance)
- User data: Deleted within 30 days of account closure request

---

## 14. Performance and Scalability Requirements

### 14.1 Performance SLAs

- Document upload: < 2 seconds (95th percentile)
- Document processing: < 30 seconds (MVP), < 15 seconds (Phase 2)
- API response: < 500ms (95th percentile)
- Page load: < 3 seconds on 3G connection

### 14.2 Scalability Strategy

- Auto-scaling based on CPU, memory, and queue depth
- Database read replicas for query performance
- CDN caching for static content
- Geographic distribution (Phase 2)

---

## 15. Monitoring and Reporting Requirements

### 15.1 Monitoring Metrics

**Application Metrics**:
- Request/response times
- Error rates by endpoint
- Document processing success rates
- User engagement metrics

**Business Metrics**:
- Document processing volume
- User retention rates
- Caregiver engagement
- Subscription metrics

**Cognitive Metrics**:
- Average strain levels by user
- Mastery progression over time
- Complexity level distribution
- Stability threshold breaches

### 15.2 Reporting Requirements

**Executive Dashboard**:
- Key performance indicators
- User growth and retention
- Revenue and subscription metrics
- System health status

**Operational Reports**:
- Daily system health
- Weekly performance summaries
- Monthly business reviews
- Quarterly compliance reports

---

## 16. Support and Maintenance Requirements

### 16.1 Support Tiers

**Tier 1 (User Support)**: 8-8 PM EST (MVP), 24/7 (Phase 2)  
**Tier 2 (Technical Support)**: 24/7 on-call rotation  
**Tier 3 (Engineering)**: As needed based on severity

### 16.2 Senior-Specific Support

- Plain language in all communications
- Phone support with patient, clear-speaking agents
- Option for caregiver to join support calls
- Screen reader-compatible support portal
- Alternative format options (Braille, large print)

---

## 17. Deployment and Migration Requirements

### 17.1 Deployment Strategy

**MVP**: Single AWS Region with Auto Scaling  
**Phase 2**: Multi-region deployment with failover  
**CI/CD**: GitHub Actions with automated testing and deployment

### 17.2 Migration Requirements

**Data Migration**:
- Pre-migration database backup
- Low-traffic period migration execution
- Post-migration data validation
- Immediate rollback capability

---

## 18. Risk Mitigation and Contingency Planning

### 18.1 Critical Risks

**Risk 1: Seniors don't adopt (low digital literacy)**
- **Probability**: Medium
- **Impact**: Critical
- **Mitigation**: WCAG 2.2 from day 1, weekly user testing, caregiver adoption first

**Risk 2: Churn >5%/month**
- **Probability**: Medium
- **Impact**: Critical
- **Mitigation**: Engagement features, NPS tracking, retention campaigns

**Risk 3: Health plans take 3+ years to close**
- **Probability**: High
- **Impact**: High
- **Mitigation**: Begin conversations Year 1, Medicare Advantage focus, CMS mandate lever

**Risk 4: Competitors enter space**
- **Probability**: High
- **Impact**: High
- **Mitigation**: Early brand building, health outcomes data, partnerships create switching costs

**Risk 5: WCAG/accessibility delays launch**
- **Probability**: Medium
- **Impact**: High
- **Mitigation**: Accessibility consultant Month 1, 20-40% dev time for compliance

**Risk 6: Willingness-to-pay < $15/month**
- **Probability**: Medium
- **Impact**: Medium
- **Mitigation**: MVP WTP survey early, freemium option, health plan subsidy path

### 18.2 Contingency Planning

**System Failures**:
- Alternate processing procedures
- Extended documentation and self-help resources
- Failover to alternate region (Phase 2)

**Vendor Issues**:
- Alternative providers identified
- Service level agreements in place
- Contract management and monitoring

---

## 19. Implementation Roadmap

### 19.1 MVP Phase (Months 1-4)

**Research & POC**:
- Validate core concept with real seniors
- Test willingness-to-pay
- Secure initial funding ($500K-1M)

**MVP Development**:
- Develop production backend & frontend
- Implement GroupDocs.Rewriter integration
- WCAG 2.2 AA compliance implementation
- Beta testing with 50+ real users

**Launch Preparation**:
- Health plan conversations begin
- Marketing materials development
- Support team hiring

### 19.2 Phase 2 (Months 5-18)

**Scale Direct-to-Consumer**:
- 500+ paid subscribers
- Expand to 3 document types
- Refine pricing & offerings
- Close first health plan partnership

**B2B2C Traction**:
- 2-3 health plan pilots launched
- Senior living partnerships (5+)
- Provider integrations begin
- Marketing investment scales

### 19.3 Phase 3 (Year 2-3)

**Profitability & Leadership**:
- Health plan partnerships = 50% of revenue
- 50K+ customers total
- Break-even or near-profitability
- Category leadership established

---

## 20. Approval and Sign-Off

### 20.1 Stakeholder Review

This BRD represents the comprehensive business and technical requirements for ClarityDoc. It incorporates:

- Strategic foundation from Application Charter
- Research-based technical decisions from API analysis
- Senior-focused UI/UX principles from NONI patterns
- Comprehensive functional and technical specifications
- Operational requirements and SLAs

**Founder/CEO**
- Name: Kimberly Miles
- Commitment: To lead this vision with integrity, user-first decision making, and long-term thinking

**Technical Lead** (To be hired)
- Commitment: To implement these requirements with technical excellence and senior-focused design

---

## Appendix A: Research Summary

**Document Processing APIs Research**: 5 categories of solutions identified
- Enterprise APIs (Adobe, ABBYY, Google Cloud)
- AI-powered processing (Cogneris, Docspeed, GroupDocs)
- UI/UX accessibility middleware (Apryse, intelligent accessibility systems)
- Backend architecture patterns (Dapr, Ray Data, Dropbox Riviera)
- NLP simplification APIs (Bitext, GroupDocs text processing)

**Key Technical Decisions**:
- MVP: GroupDocs.Rewriter Cloud for simplification
- Phase 2: Adobe PDF Services + Docspeed for enhanced processing
- Architecture: Dapr microservice patterns for scalability
- UI/UX: WCAG 2.2 AA compliance with NONI cognitive load principles

---

## Appendix B: Priority Matrix

**P0 (MVP)**: Core document processing, senior UI, basic simplification  
**P1 (MVP+)**: Action items, cognitive load management, emotional support  
**P2 (Phase 2)**: Caregiver features, advanced integrations, enhanced processing  
**P3 (Phase 3)**: Enterprise-scale performance, advanced compliance

---

**BRD Status**: Complete  
**Next Steps**: Stakeholder review and approval, technical implementation planning