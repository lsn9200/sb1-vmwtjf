import { openDB } from 'idb';
import { DB_CONFIG } from './config';
import { createAdminUser } from './users';
import { USER_STORE, LOGIN_ATTEMPTS_STORE } from './schema';

let db: any = null;

export async function initializeDatabase() {
  if (db) return db;

  try {
    // Delete existing database to start fresh
    await window.indexedDB.deleteDatabase(DB_CONFIG.name);

    db = await openDB(DB_CONFIG.name, DB_CONFIG.version, {
      upgrade(database) {
        // Create users store
        if (!database.objectStoreNames.contains(USER_STORE.name)) {
          const userStore = database.createObjectStore(USER_STORE.name, {
            keyPath: 'id',
            autoIncrement: true
          });
          userStore.createIndex('username', 'username', { unique: true });
        }

        // Create login attempts store
        if (!database.objectStoreNames.contains(LOGIN_ATTEMPTS_STORE.name)) {
          const attemptsStore = database.createObjectStore(LOGIN_ATTEMPTS_STORE.name, {
            keyPath: 'id',
            autoIncrement: true
          });
          attemptsStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
      }
    });

    // Create admin user in a separate transaction
    const tx = db.transaction(USER_STORE.name, 'readwrite');
    try {
      await createAdminUser(tx.objectStore(USER_STORE.name));
      await tx.done;
    } catch (error) {
      console.error('Error creating admin:', error);
      throw error;
    }

    return db;
  } catch (error) {
    console.error('Database initialization error:', error);
    db = null;
    throw error;
  }
}

export function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
}

export function closeDatabase() {
  if (db) {
    db.close();
    db = null;
  }
}