
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Registrar el plugin
gsap.registerPlugin(ScrollToPlugin);

export const useSmoothScroll = () => {
  useEffect(() => {
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
          // Animación de salida de la sección actual
          gsap.to(window, {
            scrollTo: {
              y: targetElement,
              offsetY: 80, // Offset para el header fijo
            },
            duration: 1.5,
            ease: "power2.inOut"
          });

          // Animación de entrada de la nueva sección
          gsap.fromTo(targetElement.children, 
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              delay: 0.3,
              ease: "power2.out"
            }
          );
        }
      }
    };

    // Agregar event listeners a todos los links internos
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);
};
