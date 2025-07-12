import { useEffect } from "react";
import { useActiveUser } from "../hooks/useActiveUser";
import { useTokenExpiration } from "../hooks/useTokenExpiration";

export const TokenExpirationChecker = () => {
  const { tokenExpiration, hasActiveUser } = useActiveUser();
  const { setTokenExpiration } = useTokenExpiration();

  useEffect(() => {
    // Solo verificar si hay usuario activo y expiración guardada
    if (hasActiveUser && tokenExpiration) {
      const now = new Date();
      const expiration = new Date(tokenExpiration);

      // Si ya expiró, redirigir inmediatamente
      if (now >= expiration) {
        console.log("Token expirado al cargar la aplicación");
        window.location.href = "https://www.iaidentity.com/FrontCancilleria/security/login";
        return;
      }

      // Si no ha expirado, configurar el timeout
      setTokenExpiration(expiration);
    }
  }, [hasActiveUser, tokenExpiration, setTokenExpiration]);

  // Este componente no renderiza nada, solo verifica la expiración
  return null;
}; 