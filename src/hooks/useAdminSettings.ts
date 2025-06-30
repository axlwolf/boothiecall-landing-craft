
import { useState, useEffect, useCallback } from 'react';
import { ConfigService } from '@/services/storageService';
import { useToast } from '@/hooks/use-toast';

export interface SiteSettings {
  siteName: string;
  siteTagline: string;
  siteDescription: string;
  siteUrl: string;
  adminEmail: string;
  timezone: string;
  language: string;
  businessName: string;
  contactEmail: string;
  phone: string;
  whatsapp: string;
  address: string;
  facebook: string;
  instagram: string;
  twitter: string;
  businessHours: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  headingFont: string;
  bodyFont: string;
  forceHttps: boolean;
  strictCookies: boolean;
  spamProtection: boolean;
  autoBackup: boolean;
  privacyPolicyUrl: string;
  termsOfServiceUrl: string;
  googleAnalytics: string;
  googleTagManager: string;
  facebookPixel: string;
  emailService: string;
  emailApiKey: string;
  devMode: boolean;
  aggressiveCache: boolean;
  autoMinify: boolean;
  customHeaderCode: string;
  customFooterCode: string;
}

const defaultSettings: SiteSettings = {
  siteName: 'BoothieCall',
  siteTagline: 'Cabinas de Fotos Premium',
  siteDescription: 'Alquiler de cabinas de fotos de lujo para eventos exclusivos. Transforma tu celebración en una experiencia inolvidable.',
  siteUrl: 'https://boothiecall.com',
  adminEmail: 'admin@boothiecall.com',
  timezone: 'America/Mexico_City',
  language: 'es',
  businessName: 'BoothieCall',
  contactEmail: 'info@boothiecall.com',
  phone: '+52 55 1234 5678',
  whatsapp: '+52 55 1234 5678',
  address: 'Av. Revolución 1234, Col. San Ángel, Ciudad de México, CDMX 01000',
  facebook: '',
  instagram: '',
  twitter: '',
  businessHours: 'Lunes a Viernes: 9:00 AM - 6:00 PM\nSábados: 10:00 AM - 4:00 PM\nDomingos: Cerrado',
  primaryColor: '#F59E0B',
  secondaryColor: '#F3F4F6',
  accentColor: '#EF4444',
  textColor: '#111827',
  headingFont: 'Playfair Display',
  bodyFont: 'Inter',
  forceHttps: true,
  strictCookies: true,
  spamProtection: true,
  autoBackup: true,
  privacyPolicyUrl: '',
  termsOfServiceUrl: '',
  googleAnalytics: '',
  googleTagManager: '',
  facebookPixel: '',
  emailService: '',
  emailApiKey: '',
  devMode: false,
  aggressiveCache: true,
  autoMinify: true,
  customHeaderCode: '',
  customFooterCode: ''
};

export const useAdminSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      const savedSettings = ConfigService.getSiteSettings();
      setSettings({ ...defaultSettings, ...savedSettings });
      console.log('Settings loaded:', savedSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las configuraciones",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const updateSettings = useCallback((newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const saveSettings = useCallback(async () => {
    try {
      setIsSaving(true);
      ConfigService.saveSiteSettings(settings);
      console.log('Settings saved:', settings);
      toast({
        title: "Configuración Guardada",
        description: "Los cambios se han guardado correctamente",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "No se pudieron guardar las configuraciones",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  }, [settings, toast]);

  const resetSettings = useCallback(async () => {
    try {
      setSettings(defaultSettings);
      ConfigService.saveSiteSettings(defaultSettings);
      toast({
        title: "Configuración Restablecida",
        description: "Se han restaurado los valores predeterminados",
      });
    } catch (error) {
      console.error('Error resetting settings:', error);
      toast({
        title: "Error",
        description: "No se pudo restablecer la configuración",
        variant: "destructive"
      });
    }
  }, [toast]);

  return {
    settings,
    isLoading,
    isSaving,
    updateSettings,
    saveSettings,
    resetSettings,
    loadSettings
  };
};
