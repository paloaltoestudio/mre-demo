import { useEffect } from "react";
import { useActiveUser } from "../hooks/useActiveUser";
import { useTokenExpiration } from "../hooks/useTokenExpiration";
import { ENV_CONFIG } from "../configs/environment";

export const TokenExpirationChecker = () => {
  const { tokenExpiration, hasActiveUser } = useActiveUser();
  const { setTokenExpiration } = useTokenExpiration();

  useEffect(() => {
    console.log("🔍 [TOKEN CHECKER] Verificando estado del token:");
    console.log("   - Usuario activo:", hasActiveUser);
    console.log("   - Token expiration:", tokenExpiration);
    
    // Solo verificar si hay usuario activo y expiración guardada
    if (hasActiveUser && tokenExpiration) {
      const now = new Date();
      const expiration = new Date(tokenExpiration);
      const timeUntilExpiration = expiration.getTime() - now.getTime();

      console.log("🔍 [TOKEN CHECKER] Token encontrado:");
      console.log("   - Fecha actual:", now.toLocaleString());
      console.log("   - Fecha de expiración:", expiration.toLocaleString());
      console.log("   - Tiempo restante:", Math.floor(timeUntilExpiration / 1000 / 60), "minutos");

      // Si ya expiró, redirigir inmediatamente
      if (now >= expiration) {
        console.log("❌ [TOKEN CHECKER] Token expirado al cargar la aplicación, redirigiendo...");
        window.location.href = ENV_CONFIG.AUTH_REDIRECT_URL;
        return;
      }

      // Si no ha expirado, configurar el timeout
      console.log("✅ [TOKEN CHECKER] Token válido, configurando timeout...");
      // NO llamar setTokenExpiration aquí para evitar duplicación
      // El timeout ya se configura desde Appointments.tsx o AuthCallbackView.tsx
      console.log("ℹ️ [TOKEN CHECKER] Omitiendo setTokenExpiration para evitar duplicación");
    } else {
      console.log("⚠️ [TOKEN CHECKER] No hay usuario activo o token de expiración");
    }
  }, [hasActiveUser, tokenExpiration, setTokenExpiration]);

  // Este componente no renderiza nada, solo verifica la expiración
  return null;
}; 