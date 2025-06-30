
import { useEffect } from 'react';
import { IndexedDBService } from '@/services/indexedDBService';
import { CacheService } from '@/services/cacheService';

export const useAppInitialization = () => {
  useEffect(() => {
    const initializeServices = async () => {
      try {
        console.log('Initializing IndexedDB...');
        await IndexedDBService.init();
        console.log('IndexedDB initialized successfully');
        
        console.log('Initializing Cache...');
        await CacheService.init();
        console.log('Cache initialized successfully');
      } catch (error) {
        console.error('Error initializing services:', error);
      }
    };

    initializeServices();
  }, []);
};
