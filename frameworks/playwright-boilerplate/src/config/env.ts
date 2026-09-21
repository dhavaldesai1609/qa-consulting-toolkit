import * as dotenv from 'dotenv';
import path from 'path';

/**
 * Centralized environment / configuration loader.
 * Create a `.env` file at project root (never commit secrets).
 */
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const env = {
  baseUrl: process.env.BASE_URL || 'https://example.com',
  apiBaseUrl: process.env.API_BASE_URL || 'https://api.example.com',
  testUser: process.env.TEST_USER || '',
  testPassword: process.env.TEST_PASSWORD || '',
  db: {
    type: (process.env.DB_TYPE || 'postgres') as 'postgres' | 'mysql' | 'mssql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME || 'testdb',
    user: process.env.DB_USER || 'testuser',
    password: process.env.DB_PASSWORD || '',
    ssl: process.env.DB_SSL === 'true',
  },
  isCI: !!process.env.CI,
  logLevel: process.env.LOG_LEVEL || 'info',
  headless: process.env.HEADLESS !== 'false',
};

export default env;
