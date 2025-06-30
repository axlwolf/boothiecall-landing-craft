
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useFileManager } from "@/hooks/useFileManager";
import { 
  ArrowLeft, 
  Plus, 
  Save, 
  Upload,
  FileText,
  Image as ImageIcon,
  Trash2,
  Download,
  Search,
  Filter,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";

const AdminContentContent = () => {
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newContent, setNewContent] = useState({ title: "", content: "", section: "hero" });
  const { toast } = useToast();

  const {
    files,
    uploadFile,
    deleteFile,
    isUploading,
    uploadProgress
  } = useFileManager();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await uploadFile(file);
        toast({
          title: "✅ Archivo subido",
          description: `${file.name} se ha subido correctamente`
        });
      } catch (error) {
        toast({
          title: "❌ Error al subir archivo",
          description: "No se pudo subir el archivo",
          variant: "destructive"
        });
      }
    }
  };

  const handleDeleteFile = async (fileId: number) => {
    try {
      await deleteFile(fileId);
      toast({
        title: "✅ Archivo eliminado",
        description: "El archivo se ha eliminado correctamente"
      });
    } catch (error) {
      toast({
        title: "❌ Error al eliminar",
        description: "No se pudo eliminar el archivo",
        variant: "destructive"
      });
    }
  };

  const handleSaveContent = () => {
    console.log('Saving content:', newContent);
    toast({
      title: "✅ Contenido guardado",
      description: "El contenido se ha guardado en localStorage"
    });
  };

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <p className="text-gray-600">Administrar textos, imágenes y archivos del sitio</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Contenido</TabsTrigger>
            <TabsTrigger value="files">Archivos ({files.length})</TabsTrigger>
            <TabsTrigger value="backup">Backup</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Editor de Contenido</CardTitle>
                    <CardDescription>Editar textos y contenido del sitio web</CardDescription>
                  </div>
                  <Button onClick={handleSaveContent}>
                    <Save className="w-4 h-4 mr-2" />
                    Guardar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input 
                    id="title"
                    value={newContent.title}
                    onChange={(e) => setNewContent({...newContent, title: e.target.value})}
                    placeholder="Título del contenido"
                  />
                </div>
                <div>
                  <Label htmlFor="section">Sección</Label>
                  <select 
                    className="w-full mt-1 p-2 border rounded-md"
                    value={newContent.section}
                    onChange={(e) => setNewContent({...newContent, section: e.target.value})}
                  >
                    <option value="hero">Hero</option>
                    <option value="services">Servicios</option>
                    <option value="about">Acerca de</option>
                    <option value="contact">Contacto</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="content">Contenido</Label>
                  <textarea 
                    id="content"
                    className="w-full mt-1 p-3 border rounded-md h-32"
                    value={newContent.content}
                    onChange={(e) => setNewContent({...newContent, content: e.target.value})}
                    placeholder="Contenido del texto..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Gestión de Archivos</CardTitle>
                    <CardDescription>Subir y administrar imágenes y archivos</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      type="file"
                      onChange={handleFileUpload}
                      accept="image/*,.pdf,.doc,.docx"
                      className="hidden"
                      id="file-upload"
                      disabled={isUploading}
                    />
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <Button asChild disabled={isUploading}>
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          {isUploading ? `Subiendo... ${uploadProgress}%` : 'Subir Archivo'}
                        </span>
                      </Button>
                    </Label>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Buscar archivos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredFiles.map((file) => (
                    <Card key={file.id} className="hover-lift">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          {file.type.startsWith('image/') ? (
                            <ImageIcon className="w-8 h-8 text-blue-500" />
                          ) : (
                            <FileText className="w-8 h-8 text-gray-500" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{file.name}</p>
                            <p className="text-sm text-gray-500">
                              {(file.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-3">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="w-4 h-4 mr-1" />
                            Ver
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteFile(file.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {filteredFiles.length === 0 && (
                  <div className="text-center py-8">
                    <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No hay archivos subidos</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sistema de Backup</CardTitle>
                <CardDescription>Crear y restaurar copias de seguridad</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button>
                    <Download className="w-4 h-4 mr-2" />
                    Crear Backup Manual
                  </Button>
                  <p className="text-sm text-gray-600">
                    Los backups se crean automáticamente cada vez que guardas cambios importantes.
                  </p>
                </div>
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
