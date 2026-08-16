# Architecture

## System Context

ClarityDoc is a geragogy-based information transformation platform that converts complex documents (insurance, financial, government, legal) into clear, actionable guidance for seniors (65+) and their caregivers. The system operates within a healthcare information ecosystem, processing documents that contain sensitive personal information while maintaining compliance with accessibility and privacy standards.

### System Boundaries

**Within Scope (MVP):**
- Document upload and storage (PDF, image, email)
- Text extraction and simplification
- Key information extraction (dates, amounts, actions)
- Senior-focused user interface
- Caregiver coordination
- Cognitive load management

**External Actors:**
- Senior users (primary)
- Adult child caregivers (secondary)
- External document processing APIs (GroupDocs, Adobe)
- Payment processor (Stripe)
- Healthcare/insurance partners (future)

## Architecture Overview

ClarityDoc follows a modern microservice architecture with backend authority for UI state transitions, inspired by NONI's Interface State Control System (ISCS) principles. The architecture emphasizes:

- **Backend-driven UI complexity**: Cognitive state determines interface progression
- **Signal-based architecture**: Services emit telemetry; backend governs UI transitions
- **Senior-first accessibility**: WCAG 2.2 AA compliance throughout
- **Scalability**: Independent scaling of processing services
- **Security**: End-to-end encryption and compliance-first design

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     ClarityDoc Platform                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │   Frontend    │    │   Backend    │    │   External   │ │
│  │   React/Next  │◄──►│  Node.js/    │◄──►│   APIs       │ │
│  │   .js        │    │  Express     │    │              │ │
│  └──────────────┘    └──────────────┘    └──────────────┘ │
│         │                   │                   │          │
│         │                   │                   │          │
│         ▼                   ▼                   ▼          │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │   CDN/Static │    │ PostgreSQL   │    │  AWS S3      │ │
│  │   Content    │    │  Database    │    │  Document    │ │
│  │              │    │              │    │  Storage     │ │
│  └──────────────┘    └──────────────┘    └──────────────┘ │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Components

### Frontend Layer

**Technology**: React.js + Next.js 14 with App Router

**Key Components**:
- **Document Uploader**: Drag-and-drop interface with senior-friendly error messages
- **Document Viewer**: Accessible document display with simplified content
- **Simplification Display**: Plain language explanations with confidence indicators
- **Action Items Dashboard**: Prioritized tasks with completion tracking
- **Cognitive Load Monitor**: Invisible component that sends telemetry to backend
- **Reassurance Messages**: Emotional support messaging system

**Accessibility Layer**:
- Large typography (16pt+ base, 200% zoom support)
- High contrast mode
- Screen reader compatibility
- Keyboard-only navigation
- WCAG 2.2 AA compliant components

### Backend Layer

**Technology**: Node.js 20+ with Express.js

**Microservices**:
1. **Document Ingestion Service**
   - File upload validation and processing
   - Storage in AWS S3
   - Upload progress tracking

2. **Document Processing Service**
   - OCR and text extraction
   - Document type classification
   - Key information extraction
   - Text simplification via external APIs
   - Action item identification

3. **Cognitive Load Service**
   - Cognitive state estimation
   - Stability threshold monitoring
   - UI complexity recommendations
   - Telemetry aggregation

4. **User Management Service**
   - Authentication and authorization
   - User preferences and cognitive profiles
   - Caregiver access management

5. **Notification Service**
   - Action reminders
   - Caregiver notifications
   - Progress updates

### Data Layer

**Primary Database**: PostgreSQL 15+
- User accounts and preferences
- Document metadata
- Simplified content
- Action items and progress
- Cognitive state history

**Cache**: Redis
- Session management
- Processing queue
- API response caching

**Object Storage**: AWS S3 with encryption
- Original document files
- Processed outputs
- User attachments

### External API Integration Layer

**MVP**:
- **GroupDocs.Rewriter Cloud**: Text simplification
- **Stripe**: Payment processing

**Phase 2**:
- **Adobe PDF Services**: Enhanced OCR and document extraction
- **Docspeed**: Evidence-linked document processing

## Data Flow

### Document Processing Flow

```
User uploads document
    ↓
Frontend → Backend Ingestion Service
    ↓
File validation and storage in S3
    ↓
Document Processing Service extracts text
    ↓
Document type classification
    ↓
Key information extraction
    ↓
Text simplification via external API
    ↓
Action item extraction and prioritization
    ↓
Cognitive Load Service determines interface complexity
    ↓
Backend returns approved UI state to frontend
    ↓
Frontend renders senior-friendly document view
```

### Cognitive State Flow

```
User interacts with document
    ↓
Telemetry events sent to backend
    ↓
Cognitive Load Service updates state estimation
    ↓
Stability threshold evaluation
    ↓
Recommended complexity level determined
    ↓
Backend approves next UI state
    ↓
Frontend receives approved UI state
    ↓
Interface complexity adjusted accordingly
```

## Dependencies

### Internal Dependencies

**Services**:
- Frontend depends on all backend APIs
- Document Processing depends on Document Ingestion
- Cognitive Load depends on all user interactions
- Notification depends on all event-producing services

**Data Dependencies**:
- All services depend on PostgreSQL
- Document storage depends on AWS S3
- Session management depends on Redis

### External Dependencies

**APIs**:
- GroupDocs.Rewriter Cloud (MVP)
- Adobe PDF Services (Phase 2)
- Docspeed (Phase 2)
- Stripe (all phases)

**Infrastructure**:
- AWS (EC2, RDS, S3, ElastiCache, CloudFront)
- GitHub (source control, CI/CD)
- Vercel or AWS (frontend hosting)

## Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend** | React.js + Next.js 14 | Strong accessibility ecosystem, SSR, large talent pool |
| **Backend** | Node.js/Express | Full-stack JavaScript, fast API development |
| **Database** | PostgreSQL | ACID compliance, strong security, JSON support |
| **Cache** | Redis | Session management, queue, caching |
| **Queue** | Bull (Redis) | Async document processing |
| **Storage** | AWS S3 | HIPAA-eligible, encrypted, scalable |
| **CDN** | CloudFront | Global performance for senior users |
| **AI/ML** | OpenAI/GroupDocs | State-of-the-art text simplification |
| **Payment** | Stripe | Senior-friendly payment flows, subscription management |

## Deployment Architecture

### Environments

**Development**:
- Local Docker Compose setup
- Local PostgreSQL and Redis
- Mocked external APIs

**Staging**:
- AWS staging environment
- Reduced capacity but production-like configuration
- Integration with external API sandboxes

**Production**:
- Multi-AZ AWS deployment
- Auto-scaling groups
- Database read replicas
- CDN for static content

### CI/CD Pipeline

1. **Source Control**: GitHub
2. **CI/CD**: GitHub Actions
3. **Testing**: Automated unit, integration, accessibility tests
4. **Deployment**: Staged deployment with canary releases
5. **Monitoring**: AWS CloudWatch, X-Ray

## Security Architecture

### Authentication & Authorization

- JWT-based authentication with refresh tokens
- Role-based access control (RBAC)
- Multi-factor authentication for sensitive operations
- Caregiver access with user permission

### Data Protection

- **At Rest**: AES-256 encryption for databases and S3
- **In Transit**: TLS 1.3 for all API communications
- **Keys**: AWS KMS for encryption key management
- **PII**: Field-level encryption for sensitive user data

### Compliance Controls

- **GDPR**: Consent management, data portability, right to deletion
- **SOC 2**: Audit logging, access reviews, change management
- **WCAG 2.2 AA**: Automated accessibility testing, manual audits

### Network Security

- VPC with private subnets for sensitive workloads
- Security groups limiting inbound/outbound traffic
- WAF for web application protection
- DDoS protection through AWS Shield

---

*Generated with Process v9.5 - Nelson Repo Hygiene*