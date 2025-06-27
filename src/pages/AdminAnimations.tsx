
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  MousePointer, 
  Eye,
  Settings,
  Save
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminAnimations = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const animationPresets = [
    {
      id: "fade-in",
      name: "Fade In",
      description: "Aparición suave con opacidad",
      duration: "0.5s",
      easing: "ease-out",
      trigger: "scroll",
      enabled: true
    },
    {
      id: "slide-up",
      name: "Slide Up",
      description: "Deslizamiento desde abajo",
      duration: "0.7s",
      easing: "ease-in-out",
      trigger: "scroll",
      enabled: true
    },
    {
      id: "scale-in",
      name: "Scale In",
      description: "Crecimiento desde el centro",
      duration: "0.4s",
      easing: "ease-back",
      trigger: "hover",
      enabled: false
    },
    {
      id: "bounce-in",
      name: "Bounce In",
      description: "Entrada con rebote",
      duration: "0.8s",
      easing: "bounce",
      trigger: "scroll",
      enabled: true
    }
  ];

  const microInteractions = [
    {
      id: "button-hover",
      name: "Hover en Botones",
      description: "Efecto de elevación y cambio de color",
      enabled: true,
      element: "Botones CTA"
    },
    {
      id: "card-hover",
      name: "Hover en Tarjetas",
      description: "Sombra y ligero movimiento",
      enabled: true,
      element: "Tarjetas de servicio"
    },
    {
      id: "image-parallax",
      name: "Parallax en Imágenes",
      description: "Movimiento de profundidad",
      enabled: false,
      element: "Imágenes de fondo"
    }
  ];

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
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Animaciones</h1>
                <p className="text-gray-600">Configurar efectos y transiciones premium</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isPlaying ? "Pausar" : "Probar"}
              </Button>
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Guardar Cambios
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="presets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="presets">Presets</TabsTrigger>
            <TabsTrigger value="custom">Personalizadas</TabsTrigger>
            <TabsTrigger value="interactions">Interacciones</TabsTrigger>
            <TabsTrigger value="performance">Rendimiento</TabsTrigger>
          </TabsList>

          <TabsContent value="presets" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Animation Presets */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Animaciones Predefinidas</h3>
                {animationPresets.map((preset) => (
                  <Card key={preset.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{preset.name}</h4>
                          <Badge variant={preset.enabled ? "default" : "secondary"}>
                            {preset.enabled ? "Activo" : "Inactivo"}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{preset.description}</p>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500">Duración:</span>
                          <div className="font-medium">{preset.duration}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Easing:</span>
                          <div className="font-medium">{preset.easing}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Trigger:</span>
                          <div className="font-medium">{preset.trigger}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Preview Area */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Vista Previa</h3>
                <Card className="h-96">
                  <CardContent className="p-6 h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/60 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">Elemento de Prueba</h4>
                      <p className="text-sm text-gray-600">Selecciona una animación para ver el efecto</p>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex justify-center space-x-2">
                  <Button variant="outline" size="sm">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reiniciar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Play className="w-4 h-4 mr-2" />
                    Reproducir
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Crear Animación Personalizada</CardTitle>
                <CardDescription>
                  Define tus propias animaciones con control total sobre los parámetros
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="animation-name">Nombre de la Animación</Label>
                      <Input id="animation-name" placeholder="Mi animación personalizada" />
                    </div>
                    <div>
                      <Label htmlFor="duration">Duración (segundos)</Label>
                      <Input id="duration" type="number" step="0.1" defaultValue="0.5" />
                    </div>
                    <div>
                      <Label htmlFor="delay">Retraso (segundos)</Label>
                      <Input id="delay" type="number" step="0.1" defaultValue="0" />
                    </div>
                    <div>
                      <Label htmlFor="easing">Función de Easing</Label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="ease">Ease</option>
                        <option value="ease-in">Ease In</option>
                        <option value="ease-out">Ease Out</option>
                        <option value="ease-in-out">Ease In Out</option>
                        <option value="linear">Linear</option>
                        <option value="bounce">Bounce</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label>Propiedades de Transformación</Label>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="translateX" />
                          <Label htmlFor="translateX">Translate X</Label>
                          <Input type="number" placeholder="0" className="w-20" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="translateY" />
                          <Label htmlFor="translateY">Translate Y</Label>
                          <Input type="number" placeholder="0" className="w-20" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="scale" />
                          <Label htmlFor="scale">Scale</Label>
                          <Input type="number" step="0.1" placeholder="1" className="w-20" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="rotate" />
                          <Label htmlFor="rotate">Rotate</Label>
                          <Input type="number" placeholder="0" className="w-20" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="opacity" />
                          <Label htmlFor="opacity">Opacity</Label>
                          <Input type="number" step="0.1" placeholder="1" className="w-20" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button>Crear Animación</Button>
                  <Button variant="outline">Vista Previa</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Micro-interacciones</CardTitle>
                <CardDescription>
                  Configura efectos de hover y interacciones del usuario
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {microInteractions.map((interaction) => (
                    <div key={interaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <MousePointer className="w-5 h-5 text-gray-500" />
                        <div>
                          <h4 className="font-medium">{interaction.name}</h4>
                          <p className="text-sm text-gray-600">{interaction.description}</p>
                          <p className="text-xs text-gray-500">Elemento: {interaction.element}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={interaction.enabled ? "default" : "secondary"}>
                          {interaction.enabled ? "Activo" : "Inactivo"}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Optimización de Rendimiento</CardTitle>
                <CardDescription>
                  Configuración para mantener las animaciones fluidas y eficientes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="reduce-motion">Respetar prefer-reduced-motion</Label>
                      <input type="checkbox" id="reduce-motion" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="gpu-acceleration">Aceleración por GPU</Label>
                      <input type="checkbox" id="gpu-acceleration" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="will-change">Optimizar will-change</Label>
                      <input type="checkbox" id="will-change" defaultChecked />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fps-limit">Límite de FPS</Label>
                      <Input id="fps-limit" type="number" defaultValue="60" />
                    </div>
                    <div>
                      <Label htmlFor="quality-mode">Modo de Calidad</Label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="high">Alta</option>
                        <option value="medium">Media</option>
                        <option value="low">Baja</option>
                        <option value="auto">Automática</option>
                      </select>
                    </div>
                  </div>
                </div>
                <Button>Aplicar Configuración</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminAnimations;
