
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Monitor, 
  Smartphone, 
  Tablet,
  Move,
  Type,
  Image,
  Square,
  Circle,
  Trash2,
  Copy,
  Save,
  Eye,
  Undo,
  Redo
} from "lucide-react";

// Definir tipos apropiados
interface BaseElement {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface TextElement extends BaseElement {
  type: "text";
  content: string;
  styles: {
    fontSize: string;
    color: string;
    fontWeight?: string;
  };
}

interface ImageElement extends BaseElement {
  type: "image";
  src: string;
  content?: string;
  styles: {
    borderRadius?: string;
  };
}

interface ShapeElement extends BaseElement {
  type: "shape";
  content?: string;
  styles: {
    backgroundColor?: string;
    borderRadius?: string;
  };
}

type ElementType = TextElement | ImageElement | ShapeElement;

const TemplateEditor = () => {
  const [selectedDevice, setSelectedDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [selectedElement, setSelectedElement] = useState<number | null>(null);
  const [elements, setElements] = useState<ElementType[]>([
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
    },
    {
      id: 3,
      type: "image",
      src: "/api/placeholder/200/150",
      x: 500,
      y: 100,
      width: 200,
      height: 150,
      styles: { borderRadius: "8px" }
    }
  ]);

  const dragRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

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

    setElements(elements.map(el => 
      el.id === selectedElement 
        ? { ...el, x: Math.max(0, newX), y: Math.max(0, newY) }
        : el
    ));
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const addElement = (type: "text" | "image" | "shape") => {
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
      default:
        return;
    }

    setElements([...elements, newElement]);
  };

  const deleteElement = (id: number) => {
    setElements(elements.filter(el => el.id !== id));
    setSelectedElement(null);
  };

  const duplicateElement = (id: number) => {
    const element = elements.find(el => el.id === id);
    if (element) {
      const newElement: ElementType = { 
        ...element, 
        id: Date.now(), 
        x: element.x + 20, 
        y: element.y + 20 
      };
      setElements([...elements, newElement]);
    }
  };

  const updateElementContent = (id: number, newContent: string) => {
    setElements(elements.map(el => 
      el.id === id && el.type === "text" ? { ...el, content: newContent } : el
    ));
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
            <Button variant="outline" size="sm" className="w-full">
              <Undo className="w-4 h-4 mr-2" />
              Deshacer
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              <Redo className="w-4 h-4 mr-2" />
              Rehacer
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              Preview
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
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="height">Alto</Label>
                    <Input
                      id="height"
                      type="number"
                      value={element.height}
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
