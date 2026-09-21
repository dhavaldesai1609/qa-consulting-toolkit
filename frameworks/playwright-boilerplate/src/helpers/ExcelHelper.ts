import ExcelJS from 'exceljs';
import path from 'path';
import { logger } from '../utils/logger';

/**
 * Excel read / write helper (ExcelJS).
 * Supports .xlsx files. Ideal for data-driven tests and result exports.
 */
export class ExcelHelper {
  static async readSheet<T extends Record<string, any> = Record<string, any>>(
    filePath: string,
    sheetNameOrIndex: string | number = 1
  ): Promise<T[]> {
    const absolutePath = path.resolve(filePath);
    logger.info(`Reading Excel: ${absolutePath}`);

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(absolutePath);

    const worksheet =
      typeof sheetNameOrIndex === 'string'
        ? workbook.getWorksheet(sheetNameOrIndex)
        : workbook.worksheets[sheetNameOrIndex - 1];

    if (!worksheet) {
      throw new Error(`Sheet not found: ${sheetNameOrIndex}`);
    }

    const rows: T[] = [];
    let headers: string[] = [];

    worksheet.eachRow((row, rowNumber) => {
      const values = row.values as any[];
      const cells = values.slice(1).map((c) => (c == null ? '' : String(c).trim()));

      if (rowNumber === 1) {
        headers = cells.map((h) => h || `Column${headers.length + 1}`);
        return;
      }

      const obj: Record<string, any> = {};
      headers.forEach((header, i) => {
        obj[header] = cells[i] ?? '';
      });
      rows.push(obj as T);
    });

    logger.info(`Read ${rows.length} data rows from sheet`);
    return rows;
  }

  static async writeSheet(
    filePath: string,
    data: Record<string, any>[],
    sheetName = 'Sheet1'
  ): Promise<void> {
    if (!data.length) {
      throw new Error('No data provided to write');
    }

    const absolutePath = path.resolve(filePath);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);

    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.commit();

    data.forEach((row) => {
      worksheet.addRow(headers.map((h) => row[h] ?? ''));
    });

    headers.forEach((header, i) => {
      const col = worksheet.getColumn(i + 1);
      col.width = Math.max(12, header.length + 2);
    });

    await workbook.xlsx.writeFile(absolutePath);
    logger.info(`Wrote ${data.length} rows to ${absolutePath}`);
  }

  static async appendRows(
    filePath: string,
    data: Record<string, any>[],
    sheetName = 'Sheet1'
  ): Promise<void> {
    const absolutePath = path.resolve(filePath);
    const workbook = new ExcelJS.Workbook();

    try {
      await workbook.xlsx.readFile(absolutePath);
    } catch {
      // File does not exist yet
    }

    let worksheet = workbook.getWorksheet(sheetName);
    if (!worksheet) {
      worksheet = workbook.addWorksheet(sheetName);
      if (data.length) {
        worksheet.addRow(Object.keys(data[0]));
      }
    }

    data.forEach((row) => {
      const headers = (worksheet!.getRow(1).values as any[]).slice(1).map(String);
      worksheet!.addRow(headers.map((h) => row[h] ?? ''));
    });

    await workbook.xlsx.writeFile(absolutePath);
    logger.info(`Appended ${data.length} rows to ${absolutePath}`);
  }

  static async readCell(
    filePath: string,
    cellAddress: string,
    sheetNameOrIndex: string | number = 1
  ): Promise<string | number | boolean | Date | null> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(path.resolve(filePath));

    const worksheet =
      typeof sheetNameOrIndex === 'string'
        ? workbook.getWorksheet(sheetNameOrIndex)
        : workbook.worksheets[sheetNameOrIndex - 1];

    if (!worksheet) throw new Error(`Sheet not found: ${sheetNameOrIndex}`);

    const cell = worksheet.getCell(cellAddress);
    return cell.value as any;
  }
}

export default ExcelHelper;
