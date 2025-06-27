
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "María González",
      event: "Boda de Lujo",
      rating: 5,
      text: "BoothieCall hizo que nuestra boda fuera aún más especial. La calidad de las fotos es excepcional y nuestros invitados no pararon de divertirse. ¡Definitivamente recomendado!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Carlos Mendoza",
      event: "Evento Corporativo",
      rating: 5,
      text: "Profesionalismo y calidad excepcional. La cabina de fotos fue el punto focal de nuestro evento corporativo. El equipo fue muy atento y el resultado superó nuestras expectativas.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Ana Rodríguez",
      event: "Quinceañero",
      rating: 5,
      text: "¡Increíble experiencia! Mi hija y sus amigas pasaron horas tomándose fotos. La calidad es impresionante y el servicio al cliente es de primera. Muchas gracias por hacer su día tan especial.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <section className="py-24 bg-luxury-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Lo que Dicen Nuestros <span className="text-luxury-gradient">Clientes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Miles de eventos exitosos respaldan nuestra experiencia y compromiso con la excelencia
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="group hover-lift border-none shadow-lg hover:shadow-luxury-hover transition-all duration-300 bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-luxury-400 text-luxury-400" />
                  ))}
                </div>
                
                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-luxury-200" />
                  <p className="text-gray-700 leading-relaxed pl-6">{testimonial.text}</p>
                </div>
                
                <div className="flex items-center">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-luxury-600">{testimonial.event}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
