
import { useState, useEffect, useCallback } from 'react';
import { IndexedDBService } from '@/services/indexedDBService';
import { LocalStorageService } from '@/services/storageService';
import { CacheService } from '@/services/cacheService';

export interface ElementType {
  id: number;
  type: 'text' | 'image' | 'shape';
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  src?: string;
  styles: Record<string, any>;
}

export const useTemplateEditor = () => {
  const [elements, setElements] = useState<ElementType[]>([]);
  const [selectedElement, setSelectedElement] = useState<number | null>(null);
  const [history, setHistory] = useState<ElementType[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isDragging, setIsDragging] = useState(false);

  // Cargar template al inicializar
  useEffect(() => {
    loadTemplate();
  }, []);

  // Auto-guardar cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      if (elements.length > 0) {
        saveTemplate();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [elements]);

  const loadTemplate = useCallback(async () => {
    try {
      const savedElements = LocalStorageService.getItem<ElementType[]>('current_template', []);
      if (savedElements.length > 0) {
        setElements(savedElements);
        addToHistory(savedElements);
      } else {
        // Template por defecto
        const defaultElements: ElementType[] = [
          {
            id: 1,
            type: "text",
            content: "Título Principal",
            x: 50,
            y: 100,
            width: 300,
            height: 60,
            styles: { fontSize: "32px", color: "#000", fontWeight: "bold" }
          },
          {
            id: 2,
            type: "text", 
            content: "Subtítulo descriptivo",
            x: 50,
            y: 180,
            width: 400,
            height: 40,
            styles: { fontSize: "18px", color: "#666" }
          }
        ];
        setElements(defaultElements);
        addToHistory(defaultElements);
      }
    } catch (error) {
      console.error('Error loading template:', error);
    }
  }, []);

  const saveTemplate = useCallback(async () => {
    try {
      LocalStorageService.setItem('current_template', elements);
      
      // Guardar en IndexedDB también
      const templateData = {
        id: 'current',
        name: 'Template Actual',
        elements,
        lastModified: new Date()
      };
      await IndexedDBService.saveTemplate(templateData);
      
      console.log('Template saved successfully');
    } catch (error) {
      console.error('Error saving template:', error);
    }
  }, [elements]);

  const addToHistory = useCallback((newElements: ElementType[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...newElements]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const addElement = useCallback((type: 'text' | 'image' | 'shape') => {
    const baseElement = {
      id: Date.now(),
      x: 100,
      y: 100,
      width: 150,
      height: 100,
    };

    let newElement: ElementType;

    switch (type) {
      case "text":
        newElement = {
          ...baseElement,
          type: "text",
          content: "Nuevo texto",
          width: 200,
          height: 40,
          styles: { fontSize: "16px", color: "#000" }
        };
        break;
      case "image":
        newElement = {
          ...baseElement,
          type: "image",
          src: "/api/placeholder/150/100",
          styles: { borderRadius: "4px" }
        };
        break;
      case "shape":
        newElement = {
          ...baseElement,
          type: "shape",
          styles: { backgroundColor: "#gray", borderRadius: "4px" }
        };
        break;
    }

    const newElements = [...elements, newElement];
    setElements(newElements);
    addToHistory(newElements);
  }, [elements, addToHistory]);

  const updateElement = useCallback((id: number, updates: Partial<ElementType>) => {
    const newElements = elements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    );
    setElements(newElements);
    addToHistory(newElements);
  }, [elements, addToHistory]);

  const deleteElement = useCallback((id: number) => {
    const newElements = elements.filter(el => el.id !== id);
    setElements(newElements);
    addToHistory(newElements);
    setSelectedElement(null);
  }, [elements, addToHistory]);

  const duplicateElement = useCallback((id: number) => {
    const element = elements.find(el => el.id === id);
    if (element) {
      const newElement: ElementType = { 
        ...element, 
        id: Date.now(), 
        x: element.x + 20, 
        y: element.y + 20 
      };
      const newElements = [...elements, newElement];
      setElements(newElements);
      addToHistory(newElements);
    }
  }, [elements, addToHistory]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setElements([...history[newIndex]]);
      setHistoryIndex(newIndex);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setElements([...history[newIndex]]);
      setHistoryIndex(newIndex);
    }
  }, [history, historyIndex]);

  const createBackup = useCallback(async () => {
    try {
      const backupData = {
        elements,
        config: LocalStorageService.getItem('template_config', {}),
        timestamp: new Date().toISOString()
      };
      
      const backupId = await IndexedDBService.createBackup(backupData);
      console.log('Backup created with ID:', backupId);
      return backupId;
    } catch (error) {
      console.error('Error creating backup:', error);
      throw error;
    }
  }, [elements]);

  return {
    elements,
    selectedElement,
    setSelectedElement,
    isDragging,
    setIsDragging,
    addElement,
    updateElement,
    deleteElement,
    duplicateElement,
    saveTemplate,
    loadTemplate,
    undo,
    redo,
    createBackup,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1
  };
};
