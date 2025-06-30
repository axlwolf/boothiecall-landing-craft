
// Servicio para IndexedDB - archivos e imágenes
export class IndexedDBService {
  private static dbName = 'BoothieCallDB';
  private static version = 1;
  private static db: IDBDatabase | null = null;

  static async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Store para archivos multimedia
        if (!db.objectStoreNames.contains('media')) {
          const mediaStore = db.createObjectStore('media', { keyPath: 'id', autoIncrement: true });
          mediaStore.createIndex('name', 'name', { unique: false });
          mediaStore.createIndex('type', 'type', { unique: false });
        }

        // Store para templates
        if (!db.objectStoreNames.contains('templates')) {
          const templateStore = db.createObjectStore('templates', { keyPath: 'id' });
          templateStore.createIndex('name', 'name', { unique: false });
        }

        // Store para contenido
        if (!db.objectStoreNames.contains('content')) {
          const contentStore = db.createObjectStore('content', { keyPath: 'id' });
          contentStore.createIndex('section', 'section', { unique: false });
        }

        // Store para backups
        if (!db.objectStoreNames.contains('backups')) {
          const backupStore = db.createObjectStore('backups', { keyPath: 'id', autoIncrement: true });
          backupStore.createIndex('date', 'date', { unique: false });
        }
      };
    });
  }

  static async saveFile(file: File, metadata: any = {}): Promise<number> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['media'], 'readwrite');
      const store = transaction.objectStore('media');

      const fileData = {
        name: file.name,
        type: file.type,
        size: file.size,
        data: file,
        uploadDate: new Date(),
        used: false,
        ...metadata
      };

      const request = store.add(fileData);
      request.onsuccess = () => resolve(request.result as number);
      request.onerror = () => reject(request.error);
    });
  }

  static async getFiles(): Promise<any[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['media'], 'readonly');
      const store = transaction.objectStore('media');
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  static async deleteFile(id: number): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['media'], 'readwrite');
      const store = transaction.objectStore('media');
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  static async saveTemplate(template: any): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['templates'], 'readwrite');
      const store = transaction.objectStore('templates');
      
      const templateData = {
        ...template,
        lastModified: new Date()
      };

      const request = store.put(templateData);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  static async getTemplates(): Promise<any[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['templates'], 'readonly');
      const store = transaction.objectStore('templates');
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  static async createBackup(data: any): Promise<number> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['backups'], 'readwrite');
      const store = transaction.objectStore('backups');

      const backupData = {
        date: new Date(),
        type: 'manual',
        data: data,
        size: JSON.stringify(data).length
      };

      const request = store.add(backupData);
      request.onsuccess = () => resolve(request.result as number);
      request.onerror = () => reject(request.error);
    });
  }

  static async getBackups(): Promise<any[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['backups'], 'readonly');
      const store = transaction.objectStore('backups');
      const request = store.getAll();

      request.onsuccess = () => {
        const backups = request.result.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        resolve(backups);
      };
      request.onerror = () => reject(request.error);
    });
  }
}
