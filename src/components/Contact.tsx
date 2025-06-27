
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "¡Mensaje enviado!",
      description: "Te contactaremos dentro de las próximas 2 horas.",
    });
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventDate: '',
      eventType: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Teléfono",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@boothiecall.com",
      link: "mailto:info@boothiecall.com"
    },
    {
      icon: MapPin,
      title: "Ubicación",
      value: "Ciudad de México, México",
      link: "#"
    },
    {
      icon: Clock,
      title: "Horario",
      value: "Lun - Dom: 8AM - 10PM",
      link: "#"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Contacta con <span className="text-luxury-gradient">Nosotros</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ¿Listo para hacer de tu evento algo inolvidable? Contáctanos y te ayudaremos a crear la experiencia perfecta
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Contact Form */}
          <Card className="shadow-luxury border-luxury-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Solicita tu Cotización</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-luxury-200 focus:border-luxury-400"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-luxury-200 focus:border-luxury-400"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border-luxury-200 focus:border-luxury-400"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha del Evento
                    </label>
                    <Input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="border-luxury-200 focus:border-luxury-400"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Evento
                  </label>
                  <Input
                    type="text"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="border-luxury-200 focus:border-luxury-400"
                    placeholder="Boda, Quinceañero, Corporativo, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="border-luxury-200 focus:border-luxury-400"
                    placeholder="Cuéntanos más detalles sobre tu evento..."
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-luxury-gradient hover:scale-105 transition-all duration-300 shadow-luxury text-white font-semibold py-3"
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Enviar Solicitud
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-luxury-gradient rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{info.title}</h4>
                        <a 
                          href={info.link}
                          className="text-gray-600 hover:text-luxury-600 transition-colors"
                        >
                          {info.value}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <Card className="bg-luxury-gradient-subtle border-luxury-200">
              <CardContent className="p-6">
                <h4 className="font-bold text-gray-900 mb-3">Respuesta Rápida Garantizada</h4>
                <p className="text-gray-700 leading-relaxed">
                  Nos comprometemos a responderte dentro de las próximas 2 horas durante horario laboral. 
                  Para emergencias o eventos de último minuto, contáctanos directamente por teléfono.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
