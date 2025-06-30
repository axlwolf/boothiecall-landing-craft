
// Servicio para Cache API - recursos estáticos
export class CacheService {
  private static cacheName = 'boothie-call-v1';

  static async init(): Promise<void> {
    if ('caches' in window) {
      try {
        await caches.open(this.cacheName);
        console.log('Cache initialized successfully');
      } catch (error) {
        console.error('Failed to initialize cache:', error);
      }
    }
  }

  static async cacheResource(url: string, response: Response): Promise<void> {
    if ('caches' in window) {
      try {
        const cache = await caches.open(this.cacheName);
        await cache.put(url, response.clone());
      } catch (error) {
        console.error('Failed to cache resource:', error);
      }
    }
  }

  static async getCachedResource(url: string): Promise<Response | undefined> {
    if ('caches' in window) {
      try {
        const cache = await caches.open(this.cacheName);
        return await cache.match(url);
      } catch (error) {
        console.error('Failed to get cached resource:', error);
      }
    }
    return undefined;
  }

  static async clearCache(): Promise<void> {
    if ('caches' in window) {
      try {
        await caches.delete(this.cacheName);
        await caches.open(this.cacheName);
      } catch (error) {
        console.error('Failed to clear cache:', error);
      }
    }
  }

  static async cacheTemplateAssets(templateData: any): Promise<void> {
    if (!templateData.elements) return;

    const imageUrls = templateData.elements
      .filter((el: any) => el.type === 'image' && el.src)
      .map((el: any) => el.src);

    for (const url of imageUrls) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          await this.cacheResource(url, response);
        }
      } catch (error) {
        console.error('Failed to cache template asset:', url, error);
      }
    }
  }
}
