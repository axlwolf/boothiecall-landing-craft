
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Crown, Star, Zap } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Básico",
      price: "$299",
      duration: "4 horas",
      icon: Zap,
      popular: false,
      features: [
        "Cabina de fotos HD",
        "Props básicos incluidos",
        "100 impresiones",
        "Galería digital",
        "Asistente técnico",
        "Fondos estándar (3 opciones)"
      ]
    },
    {
      name: "Premium",
      price: "$499",
      duration: "6 horas",
      icon: Star,
      popular: true,
      features: [
        "Todo lo del plan Básico",
        "200 impresiones premium",
        "Fondos personalizados",
        "Props de lujo",
        "Libro de firmas digital",
        "Entrega inmediata de fotos",
        "Soporte prioritario"
      ]
    },
    {
      name: "Deluxe",
      price: "$799",
      duration: "8 horas",
      icon: Crown,
      popular: false,
      features: [
        "Todo lo del plan Premium",
        "Impresiones ilimitadas",
        "Video boomerang",
        "Marcos personalizados",
        "Props exclusivos",
        "Diseño 100% personalizado",
        "Técnico dedicado",
        "Backup en la nube"
      ]
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Planes y <span className="text-luxury-gradient">Precios</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Elige el plan perfecto para tu evento. Todos incluyen instalación, operación y desmontaje profesional
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card 
                key={index} 
                className={`relative group hover-lift transition-all duration-300 ${
                  plan.popular 
                    ? 'border-luxury-300 shadow-luxury scale-105 bg-gradient-to-br from-white to-luxury-50' 
                    : 'border-gray-200 hover:border-luxury-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-luxury-gradient text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Más Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    plan.popular ? 'bg-luxury-gradient' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-8 h-8 ${plan.popular ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-luxury-600 mb-2">{plan.price}</div>
                  <p className="text-gray-600">{plan.duration}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-luxury-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-luxury-gradient hover:scale-105 shadow-luxury'
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                  >
                    Seleccionar Plan
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">¿Necesitas algo personalizado?</p>
          <Button variant="outline" size="lg" className="border-luxury-300 text-luxury-700 hover:bg-luxury-50">
            Cotización Personalizada
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
