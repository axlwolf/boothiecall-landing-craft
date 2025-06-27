
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";

const Index = () => {
  useScrollAnimations();

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section id="inicio">
          <Hero />
        </section>
        <section id="servicios">
          <Services />
        </section>
        <section id="testimonios">
          <Testimonials />
        </section>
        <section id="precios">
          <Pricing />
        </section>
        <FAQ />
        <section id="contacto">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
