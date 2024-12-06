import { LoginCredentials, User } from '../types/auth';

class AuthService {
  private readonly STORAGE_KEYS = {
    ADMIN_AUTH: 'adminAuthenticated',
    CURRENT_USER: 'currentUser',
    VISITORS: 'visitors',
    FIRST_VISIT: 'firstVisit'
  };

  constructor() {
    this.initializeStorage();
  }

  private initializeStorage(): void {
    if (!localStorage.getItem(this.STORAGE_KEYS.VISITORS)) {
      localStorage.setItem(this.STORAGE_KEYS.VISITORS, '0');
    }
    this.trackVisitor();
  }

  private trackVisitor() {
    const firstVisit = localStorage.getItem(this.STORAGE_KEYS.FIRST_VISIT);
    if (!firstVisit) {
      localStorage.setItem(this.STORAGE_KEYS.FIRST_VISIT, new Date().toISOString());
    }

    const visitors = parseInt(localStorage.getItem(this.STORAGE_KEYS.VISITORS) || '0', 10);
    localStorage.setItem(this.STORAGE_KEYS.VISITORS, (visitors + 1).toString());
  }

  async validateAdmin(credentials: LoginCredentials): Promise<boolean> {
    if (credentials.pin) {
      localStorage.setItem(this.STORAGE_KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    throw new Error('Admin validation failed');
  }

  async login(credentials: LoginCredentials): Promise<User> {
    const user = {
      id: Date.now().toString(),
      username: credentials.username,
      firstName: 'User',
      lastName: credentials.username,
      created_at: new Date().toISOString()
    };

    localStorage.setItem(this.STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    return user;
  }

  getStats() {
    const totalVisitors = parseInt(localStorage.getItem(this.STORAGE_KEYS.VISITORS) || '0', 10);
    const firstVisit = localStorage.getItem(this.STORAGE_KEYS.FIRST_VISIT);

    return {
      totalVisitors,
      firstVisit
    };
  }

  isAdmin(): boolean {
    return localStorage.getItem(this.STORAGE_KEYS.ADMIN_AUTH) === 'true';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.STORAGE_KEYS.CURRENT_USER);
  }

  logout() {
    localStorage.removeItem(this.STORAGE_KEYS.ADMIN_AUTH);
    localStorage.removeItem(this.STORAGE_KEYS.CURRENT_USER);
  }
}

export const authService = new AuthService();
