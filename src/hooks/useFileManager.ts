
import { useState, useEffect, useCallback } from 'react';
import { IndexedDBService } from '@/services/indexedDBService';
import { ConfigService } from '@/services/storageService';

export interface MediaFile {
  id: number;
  name: string;
  type: string;
  size: number;
  data: File;
  uploadDate: Date;
  used: boolean;
  dimensions?: string;
}

export const useFileManager = () => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = useCallback(async () => {
    try {
      setIsLoading(true);
      const savedFiles = await IndexedDBService.getFiles();
      setFiles(savedFiles);
    } catch (error) {
      console.error('Error loading files:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const uploadFile = useCallback(async (file: File): Promise<number> => {
    const settings = ConfigService.getSiteSettings();
    
    // Validar tamaño
    if (file.size > settings.maxFileSize * 1024 * 1024) {
      throw new Error(`El archivo es demasiado grande. Máximo ${settings.maxFileSize}MB`);
    }

    // Validar formato
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!settings.allowedFormats.includes(fileExtension || '')) {
      throw new Error(`Formato no permitido. Use: ${settings.allowedFormats.join(', ')}`);
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);
      
      // Simular progreso de subida
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 20, 90));
      }, 200);

      let dimensions = '';
      
      // Obtener dimensiones si es imagen
      if (file.type.startsWith('image/')) {
        dimensions = await getImageDimensions(file);
      }

      const fileId = await IndexedDBService.saveFile(file, { dimensions });
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      await loadFiles(); // Recargar la lista
      
      return fileId;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [loadFiles]);

  const deleteFile = useCallback(async (id: number) => {
    try {
      await IndexedDBService.deleteFile(id);
      await loadFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }, [loadFiles]);

  const getFileUrl = useCallback((file: MediaFile): string => {
    return URL.createObjectURL(file.data);
  }, []);

  const markFileAsUsed = useCallback(async (id: number, used: boolean = true) => {
    try {
      const file = files.find(f => f.id === id);
      if (file) {
        // Actualizar en IndexedDB
        await IndexedDBService.saveFile(file.data, { 
          ...file, 
          used,
          id 
        });
        await loadFiles();
      }
    } catch (error) {
      console.error('Error updating file usage:', error);
    }
  }, [files, loadFiles]);

  return {
    files,
    isLoading,
    isUploading,
    uploadProgress,
    uploadFile,
    deleteFile,
    getFileUrl,
    markFileAsUsed,
    refreshFiles: loadFiles
  };
};

// Función auxiliar para obtener dimensiones de imagen
const getImageDimensions = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      resolve(`${img.naturalWidth}x${img.naturalHeight}`);
      URL.revokeObjectURL(url);
    };
    
    img.onerror = () => {
      resolve('Unknown');
      URL.revokeObjectURL(url);
    };
    
    img.src = url;
  });
};
