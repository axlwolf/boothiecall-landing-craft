
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  Monitor, 
  Smartphone, 
  Tablet,
  Type,
  Image,
  Square,
  Trash2,
  Copy,
  Save,
  Eye,
  Undo,
  Redo
} from "lucide-react";
import { useTemplateEditor } from "@/hooks/useTemplateEditor";

const TemplateEditor = () => {
  const [selectedDevice, setSelectedDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const { toast } = useToast();

  const {
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
    undo,
    redo,
    createBackup,
    canUndo,
    canRedo
  } = useTemplateEditor();

  const dragRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.MouseEvent, elementId: number) => {
    setIsDragging(true);
    setSelectedElement(elementId);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleDrag = (e: React.MouseEvent) => {
    if (!isDragging || !selectedElement || !dragRef.current) return;
    
    const canvasRect = dragRef.current.getBoundingClientRect();
    const newX = e.clientX - canvasRect.left - dragStart.x;
    const newY = e.clientY - canvasRect.top - dragStart.y;

    updateElement(selectedElement, {
      x: Math.max(0, newX),
      y: Math.max(0, newY)
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleSave = async () => {
    try {
      await saveTemplate();
      toast({
        title: "✅ Template guardado",
        description: "Los cambios se han guardado correctamente"
      });
    } catch (error) {
      toast({
        title: "❌ Error al guardar",
        description: "No se pudo guardar el template",
        variant: "destructive"
      });
    }
  };

  const handleBackup = async () => {
    try {
      await createBackup();
      toast({
        title: "✅ Backup creado",
        description: "Se ha creado un respaldo del template actual"
      });
    } catch (error) {
      toast({
        title: "❌ Error al crear backup",
        description: "No se pudo crear el respaldo",
        variant: "destructive"
      });
    }
  };

  const updateElementContent = (id: number, newContent: string) => {
    updateElement(id, { content: newContent });
  };

  const updateElementSize = (id: number, property: 'width' | 'height', value: number) => {
    updateElement(id, { [property]: value });
  };

  const getDeviceClass = () => {
    switch (selectedDevice) {
      case "tablet": return "w-[768px] h-[1024px]";
      case "mobile": return "w-[375px] h-[667px]";
      default: return "w-[1200px] h-[800px]";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Toolbar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4 space-y-6">
        <div>
          <h3 className="font-medium mb-3">Dispositivos</h3>
          <div className="flex space-x-2">
            <Button
              variant={selectedDevice === "desktop" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDevice("desktop")}
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant={selectedDevice === "tablet" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDevice("tablet")}
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant={selectedDevice === "mobile" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDevice("mobile")}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Elementos</h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => addElement("text")}
            >
              <Type className="w-4 h-4 mr-2" />
              Texto
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => addElement("image")}
            >
              <Image className="w-4 h-4 mr-2" />
              Imagen
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => addElement("shape")}
            >
              <Square className="w-4 h-4 mr-2" />
              Forma
            </Button>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Acciones</h3>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={undo}
              disabled={!canUndo}
            >
              <Undo className="w-4 h-4 mr-2" />
              Deshacer
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={redo}
              disabled={!canRedo}
            >
              <Redo className="w-4 h-4 mr-2" />
              Rehacer
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={handleSave}
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={handleBackup}
            >
              <Eye className="w-4 h-4 mr-2" />
              Backup
            </Button>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-center">
          <div 
            ref={dragRef}
            className={`${getDeviceClass()} bg-white border border-gray-300 relative shadow-lg`}
            onMouseMove={handleDrag}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
          >
            {elements.map((element) => (
              <div
                key={element.id}
                className={`absolute cursor-move border-2 ${
                  selectedElement === element.id ? "border-blue-500" : "border-transparent"
                } hover:border-blue-300`}
                style={{
                  left: element.x,
                  top: element.y,
                  width: element.width,
                  height: element.height,
                  ...element.styles
                }}
                onMouseDown={(e) => handleDragStart(e, element.id)}
                onClick={() => setSelectedElement(element.id)}
              >
                {element.type === "text" && (
                  <div className="w-full h-full flex items-center">
                    {element.content}
                  </div>
                )}
                {element.type === "image" && (
                  <img 
                    src={element.src} 
                    alt="" 
                    className="w-full h-full object-cover"
                    style={element.styles}
                  />
                )}
                {element.type === "shape" && (
                  <div 
                    className="w-full h-full bg-gray-300"
                    style={element.styles}
                  />
                )}
                
                {selectedElement === element.id && (
                  <div className="absolute -top-8 left-0 flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 px-2"
                      onClick={() => duplicateElement(element.id)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 px-2"
                      onClick={() => deleteElement(element.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Properties Panel */}
      <div className="w-64 bg-white border-l border-gray-200 p-4">
        <h3 className="font-medium mb-4">Propiedades</h3>
        
        {selectedElement ? (
          <div className="space-y-4">
            {(() => {
              const element = elements.find(el => el.id === selectedElement);
              if (!element) return null;
              
              return (
                <>
                  {element.type === "text" && (
                    <div>
                      <Label htmlFor="content">Contenido</Label>
                      <Input
                        id="content"
                        value={element.content || ""}
                        onChange={(e) => updateElementContent(selectedElement, e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor="width">Ancho</Label>
                    <Input
                      id="width"
                      type="number"
                      value={element.width}
                      onChange={(e) => updateElementSize(selectedElement, 'width', parseInt(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="height">Alto</Label>
                    <Input
                      id="height"
                      type="number"
                      value={element.height}
                      onChange={(e) => updateElementSize(selectedElement, 'height', parseInt(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                </>
              );
            })()}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            Selecciona un elemento para editar sus propiedades
          </p>
        )}
      </div>
    </div>
  );
};

export default TemplateEditor;
