// Offline-first IndexedDB & LocalStorage Synchronization Engine

export interface QueuedRequest {
  id: string;
  type: 'contact_ticket' | 'translation_quote' | 'staffing_request' | 'training_enrollment' | 'coaching_pathway' | 'nda_request';
  departmentId?: string;
  payload: Record<string, unknown>;
  createdAt: number;
  status: 'pending' | 'syncing' | 'synced' | 'failed';
  trackingNumber: string;
  errorMessage?: string;
}

const DB_NAME = 'wisdomq_offline_db';
const DB_VERSION = 1;
const STORE_NAME = 'sync_queue';
const LOCAL_STORAGE_KEY = 'wisdomq_offline_queue_backup';

class OfflineSyncEngine {
  private isOnlineStatus: boolean = typeof navigator !== 'undefined' ? navigator.onLine : true;
  private listeners: Set<(isOnline: boolean, pendingCount: number) => void> = new Set();
  private isSyncing: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.isOnlineStatus = true;
        this.notifyListeners();
        this.syncPendingQueue();
      });

      window.addEventListener('offline', () => {
        this.isOnlineStatus = false;
        this.notifyListeners();
      });
    }
  }

  public get isOnline(): boolean {
    return this.isOnlineStatus;
  }

  public subscribe(callback: (isOnline: boolean, pendingCount: number) => void) {
    this.listeners.add(callback);
    this.getPendingQueue().then(queue => {
      const pending = queue.filter(item => item.status === 'pending' || item.status === 'failed').length;
      callback(this.isOnlineStatus, pending);
    });
    return () => {
      this.listeners.delete(callback);
    };
  }

  private async notifyListeners() {
    const queue = await this.getPendingQueue();
    const pending = queue.filter(item => item.status === 'pending' || item.status === 'failed').length;
    this.listeners.forEach(fn => fn(this.isOnlineStatus, pending));
  }

  // Open IndexedDB safely
  private async getDB(): Promise<IDBDatabase | null> {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return null;
    }
    return new Promise((resolve) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onerror = () => resolve(null);
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = (e: IDBVersionChangeEvent) => {
        const db = (e.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
    });
  }

  // Retrieve pending queue
  public async getPendingQueue(): Promise<QueuedRequest[]> {
    const db = await this.getDB();
    if (db) {
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve(this.getLocalStorageQueue());
      });
    }
    return this.getLocalStorageQueue();
  }

  private getLocalStorageQueue(): QueuedRequest[] {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private saveLocalStorageQueue(queue: QueuedRequest[]) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(queue));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }

  // Enqueue new request
  public async enqueue(
    type: QueuedRequest['type'],
    payload: Record<string, unknown>,
    departmentId?: string
  ): Promise<QueuedRequest> {
    const trackingNumber = `WQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const newReq: QueuedRequest = {
      id: 'req_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      type,
      departmentId,
      payload,
      createdAt: Date.now(),
      status: this.isOnlineStatus ? 'pending' : 'pending',
      trackingNumber
    };

    const db = await this.getDB();
    if (db) {
      await new Promise<void>((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put(newReq);
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      });
    }

    // Always mirror to localStorage for redundancy
    const localQueue = this.getLocalStorageQueue();
    localQueue.push(newReq);
    this.saveLocalStorageQueue(localQueue);

    await this.notifyListeners();

    // If online, immediately initiate sync
    if (this.isOnlineStatus) {
      setTimeout(() => this.syncPendingQueue(), 300);
    }

    return newReq;
  }

  // Synchronize pending records with server
  public async syncPendingQueue(): Promise<{ syncedCount: number; errors: number }> {
    if (this.isSyncing || !this.isOnlineStatus) {
      return { syncedCount: 0, errors: 0 };
    }
    this.isSyncing = true;
    let syncedCount = 0;
    let errors = 0;

    const queue = await this.getPendingQueue();
    const pendingItems = queue.filter(item => item.status === 'pending' || item.status === 'failed');

    if (pendingItems.length === 0) {
      this.isSyncing = false;
      return { syncedCount: 0, errors: 0 };
    }

    for (const item of pendingItems) {
      try {
        // Mark as syncing
        item.status = 'syncing';
        await this.updateItem(item);

        // Realistic network dispatch simulation
        await new Promise(resolve => setTimeout(resolve, 600));

        // Mark as synced
        item.status = 'synced';
        await this.updateItem(item);
        syncedCount++;
      } catch (err) {
        item.status = 'failed';
        item.errorMessage = err instanceof Error ? err.message : 'Network failure';
        await this.updateItem(item);
        errors++;
      }
    }

    this.isSyncing = false;
    await this.notifyListeners();
    return { syncedCount, errors };
  }

  private async updateItem(item: QueuedRequest) {
    const db = await this.getDB();
    if (db) {
      await new Promise<void>((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put(item);
        tx.oncomplete = () => resolve();
      });
    }
    const local = this.getLocalStorageQueue().map(i => i.id === item.id ? item : i);
    this.saveLocalStorageQueue(local);
  }

  public async clearSynced(): Promise<void> {
    const db = await this.getDB();
    const queue = await this.getPendingQueue();
    const remaining = queue.filter(item => item.status !== 'synced');

    if (db) {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.clear();
      remaining.forEach(item => store.put(item));
    }
    this.saveLocalStorageQueue(remaining);
    await this.notifyListeners();
  }
}

export const syncEngine = new OfflineSyncEngine();
