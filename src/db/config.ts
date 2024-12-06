export const DB_CONFIG = {
  name: 'userDB',
  version: 1,
  stores: {
    users: {
      name: 'users',
      keyPath: 'id',
      autoIncrement: true,
      indexes: [
        { name: 'username', keyPath: 'username', options: { unique: true } }
      ]
    },
    loginAttempts: {
      name: 'loginAttempts',
      keyPath: 'id',
      autoIncrement: true,
      indexes: [
        { name: 'timestamp', keyPath: 'timestamp', options: { unique: false } }
      ]
    }
  }
};

export const ADMIN_CONFIG = {
  username: 'admin',
  pin: '199594',
  firstName: 'Admin',
  lastName: 'User'
};