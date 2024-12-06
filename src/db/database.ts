import { openDB, IDBPDatabase } from 'idb';
import bcrypt from 'bcryptjs';
import { LoginCredentials, User, UserWithPin } from '../types/auth';

const DB_NAME = 'userDB';
const DB_VERSION = 1;
const STORE_NAME = 'users';

class Database {
  private static instance: Database;
  private db: IDBPDatabase | null = null;
  
  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public isInitialized(): boolean {
    return this.db !== null;
  }

  async init(): Promise<void> {
    try {
      // Close any existing connection
      if (this.db) {
        this.db.close();
        this.db = null;
      }

      // Delete existing database to start fresh
      await window.indexedDB.deleteDatabase(DB_NAME);

      this.db = await openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            const store = db.createObjectStore(STORE_NAME, {
              keyPath: 'id',
              autoIncrement: true
            });
            store.createIndex('username', 'username', { unique: true });
          }
        }
      });

      // Create admin user
      await this.createAdminIfNotExists();
    } catch (error) {
      console.error('Database initialization error:', error);
      this.db = null;
      throw error;
    }
  }

  private async createAdminIfNotExists(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      const adminExists = await this.getUserByUsername('admin');
      
      if (!adminExists) {
        const hashedPin = await bcrypt.hash('admin123', 10);
        await this.db.add(STORE_NAME, {
          username: 'admin',
          pin_hash: hashedPin,
          pin: 'admin123',
          firstName: 'Admin',
          lastName: 'User',
          isAdmin: true,
          created_at: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error creating admin:', error);
      throw error;
    }
  }

  async createUser(credentials: LoginCredentials): Promise<User> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      const existingUser = await this.getUserByUsername(credentials.username);
      if (existingUser) {
        throw new Error('Username already exists');
      }

      const hashedPin = await bcrypt.hash(credentials.pin, 10);
      const newUser = {
        username: credentials.username,
        pin_hash: hashedPin,
        pin: credentials.pin,
        firstName: 'User',
        lastName: credentials.username,
        created_at: new Date().toISOString()
      };

      const id = await this.db.add(STORE_NAME, newUser);

      return {
        id: id.toString(),
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async validateUser(credentials: LoginCredentials): Promise<User> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      const user = await this.getUserByUsername(credentials.username);
      
      if (!user) {
        throw new Error('Invalid username or PIN');
      }

      const isValid = await bcrypt.compare(credentials.pin, user.pin_hash);
      if (!isValid) {
        throw new Error('Invalid username or PIN');
      }

      return {
        id: user.id.toString(),
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin
      };
    } catch (error) {
      console.error('Validate user error:', error);
      throw error;
    }
  }

  async getAllUsers(): Promise<UserWithPin[]> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      return await this.db.getAll(STORE_NAME);
    } catch (error) {
      console.error('Error loading users:', error);
      throw error;
    }
  }

  async getUserByUsername(username: string): Promise<UserWithPin | undefined> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      const index = this.db.transaction(STORE_NAME).store.index('username');
      return await index.get(username);
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }
}

export const dbService = Database.getInstance();