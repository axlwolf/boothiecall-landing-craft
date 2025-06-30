
// Servicio para localStorage - configuraciones y datos pequeños
export class LocalStorageService {
  private static prefix = 'boothie_';

  static setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(this.prefix + key, serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  static getItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(this.prefix + key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  }

  static removeItem(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }

  static clear(): void {
    Object.keys(localStorage)
      .filter(key => key.startsWith(this.prefix))
      .forEach(key => localStorage.removeItem(key));
  }
}

// Servicio para configuraciones específicas
export class ConfigService {
  static saveTemplateConfig(config: any) {
    LocalStorageService.setItem('template_config', config);
  }

  static getTemplateConfig() {
    return LocalStorageService.getItem('template_config', {
      selectedTemplate: 'premium',
      theme: 'gold',
      autoSave: true
    });
  }

  static saveSiteSettings(settings: any) {
    LocalStorageService.setItem('site_settings', settings);
  }

  static getSiteSettings() {
    return LocalStorageService.getItem('site_settings', {
      siteName: 'BoothieCall',
      siteDescription: 'Premium photobooth services',
      maxFileSize: 10,
      allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp']
    });
  }
}
