
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye,
  MousePointer,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Tablet
} from "lucide-react";
import { Link } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";

const AdminAnalyticsContent = () => {
  const [dateRange, setDateRange] = useState("7d");
  
  const metrics = [
    { name: "Visitantes Únicos", value: "2,450", change: "+15.3%", trend: "up" },
    { name: "Páginas Vistas", value: "8,920", change: "+8.2%", trend: "up" },
    { name: "Tiempo Promedio", value: "3:42", change: "-2.1%", trend: "down" },
    { name: "Tasa de Rebote", value: "32.1%", change: "-5.8%", trend: "up" },
  ];

  const topPages = [
    { page: "/", views: 3420, percentage: 38.3 },
    { page: "/servicios", views: 1890, percentage: 21.2 },
    { page: "/precios", views: 1560, percentage: 17.5 },
    { page: "/contacto", views: 980, percentage: 11.0 },
    { page: "/admin", views: 340, percentage: 3.8 },
  ];

  const deviceStats = [
    { device: "Desktop", percentage: 45.2, icon: Monitor },
    { device: "Mobile", percentage: 38.7, icon: Smartphone },
    { device: "Tablet", percentage: 16.1, icon: Tablet },
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
                <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
                <p className="text-gray-600">Métricas y estadísticas del sitio</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <select 
                value={dateRange} 
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="7d">Últimos 7 días</option>
                <option value="30d">Últimos 30 días</option>
                <option value="90d">Últimos 90 días</option>
              </select>
              <Button>
                <BarChart3 className="w-4 h-4 mr-2" />
                Exportar Datos
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="traffic">Tráfico</TabsTrigger>
            <TabsTrigger value="conversions">Conversiones</TabsTrigger>
            <TabsTrigger value="realtime">Tiempo Real</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{metric.name}</p>
                        <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={metric.trend === "up" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}
                      >
                        {metric.change}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts and Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Páginas Más Visitadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPages.map((page, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{page.page}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{page.views}</span>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${page.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dispositivos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {deviceStats.map((device, index) => {
                      const Icon = device.icon;
                      return (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Icon className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium">{device.device}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">{device.percentage}%</span>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-purple-500 h-2 rounded-full" 
                                style={{ width: `${device.percentage}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="traffic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fuentes de Tráfico</CardTitle>
                <CardDescription>De dónde vienen tus visitantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Tráfico Detallado</h3>
                  <p className="text-gray-600 mb-4">
                    Conecta Google Analytics para ver datos detallados de tráfico
                  </p>
                  <Button>Conectar Google Analytics</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conversions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Conversiones</CardTitle>
                <CardDescription>Objetivos y conversiones del sitio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">8.5%</div>
                      <p className="text-sm text-gray-600">Tasa de Conversión</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">45</div>
                      <p className="text-sm text-gray-600">Formularios Enviados</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">12</div>
                      <p className="text-sm text-gray-600">Llamadas Generadas</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="realtime" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Visitantes Activos</span>
                </CardTitle>
                <CardDescription>Usuarios actualmente en tu sitio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-4xl font-bold text-green-600 mb-2">23</div>
                  <p className="text-gray-600">Usuarios activos ahora</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const AdminAnalytics = () => {
  return (
    <ProtectedRoute>
      <AdminAnalyticsContent />
    </ProtectedRoute>
  );
};

export default AdminAnalytics;
