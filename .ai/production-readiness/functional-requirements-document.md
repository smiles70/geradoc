# ClarityDoc Functional Requirements Document (FRD)

**Document Version**: 1.0  
**Created**: August 16, 2026  
**Status**: Approved  
**Based On**: BRD v1.0, Technical Specifications, Operational Requirements  
**Approach**: Process v9.5 + Geragogy-First Design

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | August 16, 2026 | Process v9.5 + Kimberly Miles | Initial FRD creation |

---

## Table of Contents

1. [Introduction](#introduction)
2. [Scope and Objectives](#scope-and-objectives)
3. [Actors and Stakeholders](#actors-and-stakeholders)
4. [Functional Architecture](#functional-architecture)
5. [Use Cases](#use-cases)
6. [Detailed Functional Requirements](#detailed-functional-requirements)
7. [Business Rules](#business-rules)
8. [Data Requirements](#data-requirements)
9. [State Transitions](#state-transitions)
10. [Interface Requirements](#interface-requirements)
11. [Error Handling](#error-handling)
12. [Traceability Matrix](#traceability-matrix)

---

## 1. Introduction

This Functional Requirements Document (FRD) defines the functional behavior of ClarityDoc, a geragogy-based document simplification platform for seniors (65+) and their caregivers. It details what the system must do, the actors that interact with it, and the rules that govern its behavior.

The FRD is derived from the ClarityDoc Business Requirements Document (BRD) and is intended to guide developers, QA engineers, and UX designers during implementation.

---

## 2. Scope and Objectives

### 2.1 Scope

This document covers the functional requirements for the ClarityDoc MVP, including:
- User registration, authentication, and role management
- Document upload, processing, and storage
- Text extraction, simplification, and key information extraction
- Cognitive load management and backend-governed UI state
- Action item extraction, prioritization, and tracking
- Caregiver coordination and permissions
- Subscription and payment management
- Notifications and reminders
- Accessibility and senior-focused UI behavior

### 2.2 Objectives

- Provide clear, unambiguous functional requirements for implementation
- Define actor interactions and system behavior
- Establish business rules for data and workflow governance
- Enable test case generation for QA
- Serve as a reference for UI/UX design and development

### 2.3 Out of Scope

- Medical document processing (HIPAA complexity deferred)
- Medical advice or clinical decision support
- Real-time emergency alerts
- International expansion
- Clinical system integrations

---

## 3. Actors and Stakeholders

### 3.1 Primary Actors

**Senior User (Primary)**:
- Uploads and manages personal documents
- Receives simplified explanations
- Tracks and completes action items
- Controls caregiver access
- Manages account and preferences

**Adult Child Caregiver (Secondary)**:
- Receives access invitations from senior users
- Views shared documents and action items
- Assists with actions
- Receives notifications about user struggles

### 3.2 System Actors

**Document Processing Service**:
- Extracts text from uploaded documents
- Classifies document type
- Simplifies language
- Identifies action items

**Cognitive Load Service**:
- Collects telemetry
- Estimates cognitive state
- Governs UI complexity
- Recommends interface state

**Notification Service**:
- Sends reminders
- Notifies caregivers
- Delivers system messages

### 3.3 Stakeholders

- **Founder/CEO**: Kimberly Miles
- **Future Product Manager**: Product owner
- **Engineering Team**: Implementation and testing
- **UX/Senior Design Team**: Interface and accessibility
- **Compliance/Security Lead**: Privacy and security
- **Senior Users**: End users
- **Caregivers**: Secondary end users

---

## 4. Functional Architecture

### 4.1 Major Functional Components

```
┌─────────────────────────────────────────────────────────────┐
│                    ClarityDoc Functional                    │
│                       Architecture                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   User      │  │  Document   │  │  Cognitive  │        │
│  │ Management  │  │  Processing │  │    Load     │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│         │                │                │                │
│         └────────────────┴────────────────┘                │
│                          │                                  │
│                   ┌──────▼──────┐                          │
│                   │   Simplification &    │                │
│                   │   Action Extraction   │                │
│                   └──────┬──────┘                          │
│                          │                                  │
│  ┌─────────────┐  ┌──────▼──────┐  ┌─────────────┐        │
│  │  Caregiver  │  │   Action    │  │ Notification│        │
│  │  Management │  │   Items     │  │   Service   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Functional Boundaries

- **User Management**: Account lifecycle, preferences, roles
- **Document Processing**: Ingestion, OCR, classification, extraction
- **Simplification Engine**: Text transformation, confidence scoring
- **Cognitive Load**: Telemetry, state estimation, UI governance
- **Action Management**: Extraction, prioritization, tracking, reminders
- **Caregiver Coordination**: Invitations, permissions, notifications
- **Subscription Management**: Plans, billing, trials

---

## 5. Use Cases

### 5.1 Use Case: Upload and Simplify a Document

**UC-001: Upload and Simplify a Document**

| Field | Description |
|-------|-------------|
| **Actor** | Senior User |
| **Preconditions** | User is authenticated and on dashboard |
| **Trigger** | User initiates document upload |
| **Basic Flow** | 1. User selects or drags document to upload<br>2. System validates file type and size<br>3. System stores document in S3<br>4. System extracts text and classifies document<br>5. System simplifies document text<br>6. System extracts key information and action items<br>7. System presents simplified document to user |
| **Postconditions** | Document is saved, simplified, and displayed |
| **Exception Flows** | Invalid file: show error with guidance<br>Processing timeout: show progress and retry option<br>Extraction failure: allow re-upload or contact support |

### 5.2 Use Case: Manage Action Items

**UC-002: Complete an Action Item**

| Field | Description |
|-------|-------------|
| **Actor** | Senior User or Caregiver |
| **Preconditions** | Action items exist for a processed document |
| **Trigger** | User selects an action item to complete |
| **Basic Flow** | 1. User views action item list<br>2. User selects action item<br>3. System shows detailed guidance<br>4. User marks action complete<br>5. System updates progress<br>6. System offers positive reinforcement |
| **Postconditions** | Action item marked complete, progress updated |
| **Exception Flows** | User cannot complete: offer caregiver help<br>Action item has passed deadline: show urgency and guidance |

### 5.3 Use Case: Invite a Caregiver

**UC-003: Invite a Caregiver**

| Field | Description |
|-------|-------------|
| **Actor** | Senior User |
| **Preconditions** | Senior user has an account and at least one document |
| **Trigger** | Senior user wants caregiver help |
| **Basic Flow** | 1. Senior user opens caregiver settings<br>2. Senior user enters caregiver email<br>3. System sends invitation<br>4. Caregiver accepts invitation<br>5. Senior user approves document-level access<br>6. Caregiver can view shared documents |
| **Postconditions** | Caregiver has approved access to selected documents |
| **Exception Flows** | Caregiver does not respond: send reminder<br>Senior user revokes access: caregiver access disabled immediately |

### 5.4 Use Case: Receive Simplified Guidance

**UC-004: Adjust Simplification Level**

| Field | Description |
|-------|-------------|
| **Actor** | Senior User |
| **Preconditions** | User is viewing a simplified document |
| **Trigger** | User finds content too simple or too complex |
| **Basic Flow** | 1. User selects a different simplification level<br>2. System retrieves or generates new version<br>3. System displays adjusted content<br>4. System remembers preference for future |
| **Postconditions** | User sees content at preferred level |
| **Exception Flows** | Level not available: show explanation and nearest option |

---

## 6. Detailed Functional Requirements

### 6.1 User Management

**FR-UM-001: User Registration**
- The system shall allow users to register with email and password
- The system shall validate email format and uniqueness
- The system shall enforce password strength (minimum 10 characters, one number, one special character)
- The system shall send a verification email

**FR-UM-002: User Login**
- The system shall authenticate users with email and password
- The system shall lock account after 5 failed attempts
- The system shall support "Remember Me" for 30 days
- The system shall display plain-language error messages for failed login

**FR-UM-003: Senior and Caregiver Roles**
- The system shall support the Senior role and Caregiver role
- The system shall allow a senior to have multiple caregivers
- The system shall allow a caregiver to support multiple seniors
- The system shall distinguish permissions by role

**FR-UM-004: User Preferences**
- The system shall allow users to set font size (small, medium, large, extra-large)
- The system shall allow users to enable high contrast mode
- The system shall allow users to set notification preferences
- The system shall persist preferences across sessions

### 6.2 Document Upload and Ingestion

**FR-DU-001: File Upload**
- The system shall accept PDF, PNG, JPG, JPEG, HEIC, and email .eml/.msg files
- The system shall reject files larger than 50MB in MVP
- The system shall reject unsupported file types with clear explanation
- The system shall scan all uploads for viruses and malware

**FR-DU-002: Upload Progress**
- The system shall display upload progress for files > 5MB
- The system shall notify user if upload fails with specific reason
- The system shall allow users to cancel an upload in progress
- The system shall support drag-and-drop and click-to-upload

**FR-DU-003: Document Metadata**
- The system shall record document name, upload date, file type, and file size
- The system shall store original document securely in S3
- The system shall generate a unique document identifier
- The system shall track document status (uploaded, processing, complete, failed)

### 6.3 Document Processing

**FR-DP-001: Text Extraction**
- The system shall extract text from PDF and image files
- The system shall preserve document page structure
- The system shall identify scanned vs. native PDFs
- The system shall report extraction confidence

**FR-DP-002: Document Classification**
- The system shall classify documents into insurance, financial, government, legal, or unknown
- The system shall display classification to user with confidence indicator
- The system shall allow users to correct misclassification
- The system shall use corrected labels to improve classification

**FR-DP-003: Key Information Extraction**
- The system shall extract dates, amounts, names, addresses, and account numbers
- The system shall link extracted data to document source pages
- The system shall flag low-confidence extractions for review
- The system shall handle multiple currencies where applicable

**FR-DP-004: Plain English Simplification**
- The system shall simplify complex language into plain English
- The system shall preserve original meaning and critical details
- The system shall support three simplification levels
- The system shall display confidence scores for simplification
- The system shall allow users to view original text alongside simplified text

### 6.4 Cognitive Load Management

**FR-CL-001: Telemetry Collection**
- The system shall collect interaction time, help requests, and page scroll behavior
- The system shall not collect personal content or document text for telemetry
- The system shall aggregate telemetry at the session level
- The system shall store telemetry for 90 days

**FR-CL-002: Cognitive State Estimation**
- The system shall estimate user cognitive load based on telemetry
- The system shall identify high strain, medium load, and mastery states
- The system shall update cognitive state after each significant interaction
- The system shall use stability thresholds before changing UI state

**FR-CL-003: UI Complexity Governance**
- The system shall recommend interface complexity based on cognitive state
- The system shall never automatically change complexity without user awareness
- The system shall allow users to override recommended complexity
- The system shall remember user complexity preferences

### 6.5 Action Items

**FR-AI-001: Action Extraction**
- The system shall extract required and optional actions from documents
- The system shall identify action deadlines
- The system shall identify responsible party (user, provider, third party)
- The system shall estimate action priority

**FR-AI-002: Action Prioritization**
- The system shall sort action items by urgency and importance
- The system shall highlight deadline-sensitive actions
- The system shall display recommended order of completion
- The system shall allow users to reorder actions manually

**FR-AI-003: Action Tracking**
- The system shall allow users to mark actions as not started, in progress, or complete
- The system shall record completion date
- The system shall show progress summary
- The system shall allow users to undo accidental completion

**FR-AI-004: Reminders**
- The system shall send reminders for deadline-sensitive actions
- The system shall allow users to set custom reminder times
- The system shall respect user notification preferences
- The system shall not send more than one reminder per day per action

### 6.6 Caregiver Coordination

**FR-CG-001: Caregiver Invitations**
- The system shall allow seniors to invite caregivers via email
- The system shall send plain-language invitation emails
- The system shall track invitation status (pending, accepted, declined, revoked)
- The system shall expire unaccepted invitations after 14 days

**FR-CG-002: Caregiver Permissions**
- The system shall require senior approval for each document a caregiver can view
- The system shall allow seniors to revoke caregiver access at any time
- The system shall allow seniors to set action-assistance permissions
- The system shall log all permission changes

**FR-CG-003: Caregiver Notifications**
- The system shall notify caregivers of senior opt-in struggle events
- The system shall not notify caregivers of routine activity
- The system shall allow seniors to disable caregiver notifications
- The system shall include privacy-preserving summaries in notifications

### 6.7 Notifications

**FR-NT-001: Notification Channels**
- The system shall support in-app, email, and SMS notifications
- The system shall allow users to enable/disable each channel
- The system shall format all notifications in plain language
- The system shall include unsubscribe links in emails

**FR-NT-002: Notification Types**
- The system shall send document processing completion notifications
- The system shall send action reminder notifications
- The system shall send caregiver invitation notifications
- The system shall send security and account notifications

### 6.8 Subscription and Billing

**FR-SB-001: Subscription Plans**
- The system shall offer monthly and annual subscription plans
- The system shall support free trial periods
- The system shall display plan features in plain language
- The system shall allow users to cancel subscriptions

**FR-SB-002: Payment Processing**
- The system shall integrate with Stripe for payment processing
- The system shall not store full credit card numbers
- The system shall send receipts and invoices via email
- The system shall handle payment failures gracefully

### 6.9 Search and Document Management

**FR-SD-001: Document List**
- The system shall display a list of user documents
- The system shall allow sorting by date, type, and status
- The system shall support search by document name and type
- The system shall show processing status for each document

**FR-SD-002: Document Deletion**
- The system shall allow users to delete documents
- The system shall confirm deletion with plain-language warning
- The system shall permanently remove document data within 30 days
- The system shall log all deletion requests

**FR-SD-003: Data Export**
- The system shall allow users to export their documents and data
- The system shall support PDF and JSON export formats
- The system shall provide export within 30 days of request
- The system shall not charge for data export

---

## 7. Business Rules

### 7.1 Document Processing Rules

**BR-001**: A document cannot be simplified until it has been successfully uploaded and text extracted.

**BR-002**: The system shall not process documents containing executable code or macros.

**BR-003**: All document content shall remain associated with the uploading user's account.

**BR-004**: Original documents shall not be altered during processing.

**BR-005**: Simplified content shall include source references to the original document.

### 7.2 Security and Privacy Rules

**BR-006**: User passwords shall never be stored in plain text.

**BR-007**: Caregiver access requires explicit senior user permission per document.

**BR-008**: All PII shall be encrypted at the field level.

**BR-009**: Account deletion requests shall be fulfilled within 30 days.

**BR-010**: All access to user documents shall be logged.

### 7.3 Cognitive Load Rules

**BR-011**: UI complexity changes shall be governed by the backend.

**BR-012**: Users shall always be able to override backend UI complexity recommendations.

**BR-013**: Telemetry shall not include document content or personal data.

**BR-014**: Struggle detection shall trigger supportive, not punitive, interface responses.

### 7.4 Subscription Rules

**BR-015**: Free trial users shall have access to all MVP features.

**BR-016**: Subscription cancellation shall be effective at the end of the billing period.

**BR-017**: Refunds shall follow Stripe's standard refund policy.

---

## 8. Data Requirements

### 8.1 Data Entities

**User**:
- user_id (UUID, PK)
- email (unique, encrypted)
- password_hash
- first_name
- last_name
- phone (optional)
- role (senior, caregiver, admin)
- preferences (JSON)
- created_at
- updated_at
- deleted_at (soft delete)

**Document**:
- document_id (UUID, PK)
- user_id (FK)
- file_name
- file_type
- file_size
- storage_key (S3 object key)
- status (uploaded, processing, complete, failed)
- classification
- confidence_score
- created_at
- processed_at

**SimplifiedContent**:
- simplified_id (UUID, PK)
- document_id (FK)
- simplification_level
- content (JSON)
- confidence_score
- created_at

**ActionItem**:
- action_id (UUID, PK)
- document_id (FK)
- description
- deadline (optional)
- priority
- status (not_started, in_progress, complete)
- completed_at
- responsible_party

**CognitiveState**:
- state_id (UUID, PK)
- user_id (FK)
- session_id
- strain_score
- load_score
- mastery_score
- stability_score
- recommended_complexity
- created_at

**CaregiverRelationship**:
- relationship_id (UUID, PK)
- senior_user_id (FK)
- caregiver_user_id (FK)
- status (pending, active, revoked)
- permissions (JSON)
- created_at

### 8.2 Data Retention

- Original documents: 1 year after account closure
- Simplified content: 1 year after document deletion
- Telemetry data: 90 days
- Audit logs: 7 years
- User accounts: Deleted within 30 days of request

---

## 9. State Transitions

### 9.1 Document State Machine

```
[Uploaded] → [Processing] → [Complete]
                ↓
            [Failed] → [Retry] → [Processing]
```

**States**:
- `Uploaded`: Document received, awaiting processing
- `Processing`: OCR, extraction, simplification in progress
- `Complete`: Processing finished, results available
- `Failed`: Processing failed, requires intervention or retry
- `Retrying`: User or system triggered reprocessing

### 9.2 Action Item State Machine

```
[Not Started] → [In Progress] → [Complete]
      ↓              ↓             ↓
  [In Progress]  [Not Started] [Not Started]  (undo)
```

**States**:
- `Not Started`: Action identified, not yet addressed
- `In Progress`: User has started the action
- `Complete`: User has finished the action
- Users can move backward through states

### 9.3 Cognitive Load State Machine

```
[Mastery] ←→ [Normal Load] ←→ [High Strain]
```

**States**:
- `Mastery`: User demonstrates confidence and speed
- `Normal Load`: User interacts with expected effort
- `High Strain`: User shows signs of confusion or difficulty

**Transitions**:
- Tracked via telemetry over time
- Only after stability threshold is met
- User can override at any time

---

## 10. Interface Requirements

### 10.1 Frontend Requirements

- All primary interfaces must be usable with keyboard only
- All interactive elements must have visible focus indicators
- All images and icons must have alt text
- All forms must have clear labels and error messages
- All modals must trap focus and be dismissible with Escape key
- All notifications must be announced to screen readers

### 10.2 Backend-Frontend Contract

- Backend shall provide approved UI state for each screen
- Frontend shall render only backend-approved UI states
- Frontend shall send telemetry events to backend
- Frontend shall not independently infer or override cognitive state
- All state changes shall be reversible

### 10.3 Accessibility Requirements

- Minimum 16pt body text (18pt preferred)
- 200% zoom support without loss of content
- 4.5:1 minimum contrast (7:1 preferred)
- Text spacing override support
- Screen reader compatibility
- No autoplay or sudden animations

---

## 11. Error Handling

### 11.1 User-Facing Errors

**Invalid File Upload**:
- Display clear, plain-language message
- Suggest accepted file types
- Allow immediate re-upload

**Processing Failure**:
- Show empathetic message
- Explain document may need better scan
- Offer retry or contact support
- Do not show technical error codes

**Login Failure**:
- Generic message for invalid credentials
- Clear lockout message after repeated attempts
- Link to password recovery

**Payment Failure**:
- Explain in plain language
- Suggest checking payment details
- Provide option to retry later

### 11.2 System Errors

- All errors shall be logged with context
- Critical errors shall trigger alerts
- User shall be notified only if action needed
- System shall degrade gracefully

---

## 12. Traceability Matrix

| FRD ID | BRD Section | User Story | Test Case | Status |
|--------|-------------|------------|-----------|--------|
| FR-UM-001 | Section 6.1 | US-Registration | TC-REG-001 | Not Started |
| FR-UM-002 | Section 6.1 | US-Login | TC-LOG-001 | Not Started |
| FR-DU-001 | Section 6.2 | US-Upload | TC-UP-001 | Not Started |
| FR-DP-001 | Section 6.3 | US-Processing | TC-PRO-001 | Not Started |
| FR-DP-004 | Section 6.3 | US-Simplification | TC-SIM-001 | Not Started |
| FR-CL-001 | Section 6.4 | US-CognitiveLoad | TC-CL-001 | Not Started |
| FR-AI-001 | Section 6.5 | US-Actions | TC-ACT-001 | Not Started |
| FR-CG-001 | Section 6.6 | US-Caregiver | TC-CG-001 | Not Started |
| FR-NT-001 | Section 6.7 | US-Notifications | TC-NOT-001 | Not Started |
| FR-SB-001 | Section 6.8 | US-Subscription | TC-SUB-001 | Not Started |
| FR-SD-001 | Section 6.9 | US-Search | TC-SEA-001 | Not Started |

---

## 13. Conclusion

This Functional Requirements Document provides the complete functional specification for ClarityDoc. It defines what the system must do, who interacts with it, the rules that govern its behavior, and the data it manages.

All functional requirements trace back to the ClarityDoc BRD and are designed with geragogy, accessibility, and senior user safety as foundational principles.

**Next Step**: Use this FRD to generate test cases and begin implementation of Phase 0.

---

**FRD Status**: Complete