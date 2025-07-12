import { useEffect } from "react";
import { useActiveUser } from "../hooks/useActiveUser";
import { useSearchParams, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { hasActiveUser } = useActiveUser();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    // Permitir acceso temporal si hay hash en la URL (para procesar autenticación)
    const hasHash = searchParams.get("hash");
    const isDashboardWithHash = (location.pathname === "/dashboard/appointments" || location.pathname === "/dashboard/appointments/") && hasHash;
    
    if (!hasActiveUser && !isDashboardWithHash) {
      // Redirigir a la aplicación externa de autenticación
      window.location.href = "https://www.iaidentity.com/FrontCancilleria/security/login";
    }
  }, [hasActiveUser, searchParams, location.pathname]);

  // Si no hay usuario activo y no hay hash, no renderizar nada (se está redirigiendo)
  const hasHash = searchParams.get("hash");
  const isDashboardWithHash = (location.pathname === "/dashboard/appointments" || location.pathname === "/dashboard/appointments/") && hasHash;
  
  if (!hasActiveUser && !isDashboardWithHash) {
    return null;
  }

  return <>{children}</>;
}; 