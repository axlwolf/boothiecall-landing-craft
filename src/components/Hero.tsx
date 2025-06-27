
import { Button } from "@/components/ui/button";
import { Camera, Sparkles, Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-luxury-50 via-white to-luxury-100">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-luxury-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-gold-300 rounded-full opacity-30 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-luxury-300 rounded-full opacity-25 animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-luxury-500" />
              <span className="text-luxury-600 font-medium tracking-wide uppercase text-sm">Eventos de Lujo</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Cabinas de Fotos
              <span className="block text-luxury-gradient">Premium</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
              Transforma tu celebración en una experiencia inolvidable con nuestras cabinas de fotos de lujo. 
              Tecnología de vanguardia, diseño elegante y momentos que perdurarán para siempre.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-luxury-gradient hover:scale-105 transition-all duration-300 shadow-luxury text-white font-semibold px-8 py-4 text-lg"
              >
                <Camera className="w-5 h-5 mr-2" />
                Reservar Ahora
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-luxury-300 text-luxury-700 hover:bg-luxury-50 transition-all duration-300 px-8 py-4 text-lg"
              >
                Ver Portfolio
              </Button>
            </div>
            
            {/* Social proof */}
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-luxury-400 text-luxury-400" />
                ))}
              </div>
              <div className="text-gray-600">
                <span className="font-semibold text-gray-900">500+</span> eventos realizados
              </div>
              <div className="text-gray-600">
                <span className="font-semibold text-gray-900">98%</span> satisfacción
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative animate-scale-in">
            <div className="relative">
              <div className="absolute inset-0 bg-luxury-gradient rounded-3xl transform rotate-6 opacity-20"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-luxury">
                <img 
                  src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"
                  alt="Cabina de fotos premium en evento de lujo"
                  className="w-full h-96 object-cover rounded-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-luxury-gradient text-white rounded-full p-4 shadow-luxury">
                  <Camera className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
