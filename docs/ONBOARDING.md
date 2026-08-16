# Onboarding Guide

## Overview

Welcome to ClarityDoc! This guide will help you set up your development environment and understand how to contribute to a geragogy-based information transformation platform for seniors.

ClarityDoc transforms complex documents (insurance, financial, government, legal) into plain English summaries, prioritized action items, and step-by-step guidance. Our users are seniors (65+) and their adult child caregivers, so every engineering decision must consider accessibility, cognitive load, and emotional safety.

## Prerequisites

### Required Tools

- **Node.js 20+** and **npm 10+** or **yarn 1.22+**
- **PostgreSQL 15+**
- **Redis 7+**
- **Git 2.50+**
- **Docker** and **Docker Compose** (optional but recommended)

### Required Accounts and Access

- **GitHub**: Access to ClarityDoc repository
- **AWS Account** (for deployment, not local dev)
- **GroupDocs.Rewriter Cloud API Key** (for text simplification)
- **Stripe Test Account** (for payment development)
- **Adobe PDF Services Account** (for Phase 2 OCR)

### Knowledge Prerequisites

- Familiarity with React.js and Next.js
- Understanding of Node.js/Express
- Basic knowledge of PostgreSQL and Redis
- WCAG 2.2 AA accessibility principles
- Geragogy concepts (will be covered in team onboarding)

## Environment Setup

### Quick Start (Docker Compose)

**Recommended for new developers**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/claritydoc/geradoc.git
   cd geradoc
   ```

2. **Create environment files**:
   ```bash
   cp .env.example .env
   cp .env.example .env.local
   ```
   Edit the `.env` file with your local configuration.

3. **Start infrastructure services**:
   ```bash
   docker-compose up -d postgres redis
   ```

4. **Install dependencies and run services**:
   ```bash
   # Backend
   cd backend
   npm install
   npm run db:migrate
   npm run db:seed
   npm run dev

   # Frontend (in another terminal)
   cd frontend
   npm install
   npm run dev
   ```

5. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/api/docs

### Manual Setup

If you prefer not to use Docker:

1. **Install PostgreSQL**:
   - Create database: `claritydoc_dev`
   - Create user: `claritydoc` with appropriate privileges

2. **Install Redis**:
   - Start Redis server on default port 6379

3. **Set up backend**:
   ```bash
   cd backend
   npm install
   npm run db:migrate
   npm run db:seed
   npm run dev
   ```

4. **Set up frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### IDE Configuration

**Recommended Extensions**:
- **VS Code**:
  - ESLint
  - Prettier
  - TypeScript Importer
  - Tailwind CSS IntelliSense
  - Axe Accessibility Linter
  - Thunder Client (for API testing)

**Editor Settings**:
- Enable format on save
- Use 2 spaces for indentation
- Set file associations for `.mdx`, `.ts`, `.tsx`
- Configure TypeScript compiler for both frontend and backend

**Accessibility Configuration**:
- Install browser extensions:
  - axe DevTools
  - WAVE
  - Lighthouse
  - Color Contrast Analyzer

## First Task

### Onboarding Task: "Fix a Senior-Friendly Button"

This task will help you understand our senior-first approach while making a small but meaningful improvement.

**Steps**:

1. **Read the user personas** in the BRD (`.ai/production-readiness/claritydoc-brd.md`)
2. **Find the Document Upload button** in `frontend/src/components/document/DocumentUploader.tsx`
3. **Review the button from Margaret's perspective** (72-year-old user with vision decline)
4. **Make one accessibility improvement** such as:
   - Increase font size
   - Improve contrast
   - Add clearer labeling
   - Increase touch target size
5. **Run accessibility tests** using axe DevTools
6. **Submit your first PR** following `CONTRIBUTING.md`

**Acceptance Criteria**:
- Button remains WCAG 2.2 AA compliant
- Touch target is at least 44×44px
- Color contrast is at least 4.5:1
- Text is clear and actionable

## Common Commands

### Backend

```bash
# Start development server
cd backend && npm run dev

# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run migrations
npm run db:migrate

# Reset database (caution: drops all data)
npm run db:reset

# Run linting
npm run lint

# Build for production
npm run build
```

### Frontend

```bash
# Start development server
cd frontend && npm run dev

# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Run accessibility tests
npm run test:a11y

# Run linting
npm run lint

# Build for production
npm run build
```

### Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild after dependency changes
docker-compose up -d --build
```

## Project Structure

```
claritydoc/
├── backend/
│   ├── src/
│   │   ├── api/              # REST API routes
│   │   ├── core/             # Core services
│   │   ├── models/           # Database models
│   │   ├── services/         # Business logic
│   │   └── tests/            # Test suites
│   ├── migrations/           # Database migrations
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Next.js pages
│   │   ├── styles/           # CSS and design tokens
│   │   └── tests/            # Test suites
│   └── package.json
├── docs/                     # Project documentation
├── .ai/                      # Process v9.5 artifacts
│   ├── intake/               # Intake documents
│   ├── nelson/               # Nelson repo hygiene
│   └── production-readiness/ # PRA, BRD, and related docs
├── docker-compose.yml
└── README.md
```

## Understanding the Senior-First Mindset

### Key Principles

1. **Clarity Over Cleverness**
   - Use simple, direct language
   - Avoid technical jargon in user-facing text
   - Prioritize understanding over sophistication

2. **Emotional Safety**
   - Acknowledge that document confusion is normal
   - Never make users feel stupid
   - Provide reassurance at every step

3. **Progressive Disclosure**
   - Show one primary action per screen
   - Let users control the pace
   - Avoid overwhelming users with too much information

4. **Agency and Control**
   - Users maintain control over decisions
   - Simplification is a tool, not a replacement
   - Caregiver access requires user permission

### Onboarding Resources

- **Application Charter**: `.ai/intake/application-charter-claritydoc.md`
- **BRD**: `.ai/production-readiness/claritydoc-brd.md`
- **Functional Requirements**: `.ai/production-readiness/functional-requirements.md`
- **Test Strategy**: `docs/TEST_STRATEGY.md`
- **Security Policy**: `SECURITY.md`
- **Contributing Guide**: `CONTRIBUTING.md`

## Troubleshooting

### Common Issue: Database Connection Failed

**Problem**: Cannot connect to PostgreSQL

**Solution**:
1. Verify PostgreSQL is running: `docker-compose ps`
2. Check `.env` database credentials match docker-compose
3. Ensure database `claritydoc_dev` exists
4. Try: `npm run db:create`

### Common Issue: Redis Connection Failed

**Problem**: Cannot connect to Redis

**Solution**:
1. Verify Redis is running: `docker-compose ps`
2. Check `.env` Redis URL (default: `redis://localhost:6379`)
3. Test connection: `redis-cli ping`

### Common Issue: GroupDocs API Key Not Working

**Problem**: Simplification API returns authentication error

**Solution**:
1. Verify `GROUPDOCS_API_KEY` in `.env`
2. Check that you're using sandbox/test key in development
3. Verify API key has not expired
4. Test with: `npm run test:groupdocs`

### Common Issue: Frontend Hot Reload Not Working

**Problem**: Changes not appearing in browser

**Solution**:
1. Restart Next.js dev server
2. Clear `.next` cache: `rm -rf .next`
3. Check for TypeScript errors in terminal
4. Verify `NODE_ENV=development`

## Resources

### Internal Documentation

- **BRD**: `.ai/production-readiness/claritydoc-brd.md`
- **Architecture**: `docs/ARCHITECTURE.md`
- **Test Strategy**: `docs/TEST_STRATEGY.md`
- **Security**: `SECURITY.md`
- **Contributing**: `CONTRIBUTING.md`

### External Resources

- **WCAG 2.2**: https://www.w3.org/WAI/WCAG22/
- **React Accessibility**: https://react.dev/reference/react-dom/components
- **Next.js Routing**: https://nextjs.org/docs/app
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Geragogy Research**: `.ai/intake/noni-research-library.md`

### Senior User Research

- **NONI Research Library**: `.ai/intake/noni-research-library.md`
- **UI/UX Design Principles**: `.ai/intake/noni-ui-ux-design.md`
- **Application Charter**: `.ai/intake/application-charter-claritydoc.md`

## Getting Help

### Technical Questions

- **Senior Developer**: [To be hired]
- **Backend Lead**: [To be hired]
- **Frontend/UX Lead**: [To be hired]
- **Slack Channel**: #claritydoc-dev

### Senior-Focused Questions

- **Product Manager**: [To be hired]
- **Accessibility Lead**: [To be hired]
- **User Research**: [To be hired]

### Urgent Issues

- **Security incidents**: See `SECURITY.md`
- **Production outages**: Page on-call engineer via PagerDuty
- **Escalation path**: See `CODEOWNERS`

## Onboarding Checklist

**Week 1**:
- [ ] Complete environment setup
- [ ] Read BRD and Architecture documents
- [ ] Complete first task: "Fix a Senior-Friendly Button"
- [ ] Attend geragogy and senior user research session
- [ ] Shadow senior user testing session (if available)

**Week 2**:
- [ ] Pick up first real feature ticket
- [ ] Complete accessibility testing training
- [ ] Set up GroupDocs test account
- [ ] Review contributing guidelines and git standards

**Week 3**:
- [ ] Complete first feature end-to-end
- [ ] Participate in code review process
- [ ] Document any gaps found in onboarding

---

*Generated with Process v9.5 - Nelson Repo Hygiene*