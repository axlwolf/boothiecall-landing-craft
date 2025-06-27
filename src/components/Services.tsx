
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Palette, Users, Zap, Gift, Sparkles } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Camera,
      title: "Fotografía HD",
      description: "Cámaras profesionales de alta resolución que capturan cada detalle con calidad excepcional."
    },
    {
      icon: Palette,
      title: "Fondos Personalizados",
      description: "Amplia variedad de fondos elegantes y la opción de personalizar según tu evento."
    },
    {
      icon: Users,
      title: "Para Todos los Eventos",
      description: "Bodas, quinceañeros, corporativos, graduaciones y celebraciones especiales."
    },
    {
      icon: Zap,
      title: "Instalación Rápida",
      description: "Montaje profesional en 30 minutos. Nos encargamos de todo para que tú disfrutes."
    },
    {
      icon: Gift,
      title: "Props Incluidos",
      description: "Accesorios divertidos y elegantes incluidos sin costo adicional."
    },
    {
      icon: Sparkles,
      title: "Impresión Instantánea",
      description: "Fotos impresas al instante con calidad premium y diseños personalizables."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Servicios <span className="text-luxury-gradient">Premium</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cada detalle está pensado para hacer de tu evento una experiencia única e inolvidable
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index} 
                className="group hover-lift border-none shadow-lg hover:shadow-luxury-hover transition-all duration-300 bg-gradient-to-br from-white to-luxury-50"
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-luxury-gradient rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
