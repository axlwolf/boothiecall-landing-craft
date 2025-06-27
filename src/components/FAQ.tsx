
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "¿Qué incluye el servicio de cabina de fotos?",
      answer: "Nuestro servicio incluye la cabina de fotos profesional, props, fondos, impresiones, galería digital, instalación y operación por parte de nuestro equipo técnico especializado. Todo está incluido en el precio sin sorpresas."
    },
    {
      question: "¿Cuánto tiempo toma la instalación?",
      answer: "La instalación completa toma aproximadamente 30-45 minutos. Nuestro equipo llega con anticipación para tener todo listo antes del inicio de tu evento."
    },
    {
      question: "¿Puedo personalizar los fondos y props?",
      answer: "¡Absolutamente! Ofrecemos personalización completa de fondos, marcos de fotos y props según el tema de tu evento. Trabajamos contigo para crear una experiencia única."
    },
    {
      question: "¿Las fotos se entregan el mismo día?",
      answer: "Sí, las fotos impresas se entregan inmediatamente y la galería digital completa está disponible el mismo día del evento a través de un enlace privado."
    },
    {
      question: "¿Qué pasa si necesito más horas de las contratadas?",
      answer: "Puedes extender el servicio el mismo día del evento por $75 por hora adicional, sujeto a disponibilidad de nuestro equipo."
    },
    {
      question: "¿Trabajan en eventos al aire libre?",
      answer: "Sí, trabajamos en eventos tanto en interiores como al aire libre. Para eventos exteriores, requerimos acceso a electricidad y protección contra condiciones climáticas adversas."
    },
    {
      question: "¿Cuál es su política de cancelación?",
      answer: "Puedes cancelar hasta 48 horas antes del evento para un reembolso del 50%. Cancelaciones con menos de 48 horas no son reembolsables, pero puedes reprogramar sin costo adicional."
    }
  ];

  return (
    <section className="py-24 bg-luxury-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Preguntas <span className="text-luxury-gradient">Frecuentes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Resolvemos todas tus dudas para que puedas tomar la mejor decisión para tu evento
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white/80 backdrop-blur-sm border border-luxury-200 rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-luxury-600 py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
