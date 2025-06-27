
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Settings, 
  Globe, 
  Palette, 
  Mail, 
  Shield,
  Database,
  Image,
  Save
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminSettings = () => {
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
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Guardar Todos los Cambios
            </Button>
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
                    <Input id="site-name" defaultValue="BoothieCall" />
                  </div>
                  <div>
                    <Label htmlFor="site-tagline">Eslogan</Label>
                    <Input id="site-tagline" defaultValue="Cabinas de Fotos Premium" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="site-description">Descripción del Sitio</Label>
                  <textarea 
                    id="site-description" 
                    className="w-full p-2 border rounded-md mt-1 resize-none"
                    rows={3}
                    defaultValue="Alquiler de cabinas de fotos de lujo para eventos exclusivos. Transforma tu celebración en una experiencia inolvidable."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="site-url">URL del Sitio</Label>
                    <Input id="site-url" defaultValue="https://boothiecall.com" />
                  </div>
                  <div>
                    <Label htmlFor="admin-email">Email de Administrador</Label>
                    <Input id="admin-email" type="email" defaultValue="admin@boothiecall.com" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="timezone">Zona Horaria</Label>
                  <select id="timezone" className="w-full p-2 border rounded-md mt-1">
                    <option value="America/Mexico_City">América/Ciudad de México</option>
                    <option value="America/New_York">América/Nueva York</option>
                    <option value="Europe/Madrid">Europa/Madrid</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="language">Idioma Principal</Label>
                  <select id="language" className="w-full p-2 border rounded-md mt-1">
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
                  <Label>Logo Principal</Label>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Image className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <Button variant="outline">
                        <Image className="w-4 h-4 mr-2" />
                        Subir Logo
                      </Button>
                      <p className="text-sm text-gray-500 mt-1">
                        Recomendado: 200x200px, formato PNG con fondo transparente
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Favicon</Label>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <div className="w-4 h-4 bg-primary rounded-sm"></div>
                    </div>
                    <div className="flex-1">
                      <Button variant="outline" size="sm">
                        Cambiar Favicon
                      </Button>
                      <p className="text-sm text-gray-500 mt-1">
                        32x32px, formato ICO o PNG
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Colores de Marca</Label>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="primary-color" className="text-sm">Color Primario</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-8 h-8 bg-primary rounded border"></div>
                        <Input id="primary-color" defaultValue="#F59E0B" className="flex-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="secondary-color" className="text-sm">Color Secundario</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-8 h-8 bg-secondary rounded border"></div>
                        <Input id="secondary-color" defaultValue="#F3F4F6" className="flex-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="accent-color" className="text-sm">Color de Acento</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-8 h-8 bg-accent rounded border"></div>
                        <Input id="accent-color" defaultValue="#EF4444" className="flex-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="text-color" className="text-sm">Color de Texto</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-8 h-8 bg-gray-900 rounded border"></div>
                        <Input id="text-color" defaultValue="#111827" className="flex-1" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Tipografía</Label>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="heading-font" className="text-sm">Fuente para Títulos</Label>
                      <select id="heading-font" className="w-full p-2 border rounded-md mt-1">
                        <option value="Playfair Display">Playfair Display</option>
                        <option value="Inter">Inter</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Arial">Arial</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="body-font" className="text-sm">Fuente para Cuerpo</Label>
                      <select id="body-font" className="w-full p-2 border rounded-md mt-1">
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
                    <Input id="business-name" defaultValue="BoothieCall" />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Email de Contacto</Label>
                    <Input id="contact-email" type="email" defaultValue="info@boothiecall.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" defaultValue="+52 55 1234 5678" />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input id="whatsapp" defaultValue="+52 55 1234 5678" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Dirección</Label>
                  <textarea 
                    id="address" 
                    className="w-full p-2 border rounded-md mt-1 resize-none"
                    rows={3}
                    defaultValue="Av. Revolución 1234, Col. San Ángel, Ciudad de México, CDMX 01000"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input id="facebook" placeholder="https://facebook.com/boothiecall" />
                  </div>
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input id="instagram" placeholder="https://instagram.com/boothiecall" />
                  </div>
                  <div>
                    <Label htmlFor="twitter">Twitter/X</Label>
                    <Input id="twitter" placeholder="https://twitter.com/boothiecall" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="business-hours">Horarios de Atención</Label>
                  <textarea 
                    id="business-hours" 
                    className="w-full p-2 border rounded-md mt-1 resize-none"
                    rows={3}
                    defaultValue="Lunes a Viernes: 9:00 AM - 6:00 PM&#10;Sábados: 10:00 AM - 4:00 PM&#10;Domingos: Cerrado"
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
                    <Input placeholder="G-XXXXXXXXXX" className="flex-1" />
                    <Button variant="outline">Conectar</Button>
                  </div>
                </div>

                <div>
                  <Label>Google Tag Manager</Label>
                  <div className="mt-2 flex items-center space-x-2">
                    <Input placeholder="GTM-XXXXXXX" className="flex-1" />
                    <Button variant="outline">Conectar</Button>
                  </div>
                </div>

                <div>
                  <Label>Facebook Pixel</Label>
                  <div className="mt-2 flex items-center space-x-2">
                    <Input placeholder="123456789012345" className="flex-1" />
                    <Button variant="outline">Conectar</Button>
                  </div>
                </div>

                <div>
                  <Label>Servicio de Email</Label>
                  <div className="mt-2 space-y-2">
                    <select className="w-full p-2 border rounded-md">
                      <option value="">Seleccionar servicio</option>
                      <option value="mailchimp">Mailchimp</option>
                      <option value="sendgrid">SendGrid</option>
                      <option value="smtp">SMTP Personalizado</option>
                    </select>
                    <Input placeholder="API Key o configuración" />
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
                    <input type="checkbox" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Cookies Estrictamente Necesarias</Label>
                      <p className="text-sm text-gray-600">Solo cookies esenciales para el funcionamiento</p>
                    </div>
                    <input type="checkbox" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Protección contra Spam</Label>
                      <p className="text-sm text-gray-600">Activar reCAPTCHA en formularios</p>
                    </div>
                    <input type="checkbox" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Backup Automático</Label>
                      <p className="text-sm text-gray-600">Respaldo diario de configuración</p>
                    </div>
                    <input type="checkbox" defaultChecked />
                  </div>
                </div>

                <div>
                  <Label>Política de Privacidad</Label>
                  <div className="mt-2 flex items-center space-x-2">
                    <Input placeholder="URL de la política de privacidad" className="flex-1" />
                    <Button variant="outline">Generar</Button>
                  </div>
                </div>

                <div>
                  <Label>Términos de Servicio</Label>
                  <div className="mt-2 flex items-center space-x-2">
                    <Input placeholder="URL de los términos de servicio" className="flex-1" />
                    <Button variant="outline">Generar</Button>
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
                    <input type="checkbox" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Caché Agresivo</Label>
                      <p className="text-sm text-gray-600">Optimizar para velocidad máxima</p>
                    </div>
                    <input type="checkbox" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Minificación Automática</Label>
                      <p className="text-sm text-gray-600">Comprimir CSS y JavaScript</p>
                    </div>
                    <input type="checkbox" defaultChecked />
                  </div>
                </div>

                <div>
                  <Label>Código Personalizado (Header)</Label>
                  <textarea 
                    className="w-full p-2 border rounded-md mt-1 font-mono text-sm"
                    rows={4}
                    placeholder="<!-- Código HTML/JS personalizado para el <head> -->"
                  />
                </div>

                <div>
                  <Label>Código Personalizado (Footer)</Label>
                  <textarea 
                    className="w-full p-2 border rounded-md mt-1 font-mono text-sm"
                    rows={4}
                    placeholder="<!-- Código HTML/JS personalizado antes del </body> -->"
                  />
                </div>

                <div className="pt-4 border-t">
                  <div className="flex space-x-2">
                    <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                      Resetear Configuración
                    </Button>
                    <Button variant="outline">
                      Exportar Configuración
                    </Button>
                    <Button variant="outline">
                      Importar Configuración
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminSettings;
