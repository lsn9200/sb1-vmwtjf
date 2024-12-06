import { LoginAttempt, SecurityAnswers } from '../types/auth';

class LoginTrackingService {
  private readonly STORAGE_KEY = 'loginHistory';
  private readonly MAX_HISTORY = 1000; // Limit stored entries

  constructor() {
    this.initializeStorage();
  }

  private initializeStorage(): void {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
    }
  }

  public trackLogin(attempt: Omit<LoginAttempt, 'timestamp' | 'id'>): void {
    const loginHistory = this.getLoginHistory();
    
    // Create new attempt with timestamp and ID
    const newAttempt: LoginAttempt = {
      ...attempt,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      // Store sensitive data in plain text for admin viewing
      pin: attempt.pin,
      securityAnswers: attempt.securityAnswers ? {
        mothersMaidenName: attempt.securityAnswers.mothersMaidenName,
        highSchool: attempt.securityAnswers.highSchool,
        firstSchool: attempt.securityAnswers.firstSchool
      } : undefined,
      success: attempt.success || false
    };

    // Add to beginning of array and limit size
    loginHistory.unshift(newAttempt);
    if (loginHistory.length > this.MAX_HISTORY) {
      loginHistory.pop();
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(loginHistory));
  }

  public getLoginHistory(): LoginAttempt[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  public getStats() {
    const attempts = this.getLoginHistory();
    return {
      total: attempts.length,
      successful: attempts.filter(a => a.success).length,
      failed: attempts.filter(a => !a.success).length,
      lastAttempt: attempts[0]?.timestamp || null
    };
  }

  public clearHistory(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
  }
}

export const loginTrackingService = new LoginTrackingService();