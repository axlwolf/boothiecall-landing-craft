
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ArrowLeft, 
  FileText, 
  Image, 
  Edit3, 
  Upload,
  Trash2,
  Save,
  Eye,
  Plus,
  Search,
  Filter
} from "lucide-react";
import { Link } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";

const AdminContentContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("all");
  
  const contentSections = [
    {
      id: "hero",
      name: "Hero Section",
      type: "section",
      status: "published",
      lastModified: "Hace 2 horas",
      elements: 3
    },
    {
      id: "services",
      name: "Servicios",
      type: "section", 
      status: "published",
      lastModified: "Hace 1 día",
      elements: 6
    },
    {
      id: "testimonials",
      name: "Testimonios",
      type: "section",
      status: "draft",
      lastModified: "Hace 3 días",
      elements: 4
    },
    {
      id: "pricing",
      name: "Precios",
      type: "section",
      status: "published",
      lastModified: "Hace 1 semana",
      elements: 3
    }
  ];

  const mediaFiles = [
    {
      id: 1,
      name: "hero-bg.jpg",
      type: "image",
      size: "2.3 MB",
      dimensions: "1920x1080",
      used: true,
      uploaded: "Hace 2 días"
    },
    {
      id: 2,
      name: "service-1.jpg", 
      type: "image",
      size: "1.8 MB",
      dimensions: "800x600",
      used: true,
      uploaded: "Hace 1 semana"
    },
    {
      id: 3,
      name: "testimonial-avatar.jpg",
      type: "image", 
      size: "512 KB",
      dimensions: "400x400",
      used: false,
      uploaded: "Hace 2 semanas"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
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
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Contenido</h1>
                <p className="text-gray-600">Editar textos, imágenes y elementos del sitio</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Elemento
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Crear Nuevo Elemento</DialogTitle>
                    <DialogDescription>
                      Añade un nuevo elemento de contenido
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="element-name">Nombre del Elemento</Label>
                      <Input id="element-name" placeholder="Ej. Nuevo Testimonio" />
                    </div>
                    <div>
                      <Label htmlFor="element-type">Tipo</Label>
                      <select className="w-full mt-1 p-2 border rounded-md">
                        <option value="text">Texto</option>
                        <option value="image">Imagen</option>
                        <option value="section">Sección</option>
                        <option value="component">Componente</option>
                      </select>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="flex-1">Crear</Button>
                      <Button variant="outline" className="flex-1">Cancelar</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="sections" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sections">Secciones</TabsTrigger>
            <TabsTrigger value="media">Archivos</TabsTrigger>
            <TabsTrigger value="backup">Respaldos</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="sections" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Buscar contenido..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select 
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">Todas las secciones</option>
                <option value="published">Publicadas</option>
                <option value="draft">Borradores</option>
                <option value="archived">Archivadas</option>
              </select>
            </div>

            {/* Content Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contentSections.map((section) => (
                <Card key={section.id} className="hover-lift transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{section.name}</CardTitle>
                      <Badge className={getStatusColor(section.status)}>
                        {section.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      {section.elements} elementos • {section.lastModified}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit3 className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            {/* Upload Area */}
            <Card>
              <CardHeader>
                <CardTitle>Subir Archivos</CardTitle>
                <CardDescription>
                  Arrastra archivos aquí o haz clic para seleccionar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Arrastra archivos aquí</p>
                  <p className="text-sm text-gray-500 mb-4">Soporta JPG, PNG, GIF hasta 10MB</p>
                  <Button>
                    Seleccionar Archivos
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Media Gallery */}
            <Card>
              <CardHeader>
                <CardTitle>Galería de Medios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mediaFiles.map((file) => (
                    <div key={file.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                        <Image className="w-8 h-8 text-gray-400" />
                      </div>
                      <h4 className="font-medium text-sm mb-1">{file.name}</h4>
                      <p className="text-xs text-gray-500 mb-2">
                        {file.size} • {file.dimensions}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant={file.used ? "default" : "secondary"} className="text-xs">
                          {file.used ? "En uso" : "Sin usar"}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Respaldos del Sitio</CardTitle>
                <CardDescription>
                  Crear y restaurar versiones del contenido
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Crear Respaldo Manual</h4>
                    <p className="text-sm text-gray-600">Guarda el estado actual del sitio</p>
                  </div>
                  <Button>
                    <Save className="w-4 h-4 mr-2" />
                    Crear Respaldo
                  </Button>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Respaldos Recientes</h4>
                  {[
                    { date: "2024-01-15 14:30", type: "Manual", size: "2.3 MB" },
                    { date: "2024-01-14 09:15", type: "Automático", size: "2.1 MB" },
                    { date: "2024-01-13 18:45", type: "Manual", size: "2.0 MB" },
                  ].map((backup, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{backup.date}</p>
                        <p className="text-xs text-gray-600">{backup.type} • {backup.size}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Restaurar</Button>
                        <Button variant="outline" size="sm">Descargar</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Contenido</CardTitle>
                <CardDescription>
                  Ajustes generales para la gestión de contenido
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="auto-backup">Respaldos Automáticos</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <input type="checkbox" id="auto-backup" defaultChecked />
                    <span className="text-sm">Crear respaldo automático cada 24 horas</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="max-file-size">Tamaño Máximo de Archivo (MB)</Label>
                  <Input id="max-file-size" type="number" defaultValue="10" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="allowed-formats">Formatos Permitidos</Label>
                  <Input 
                    id="allowed-formats" 
                    defaultValue="jpg,jpeg,png,gif,webp" 
                    className="mt-1"
                    placeholder="jpg,png,gif"
                  />
                </div>

                <Button>Guardar Configuración</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const AdminContent = () => {
  return (
    <ProtectedRoute>
      <AdminContentContent />
    </ProtectedRoute>
  );
};

export default AdminContent;
