import { useEffect, useState } from "react";

/**
 * Hook personalizado para detectar si el ancho de la pantalla
 * corresponde a un dispositivo móvil.
 *
 * @param breakpoint - ancho máximo (px) para considerar "mobile"
 * @returns boolean -> true si es mobile, false si no
 */
export function useIsMobile(breakpoint: number = 480) {
  // Estado que indica si estamos en modo móvil
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    /**
     * Función que comprueba el tamaño actual de la ventana
     * y actualiza el estado
     */
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // Comprobación inicial al montar el componente
    handleResize();

    // Escucha cambios de tamaño de pantalla
    window.addEventListener("resize", handleResize);

    // Limpieza del evento al desmontar
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  // Retorna true (mobile) o false (desktop)
  return isMobile;
}
