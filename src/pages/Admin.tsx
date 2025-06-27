
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Settings, 
  Palette, 
  Zap, 
  Search, 
  BarChart3, 
  Users, 
  FileText, 
  Image,
  Globe,
  Shield
} from "lucide-react";

const Admin = () => {
  const adminSections = [
    {
      title: "Gestión de Templates",
      description: "Crear, editar y configurar plantillas de landing pages",
      icon: Palette,
      href: "/admin/templates",
      color: "bg-blue-500",
      stats: "5 templates activos"
    },
    {
      title: "Animaciones",
      description: "Configurar efectos y transiciones premium",
      icon: Zap,
      href: "/admin/animations",
      color: "bg-purple-500",
      stats: "12 efectos configurados"
    },
    {
      title: "SEO & Metadatos",
      description: "Optimizar contenido para motores de búsqueda",
      icon: Search,
      href: "/admin/seo",
      color: "bg-green-500",
      stats: "85% score promedio"
    },
    {
      title: "Configuración General",
      description: "Ajustes globales del sitio y marca",
      icon: Settings,
      href: "/admin/settings",
      color: "bg-gray-500",
      stats: "Todo configurado"
    },
    {
      title: "Analytics",
      description: "Métricas de rendimiento y conversión",
      icon: BarChart3,
      href: "/admin/analytics",
      color: "bg-orange-500",
      stats: "2,450 visitantes este mes"
    },
    {
      title: "Gestión de Contenido",
      description: "Editar textos, imágenes y elementos visuales",
      icon: FileText,
      href: "/admin/content",
      color: "bg-indigo-500",
      stats: "15 secciones activas"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
              <p className="text-gray-600">BoothieCall CMS</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Globe className="w-3 h-3 mr-1" />
                Sitio Activo
              </Badge>
              <Link to="/">
                <Button variant="outline">
                  Ver Sitio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Visitantes Hoy</p>
                  <p className="text-2xl font-bold text-gray-900">1,234</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Conversiones</p>
                  <p className="text-2xl font-bold text-gray-900">45</p>
                </div>
                <BarChart3 className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Template Activo</p>
                  <p className="text-2xl font-bold text-gray-900">Premium</p>
                </div>
                <Palette className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Score SEO</p>
                  <p className="text-2xl font-bold text-gray-900">92%</p>
                </div>
                <Search className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card key={index} className="hover-lift transition-all duration-300 hover:shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${section.color} bg-opacity-10`}>
                      <Icon className={`w-6 h-6 ${section.color.replace('bg-', 'text-')}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {section.stats}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Link to={section.href}>
                    <Button className="w-full">
                      Administrar
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Admin;
