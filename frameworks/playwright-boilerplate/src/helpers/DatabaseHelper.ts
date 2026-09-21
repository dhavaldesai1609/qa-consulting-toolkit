import { Pool as PgPool, QueryResult } from 'pg';
import mysql from 'mysql2/promise';
import * as mssql from 'mssql';
import { env } from '../config/env';
import { logger } from '../utils/logger';

type DbType = 'postgres' | 'mysql' | 'mssql';

/**
 * Lightweight multi-database helper.
 * Supports PostgreSQL, MySQL and MSSQL with a unified query interface.
 */
export class DatabaseHelper {
  private static pgPool: PgPool | null = null;
  private static mysqlPool: mysql.Pool | null = null;
  private static mssqlPool: mssql.ConnectionPool | null = null;

  private static get type(): DbType {
    return env.db.type;
  }

  static async connect(): Promise<void> {
    if (this.type === 'postgres' && !this.pgPool) {
      this.pgPool = new PgPool({
        host: env.db.host,
        port: env.db.port,
        database: env.db.database,
        user: env.db.user,
        password: env.db.password,
        ssl: env.db.ssl ? { rejectUnauthorized: false } : undefined,
        max: 5,
      });
      logger.info('PostgreSQL pool created');
    }

    if (this.type === 'mysql' && !this.mysqlPool) {
      this.mysqlPool = mysql.createPool({
        host: env.db.host,
        port: env.db.port || 3306,
        database: env.db.database,
        user: env.db.user,
        password: env.db.password,
        waitForConnections: true,
        connectionLimit: 5,
      });
      logger.info('MySQL pool created');
    }

    if (this.type === 'mssql' && !this.mssqlPool) {
      this.mssqlPool = await new mssql.ConnectionPool({
        server: env.db.host,
        port: env.db.port || 1433,
        database: env.db.database,
        user: env.db.user,
        password: env.db.password,
        options: {
          encrypt: env.db.ssl,
          trustServerCertificate: true,
        },
        pool: { max: 5, min: 0 },
      }).connect();
      logger.info('MSSQL pool created');
    }
  }

  static async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    await this.connect();
    logger.debug(`SQL: ${sql} | params: ${JSON.stringify(params)}`);

    if (this.type === 'postgres') {
      const result: QueryResult = await this.pgPool!.query(sql, params);
      return result.rows as T[];
    }

    if (this.type === 'mysql') {
      const [rows] = await this.mysqlPool!.execute(sql, params);
      return rows as T[];
    }

    if (this.type === 'mssql') {
      const request = this.mssqlPool!.request();
      params.forEach((value, index) => {
        request.input(`p${index + 1}`, value);
      });
      const mssqlSql = sql.replace(/\$(\d+)/g, (_, n) => `@p${n}`);
      const result = await request.query(mssqlSql);
      return result.recordset as T[];
    }

    throw new Error(`Unsupported DB type: ${this.type}`);
  }

  static async queryOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
    const rows = await this.query<T>(sql, params);
    return rows[0] ?? null;
  }

  static async execute(sql: string, params: any[] = []): Promise<number> {
    await this.connect();

    if (this.type === 'postgres') {
      const result = await this.pgPool!.query(sql, params);
      return result.rowCount ?? 0;
    }

    if (this.type === 'mysql') {
      const [result] = await this.mysqlPool!.execute(sql, params);
      return (result as any).affectedRows ?? 0;
    }

    if (this.type === 'mssql') {
      const request = this.mssqlPool!.request();
      params.forEach((value, index) => request.input(`p${index + 1}`, value));
      const mssqlSql = sql.replace(/\$(\d+)/g, (_, n) => `@p${n}`);
      const result = await request.query(mssqlSql);
      return result.rowsAffected[0] ?? 0;
    }

    return 0;
  }

  static async close(): Promise<void> {
    if (this.pgPool) {
      await this.pgPool.end();
      this.pgPool = null;
      logger.info('PostgreSQL pool closed');
    }
    if (this.mysqlPool) {
      await this.mysqlPool.end();
      this.mysqlPool = null;
      logger.info('MySQL pool closed');
    }
    if (this.mssqlPool) {
      await this.mssqlPool.close();
      this.mssqlPool = null;
      logger.info('MSSQL pool closed');
    }
  }
}

export default DatabaseHelper;
