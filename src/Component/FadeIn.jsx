import React, { useRef, useEffect, useState } from 'react';
import './FadeInView.css'; // Arquivo de estilos CSS

const FadeInView = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // Se o elemento estiver visível na viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
          
        }
      });
    });

    observer.observe(domRef.current);

    // Limpar o observador ao desmontar o componente
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`fade-in-section ${isVisible ? 'is-visible' : ''}`} ref={domRef}>
      {children}
    </div>
  );
};

export default FadeInView;
