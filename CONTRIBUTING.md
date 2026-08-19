# Contributing to ClarityDoc

## Overview

This document outlines the contribution guidelines and delivery governance for the ClarityDoc project. ClarityDoc is a geragogy-based information transformation platform for seniors, and all contributions must align with our senior-first principles and accessibility requirements.

## Getting Started

**Prerequisites**
- Node.js 18+ and npm/yarn
- PostgreSQL 14+ for local development
- AWS account (for deployment, not local development)
- Familiarity with WCAG 2.2 AA accessibility guidelines

**Local Development Setup**
```bash
# Clone repository
git clone https://github.com/claritydoc/geradoc.git
cd geradoc

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your local configuration

# Set up database
npm run db:migrate
npm run db:seed

# Start development server
npm run dev
```

**Development Requirements**
- All new features must include accessibility testing
- UI changes must be tested with senior users when possible
- Code must follow ESLint rules and pass linting
- All changes must maintain WCAG 2.2 AA compliance

## Development Process

**Branch Strategy**
- `main` - Production-ready code
- `develop` - Integration branch for next release
- `feature/*` - Feature branches (e.g., `feature/document-upload`)
- `bugfix/*` - Bug fixes (e.g., `bugfix/login-error`)
- `hotfix/*` - Critical production fixes

**Workflow**
1. Create branch from `develop`
2. Implement changes with tests
3. Ensure accessibility compliance
4. Submit PR to `develop`
5. Code review and accessibility review
6. Merge to `develop`
7. Deploy to staging for senior user testing
8. Merge `develop` to `main` for production deployment

**Sprint Cadence**
- 2-week sprints
- Sprint planning on Monday
- Sprint review and retrospective on Friday
- Continuous deployment to staging
- Production deployments every 2 weeks

## Definition of Ready (DOR)

Work is ready for development when:
- [ ] User story includes acceptance criteria
- [ ] Accessibility requirements are defined
- [ ] Geragogy principles are considered (if UI-related)
- [ ] Security implications are assessed
- [ ] Dependencies are identified and available
- [ ] Effort estimate is provided
- [ ] QA acceptance criteria are defined
- [ ] Senior user testing approach is defined (if applicable)

## Definition of Done (DOD)

Work is complete when:
- [ ] Code is reviewed and approved
- [ ] All tests pass (unit, integration, E2E)
- [ ] Accessibility audit passes (WCAG 2.2 AA)
- [ ] Security review passes
- [ ] Documentation is updated
- [ ] ADR is created for architectural decisions
- [ ] Performance requirements are met
- [ ] Senior user testing is completed (for UI changes)
- [ ] Nelson repo hygiene is maintained
- [ ] Code is deployed to staging and validated
- [ ] Rollback plan is documented

## Code Review Process

**Review Checklist**
- [ ] Code follows project style guidelines
- [ ] Accessibility requirements are met
- [ ] Security best practices are followed
- [ ] Tests are comprehensive and passing
- [ ] Documentation is updated
- [ ] Error handling is appropriate
- [ ] Performance implications are considered
- [ ] Geragogy principles are applied (if UI-related)

**Reviewer Requirements**
- At least one senior developer approval
- Accessibility review for UI changes
- Security review for sensitive features
- Product manager approval for user-facing changes

**Review Timeline**
- Target response within 24 hours
- PRs should not sit more than 3 days without review
- Urgent fixes expedited through hotfix process

## Testing Requirements

**Unit Testing**
- Minimum 80% code coverage
- All business logic must be tested
- Mock external dependencies (APIs, database)
- Test both happy path and error cases

**Integration Testing**
- API endpoint testing
- Database integration testing
- Third-party service integration testing
- Authentication and authorization flows

**End-to-End Testing**
- Critical user journeys (document upload, processing, dashboard)
- Senior user workflows (simplified navigation, large text)
- Payment and subscription flows
- Error handling and recovery

**Accessibility Testing**
- Automated testing: axe-core, WAVE
- Manual testing: keyboard navigation, screen readers
- Senior user testing: quarterly sessions with target demographic
- Color contrast and text sizing validation

**Performance Testing**
- Page load time < 3 seconds on 3G connection
- API response time < 500ms for 95th percentile
- Database query optimization for large document sets
- Memory usage monitoring for long-running processes

## Senior-First Development Guidelines

**Design Principles**
- Large fonts (16pt minimum, 18pt preferred)
- High contrast (4.5:1 minimum, 7:1 preferred)
- Simple navigation (one primary action per screen)
- Clear error messages in plain language
- Progress indicators for multi-step processes
- Avoid technical jargon in user-facing text

**User Testing**
- Quarterly testing sessions with seniors 65+
- Caregiver testing for coordination features
- A/B testing for critical user flows
- Feedback loops integrated into development process

**Communication Standards**
- All user-facing text reviewed for clarity
- Technical terms explained or avoided
- Action items clearly stated with next steps
- Reassurance messages built into stressful processes

## MLDC Alignment

*Note: MLDC components will be integrated when UI component library is established. Current phase uses custom React components with WCAG 2.2 AA compliance.*

For future UI-related changes:
- Use approved design system components where applicable
- Document exceptions when custom components are necessary
- Include accessibility and responsive validation evidence
- Follow senior-friendly design guidelines over general design systems
- Ensure WCAG 2.2 AA compliance is maintained

## Nelson Repo Hygiene

All contributions should maintain or improve the Nelson Repo Score:
- Keep documentation current with implementation
- Update ADRs for architectural decisions
- Maintain operational runbooks
- Ensure ownership is clearly defined
- Update CURRENT_STATE.md with project progress
- Keep security documentation current

## Security Requirements

**All contributions must:**
- Follow security best practices defined in SECURITY.md
- Include security review for sensitive features
- Never commit secrets or API keys
- Use environment variables for configuration
- Implement proper input validation and sanitization
- Follow OWASP guidelines for web application security

## Git Commit Standards

**Future Commit Attribution**

Application ownership is `@Kmiles`. Existing history is preserved. New commits should use the Kmiles identity explicitly in the commit environment or the contributor's approved local Git identity:

```bash
GIT_AUTHOR_NAME="Kmiles" GIT_COMMITTER_NAME="Kmiles" git commit -m "type(scope): subject"
```

Email may be omitted when the local Git environment permits it. Do not add Devin as an author or co-author to new commits.

**Commit Message Format**
```
type(scope): subject

body

footer
```

**Types**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Test additions or changes
- `chore`: Build process or auxiliary tool changes
- `a11y`: Accessibility improvements

**Example**
```
feat(upload): add PDF document upload feature

- Implement drag-and-drop upload interface
- Add file type validation
- Include progress indicator for large files
- Ensure WCAG 2.2 AA compliance

Closes #123
```

## Issue Reporting

**Bug Reports**
- Use GitHub issue template
- Include steps to reproduce
- Add screenshots for UI issues
- Note browser and accessibility tools used
- Specify senior user impact if applicable

**Feature Requests**
- Describe the problem to solve
- Include senior user perspective
- Suggest potential solutions
- Note accessibility implications

**Security Issues**
- Follow SECURITY.md reporting guidelines
- Do not create public GitHub issues
- Email security@claritydoc.com for sensitive issues

## Community Guidelines

**Code of Conduct**
- Be respectful and inclusive
- Consider senior user perspective in all discussions
- Prioritize accessibility and clarity
- Welcome questions and learning
- Assume good intentions

**Communication**
- Use plain language in technical discussions when possible
- Explain technical terms for non-technical contributors
- Be patient with accessibility learning curves
- Share knowledge about senior-friendly design

## Recognition

**Contributor Recognition**
- Contributors acknowledged in release notes
- Senior user testimonials featured when appropriate
- Annual contribution summary and appreciation
- Opportunities for senior user advocacy involvement

---

*Generated with Process v9.5 - Nelson Repo Hygiene*