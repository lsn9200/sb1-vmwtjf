import { IDBPDatabase } from 'idb';
import { DBSchema } from './schema';
import { UserWithPin } from '../types/auth';

export class UserStore {
  constructor(private db: IDBPDatabase<DBSchema>) {}

  async add(user: Omit<UserWithPin, 'id'>): Promise<number> {
    return await this.db.add('users', user as any);
  }

  async getByUsername(username: string): Promise<UserWithPin | undefined> {
    return await this.db.getFromIndex('users', 'username', username);
  }

  async getById(id: number): Promise<UserWithPin | undefined> {
    return await this.db.get('users', id);
  }

  async getAll(): Promise<UserWithPin[]> {
    return await this.db.getAll('users');
  }
}