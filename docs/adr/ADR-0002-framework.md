# ADR-0002: Technology Framework Selection

## Status

Accepted

## Date

August 16, 2026

## Context

ClarityDoc requires a technology framework that supports:
- Geragogy-based user interface (senior-friendly, accessible)
- Document processing and AI/ML capabilities
- High security and compliance standards (GDPR, SOC 2, WCAG 2.2 AA)
- Scalability to support 100K+ users by Year 3
- Subscription management and recurring billing
- HIPAA-eligible infrastructure for future medical document expansion

The Application Charter identified key technical requirements:
- WCAG 2.2 AA accessibility from day 1
- GDPR compliance for data privacy
- SOC 2 security standards
- Document upload and processing (PDF, image, email)
- AI/ML-powered text simplification
- Senior-friendly UI/UX requirements

## Decision

**Chosen Technology Stack:**

**Frontend:**
- **React.js + Next.js** - Modern React framework with server-side rendering, excellent for accessibility and SEO
- **Rationale**: Strong accessibility ecosystem, large component library, server-side rendering improves performance for seniors with slower connections

**Backend:**
- **Node.js/Express** - JavaScript runtime for scalable server-side applications
- **Rationale**: Full-stack JavaScript consistency, strong ecosystem, good for real-time features and API development

**Database:**
- **PostgreSQL** - Advanced open-source relational database
- **Rationale**: ACID compliance for financial transaction integrity, strong JSON support for document metadata, excellent security features

**Cloud Infrastructure:**
- **AWS (HIPAA-eligible)** - Amazon Web Services with BAA (Business Associate Agreement)
- **Rationale**: Market leader in HIPAA-eligible services, comprehensive compliance certifications, global availability, strong AI/ML services

**AI/ML Processing:**
- **OpenAI API or similar** - Document processing and text simplification
- **Rationale**: State-of-the-art language models, API-based (reduces infrastructure complexity), continuous improvements

**Payment Processing:**
- **Stripe** - Subscription management and payment processing
- **Rationale**: Excellent subscription management, senior-friendly payment flows, strong compliance, extensive documentation

**Additional Services:**
- **AWS Textract** - Document text extraction from PDFs/images
- **AWS S3** - Document storage with encryption
- **AWS CloudFront** - CDN for improved performance
- **AWS Lambda** - Serverless functions for specific processing tasks

## Consequences

**Positive Consequences:**
- Full-stack JavaScript reduces context switching and training overhead
- React ecosystem provides strong accessibility libraries and components
- AWS HIPAA-eligible infrastructure supports future medical document expansion
- PostgreSQL provides robust data integrity for financial transactions
- Stripe simplifies subscription management and compliance
- Modern stack with strong community support and long-term viability

**Negative Consequences:**
- AWS learning curve for team members unfamiliar with platform
- OpenAI API costs need monitoring and optimization at scale
- WCAG 2.2 AA compliance requires 20-40% additional development time
- PostgreSQL may require scaling considerations for 100K+ users
- Stripe fees (2.9% + 30¢ per transaction) impact margins

**Technical Debt Considerations:**
- Need to establish monitoring and cost optimization from day 1
- Must implement caching strategy for API calls to control costs
- Database indexing strategy critical for document search performance
- CDN configuration essential for senior users with variable connection speeds

## Alternatives Considered

**Alternative 1: Python/Django Stack**
- Django backend with React frontend
- **Rejected**: Python excellent for AI/ML but would require separate infrastructure for AI processing, increased complexity

**Alternative 2: Vue.js + Nuxt.js**
- Vue.js framework instead of React
- **Rejected**: Smaller ecosystem than React, fewer accessibility components, less senior developer talent pool

**Alternative 3: MongoDB Database**
- NoSQL document database
- **Rejected**: ACID compliance concerns for financial transactions, less mature security features than PostgreSQL

**Alternative 4: Google Cloud Platform**
- GCP instead of AWS
- **Rejected**: AWS has more mature HIPAA-eligible services and BAA process, larger talent pool

**Alternative 5: Self-Hosted Infrastructure**
- On-premises servers instead of cloud
- **Rejected**: Higher capital costs, compliance burden, scalability challenges, not aligned with modern SaaS practices

**Chosen Approach:**
React/Node.js/PostgreSQL on AWS provides the best balance of accessibility, compliance, scalability, and talent availability for a senior-focused SaaS platform.

## Related Decisions

- ADR-0001: Project Purpose and Scope (defines requirements for this stack)
- ADR-0003: Deployment Strategy (AWS-specific implementation)
- ADR-0004: Security Architecture (compliance implementation details)

## Implementation Requirements

**Phase 1 (MVP):**
- React + Next.js frontend with WCAG 2.2 AA compliance
- Node.js/Express backend with REST API
- PostgreSQL database with basic schema
- AWS S3 for document storage
- Stripe integration for subscriptions
- OpenAI API for document processing

**Phase 2 (Scale):**
- Database optimization and read replicas
- CDN optimization for global performance
- Advanced monitoring and alerting
- Cost optimization for AI/ML processing

**Phase 3 (Expansion):**
- Additional AWS services for medical document processing
- Enhanced security features for HIPAA compliance
- Advanced analytics and ML pipelines

---

*Generated with Process v9.5 - Nelson Repo Hygiene*