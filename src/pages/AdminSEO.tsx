import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Search, 
  TrendingUp, 
  Globe, 
  FileText,
  Image,
  Link as LinkIcon,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";

const AdminSEOContent = () => {
  const [seoScore, setSeoScore] = useState(85);
  
  const seoChecks = [
    {
      category: "Títulos y Metadatos",
      items: [
        { name: "Título principal optimizado", status: "success", score: 100 },
        { name: "Meta descripción presente", status: "success", score: 95 },
        { name: "Títulos H1-H6 estructurados", status: "warning", score: 80 },
        { name: "Meta keywords relevantes", status: "success", score: 90 }
      ]
    },
    {
      category: "Contenido",
      items: [
        { name: "Densidad de palabras clave", status: "success", score: 85 },
        { name: "Contenido único y original", status: "success", score: 100 },
        { name: "Longitud del contenido", status: "warning", score: 75 },
        { name: "Enlaces internos", status: "error", score: 40 }
      ]
    },
    {
      category: "Técnico",
      items: [
        { name: "Velocidad de carga", status: "success", score: 92 },
        { name: "Responsive design", status: "success", score: 100 },
        { name: "SSL/HTTPS", status: "success", score: 100 },
        { name: "Sitemap XML", status: "warning", score: 70 }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning": return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "error": return <XCircle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

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
                <h1 className="text-2xl font-bold text-gray-900">SEO & Metadatos</h1>
                <p className="text-gray-600">Optimización para motores de búsqueda</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{seoScore}%</div>
                <div className="text-xs text-gray-500">Puntuación SEO</div>
              </div>
              <Button>
                <Search className="w-4 h-4 mr-2" />
                Analizar Sitio
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="metadata">Metadatos</TabsTrigger>
            <TabsTrigger value="content">Contenido</TabsTrigger>
            <TabsTrigger value="technical">Técnico</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* SEO Score Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Puntuación SEO General</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl font-bold text-green-600">{seoScore}/100</div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Excelente
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${seoScore}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Tu sitio tiene una excelente optimización SEO. Continúa con las mejores prácticas.
                </p>
              </CardContent>
            </Card>

            {/* SEO Checks */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {seoChecks.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(item.status)}
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-600">
                          {item.score}%
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="metadata" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Metadatos Principales</CardTitle>
                <CardDescription>
                  Configura los metadatos básicos para mejorar tu posicionamiento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="page-title">Título de la Página</Label>
                  <Input 
                    id="page-title" 
                    defaultValue="BoothieCall - Alquiler Premium de Cabinas de Fotos"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Longitud: 52 caracteres (Óptimo: 50-60)
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="meta-description">Meta Descripción</Label>
                  <textarea 
                    id="meta-description" 
                    className="w-full p-2 border rounded-md mt-1 resize-none"
                    rows={3}
                    defaultValue="Cabinas de fotos de lujo para eventos exclusivos. Transforma tu celebración en una experiencia inolvidable con BoothieCall."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Longitud: 128 caracteres (Óptimo: 150-160)
                  </p>
                </div>

                <div>
                  <Label htmlFor="keywords">Palabras Clave</Label>
                  <Input 
                    id="keywords" 
                    defaultValue="cabina de fotos, alquiler, eventos, bodas, fiestas, fotografía"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="canonical-url">URL Canónica</Label>
                  <Input 
                    id="canonical-url" 
                    defaultValue="https://boothiecall.com"
                    className="mt-1"
                  />
                </div>

                <Button>Guardar Metadatos</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Open Graph & Redes Sociales</CardTitle>
                <CardDescription>
                  Optimiza cómo se ve tu sitio cuando se comparte en redes sociales
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="og-title">Título para Redes Sociales</Label>
                  <Input 
                    id="og-title" 
                    defaultValue="BoothieCall - Cabinas de Fotos Premium"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="og-description">Descripción para Redes Sociales</Label>
                  <textarea 
                    id="og-description" 
                    className="w-full p-2 border rounded-md mt-1 resize-none"
                    rows={2}
                    defaultValue="Alquiler de cabinas de fotos de lujo para eventos exclusivos"
                  />
                </div>

                <div>
                  <Label htmlFor="og-image">Imagen de Previsualización</Label>
                  <div className="mt-1 flex items-center space-x-2">
                    <Input 
                      id="og-image" 
                      defaultValue="https://boothiecall.com/og-image.jpg"
                      className="flex-1"
                    />
                    <Button variant="outline" size="sm">
                      <Image className="w-4 h-4 mr-1" />
                      Subir
                    </Button>
                  </div>
                </div>

                <Button>Guardar Configuración Social</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Optimización de Contenido</CardTitle>
                <CardDescription>
                  Mejora el contenido de tu sitio para los motores de búsqueda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Palabra Clave Principal</Label>
                  <Input defaultValue="cabina de fotos alquiler" className="mt-1" />
                </div>

                <div>
                  <Label>Palabras Clave Secundarias</Label>
                  <div className="mt-1 space-y-2">
                    <Input placeholder="photobooth rental" />
                    <Input placeholder="alquiler cabinas fotograficas" />
                    <Input placeholder="cabina fotos eventos" />
                  </div>
                </div>

                <div>
                  <Label>Densidad de Palabras Clave</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">cabina de fotos</span>
                      <Badge variant="outline">2.1% (Óptimo)</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">alquiler</span>
                      <Badge variant="outline">1.8% (Óptimo)</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">eventos</span>
                      <Badge variant="secondary">0.9% (Bajo)</Badge>
                    </div>
                  </div>
                </div>

                <Button>Analizar Contenido</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Optimización Técnica</CardTitle>
                <CardDescription>
                  Aspectos técnicos que afectan tu posicionamiento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Certificado SSL</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Sitemap XML</span>
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Robots.txt</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Compresión GZIP</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Velocidad de carga</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        1.2s
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Core Web Vitals</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Bueno
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Mobile Friendly</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Structured Data</span>
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button>Generar Sitemap</Button>
                  <Button variant="outline" className="ml-2">Verificar Robots.txt</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Métricas y Analytics</CardTitle>
                <CardDescription>
                  Monitorea el rendimiento de tu SEO
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">2,450</div>
                    <p className="text-sm text-gray-600">Visitantes Orgánicos</p>
                    <p className="text-xs text-green-600">+15% vs mes anterior</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">45</div>
                    <p className="text-sm text-gray-600">Palabras Clave Ranking</p>
                    <p className="text-xs text-green-600">+8 nuevas</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">3.2</div>
                    <p className="text-sm text-gray-600">Posición Promedio</p>
                    <p className="text-xs text-green-600">Mejoró 0.5</p>
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

const AdminSEO = () => {
  return (
    <ProtectedRoute>
      <AdminSEOContent />
    </ProtectedRoute>
  );
};

export default AdminSEO;
