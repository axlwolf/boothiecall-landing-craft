
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  ArrowLeft, 
  Globe, 
  Palette, 
  Mail, 
  Shield,
  Database,
  Image,
  Save,
  RotateCcw,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAdminSettings } from "@/hooks/useAdminSettings";

const AdminSettingsContent = () => {
  const { 
    settings, 
    isLoading, 
    isSaving, 
    updateSettings, 
    saveSettings, 
    resetSettings 
  } = useAdminSettings();

  const handleInputChange = (field: string, value: string | boolean) => {
    updateSettings({ [field]: value });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Cargando configuración...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Configuración General</h1>
                <p className="text-gray-600">Ajustes globales del sitio y preferencias</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                onClick={resetSettings}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Restablecer
              </Button>
              <Button onClick={saveSettings} disabled={isSaving}>
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Guardar Todos los Cambios
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="branding">Marca</TabsTrigger>
            <TabsTrigger value="contact">Contacto</TabsTrigger>
            <TabsTrigger value="integrations">Integraciones</TabsTrigger>
            <TabsTrigger value="security">Seguridad</TabsTrigger>
            <TabsTrigger value="advanced">Avanzado</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Información Básica del Sitio</span>
                </CardTitle>
                <CardDescription>
                  Configura la información fundamental de tu sitio web
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="site-name">Nombre del Sitio</Label>
                    <Input 
                      id="site-name" 
                      value={settings.siteName}
                      onChange={(e) => handleInputChange('siteName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="site-tagline">Eslogan</Label>
                    <Input 
                      id="site-tagline" 
                      value={settings.siteTagline}
                      onChange={(e) => handleInputChange('siteTagline', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="site-description">Descripción del Sitio</Label>
                  <textarea 
                    id="site-description" 
                    className="w-full p-2 border rounded-md mt-1 resize-none"
                    rows={3}
                    value={settings.siteDescription}
                    onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="site-url">URL del Sitio</Label>
                    <Input 
                      id="site-url" 
                      value={settings.siteUrl}
                      onChange={(e) => handleInputChange('siteUrl', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="admin-email">Email de Administrador</Label>
                    <Input 
                      id="admin-email" 
                      type="email" 
                      value={settings.adminEmail}
                      onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="timezone">Zona Horaria</Label>
                  <select 
                    id="timezone" 
                    className="w-full p-2 border rounded-md mt-1"
                    value={settings.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                  >
                    <option value="America/Mexico_City">América/Ciudad de México</option>
                    <option value="America/New_York">América/Nueva York</option>
                    <option value="Europe/Madrid">Europa/Madrid</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="language">Idioma Principal</Label>
                  <select 
                    id="language" 
                    className="w-full p-2 border rounded-md mt-1"
                    value={settings.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="both">Bilingüe (ES/EN)</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5" />
                  <span>Identidad Visual</span>
                </CardTitle>
                <CardDescription>
                  Personaliza la apariencia y marca de tu sitio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Colores de Marca</Label>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="primary-color" className="text-sm">Color Primario</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <div 
                          className="w-8 h-8 rounded border"
                          style={{ backgroundColor: settings.primaryColor }}
                        ></div>
                        <Input 
                          id="primary-color" 
                          value={settings.primaryColor}
                          onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                          className="flex-1" 
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="secondary-color" className="text-sm">Color Secundario</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <div 
                          className="w-8 h-8 rounded border"
                          style={{ backgroundColor: settings.secondaryColor }}
                        ></div>
                        <Input 
                          id="secondary-color" 
                          value={settings.secondaryColor}
                          onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                          className="flex-1" 
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="accent-color" className="text-sm">Color de Acento</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <div 
                          className="w-8 h-8 rounded border"
                          style={{ backgroundColor: settings.accentColor }}
                        ></div>
                        <Input 
                          id="accent-color" 
                          value={settings.accentColor}
                          onChange={(e) => handleInputChange('accentColor', e.target.value)}
                          className="flex-1" 
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="text-color" className="text-sm">Color de Texto</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <div 
                          className="w-8 h-8 rounded border"
                          style={{ backgroundColor: settings.textColor }}
                        ></div>
                        <Input 
                          id="text-color" 
                          value={settings.textColor}
                          onChange={(e) => handleInputChange('textColor', e.target.value)}
                          className="flex-1" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Tipografía</Label>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="heading-font" className="text-sm">Fuente para Títulos</Label>
                      <select 
                        id="heading-font" 
                        className="w-full p-2 border rounded-md mt-1"
                        value={settings.headingFont}
                        onChange={(e) => handleInputChange('headingFont', e.target.value)}
                      >
                        <option value="Playfair Display">Playfair Display</option>
                        <option value="Inter">Inter</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Arial">Arial</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="body-font" className="text-sm">Fuente para Cuerpo</Label>
                      <select 
                        id="body-font" 
                        className="w-full p-2 border rounded-md mt-1"
                        value={settings.bodyFont}
                        onChange={(e) => handleInputChange('bodyFont', e.target.value)}
                      >
                        <option value="Inter">Inter</option>
                        <option value="Playfair Display">Playfair Display</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Arial">Arial</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>Información de Contacto</span>
                </CardTitle>
                <CardDescription>
                  Configura los datos de contacto que aparecerán en tu sitio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="business-name">Nombre del Negocio</Label>
                    <Input 
                      id="business-name" 
                      value={settings.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Email de Contacto</Label>
                    <Input 
                      id="contact-email" 
                      type="email" 
                      value={settings.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input 
                      id="phone" 
                      value={settings.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input 
                      id="whatsapp" 
                      value={settings.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Dirección</Label>
                  <textarea 
                    id="address" 
                    className="w-full p-2 border rounded-md mt-1 resize-none"
                    rows={3}
                    value={settings.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input 
                      id="facebook" 
                      placeholder="https://facebook.com/boothiecall"
                      value={settings.facebook}
                      onChange={(e) => handleInputChange('facebook', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input 
                      id="instagram" 
                      placeholder="https://instagram.com/boothiecall"
                      value={settings.instagram}
                      onChange={(e) => handleInputChange('instagram', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitter">Twitter/X</Label>
                    <Input 
                      id="twitter" 
                      placeholder="https://twitter.com/boothiecall"
                      value={settings.twitter}
                      onChange={(e) => handleInputChange('twitter', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="business-hours">Horarios de Atención</Label>
                  <textarea 
                    id="business-hours" 
                    className="w-full p-2 border rounded-md mt-1 resize-none"
                    rows={3}
                    value={settings.businessHours}
                    onChange={(e) => handleInputChange('businessHours', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5" />
                  <span>Integraciones</span>
                </CardTitle>
                <CardDescription>
                  Conecta tu sitio con servicios externos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Google Analytics</Label>
                  <div className="mt-2 flex items-center space-x-2">
                    <Input 
                      placeholder="G-XXXXXXXXXX" 
                      className="flex-1"
                      value={settings.googleAnalytics}
                      onChange={(e) => handleInputChange('googleAnalytics', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Google Tag Manager</Label>
                  <div className="mt-2 flex items-center space-x-2">
                    <Input 
                      placeholder="GTM-XXXXXXX" 
                      className="flex-1"
                      value={settings.googleTagManager}
                      onChange={(e) => handleInputChange('googleTagManager', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Facebook Pixel</Label>
                  <div className="mt-2 flex items-center space-x-2">
                    <Input 
                      placeholder="123456789012345" 
                      className="flex-1"
                      value={settings.facebookPixel}
                      onChange={(e) => handleInputChange('facebookPixel', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Servicio de Email</Label>
                  <div className="mt-2 space-y-2">
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={settings.emailService}
                      onChange={(e) => handleInputChange('emailService', e.target.value)}
                    >
                      <option value="">Seleccionar servicio</option>
                      <option value="mailchimp">Mailchimp</option>
                      <option value="sendgrid">SendGrid</option>
                      <option value="smtp">SMTP Personalizado</option>
                    </select>
                    <Input 
                      placeholder="API Key o configuración"
                      value={settings.emailApiKey}
                      onChange={(e) => handleInputChange('emailApiKey', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Seguridad</span>
                </CardTitle>
                <CardDescription>
                  Configuración de seguridad y privacidad
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Forzar HTTPS</Label>
                      <p className="text-sm text-gray-600">Redirigir automáticamente a HTTPS</p>
                    </div>
                    <Switch 
                      checked={settings.forceHttps}
                      onCheckedChange={(checked) => handleInputChange('forceHttps', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Cookies Estrictamente Necesarias</Label>
                      <p className="text-sm text-gray-600">Solo cookies esenciales para el funcionamiento</p>
                    </div>
                    <Switch 
                      checked={settings.strictCookies}
                      onCheckedChange={(checked) => handleInputChange('strictCookies', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Protección contra Spam</Label>
                      <p className="text-sm text-gray-600">Activar reCAPTCHA en formularios</p>
                    </div>
                    <Switch 
                      checked={settings.spamProtection}
                      onCheckedChange={(checked) => handleInputChange('spamProtection', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Backup Automático</Label>
                      <p className="text-sm text-gray-600">Respaldo diario de configuración</p>
                    </div>
                    <Switch 
                      checked={settings.autoBackup}
                      onCheckedChange={(checked) => handleInputChange('autoBackup', checked)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Política de Privacidad</Label>
                  <div className="mt-2 flex items-center space-x-2">
                    <Input 
                      placeholder="URL de la política de privacidad" 
                      className="flex-1"
                      value={settings.privacyPolicyUrl}
                      onChange={(e) => handleInputChange('privacyPolicyUrl', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Términos de Servicio</Label>
                  <div className="mt-2 flex items-center space-x-2">
                    <Input 
                      placeholder="URL de los términos de servicio" 
                      className="flex-1"
                      value={settings.termsOfServiceUrl}
                      onChange={(e) => handleInputChange('termsOfServiceUrl', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración Avanzada</CardTitle>
                <CardDescription>
                  Opciones técnicas y de desarrollo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Modo de Desarrollo</Label>
                      <p className="text-sm text-gray-600">Mostrar información de debug</p>
                    </div>
                    <Switch 
                      checked={settings.devMode}
                      onCheckedChange={(checked) => handleInputChange('devMode', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Caché Agresivo</Label>
                      <p className="text-sm text-gray-600">Optimizar para velocidad máxima</p>
                    </div>
                    <Switch 
                      checked={settings.aggressiveCache}
                      onCheckedChange={(checked) => handleInputChange('aggressiveCache', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Minificación Automática</Label>
                      <p className="text-sm text-gray-600">Comprimir CSS y JavaScript</p>
                    </div>
                    <Switch 
                      checked={settings.autoMinify}
                      onCheckedChange={(checked) => handleInputChange('autoMinify', checked)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Código Personalizado (Header)</Label>
                  <textarea 
                    className="w-full p-2 border rounded-md mt-1 font-mono text-sm"
                    rows={4}
                    placeholder="<!-- Código HTML/JS personalizado para el <head> -->"
                    value={settings.customHeaderCode}
                    onChange={(e) => handleInputChange('customHeaderCode', e.target.value)}
                  />
                </div>

                <div>
                  <Label>Código Personalizado (Footer)</Label>
                  <textarea 
                    className="w-full p-2 border rounded-md mt-1 font-mono text-sm"
                    rows={4}
                    placeholder="<!-- Código HTML/JS personalizado antes del </body> -->"
                    value={settings.customFooterCode}
                    onChange={(e) => handleInputChange('customFooterCode', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const AdminSettings = () => {
  return (
    <ProtectedRoute>
      <AdminSettingsContent />
    </ProtectedRoute>
  );
};

export default AdminSettings;
