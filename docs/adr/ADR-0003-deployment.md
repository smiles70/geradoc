# ADR-0003: Deployment Strategy

## Status

Accepted

## Date

August 16, 2026

## Context

ClarityDoc requires a deployment strategy that supports the needs of a geragogy-based document processing platform for seniors. The strategy must balance:
- Reliability and uptime for users who may rely on the platform for critical documents
- Scalability to handle document processing peaks
- Compliance with healthcare and accessibility requirements
- Cost-effectiveness during early growth phases
- Fast rollback capability to minimize senior user disruption
- Geographic distribution for low-latency access across the US

The operational requirements establish 99.9% uptime for MVP and 99.95% for Phase 2, with RTO of 4 hours and RPO of 1 hour.

## Decision

**Deployment Platform**: AWS with multi-AZ deployment  
**Container Strategy**: Docker containers with auto-scaling groups  
**CI/CD**: GitHub Actions with automated testing and staged deployment  
**Release Strategy**: Bi-weekly releases with feature flags  
**Rollback**: Automated rollback with P1/P2 triggers

### Environment Strategy

**Development**:
- Local Docker Compose
- Local PostgreSQL and Redis
- Mocked external APIs

**Staging**:
- AWS staging environment
- Production-like configuration at reduced capacity
- Sandbox external API integrations
- Used for senior user testing before production

**Production**:
- Multi-AZ AWS deployment
- Auto-scaling groups for application servers
- Multi-AZ RDS PostgreSQL
- ElastiCache Redis (multi-AZ)
- CloudFront CDN for static content
- S3 for document storage with cross-region replication

### Deployment Pipeline

```
Code Commit
    ↓
Automated Tests (Unit, Integration, Accessibility)
    ↓
Build Docker Images
    ↓
Deploy to Staging
    ↓
Senior User Validation on Staging
    ↓
Canary Production Deployment (5% traffic)
    ↓
Monitoring Period (30 minutes)
    ↓
Full Production Rollout
    ↓
Post-Deployment Monitoring
```

### Release Strategy

**MVP (Months 1-18)**:
- Bi-weekly releases with feature flags
- Direct staging-to-production with canary deployment
- Manual approval for production releases
- 4-hour maintenance windows monthly

**Phase 2 (Months 18-36)**:
- Weekly releases with blue-green deployment
- Automated canary analysis
- Multi-region deployment with failover
- 2-hour maintenance windows quarterly

### Auto-Scaling Strategy

**Application Servers**:
- Minimum: 2 instances
- Desired: 2-4 instances
- Maximum: 20 instances
- Scale out when CPU > 70% or queue depth > 1000
- Scale in when CPU < 30% for 10 minutes

**Document Processing Workers**:
- Minimum: 1 worker
- Desired: 2-10 workers
- Maximum: 50 workers
- Scale out when queue depth > 100
- Scale in when queue depth < 10 for 5 minutes

### Rollback Strategy

**Automatic Rollback Triggers**:
- Error rate > 5% for 5 minutes
- Complete service outage
- API response time > 2s (95th percentile) for 10 minutes

**Manual Rollback Triggers**:
- User-reported critical issues
- Accessibility regression
- Stakeholder decision to revert

### Disaster Recovery

**RTO (Recovery Time Objective)**: 4 hours  
**RPO (Recovery Point Objective)**: 1 hour  
**Backup Strategy**:
- Database: Daily snapshots + continuous WAL archiving
- Documents: Daily incremental + weekly full S3 cross-region replication
- Configuration: Version-controlled infrastructure as code

**Recovery Procedure**:
1. Detect failure through monitoring
2. Activate disaster recovery plan
3. Restore from most recent clean backup
4. Validate system functionality
5. Communicate with users

## Consequences

**Positive Consequences**:
- AWS provides HIPAA-eligible infrastructure for future medical document expansion
- Multi-AZ deployment meets 99.9% uptime SLA
- Auto-scaling handles document processing peaks without manual intervention
- Feature flags allow safe senior user testing
- Comprehensive rollback reduces risk of senior user disruption

**Negative Consequences**:
- AWS costs higher than smaller cloud providers
- AWS-specific knowledge required by operations team
- More complex deployment pipeline than single-server solution
- Cold start time for document processing workers

**Operational Implications**:
- Requires DevOps expertise from early stage
- 20-30% of development time should be allocated to operational tooling
- Monthly maintenance windows require user communication
- Need robust monitoring and alerting from day 1

## Alternatives Considered

**Alternative 1: Single VPS Deployment (DigitalOcean/Linode)**
- Lower cost
- Simpler initial setup
- **Rejected**: Cannot meet 99.9% SLA, no auto-scaling, limited disaster recovery

**Alternative 2: Heroku/Platform-as-a-Service**
- Fastest initial deployment
- Built-in CI/CD
- **Rejected**: Higher long-term costs, limited customization for cognitive load management, vendor lock-in

**Alternative 3: Multi-Cloud (AWS + GCP)**
- Highest availability
- Reduced vendor lock-in
- **Rejected**: Too complex and expensive for MVP, added operational burden

**Alternative 4: Kubernetes (EKS)**
- Excellent orchestration
- Strong scaling
- **Rejected**: Too complex for MVP team, can migrate later if needed

**Chosen Approach**:
AWS Auto Scaling Groups with Docker containers provides the best balance of reliability, scalability, and cost for the MVP while allowing future migration to Kubernetes if needed.

## Related Decisions

- ADR-0002: Technology Framework Selection (React/Node.js/PostgreSQL)
- ADR-0004: Security Architecture
- RUNBOOK.md: Operational procedures
- ROLLBACK.md: Rollback procedures

---

*Generated with Process v9.5 - Nelson Repo Hygiene*