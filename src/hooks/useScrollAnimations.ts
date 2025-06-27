
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = () => {
  useEffect(() => {
    // Animación para la sección Hero
    gsap.fromTo("#inicio .animate-fade-in", 
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#inicio",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación para la sección Servicios
    gsap.fromTo("#servicios .grid > *", 
      {
        opacity: 0,
        y: 30,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: "#servicios",
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación para la sección Testimonios
    gsap.fromTo("#testimonios .grid > *", 
      {
        opacity: 0,
        x: -50,
        rotation: -5
      },
      {
        opacity: 1,
        x: 0,
        rotation: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#testimonios",
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación para la sección Precios
    gsap.fromTo("#precios .grid > *", 
      {
        opacity: 0,
        y: 40,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: "#precios",
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación para la sección Contacto
    gsap.fromTo("#contacto > *", 
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#contacto",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};
