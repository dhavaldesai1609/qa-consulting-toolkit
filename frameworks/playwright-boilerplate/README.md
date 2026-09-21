# Playwright Production Boilerplate

**Consulting-grade, production-ready Playwright + TypeScript test automation framework**

Designed for rapid adoption on client engagements and as a reference implementation for Quality Engineering teams.

> Part of the [QA Consulting Toolkit](../../README.md)  
> Author: Dhaval B. Desai

---

## Features

- **TypeScript** first-class support
- Clean **Page Object / Component** architecture
- Centralized **fixtures** and test data factories (`@faker-js/faker`)
- **API testing** support with `BaseApiService`
- **Smoke + E2E + API** test layers
- Built-in **Allure** and Playwright HTML reporting
- **GitHub Actions** CI quality gates (smoke → regression → gate)
- Environment-aware configuration (`.env`)
- **Excel** read / write / append (`ExcelHelper` – ExcelJS)
- **Database** helpers for PostgreSQL, MySQL, MSSQL (`DatabaseHelper`)
- **File** helpers – JSON, CSV, text (`FileHelper`)
- **Date** utilities (`DateHelper` – date-fns)
- Structured **logging** (Winston)
- Accessibility helpers (axe-core ready)
- Parallel execution support
- Strong typing + ESLint ready

---

## Quick Start

```bash
cd frameworks/playwright-boilerplate
npm install
npx playwright install
cp .env.example .env   # then edit values
npm run test:smoke
npm test
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
│   ├── helpers/        # Excel, DB, File, Date, Assertions, a11y
│   ├── services/       # API service base classes
│   ├── data/           # Test data factories
│   ├── config/         # env loader
│   └── utils/          # logger
├── tests/
│   ├── smoke/
│   ├── e2e/
│   └── api/
├── docs/
│   ├── FRAMEWORK-GUIDE.md
│   └── HELPERS.md
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── .env.example
```

See [docs/HELPERS.md](docs/HELPERS.md) for detailed usage of Excel, Database, File, Date, and data factories.

---

**Maintained as part of the QA Consulting Toolkit**
