import React from 'react';

import { useHashAuth } from '../contexts/HashAuthContext';
import { useActiveUser } from '../hooks/useActiveUser';
import { ENV_CONFIG } from '../configs/environment';
import { HashStatusDebug } from './HashStatusDebug';

interface HashRouteWrapperProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const HashRouteWrapper: React.FC<HashRouteWrapperProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const { hasHash, isProcessing, isAuthenticated, error } = useHashAuth();
  const { hasActiveUser } = useActiveUser();

  // Logs de debug
  console.log("🔍 HashRouteWrapper Debug:", {
    hasHash,
    isProcessing,
    isAuthenticated,
    hasActiveUser,
    requireAuth,
    AUTH_REDIRECT_URL: ENV_CONFIG.AUTH_REDIRECT_URL
  });

  // Si no requiere autenticación, mostrar directamente
  if (!requireAuth) {
    console.log("✅ No requiere autenticación, mostrando contenido");
    return <>{children}</>;
  }

  // Si hay hash y está procesándose, mostrar loading
  if (hasHash && isProcessing) {
    console.log("⏳ Hash detectado y procesándose, mostrando loading");
    return (
      <>
        <HashStatusDebug />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Procesando autenticación...</p>
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  // Si no hay usuario activo y no hay hash, redirigir solo si hay URL configurada
  if (!hasActiveUser && !hasHash) {
    if (ENV_CONFIG.AUTH_REDIRECT_URL) {
      console.log("🚫 No hay usuario ni hash, redirigiendo a:", ENV_CONFIG.AUTH_REDIRECT_URL);
      window.location.href = ENV_CONFIG.AUTH_REDIRECT_URL;
      return null;
    } else {
      console.log("⚠️ No hay AUTH_REDIRECT_URL configurada, mostrando contenido sin autenticación");
      return (
        <>
          <HashStatusDebug />
          {children}
        </>
      );
    }
  }

  // Si hay usuario activo o hash válido, mostrar contenido
  console.log("✅ Usuario autenticado o hash válido, mostrando contenido");
  return (
    <>
      <HashStatusDebug />
      {children}
    </>
  );
};
