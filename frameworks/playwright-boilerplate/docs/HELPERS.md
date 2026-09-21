# Modern Helpers Guide

This boilerplate ships with production-ready helpers commonly required on consulting engagements.

## Available Helpers

| Helper | Purpose | Location |
|--------|---------|----------|
| **ExcelHelper** | Read / write / append .xlsx sheets, read cell | `src/helpers/ExcelHelper.ts` |
| **DatabaseHelper** | PostgreSQL, MySQL, MSSQL – query, queryOne, execute | `src/helpers/DatabaseHelper.ts` |
| **FileHelper** | JSON, CSV, text read/write, directories | `src/helpers/FileHelper.ts` |
| **DateHelper** | Format, add/sub days, business day, validation | `src/helpers/DateHelper.ts` |
| **TestDataFactory** | Faker-based user, address, company, unique IDs | `src/data/TestDataFactory.ts` |
| **BaseApiService** | Typed API client base (GET/POST/PUT/PATCH/DELETE) | `src/services/BaseApiService.ts` |
| **CommonAssertions** | Reusable expect wrappers | `src/helpers/CommonAssertions.ts` |
| **logger** | Winston structured logging | `src/utils/logger.ts` |
| **env** | Centralized config from `.env` | `src/config/env.ts` |
| **a11y** | Accessibility check placeholder (axe-core ready) | `src/helpers/a11y.ts` |

---

## Excel – Quick Examples

```typescript
import { ExcelHelper } from '../src/helpers';

const rows = await ExcelHelper.readSheet<MyRowType>('testdata/users.xlsx', 'Users');
await ExcelHelper.writeSheet('output/results.xlsx', rows, 'Results');
await ExcelHelper.appendRows('output/results.xlsx', moreRows);
const value = await ExcelHelper.readCell('testdata/config.xlsx', 'B2');
```

---

## Database – Quick Examples

```typescript
import { DatabaseHelper } from '../src/helpers';

const users = await DatabaseHelper.query(
  'SELECT id, email FROM users WHERE status = $1',
  ['active']
);

const user = await DatabaseHelper.queryOne('SELECT * FROM users WHERE id = $1', [42]);

await DatabaseHelper.execute(
  'UPDATE accounts SET balance = $1 WHERE id = $2',
  [1000, 42]
);

// In global teardown
await DatabaseHelper.close();
```

Supported: `postgres` | `mysql` | `mssql`

---

## Test Data Factory

```typescript
import { TestDataFactory } from '../src/helpers';

const user = TestDataFactory.user({ email: 'fixed@test.com' });
const address = TestDataFactory.address();
const id = TestDataFactory.uniqueId('payment');
```

---

## Configuration

1. Copy `.env.example` → `.env`
2. Fill BASE_URL, credentials, DB settings
3. In CI, inject the same variables as secrets / variables
