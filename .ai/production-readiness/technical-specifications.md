# ClarityDoc Technical Specifications

**Document Version**: 1.0  
**Created**: August 16, 2026  
**Status**: Draft  
**Based On**: ADR-0002 + Research Findings + Functional Requirements

---

## Executive Summary

This document defines the technical architecture and specifications for ClarityDoc, incorporating research findings on document processing APIs, NONI UI/UX principles, and established architectural patterns for senior-focused systems.

---

## System Architecture Overview

### High-Level Architecture

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

### Architecture Principles

**NONI UI/UX Principles Applied:**
- Backend authority for all UI state transitions
- Cognitive load monitoring for interface complexity
- Progressive disclosure based on user stability
- Signal-based architecture for document processing

**Research-Based Technical Decisions:**
- Microservice architecture for independent scaling
- Async processing for I/O-bound operations
- Evidence-linked document processing
- WCAG 2.2 AA compliance throughout

---

## Frontend Architecture

### Technology Stack

**Framework**: React.js + Next.js 14 (App Router)  
**Styling**: CSS Modules + Tailwind CSS (configured for WCAG 2.2 AA)  
**State Management**: React Context + React Query for server state  
**Forms**: React Hook Form with Zod validation  
**Accessibility**: Radix UI primitives + custom accessibility layer

### Component Architecture

**Design System:**
- Base component library with WCAG 2.2 AA compliance
- Modular type scale using CSS clamp()
- High contrast mode support
- Fluid typography (16px base, 200% zoom support)

**Core Components:**
```
src/
├── components/
│   ├── accessibility/
│   │   ├── HighContrastMode.tsx
│   │   ├── TextResizer.tsx
│   │   └── ScreenReaderOnly.tsx
│   ├── document/
│   │   ├── DocumentUploader.tsx
│   │   ├── DocumentViewer.tsx
│   │   └── SimplificationDisplay.tsx
│   ├── cognitive/
│   │   ├── CognitiveLoadMonitor.tsx
│   │   ├── ComplexitySelector.tsx
│   │   └── PacedInformation.tsx
│   └── ui/
│       ├── LargeButton.tsx
│       ├── ProgressIndicator.tsx
│       └── ReassuranceMessage.tsx
```

### Frontend API Specifications

**Document Upload API**
```typescript
interface DocumentUploadRequest {
  file: File;
  userId: string;
  caregiverId?: string;
}

interface DocumentUploadResponse {
  documentId: string;
  status: 'processing' | 'complete' | 'error';
  estimatedTime: number;
  message: string;
}
```

**Document Processing API**
```typescript
interface DocumentProcessingRequest {
  documentId: string;
  simplificationLevel: 'basic' | 'moderate' | 'detailed';
  userId: string;
}

interface DocumentProcessingResponse {
  documentId: string;
  simplifiedContent: string;
  extractedInfo: ExtractedInfo;
  actionItems: ActionItem[];
  confidence: number;
  originalContent: string;
}
```

**Cognitive State API**
```typescript
interface CognitiveStateRequest {
  userId: string;
  interactionType: 'upload' | 'view' | 'complete' | 'error';
  documentId?: string;
  timeSpent: number;
}

interface CognitiveStateResponse {
  strain: number;
  mastery: number;
  recommendedComplexity: 'basic' | 'moderate' | 'detailed';
  stabilityScore: number;
}
```

---

## Backend Architecture

### Technology Stack

**Framework**: Node.js 20+ with Express.js  
**API**: RESTful with OpenAPI 3.1 specification  
**Database**: PostgreSQL 15+ with pgBouncer connection pooling  
**Queue**: Bull (Redis-based) for async job processing  
**Cache**: Redis for session management and caching  
**File Storage**: AWS S3 with encryption

### Microservice Architecture

**Service Decomposition:**
```
backend/
├── services/
│   ├── document-ingestion/
│   │   ├── upload-handler.ts
│   │   ├── file-validator.ts
│   │   └── storage-service.ts
│   ├── document-processing/
│   │   ├── ocr-service.ts
│   │   ├── simplification-service.ts
│   │   ├── extraction-service.ts
│   │   └── action-extractor.ts
│   ├── cognitive-load/
│   │   ├── state-estimator.ts
│   │   ├── stability-monitor.ts
│   │   └── complexity-governor.ts
│   └── user-management/
│       ├── auth-service.ts
│       ├── caregiver-service.ts
│       └── preference-service.ts
├── api/
│   ├── routes/
│   │   ├── documents.ts
│   │   ├── users.ts
│   │   └── cognitive.ts
│   └── middleware/
│       ├── auth.ts
│       ├── rate-limit.ts
│       └── error-handler.ts
└── jobs/
    ├── document-processing-job.ts
    └── notification-job.ts
```

### API Specifications

**Document Upload Endpoint**
```
POST /api/v1/documents/upload
Content-Type: multipart/form-data

Request:
{
  "file": [binary],
  "userId": "string",
  "caregiverId": "string (optional)"
}

Response 200:
{
  "documentId": "uuid",
  "status": "processing",
  "estimatedTime": 30,
  "message": "We're now reading your document..."
}
```

**Document Processing Endpoint**
```
POST /api/v1/documents/{documentId}/process
Content-Type: application/json

Request:
{
  "simplificationLevel": "moderate",
  "userId": "string"
}

Response 200:
{
  "documentId": "uuid",
  "simplifiedContent": "string",
  "extractedInfo": {
    "documentType": "insurance_statement",
    "keyDates": ["2024-12-15"],
    "amounts": [150.00],
    "deadlines": ["2024-12-15"]
  },
  "actionItems": [
    {
      "id": "uuid",
      "description": "Review coverage changes",
      "deadline": "2024-12-15",
      "priority": "high"
    }
  ],
  "confidence": 0.92,
  "processingTime": 15
}
```

**Cognitive State Endpoint**
```
POST /api/v1/cognitive/state
Content-Type: application/json

Request:
{
  "userId": "string",
  "interactionType": "view",
  "documentId": "uuid",
  "timeSpent": 45
}

Response 200:
{
  "strain": 0.3,
  "mastery": 0.7,
  "recommendedComplexity": "moderate",
  "stabilityScore": 0.85,
  "message": "You're doing great! Ready for more detail?"
}
```

---

## Database Schema

### Core Tables

**Users Table**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  preferences JSONB DEFAULT '{}',
  cognitive_profile JSONB DEFAULT '{}'
);
```

**Documents Table**
```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  caregiver_id UUID REFERENCES users(id),
  original_filename VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  file_size BIGINT NOT NULL,
  storage_path VARCHAR(500) NOT NULL,
  document_type VARCHAR(100),
  processing_status VARCHAR(50) DEFAULT 'pending',
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  processed_at TIMESTAMP,
  confidence_score DECIMAL(3,2),
  INDEX idx_user_id (user_id),
  INDEX idx_status (processing_status)
);
```

**Simplified_Contents Table**
```sql
CREATE TABLE simplified_contents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id),
  simplification_level VARCHAR(20) NOT NULL,
  simplified_content TEXT NOT NULL,
  original_content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  confidence_score DECIMAL(3,2),
  INDEX idx_document_id (document_id)
);
```

**Action_Items Table**
```sql
CREATE TABLE action_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id),
  description TEXT NOT NULL,
  deadline DATE,
  priority VARCHAR(20) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  completed_at TIMESTAMP,
  INDEX idx_document_id (document_id),
  INDEX idx_status (status)
);
```

**Cognitive_States Table**
```sql
CREATE TABLE cognitive_states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  document_id UUID REFERENCES documents(id),
  strain_level DECIMAL(3,2) NOT NULL,
  mastery_level DECIMAL(3,2) NOT NULL,
  interaction_type VARCHAR(50) NOT NULL,
  time_spent INTEGER NOT NULL,
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_recorded_at (recorded_at)
);
```

---

## External API Integration

### GroupDocs.Rewriter Cloud Integration

**Purpose**: Text simplification and summarization

**API Configuration:**
```typescript
const groupDocsConfig = {
  apiKey: process.env.GROUPDOCS_API_KEY,
  baseUrl: 'https://api.groupdocs.cloud',
  endpoints: {
    simplifyText: '/v1/simplify/text',
    simplifyDocument: '/v1/simplify/document'
  }
};
```

**Integration Pattern:**
```typescript
async function simplifyText(text: string, level: 'basic' | 'moderate' | 'detailed') {
  const response = await fetch(`${groupDocsConfig.baseUrl}${groupDocsConfig.endpoints.simplifyText}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${groupDocsConfig.apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      language: 'en',
      text: text,
      simplificationDegree: level
    })
  });
  return response.json();
}
```

### Adobe PDF Services Integration (Phase 2)

**Purpose**: Enhanced OCR and document extraction

**API Configuration:**
```typescript
const adobeConfig = {
  clientId: process.env.ADOBE_CLIENT_ID,
  clientSecret: process.env.ADOBE_CLIENT_SECRET,
  baseUrl: 'https://pdf-services.adobe.io'
};
```

### Docspeed Integration (Phase 2)

**Purpose**: Evidence-linked document processing

**API Configuration:**
```typescript
const docspeedConfig = {
  apiKey: process.env.DOCPEED_API_KEY,
  baseUrl: 'https://api.docspeed.ai',
  profile: 'grounded' // for evidence-linked processing
};
```

---

## Security Architecture

### Authentication & Authorization

**Authentication**: JWT-based authentication with refresh tokens  
**Authorization**: Role-based access control (RBAC)  
**Session Management**: Redis-based session storage with 24-hour expiration

### Data Encryption

**At Rest**: AES-256 encryption for all sensitive data  
**In Transit**: TLS 1.3 for all API communications  
**Key Management**: AWS KMS for encryption key management

### Compliance Implementation

**GDPR**: Data minimization, right to be forgotten, consent management  
**SOC 2**: Audit logging, access controls, change management  
**WCAG 2.2 AA**: Accessibility compliance in all UI components

---

## Deployment Architecture

### Infrastructure

**Cloud Provider**: AWS  
**Services**:
- **Compute**: EC2 with Auto Scaling Groups
- **Database**: Amazon RDS PostgreSQL (Multi-AZ)
- **Storage**: Amazon S3 with encryption
- **Cache**: Amazon ElastiCache Redis
- **CDN**: CloudFront for static content
- **Load Balancer**: Application Load Balancer
- **Monitoring**: CloudWatch, X-Ray

### Deployment Strategy

**MVP**: Single AWS Region with Auto Scaling  
**Phase 2**: Multi-region deployment with failover  
**CI/CD**: GitHub Actions with automated testing and deployment

### Environment Configuration

**Development**: Local development with Docker Compose  
**Staging**: AWS staging environment with reduced capacity  
**Production**: Multi-AZ production environment with auto-scaling

---

## Monitoring & Observability

### Metrics Collection

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

### Logging Strategy

**Application Logs**: Structured JSON logging to CloudWatch  
**Audit Logs**: All user actions and document access logged  
**Security Logs**: Authentication attempts, authorization failures  
**Performance Logs**: Database query times, API response times

---

## Performance Specifications

### Response Time Requirements

- Document upload: < 2 seconds
- Document processing: < 30 seconds (MVP), < 15 seconds (Phase 2)
- API response times: < 500ms (95th percentile)
- Page load time: < 3 seconds on 3G connection

### Throughput Requirements

- Concurrent users: 1,000 (MVP), 10,000 (Phase 2)
- Documents per day: 10,000 (MVP), 100,000 (Phase 2)
- API requests per second: 100 (MVP), 1,000 (Phase 2)

### Scalability Requirements

- Horizontal scaling of stateless services
- Database read replicas for query performance
- CDN caching for static content
- Queue-based processing for burst loads

---

## Technical Specifications Status

**Architecture**: Defined with research-based decisions  
**API Specifications**: RESTful with async/sync support  
**Database Schema**: Core tables designed  
**Security**: Comprehensive approach defined  
**Deployment**: AWS infrastructure specified  
**Monitoring**: Metrics and logging strategy defined

**Next Steps**: Operational requirements and SLAs definition