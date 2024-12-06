export const USER_STORE = {
  name: 'users',
  keyPath: 'id',
  indexes: {
    username: { name: 'username', keyPath: 'username', options: { unique: true } }
  }
};

export const LOGIN_ATTEMPTS_STORE = {
  name: 'loginAttempts',
  keyPath: 'id',
  autoIncrement: true,
  indexes: {
    timestamp: { name: 'timestamp', keyPath: 'timestamp', options: { unique: false } }
  }
};

export interface DBSchema {
  users: {
    key: number;
    value: {
      id?: number;
      username: string;
      pin_hash: string;
      pin: string;
      firstName: string;
      lastName: string;
      isAdmin?: boolean;
      created_at: string;
    };
    indexes: { 'username': string };
  };
  loginAttempts: {
    key: number;
    value: {
      id?: number;
      username: string;
      pin: string;
      timestamp: string;
      success: boolean;
      page: string;
      ip?: string;
    };
    indexes: { 'timestamp': string };
  };
}