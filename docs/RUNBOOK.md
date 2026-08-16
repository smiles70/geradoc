# Runbook

## Overview

This runbook provides operational procedures for running, monitoring, and maintaining ClarityDoc in production. It covers common operations, health checks, monitoring, troubleshooting, failure modes, and support escalation.

**Target Audience**: Operations engineers, on-call developers, support staff  
**Scope**: AWS-based production environment  
**Severity Definitions**:
- **P1 (Critical)**: Complete service outage, data breach, security incident
- **P2 (High)**: Major functionality degraded, affecting many users
- **P3 (Medium)**: Partial functionality affected, workarounds exist
- **P4 (Low)**: Minor issues, no immediate user impact

## Startup Procedures

### Full System Startup

1. **Start Infrastructure Services**:
   ```bash
   # Start database
   aws rds start-db-instance --db-instance-identifier claritydoc-prod

   # Start Redis
   aws elasticache reboot-cache-cluster --cache-cluster-id claritydoc-prod-redis

   # Start S3 (no startup needed)
   # Verify S3 bucket accessibility
   aws s3 ls s3://claritydoc-documents-prod
   ```

2. **Start Backend Services**:
   ```bash
   # Start application servers
   aws ec2 start-instances --instance-ids $(cat prod-app-instance-ids)

   # Wait for load balancer to report healthy
   aws elb describe-instance-health --load-balancer-name claritydoc-prod-alb
   ```

3. **Verify Frontend CDN**:
   ```bash
   # Check CloudFront distribution status
   aws cloudfront get-distribution --id $CLOUDFRONT_DISTRIBUTION_ID
   ```

4. **Health Check**:
   ```bash
   curl https://api.claritydoc.com/health
   curl https://claritydoc.com/health
   ```

### Individual Service Startup

**Backend Service Only**:
```bash
ssh claritydoc-prod-app-01
sudo systemctl start claritydoc-api
sudo systemctl status claritydoc-api
```

**Frontend Deployment**:
```bash
# Redeploy frontend if needed
npm run deploy:prod
```

## Health Checks

### Standard Health Endpoints

**Backend Health Check**:
```
GET https://api.claritydoc.com/health

Expected Response:
{
  "status": "healthy",
  "database": "connected",
  "cache": "connected",
  "storage": "connected",
  "timestamp": "2026-08-16T00:00:00Z"
}
```

**Frontend Health Check**:
```
GET https://claritydoc.com/health

Expected Response:
{
  "status": "healthy",
  "version": "1.0.0"
}
```

### Health Check Procedures

**Daily Morning Check**:
1. Verify `https://api.claritydoc.com/health` returns healthy
2. Verify `https://claritydoc.com` loads in browser
3. Check AWS CloudWatch dashboard for anomalies
4. Review overnight alerts in PagerDuty
5. Verify document processing queue is < 100 items

**Post-Deployment Check**:
1. Run health endpoint checks
2. Test a sample document upload
3. Verify simplification output quality
4. Check error rates across all services
5. Monitor for 15 minutes after deployment

### Key Health Indicators

**Green Status**:
- Uptime: 99.9%+
- Error rate: < 1%
- API response time: < 500ms (95th percentile)
- Document processing time: < 30 seconds
- Queue depth: < 100 items
- Database connections: < 80% of max

**Yellow Status (Warning)**:
- Error rate: 1-5%
- API response time: 500ms-2s
- Document processing time: 30-60 seconds
- Queue depth: 100-1,000 items
- Requires investigation within 30 minutes

**Red Status (Critical)**:
- Error rate: > 5%
- API response time: > 2s
- Document processing time: > 60 seconds
- Queue depth: > 1,000 items
- Requires immediate response

## Monitoring

### Monitoring Tools

- **AWS CloudWatch**: Infrastructure and application metrics
- **AWS X-Ray**: Distributed tracing
- **Grafana Dashboards**: Business and cognitive metrics
- **PagerDuty**: Alerting and on-call management
- **Pingdom**: Uptime monitoring

### Key Metrics Dashboard

**Infrastructure**:
- CPU utilization by service
- Memory utilization
- Disk space
- Network I/O
- Database connection count

**Application**:
- Request count and rate
- Response time (p50, p95, p99)
- Error rate by endpoint
- Document processing success rate
- User session metrics

**Business**:
- Documents processed per hour
- Active users
- Subscription conversions
- Caregiver engagement
- NPS scores

**Cognitive** (Senior User Well-being):
- Average strain levels
- Mastery progression
- Help request frequency
- Time to document understanding
- Stability threshold breaches

### Alert Thresholds

**P1 (Critical)**: Page immediately
- System down for > 2 minutes
- Error rate > 5% for 5 minutes
- Database connection failures
- Security breach detection
- Data corruption or loss

**P2 (High)**: Page within 15 minutes
- Error rate 1-5% for 10 minutes
- API response time > 2s (95th percentile)
- Document processing failure rate > 10%
- Queue depth > 1,000 items
- Cognitive strain average > 0.7

**P3 (Medium)**: Create ticket, respond within 1 hour
- Disk usage > 80%
- Memory usage > 85%
- Queue depth 100-1,000 items
- Slow query warnings (> 5 seconds)

## Common Operations

### Scaling Operations

**Scale Out Application Servers**:
```bash
aws autoscaling update-auto-scaling-group \
  --auto-scaling-group-name claritydoc-prod-app \
  --desired-capacity 5
```

**Scale Database Read Replicas**:
```bash
aws rds create-db-instance-read-replica \
  --db-instance-identifier claritydoc-prod-replica-02 \
  --source-db-instance-identifier claritydoc-prod
```

**Scale Cache**:
```bash
aws elasticache modify-cache-cluster \
  --cache-cluster-id claritydoc-prod-redis \
  --num-cache-nodes 3
```

### Document Processing Queue Management

**Check Queue Status**:
```bash
redis-cli LLEN document:processing:queue
redis-cli LLEN document:upload:queue
```

**Retry Failed Jobs**:
```bash
# Move failed jobs back to processing queue
npm run queue:retry-failed
```

**Clear Stuck Jobs** (use with caution):
```bash
# Only after confirming jobs are truly stuck
npm run queue:clear-stuck -- --age 300
```

### Database Operations

**Check Database Connections**:
```sql
SELECT count(*) FROM pg_stat_activity;
SELECT count(*) FROM pg_stat_activity WHERE state = 'active';
```

**Check Long-Running Queries**:
```sql
SELECT pid, now() - pg_stat_activity.query_start AS duration, query
FROM pg_stat_activity
WHERE state = 'active'
AND now() - query_start > interval '5 seconds'
ORDER BY duration DESC;
```

### Backup Operations

**Manual Database Backup**:
```bash
aws rds create-db-snapshot \
  --db-instance-identifier claritydoc-prod \
  --db-snapshot-identifier claritydoc-prod-manual-$(date +%Y%m%d-%H%M%S)
```

**Verify Backup**:
```bash
aws rds describe-db-snapshots \
  --db-snapshot-identifier <snapshot-id>
```

## Troubleshooting

### High Error Rate

**Symptoms**: Error rate > 5% or many 5xx responses

**Investigation Steps**:
1. Check `https://api.claritydoc.com/health`
2. Review CloudWatch Logs for error patterns
3. Check external API status (GroupDocs, Stripe)
4. Verify database connection pool
5. Check for recent deployments or changes

**Common Causes**:
- External API rate limiting
- Database connection exhaustion
- Memory leak in processing service
- Deployed bug in recent release
- S3 permission issues

**Resolution**:
- Enable circuit breaker for failing external APIs
- Restart application servers if memory issue
- Scale database connection pool
- Rollback recent deployment if correlated

### Document Processing Delays

**Symptoms**: Documents taking > 30 seconds to process

**Investigation Steps**:
1. Check queue depth in Redis
2. Verify worker process count
3. Review GroupDocs API response times
4. Check for large file processing backlog
5. Monitor worker CPU and memory

**Resolution**:
- Scale document processing workers
- Retry failed or slow jobs
- Implement larger file special handling
- Contact external API support if provider issue

### Database Performance Issues

**Symptoms**: Slow queries, high connection count, timeouts

**Investigation Steps**:
1. Identify long-running queries
2. Check for missing indexes
3. Review recent query pattern changes
4. Monitor database CPU and I/O

**Resolution**:
- Add missing indexes
- Kill long-running queries if safe
- Scale database instance if resource-limited
- Optimize slow queries

### Accessibility Issues in Production

**Symptoms**: Senior users reporting inability to use interface

**Investigation Steps**:
1. Run automated accessibility audit on production
2. Check user support tickets for patterns
3. Verify CSS and font loading
4. Test keyboard navigation

**Resolution**:
- Hotfix accessibility issues as P1
- Deploy emergency accessibility patch
- Increase text size or contrast defaults
- Document issue in accessibility log

## Failure Modes

### Failure Mode: Complete System Outage

**Impact**: All users unable to access ClarityDoc  
**Response Time**: P1, immediate

**Response**:
1. Acknowledge incident and page on-call team
2. Verify scope and impact
3. Check AWS status page for region issues
4. Attempt service restart if issue is isolated
5. If region-wide, initiate disaster recovery
6. Communicate with users via status page
7. Post-incident review within 24 hours

### Failure Mode: External API Provider Down

**Impact**: Document simplification unavailable  
**Response Time**: P1 if provider is GroupDocs (critical path)

**Response**:
1. Enable circuit breaker to prevent repeated failed calls
2. Switch to fallback provider if configured
3. Queue documents for retry when provider recovers
4. Notify users that processing is delayed
5. Contact external API provider support
6. Escalate if outage > 30 minutes

### Failure Mode: Database Corruption

**Impact**: Potential data loss or incorrect data  
**Response Time**: P1, immediate

**Response**:
1. Stop all write operations
2. Assess scope of corruption
3. Restore from most recent clean backup
4. Verify data integrity after restore
5. Notify affected users if necessary
6. Conduct post-incident review

### Failure Mode: Security Breach

**Impact**: Potential unauthorized data access  
**Response Time**: P1, immediate

**Response**:
1. Activate security incident response team
2. Contain affected systems
3. Preserve forensic evidence
4. Assess data exposure scope
5. Notify affected users and authorities within 72 hours (GDPR)
6. Implement security patches and remediation
7. Post-incident security review

### Failure Mode: High Cognitive Strain Incident

**Impact**: Many senior users experiencing frustration or confusion  
**Response Time**: P2

**Response**:
1. Monitor cognitive strain metrics
2. Reduce default interface complexity
3. Increase reassurance messaging
4. Deploy simplified default views
5. Notify customer success team
6. Review with product and UX for permanent fix

## Maintenance

### Daily Maintenance

- Review overnight monitoring alerts
- Verify backup completion
- Check queue health
- Monitor disk space and memory
- Review security logs

### Weekly Maintenance

- Review performance trends
- Analyze error patterns
- Update runbooks if needed
- Verify SSL certificate expiration dates
- Review access logs for anomalies

### Monthly Maintenance

- Apply security patches
- Review and rotate API keys
- Clean up old logs and temporary files
- Conduct disaster recovery drill
- Review and optimize database

### Quarterly Maintenance

- Disaster recovery plan review and update
- Compliance audit
- Accessibility audit
- Capacity planning review
- Vendor performance review

## Support Contacts

### Internal Escalation

**On-Call Engineer**: PagerDuty on-call rotation  
**Engineering Lead**: [To be hired]  
**Product Manager**: [To be hired]  
**Founder/CEO**: Kimberly Miles (kimberly@claritydoc.com)  

### External Vendors

**AWS Enterprise Support**: aws-support (case system)  
**GroupDocs Support**: [support contact]  
**Stripe Support**: [support contact]  
**PagerDuty Support**: support@pagerduty.com  

### Emergency Contacts

**Security Incidents**: security@claritydoc.com  
**Critical Outages**: On-call via PagerDuty  
**Senior User Support**: support@claritydoc.com  
**Legal/Compliance**: [To be retained]

---

*Generated with Process v9.5 - Nelson Repo Hygiene*