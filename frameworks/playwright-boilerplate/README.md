# Playwright Production Boilerplate

**Consulting-grade, production-ready Playwright + TypeScript test automation framework**

Designed for rapid adoption on client engagements and as a reference implementation for Quality Engineering teams.

> Part of the [QA Consulting Toolkit](../../README.md)  
> Author: Dhaval B. Desai

---

## Features

- **TypeScript** first-class support
- Clean **Page Object / Component** architecture
- Centralized **fixtures** and test data factories
- **API testing** support alongside UI
- **Smoke + E2E + API** test layers
- Built-in **Allure** and Playwright HTML reporting
- **GitHub Actions** CI quality gates (smoke + regression)
- Environment-aware configuration
- Strong typing, linting, and pre-commit hooks ready
- Accessibility helpers (axe-core ready)
- Parallel execution support

---

## Quick Start

```bash
# Clone / copy this folder
cd playwright-boilerplate

# Install dependencies
npm install

# Install browsers
npx playwright install

# Run smoke tests
npm run test:smoke

# Run full suite
npm test

# Show HTML report
npm run report
```

---

## Project Structure

```
playwright-boilerplate/
├── src/
│   ├── pages/          # Page Objects
│   ├── components/     # Reusable UI components
│   ├── fixtures/       # Custom Playwright fixtures
│   ├── helpers/        # Common utilities & assertions
│   ├── services/       # API service classes
│   └── data/           # Test data factories
├── tests/
│   ├── smoke/          # Fast feedback pack
│   ├── e2e/            # End-to-end journeys
│   └── api/            # API / contract tests
├── docs/               # Framework documentation
├── .github/workflows/  # CI quality gates
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

---

## Recommended Usage on Engagements

1. Copy this boilerplate into the client repository or a dedicated test repo
2. Update `playwright.config.ts` with environment URLs and projects
3. Implement Page Objects for the application under test
4. Start with a small **Smoke** pack → expand to critical journeys
5. Wire into the client’s CI/CD using the provided GitHub Actions examples
6. Apply the coding standards and review process from the Automation Strategy

---

**Maintained as part of the QA Consulting Toolkit**
