import fs from 'fs/promises';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { logger } from '../utils/logger';

/**
 * Generic file helpers – JSON, CSV, text, existence checks.
 */
export class FileHelper {
  static resolve(...segments: string[]): string {
    return path.resolve(process.cwd(), ...segments);
  }

  static async exists(filePath: string): Promise<boolean> {
    try {
      await fs.access(this.resolve(filePath));
      return true;
    } catch {
      return false;
    }
  }

  static async readJson<T = any>(filePath: string): Promise<T> {
    const content = await fs.readFile(this.resolve(filePath), 'utf-8');
    return JSON.parse(content) as T;
  }

  static async writeJson(filePath: string, data: any, pretty = true): Promise<void> {
    const absolute = this.resolve(filePath);
    await fs.mkdir(path.dirname(absolute), { recursive: true });
    await fs.writeFile(absolute, JSON.stringify(data, null, pretty ? 2 : 0), 'utf-8');
    logger.info(`Wrote JSON: ${absolute}`);
  }

  static async readCsv<T extends Record<string, string> = Record<string, string>>(
    filePath: string,
    options?: { columns?: boolean; skipEmptyLines?: boolean }
  ): Promise<T[]> {
    const content = await fs.readFile(this.resolve(filePath), 'utf-8');
    return parse(content, {
      columns: options?.columns ?? true,
      skip_empty_lines: options?.skipEmptyLines ?? true,
      trim: true,
    }) as T[];
  }

  static async writeCsv(filePath: string, data: Record<string, any>[]): Promise<void> {
    if (!data.length) throw new Error('No data to write to CSV');
    const absolute = this.resolve(filePath);
    await fs.mkdir(path.dirname(absolute), { recursive: true });
    const csv = stringify(data, { header: true });
    await fs.writeFile(absolute, csv, 'utf-8');
    logger.info(`Wrote CSV: ${absolute}`);
  }

  static async readText(filePath: string): Promise<string> {
    return fs.readFile(this.resolve(filePath), 'utf-8');
  }

  static async writeText(filePath: string, content: string): Promise<void> {
    const absolute = this.resolve(filePath);
    await fs.mkdir(path.dirname(absolute), { recursive: true });
    await fs.writeFile(absolute, content, 'utf-8');
  }

  static async ensureDir(dirPath: string): Promise<void> {
    await fs.mkdir(this.resolve(dirPath), { recursive: true });
  }

  static async deleteFile(filePath: string): Promise<void> {
    try {
      await fs.unlink(this.resolve(filePath));
    } catch {
      // ignore if missing
    }
  }
}

export default FileHelper;
