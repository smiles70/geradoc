# ADR-0004: Security Architecture

## Status

Accepted

## Date

August 16, 2026

## Context

ClarityDoc processes highly sensitive documents (insurance, financial, government, legal) for seniors who may be vulnerable to fraud, scams, and privacy violations. The security architecture must protect:
- Personal documents and financial information
- Senior users who are frequently targeted by scammers
- Caregiver access and coordination data
- Authentication and payment information
- AI-processed document contents

The Application Charter and BRD require compliance with GDPR, SOC 2, and WCAG 2.2 AA. The platform must also be safe for users with varying technical literacy and cognitive abilities.

## Decision

**Security Model**: Defense in depth with senior-specific protections  
**Authentication**: JWT-based authentication with refresh tokens and MFA for sensitive operations  
**Authorization**: Role-based access control (RBAC) with principle of least privilege  
**Encryption**: AES-256 at rest, TLS 1.3 in transit, field-level encryption for PII  
**Key Management**: AWS KMS for encryption key management  
**Network Security**: VPC with private subnets, WAF, DDoS protection  
**Compliance**: GDPR, SOC 2, WCAG 2.2 AA

### Authentication Architecture

**Primary Authentication**:
- Email/password with strength requirements
- JWT access tokens (15-minute expiration)
- Refresh tokens (7-day expiration, stored in Redis)
- Multi-factor authentication for password changes and caregiver access

**Caregiver Authentication**:
- Caregiver creates separate account
- Senior must explicitly grant access
- Caregiver sees only approved documents and actions
- Revocable access with immediate effect

**Session Management**:
- Redis-backed session storage
- Automatic session timeout after 30 minutes of inactivity
- Device-based session recognition
- Clear session termination options

### Authorization Model

**Roles**:
- **Senior User**: Full access to own documents and actions
- **Caregiver**: Limited access based on senior's permissions
- **Admin**: Platform management access, no document access
- **Support Staff**: View-only for support purposes with audit

**Access Control Rules**:
- Users can only access their own documents
- Caregivers can only access explicitly shared documents
- AI processing results belong to document owner
- No shared documents visible to unauthorized users

### Data Protection

**Document Storage**:
- All documents stored encrypted in S3 (AES-256)
- Separate S3 buckets by environment
- Document keys stored in KMS
- No plain-text document in application memory longer than necessary

**Database Protection**:
- PostgreSQL with encrypted storage (AWS RDS encryption)
- Field-level encryption for PII (social security, account numbers)
- Column-level security for sensitive fields
- Database audit logging

**API Security**:
- Rate limiting per user (100 requests/minute)
- Input validation and sanitization
- Output encoding to prevent XSS
- CSRF protection for state-changing operations
- Secure headers (CSP, HSTS, X-Frame-Options)

### Network Security

**VPC Architecture**:
- Public subnets for load balancers only
- Private subnets for application servers
- Isolated private subnets for database and cache
- Security groups restrict traffic by service

**Edge Protection**:
- AWS WAF for common web attacks
- AWS Shield for DDoS protection
- CloudFront for CDN and edge caching
- SSL/TLS termination at load balancer

### AI and Document Processing Security

**External API Security**:
- API keys stored in AWS Secrets Manager
- No API keys in code or configuration files
- Request signing where supported
- Circuit breakers for external API failures

**AI Output Safety**:
- All simplified content reviewed for hallucination
- Confidence scores displayed for user transparency
- User can report incorrect simplifications
- Audit trail for all AI processing

### Compliance Implementation

**GDPR**:
- Consent management for data processing
- Data subject rights (access, deletion, portability)
- Privacy by design principles
- Data protection impact assessment
- 72-hour breach notification process

**SOC 2**:
- Security controls implementation and monitoring
- Access controls and review procedures
- Change management processes
- Audit logging and evidence collection
- Annual third-party audit

**WCAG 2.2 AA**:
- Accessibility as security for users with disabilities
- Secure interactions work with assistive technology
- No security measures block accessibility

### Senior-Specific Security

**Scam Protection**:
- Education about common senior scams
- Warnings about unusual account activity
- Family member notification options
- Easy reporting of suspicious activity

**Simple Security Communication**:
- Security notifications in plain language
- Clear action items for users
- No technical jargon
- Phone support for security concerns

**Account Recovery**:
- Multiple verification methods
- Family member verification support
- Clear recovery process documentation
- Fraud detection during recovery attempts

## Consequences

**Positive Consequences**:
- Strong protection for sensitive senior user data
- Compliance with healthcare-adjacent data handling expectations
- Trust-building for vulnerable user base
- Defensible security posture for enterprise partnerships
- Foundation for future HIPAA compliance

**Negative Consequences**:
- Increased development time for security features (15-20%)
- Additional infrastructure cost for encryption and compliance
- More complex user authentication flows
- Additional operational overhead for security monitoring
- Restrictions on rapid feature development

**Operational Implications**:
- Security review required for all features
- Quarterly security audits
- Annual SOC 2 audit
- Security incident response plan must be maintained
- Security training required for all team members

## Alternatives Considered

**Alternative 1: OAuth-Only Authentication**
- Use Google/Facebook login only
- **Rejected**: Not all seniors have or trust social accounts, reduces platform independence

**Alternative 2: Minimal Security (MVP, Enhance Later)**
- Basic security in MVP, add compliance later
- **Rejected**: Document data is too sensitive and user base too vulnerable to delay security

**Alternative 3: On-Premises Infrastructure**
- Self-hosted servers for maximum control
- **Rejected**: Too much operational burden for early stage, no benefit over AWS HIPAA-eligible

**Alternative 4: Zero-Trust Everything**
- Zero-trust for all services and users
- **Rejected**: Overly complex for MVP, implement in Phase 2 as needed

**Chosen Approach**:
Defense-in-depth with senior-specific protections provides appropriate security for sensitive document data while remaining implementable for an early-stage team.

## Related Decisions

- ADR-0002: Technology Framework Selection
- ADR-0003: Deployment Strategy
- SECURITY.md: Detailed security policies and procedures
- CODEOWNERS: Security domain ownership

---

*Generated with Process v9.5 - Nelson Repo Hygiene*