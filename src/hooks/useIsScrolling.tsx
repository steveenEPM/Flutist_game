import { useState, useEffect } from 'react';

export const useIsScrolling = (delay = 200) => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeoutId=0;

    const handleScroll = () => {
      // Marcamos que el usuario está moviendo la pantalla
      setIsScrolling(true);

      // Limpiamos el temporizador previo para reiniciarlo
      clearTimeout(timeoutId);

      // Si pasa el tiempo del 'delay' sin nuevos eventos, el usuario paró
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, delay);
    };

    window.addEventListener('scroll', handleScroll);

    // Limpieza de eventos y timers al destruir el componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [delay]); // Se reinicia si el delay cambia

  return isScrolling;
};