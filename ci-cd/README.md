# CI/CD Quality Gates

Reusable pipeline definitions that enforce quality gates on every relevant change.

## Contents

| File | Description |
|------|-------------|
| `github-actions-quality-gates.yml` | Ready-to-use GitHub Actions workflow (Smoke → Regression → Gate) |

## How to Use

1. Copy `github-actions-quality-gates.yml` into the target repository at `.github/workflows/quality-gates.yml`
2. Adjust:
   - Branch names
   - Node version
   - Environment variables / secrets (`BASE_URL`, `API_BASE_URL`, credentials)
   - Browser matrix if needed
3. Ensure the Playwright project has matching npm scripts (`test:smoke`, `test`)
4. Optionally add status checks required for pull request merges

## Design Principles

- **Fast feedback first** – Smoke job runs on every PR
- **Regression on mainline** – Full suite on push to main/develop or manual trigger
- **Artifacts preserved** – Reports uploaded on failure/success for debugging
- **Clear ownership** – Quality gate job can be extended with custom pass/fail rules

## Azure DevOps / Jenkins

Equivalent pipeline definitions can be added later following the same Smoke → Regression → Gate pattern.
