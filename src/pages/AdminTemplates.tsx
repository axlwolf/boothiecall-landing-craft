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
  Plus, 
  Eye, 
  Settings, 
  Palette, 
  Monitor, 
  Smartphone,
  Tablet,
  Copy,
  Trash2,
  Download
} from "lucide-react";
import { Link } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";

const AdminTemplatesContent = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("premium");
  
  const templates = [
    {
      id: "premium",
      name: "Premium Gold",
      description: "Template de lujo con tema dorado",
      preview: "/api/placeholder/400/300",
      status: "active",
      conversions: "8.5%",
      views: "2,340",
      devices: ["desktop", "tablet", "mobile"],
      lastModified: "Hace 2 días"
    },
    {
      id: "elegant",
      name: "Elegant White",
      description: "Diseño minimalista y elegante",
      preview: "/api/placeholder/400/300",
      status: "draft",
      conversions: "6.2%",
      views: "1,850",
      devices: ["desktop", "mobile"],
      lastModified: "Hace 1 semana"
    },
    {
      id: "modern",
      name: "Modern Dark",
      description: "Template moderno con tema oscuro",
      preview: "/api/placeholder/400/300",
      status: "inactive",
      conversions: "7.1%",
      views: "980",
      devices: ["desktop", "tablet", "mobile"],
      lastModified: "Hace 3 semanas"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "inactive": return "bg-gray-100 text-gray-800";
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
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Templates</h1>
                <p className="text-gray-600">Crear y administrar plantillas de landing pages</p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Template
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Crear Nuevo Template</DialogTitle>
                  <DialogDescription>
                    Configura los detalles básicos del nuevo template
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nombre del Template</Label>
                    <Input id="name" placeholder="Ej. Premium Gold v2" />
                  </div>
                  <div>
                    <Label htmlFor="description">Descripción</Label>
                    <Input id="description" placeholder="Breve descripción del template" />
                  </div>
                  <div className="flex space-x-2">
                    <Button className="flex-1">Crear Template</Button>
                    <Button variant="outline" className="flex-1">Cancelar</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="templates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-6">
            {/* Template Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="hover-lift transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <Monitor className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge className={getStatusColor(template.status)}>
                        {template.status}
                      </Badge>
                    </div>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Conversión</span>
                      <span className="font-medium">{template.conversions}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Vistas</span>
                      <span className="font-medium">{template.views}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {template.devices.includes("desktop") && <Monitor className="w-4 h-4 text-gray-600" />}
                      {template.devices.includes("tablet") && <Tablet className="w-4 h-4 text-gray-600" />}
                      {template.devices.includes("mobile") && <Smartphone className="w-4 h-4 text-gray-600" />}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        Vista Previa
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="editor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Editor Visual de Templates</CardTitle>
                <CardDescription>
                  Edita los elementos visuales y contenido de tus templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Editor Visual</h3>
                  <p className="text-gray-600 mb-4">
                    Selecciona un template para comenzar a editar
                  </p>
                  <Button>
                    Abrir Editor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Templates</CardTitle>
                <CardDescription>
                  Ajustes globales para todos los templates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="default-template">Template por Defecto</Label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option value="premium">Premium Gold</option>
                    <option value="elegant">Elegant White</option>
                    <option value="modern">Modern Dark</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="cache-duration">Duración de Caché (minutos)</Label>
                  <Input id="cache-duration" type="number" defaultValue="30" />
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="auto-optimize" />
                  <Label htmlFor="auto-optimize">Optimización automática de imágenes</Label>
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

const AdminTemplates = () => {
  return (
    <ProtectedRoute>
      <AdminTemplatesContent />
    </ProtectedRoute>
  );
};

export default AdminTemplates;
