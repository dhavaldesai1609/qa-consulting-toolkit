import {
  format,
  addDays,
  subDays,
  addMonths,
  differenceInDays,
  isWeekend,
  parseISO,
  isValid,
} from 'date-fns';

/**
 * Date / time utilities commonly needed in test data and assertions.
 */
export class DateHelper {
  static today(pattern = 'yyyy-MM-dd'): string {
    return format(new Date(), pattern);
  }

  static format(date: Date | string, pattern = 'yyyy-MM-dd'): string {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, pattern);
  }

  static addDays(date: Date | string, amount: number): Date {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return addDays(d, amount);
  }

  static subDays(date: Date | string, amount: number): Date {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return subDays(d, amount);
  }

  static addMonths(date: Date | string, amount: number): Date {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return addMonths(d, amount);
  }

  static daysBetween(start: Date | string, end: Date | string): number {
    const s = typeof start === 'string' ? parseISO(start) : start;
    const e = typeof end === 'string' ? parseISO(end) : end;
    return differenceInDays(e, s);
  }

  static isWeekend(date: Date | string): boolean {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return isWeekend(d);
  }

  static isValid(dateStr: string): boolean {
    return isValid(parseISO(dateStr));
  }

  /** Next business day (skips Sat/Sun – extend for holidays as needed) */
  static nextBusinessDay(from: Date = new Date()): Date {
    let d = addDays(from, 1);
    while (isWeekend(d)) {
      d = addDays(d, 1);
    }
    return d;
  }
}

export default DateHelper;
