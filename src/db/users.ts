import bcrypt from 'bcryptjs';
import { ADMIN_CONFIG } from './config';
import { User, UserWithPin } from '../types/auth';

export async function createAdminUser(store: IDBObjectStore) {
  try {
    // Check if admin exists using index
    const adminExists = await store.index('username').get(ADMIN_CONFIG.username);
    
    if (!adminExists) {
      await store.add({
        username: ADMIN_CONFIG.username,
        pin: ADMIN_CONFIG.pin,
        firstName: ADMIN_CONFIG.firstName,
        lastName: ADMIN_CONFIG.lastName,
        isAdmin: true,
        created_at: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Error creating admin:', error);
    throw error;
  }
}