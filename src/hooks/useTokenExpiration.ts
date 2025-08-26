import { useEffect, useRef } from "react";
import { useActiveUser } from "./useActiveUser";
import { ENV_CONFIG } from "../configs/environment";

export const useTokenExpiration = () => {
  const { clearActiveUser } = useActiveUser();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setTokenExpiration = (expirationDate: Date) => {
    const stackTrace = new Error().stack;
    const callerInfo = stackTrace?.split('\n')[2]?.trim();
    
    console.log("🔐 [TOKEN EXPIRATION] Configurando expiración del token:");
    console.log("   - Llamado desde:", callerInfo);
    console.log("   - Fecha recibida:", expirationDate.toLocaleString());
    console.log("   - Timestamp recibido:", expirationDate.getTime());
    console.log("   - Stack trace completo:", stackTrace);
    
    // Limpiar timeout anterior si existe
    if (timeoutRef.current) {
      console.log("🔄 [TOKEN EXPIRATION] Limpiando timeout anterior existente");
      clearTimeout(timeoutRef.current);
    } else {
      console.log("🆕 [TOKEN EXPIRATION] No hay timeout anterior, creando nuevo");
    }

    const now = new Date();
    const expiration = new Date(expirationDate);
    const timeUntilExpiration = expiration.getTime() - now.getTime();

    console.log("   - Fecha actual:", now.toLocaleString());
    console.log("   - Timestamp actual:", now.getTime());
    console.log("   - Fecha de expiración:", expiration.toLocaleString());
    console.log("   - Timestamp expiración:", expiration.getTime());
    console.log("   - Tiempo restante:", Math.floor(timeUntilExpiration / 1000 / 60), "minutos");
    console.log("   - Tiempo restante (ms):", timeUntilExpiration);
    console.log("   - ¿Token expirado?:", timeUntilExpiration <= 0 ? "SÍ ❌" : "NO ✅");

    // Si ya expiró, redirigir inmediatamente
    if (timeUntilExpiration <= 0) {
      console.log("❌ [TOKEN EXPIRATION] Token ya expiró, redirigiendo inmediatamente");
      console.log("   - DEBUG: timeUntilExpiration =", timeUntilExpiration);
      console.log("   - DEBUG: now.getTime() =", now.getTime());
      console.log("   - DEBUG: expiration.getTime() =", expiration.getTime());
      console.log("   - DEBUG: Fecha que causó la expiración:", expirationDate.toLocaleString());
      console.log("   - DEBUG: Timestamp que causó la expiración:", expirationDate.getTime());
      handleTokenExpiration();
      return;
    }

    // Configurar timeout para cuando expire el token
    console.log("⏰ [TOKEN EXPIRATION] Configurando timeout para expiración en", Math.floor(timeUntilExpiration / 1000 / 60), "minutos");
    console.log("   - DEBUG: setTimeout configurado con delay:", timeUntilExpiration, "ms");
    console.log("   - DEBUG: timeoutRef.current será:", timeoutRef.current ? "ya existía" : "nuevo");
    
    // Límite máximo del navegador: ~24.85 días (2,147,483,647 ms)
    const MAX_TIMEOUT = 2147483647; 
    
    // Si excede el límite del navegador, usar 24 días; si no, usar el valor dinámico
    const actualDelay = timeUntilExpiration > MAX_TIMEOUT ? MAX_TIMEOUT : timeUntilExpiration;
    
    if (timeUntilExpiration > MAX_TIMEOUT) {
      console.log("⚠️ [TOKEN EXPIRATION] Delay excede límite del navegador, usando 24 días como máximo");
      console.log("   - Delay original:", Math.floor(timeUntilExpiration / 1000 / 60 / 60 / 24), "días");
      console.log("   - Delay ajustado:", Math.floor(actualDelay / 1000 / 60 / 60 / 24), "días");
    } else {
      console.log("✅ [TOKEN EXPIRATION] Delay dentro del límite del navegador");
    }
    
    timeoutRef.current = setTimeout(() => {
      console.log("⏰ [TOKEN EXPIRATION] Timeout ejecutado - Token expiró");
      console.log("   - DEBUG: setTimeout callback ejecutado después de:", actualDelay, "ms");
      console.log("   - DEBUG: Fecha actual en callback:", new Date().toLocaleString());
      console.log("   - DEBUG: Fecha de expiración original:", expirationDate.toLocaleString());
      handleTokenExpiration();
    }, actualDelay);
  };

  const handleTokenExpiration = () => {
    const now = new Date();
    const stackTrace = new Error().stack;
    console.log("🚨 [TOKEN EXPIRATION] ¡TOKEN EXPIRADO!");
    console.log("   - Hora de expiración:", now.toLocaleString());
    console.log("   - Redirigiendo a:", ENV_CONFIG.AUTH_REDIRECT_URL);
    console.log("   - Limpiando usuario activo...");
    console.log("   - Llamado desde:", stackTrace?.split('\n')[2]?.trim());
    
    clearActiveUser();
    window.location.href = ENV_CONFIG.AUTH_REDIRECT_URL;
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