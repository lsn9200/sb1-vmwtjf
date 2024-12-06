import { isWithinLast48Hours, getBackupFileName } from '../utils/dateUtils';
import { LoginAttempt } from '../types/auth';

export function downloadRecentLogs(loginAttempts: LoginAttempt[]): void {
  // Filter logs from last 48 hours
  const recentLogs = loginAttempts.filter(attempt => 
    isWithinLast48Hours(attempt.timestamp)
  );

  // Create backup object with metadata
  const backup = {
    exportDate: new Date().toISOString(),
    timeRange: '48 hours',
    totalEntries: recentLogs.length,
    logs: recentLogs
  };

  // Create and download file
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = getBackupFileName();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}