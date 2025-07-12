import { useEffect, useRef } from "react";
import { useActiveUser } from "./useActiveUser";

export const useTokenExpiration = () => {
  const { clearActiveUser } = useActiveUser();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setTokenExpiration = (expirationDate: Date) => {
    // Limpiar timeout anterior si existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const now = new Date();
    const expiration = new Date(expirationDate);
    const timeUntilExpiration = expiration.getTime() - now.getTime();

    // Si ya expiró, redirigir inmediatamente
    if (timeUntilExpiration <= 0) {
      handleTokenExpiration();
      return;
    }

    // Configurar timeout para cuando expire el token
    timeoutRef.current = setTimeout(() => {
      handleTokenExpiration();
    }, timeUntilExpiration);
  };

  const handleTokenExpiration = () => {
    console.log("Token expirado, redirigiendo a autenticación...");
    clearActiveUser();
    window.location.href = "https://www.iaidentity.com/FrontCancilleria/security/login";
  };

  const clearTokenExpiration = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Limpiar timeout cuando el componente se desmonte
  useEffect(() => {
    return () => {
      clearTokenExpiration();
    };
  }, []);

  return {
    setTokenExpiration,
    clearTokenExpiration,
  };
}; 