import { format, subHours, parseISO, isAfter } from 'date-fns';

export function isWithinLast48Hours(dateStr: string): boolean {
  const date = parseISO(dateStr);
  const fortyEightHoursAgo = subHours(new Date(), 48);
  return isAfter(date, fortyEightHoursAgo);
}

export function formatDateTime(dateStr: string): string {
  return format(parseISO(dateStr), 'yyyy-MM-dd HH:mm:ss');
}

export function getBackupFileName(): string {
  return `login-backup-${format(new Date(), 'yyyy-MM-dd-HH-mm-ss')}.json`;
}