# Rollback Procedures

## Overview

This document defines rollback procedures for ClarityDoc. Rollbacks are used to restore the system to a previous known-good state when deployments, configuration changes, or database migrations cause issues. All rollback procedures prioritize senior user safety, data integrity, and rapid recovery.

**Target Audience**: Operations engineers, on-call developers, DevOps  
**Scope**: Production AWS environment  
**RTO (Recovery Time Objective)**: 4 hours  
**RPO (Recovery Point Objective)**: 1 hour

## Rollback Triggers

### Immediate Rollback Triggers (P1)

- Error rate > 5% for 5 minutes after deployment
- Complete service outage following deployment
- Document processing pipeline failure affecting all users
- Data integrity issues affecting user documents
- Security vulnerability introduced by deployment
- Major accessibility regression affecting senior users

### Standard Rollback Triggers (P2)

- Error rate > 1% for 15 minutes after deployment
- API response time > 2s (95th percentile) for 10 minutes
- Document processing time > 60 seconds for sustained period
- Critical feature not functioning correctly
- User support ticket volume spikes after deployment

### Planned Rollback Triggers

- Deployment window exceeding planned maintenance time
- Pre-deployment validation tests failing after go-live
- Compliance audit finding in new release
- Stakeholder decision to revert feature

## Rollback Procedures

### Application Rollback

**Target Time**: < 15 minutes  
**Impact**: Service interruption 1-5 minutes

**Step 1: Stop Current Deployment**
```bash
# Identify current deployment
kubectl get deployments -n claritydoc-prod
# OR for EC2
aws autoscaling describe-scaling-activities --auto-scaling-group-name claritydoc-prod-app
```

**Step 2: Identify Last Known Good Version**
```bash
# Get previous successful deployment
git log --oneline --graph --all | head -20
# Or from deployment history
aws ssm get-parameter --name /claritydoc/prod/last-successful-version
```

**Step 3: Initiate Rollback**

**For Containerized Deployment (Kubernetes)**:
```bash
kubectl rollout undo deployment/claritydoc-api -n claritydoc-prod
kubectl rollout status deployment/claritydoc-api -n claritydoc-prod
```

**For EC2/Auto Scaling**:
```bash
# Update launch template to previous version
aws autoscaling create-launch-configuration \
  --launch-configuration-name claritydoc-prod-app-previous \
  --image-id $PREVIOUS_AMI_ID \
  --instance-type m5.large

# Update auto scaling group
aws autoscaling update-auto-scaling-group \
  --auto-scaling-group-name claritydoc-prod-app \
  --launch-configuration-name claritydoc-prod-app-previous

# Terminate and replace instances
aws autoscaling start-instance-refresh \
  --auto-scaling-group-name claritydoc-prod-app
```

**Step 4: Verify Rollback**
```bash
# Check application version
curl https://api.claritydoc.com/health/version

# Check error rates
aws cloudwatch get-metric-statistics \
  --namespace AWS/ApplicationELB \
  --metric-name HTTPCode_Target_5XX_Count \
  --start-time $(date -u -d '5 minutes ago' +%Y-%m-%dT%H:%M:%SZ) \
  --end-time $(date -u +%Y-%m-%dT%H:%M:%SZ) \
  --period 60 \
  --statistics Sum \
  --dimensions Name=LoadBalancer,Value=claritydoc-prod-alb
```

### Database Rollback

**Target Time**: < 1 hour  
**Impact**: Service may be unavailable during restore

**Step 1: Assess Database Issue**
```bash
# Check migration status
npm run db:migration:status

# Identify problematic migration
# DO NOT run additional migrations
```

**Step 2: Stop Database Writes**
```bash
# Put application in maintenance mode
kubectl set env deployment/claritydoc-api MAINTENANCE_MODE=true -n claritydoc-prod

# Verify no active connections except rollback operations
psql -h $DB_HOST -U $DB_USER -d claritydoc_prod -c "
SELECT count(*) FROM pg_stat_activity WHERE state = 'active' AND query NOT LIKE '%pg_stat_activity%';
"
```

**Step 3: Restore from Backup**

**If using AWS RDS Snapshots**:
```bash
# Find most recent clean snapshot
aws rds describe-db-snapshots \
  --db-instance-identifier claritydoc-prod \
  --snapshot-type automated \
  --query 'DBSnapshots[?Status==`available`].DBSnapshotIdentifier' \
  --output text | head -5

# Restore from snapshot
aws rds restore-db-instance-from-db-snapshot \
  --db-instance-identifier claritydoc-prod-rollback \
  --db-snapshot-identifier <snapshot-id> \
  --db-instance-class db.t3.medium

# Wait for restore to complete
aws rds wait db-instance-available --db-instance-identifier claritydoc-prod-rollback

# Update application to use rollback database
# Then swap DNS or application connection string
```

**If using Point-in-Time Recovery**:
```bash
# Restore to specific point in time (within retention period)
aws rds restore-db-instance-to-point-in-time \
  --source-db-instance-identifier claritydoc-prod \
  --target-db-instance-identifier claritydoc-prod-rollback \
  --restore-time <timestamp>
```

**Step 4: Validate Data Integrity**
```sql
-- Check key table counts
SELECT count(*) FROM users;
SELECT count(*) FROM documents;
SELECT count(*) FROM action_items;

-- Verify no recent data corruption
SELECT max(created_at) FROM documents;
SELECT max(processed_at) FROM documents;
```

**Step 5: Re-enable Writes**
```bash
# Remove maintenance mode
kubectl set env deployment/claritydoc-api MAINTENANCE_MODE=false -n claritydoc-prod
```

### Configuration Rollback

**Target Time**: < 5 minutes  
**Impact**: Usually minimal, may require service restart

**Step 1: Identify Configuration Store**
- Environment variables (from Parameter Store or Secrets Manager)
- Feature flags (LaunchDarkly or similar)
- Application configuration files

**Step 2: Rollback Parameter**
```bash
# AWS Systems Manager Parameter Store
aws ssm put-parameter \
  --name /claritydoc/prod/api/max-file-size-mb \
  --type String \
  --value 50 \
  --overwrite

# Or restore previous version
aws ssm get-parameter-history \
  --name /claritydoc/prod/api/max-file-size-mb
```

**Step 3: Restart Affected Services**
```bash
# For containerized
kubectl rollout restart deployment/claritydoc-api -n claritydoc-prod

# For EC2
aws autoscaling start-instance-refresh \
  --auto-scaling-group-name claritydoc-prod-app
```

### Feature Flag Rollback

**Target Time**: < 2 minutes  
**Impact**: None, can be done live

```bash
# If using LaunchDarkly or similar
# Disable feature flag

# Example with custom flag service
curl -X POST https://api.claritydoc.com/admin/flags/<flag-name>/disable \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

## Rollback Validation

### Application Rollback Validation

1. **Health Check**:
   ```bash
   curl https://api.claritydoc.com/health
   curl https://claritydoc.com/health
   ```

2. **Error Rate Check**:
   - Wait 5 minutes
   - Verify error rate < 1%
   - Check PagerDuty for alert clearing

3. **Critical Path Test**:
   - Upload a test document
   - Verify document processing completes
   - Verify simplified output is correct
   - Verify senior user interface renders properly

4. **Database Connectivity**:
   - Verify application connects to correct database
   - Check no migration version mismatches

### Database Rollback Validation

1. **Data Counts Match Expected**:
   - Compare table counts with pre-deployment baseline
   - Verify no unexpected data loss

2. **Application Functional**:
   - Test document upload
   - Test user login
   - Test document retrieval

3. **Performance**:
   - Verify query response times
   - Check connection pool usage

### Configuration Rollback Validation

1. **Parameter Applied**:
   ```bash
   # Verify parameter value
   aws ssm get-parameter --name /claritydoc/prod/api/max-file-size-mb
   ```

2. **Service Restarted**:
   - Verify all instances running new configuration
   - Check application version/health

## Fallback Procedures

### If Application Rollback Fails

1. **Scale to Zero and Rebuild**:
   ```bash
   # Set desired capacity to 0
   aws autoscaling update-auto-scaling-group \
     --auto-scaling-group-name claritydoc-prod-app \
     --desired-capacity 0

   # Rebuild from clean source
   # Deploy from scratch using known-good commit
   ```

2. **Activate Static Maintenance Page**:
   - Switch CloudFront to maintenance origin
   - Display senior-friendly maintenance message
   - Provide phone support number

### If Database Rollback Fails

1. **Promote Read Replica**:
   ```bash
   # Promote rollback database to primary
   aws rds promote-read-replica \
     --db-instance-identifier claritydoc-prod-rollback
   ```

2. **Manual Data Recovery**:
   - If only partial data affected, identify and manually recover specific rows
   - Use audit logs to reconstruct recent changes

3. **Disaster Recovery**:
   - If all backups fail, initiate full disaster recovery plan
   - Contact AWS support
   - Notify stakeholders immediately

## Communication Plan

### Internal Communication

**P1 Rollback (Critical)**:
- **Immediately**: Page on-call team
- **5 minutes**: Engineering lead and founder notification
- **15 minutes**: Full team status update in Slack #incidents
- **30 minutes**: Executive update

**P2 Rollback (Standard)**:
- **Immediately**: Create incident ticket
- **15 minutes**: Notify on-call engineer and engineering lead
- **1 hour**: Status update to product and support teams

### External Communication

**Senior Users**:
- **If service unavailable > 15 minutes**: Post status page update
- **If data affected**: Email affected users with plain language explanation
- **Provide phone support number prominently**

**Caregivers**:
- **If monitoring features affected**: Notify caregivers who use platform
- **Provide alternative contact methods**

**Status Page Updates**:
```
Status: Investigating/Monitoring/Resolved
Impact: [e.g., "Some users may experience slower document processing"]
Actions: [What we're doing]
Next Update: [Expected time]
```

### Regulatory Notifications

If rollback involves data breach or loss:
- **GDPR**: Notify supervisory authority within 72 hours
- **SOC 2**: Document incident for audit
- **Customer notification**: Within 24 hours if significant impact

## Recovery Time Objectives

### RTO by Rollback Type

| Rollback Type | RTO | Notes |
|---|---|---|
| Application rollback | 15 minutes | Container/AMI swap |
| Configuration rollback | 5 minutes | Parameter store change |
| Feature flag rollback | 2 minutes | No service restart needed |
| Database rollback | 4 hours | Snapshot restore + validation |
| Full disaster recovery | 4 hours | Cross-region or backup restore |

### RPO by Data Type

| Data Type | RPO | Backup Method |
|---|---|---|
| User documents | 1 hour | Continuous S3 replication |
| Database transactions | 1 hour | Point-in-time recovery |
| User configuration | 24 hours | Daily snapshots |
| Audit logs | 0 minutes | Real-time log shipping |

## Rollback Decision Tree

```
Issue detected
    ↓
Can it be fixed with hotfix in < 15 minutes?
    ↓
YES → Deploy hotfix
    ↓
NO → Initiate rollback
    ↓
Is it application code?
    ↓
YES → Application rollback
    ↓
NO → Is it database?
    ↓
YES → Database rollback
    ↓
NO → Is it configuration?
    ↓
YES → Configuration rollback
    ↓
NO → Feature flag rollback or escalate
```

## Post-Rollback Actions

1. **Document Incident**:
   - Create post-incident report
   - Update runbook with lessons learned
   - Add new rollback triggers if applicable

2. **Communicate Results**:
   - Internal incident summary
   - Status page "Resolved" update
   - User communication if needed

3. **Prevent Recurrence**:
   - Root cause analysis
   - Implement additional tests or checks
   - Update deployment checklist
   - Review and improve monitoring

4. **Nelson Score Review**:
   - Update CURRENT_STATE.md if needed
   - Note any reliability findings
   - Update operational readiness evidence

---

*Generated with Process v9.5 - Nelson Repo Hygiene*