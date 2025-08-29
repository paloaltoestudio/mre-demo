import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { postPublicRequest } from '../services/fetchingService';
import { CreateHashSchema, CreateTokenSchema } from '../schemas/Auth/hashSchemas';
import type { ResponseHashType, ResponsesTokenType } from '../types/auth/hashSchemas';
import { SessionStore } from '../stores/sessionStore';
import { useActiveUser } from '../hooks/useActiveUser';
import { useTokenExpiration } from '../hooks/useTokenExpiration';
import { toast } from 'react-toastify';

interface HashAuthContextType {
  isProcessing: boolean;
  isAuthenticated: boolean;
  user: any;
  error: string | null;
  hasHash: boolean;
  processHash: (hash: string) => Promise<void>;
}

const HashAuthContext = createContext<HashAuthContextType | undefined>(undefined);

interface HashAuthProviderProps {
  children: ReactNode;
}

export const HashAuthProvider: React.FC<HashAuthProviderProps> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { activeUser, setActiveUser } = useActiveUser();

  const [token, setToken] = useState<ResponseHashType | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setUserId, setGlobalToken } = SessionStore();
  const { setTokenExpiration } = useTokenExpiration();

  // Mutación para procesar el hash
  const { mutateAsync: mutateHash } = useMutation({
    mutationFn: postPublicRequest<ResponseHashType>,
    onSuccess: (data: ResponseHashType) => {
      console.log("Response external data (HashAuthProvider):", data);
      setToken(data);
      setError(null);

      // Configurar expiración del token basado en el tipo de usuario
      console.log("⏰ [HASH_AUTH] Configurando expiración del token...");
      
      // PRIORIDAD: Usar token_api.expires_in (expiración real del token de la API)
      if (data.token_api && data.token_api.expires_in) {
        const expirationDate = new Date(data.token_api.expires_in);
        console.log("⏰ [HASH_AUTH] Usando expiración del token_api.expires_in:", expirationDate.toLocaleString());
        console.log("⏰ [HASH_AUTH] Valor original del token_api:", data.token_api.expires_in);
        setTokenExpiration(expirationDate);
      } else if (data.isPayload && data.payload && data.payload.expiration) {
        // FALLBACK: Usar payload.expiration solo si no hay token_api
        const expirationDate = new Date(data.payload.expiration);
        console.log("⚠️ [HASH_AUTH] Fallback - Usando expiración del payload:", expirationDate.toLocaleString());
        console.log("⚠️ [HASH_AUTH] Valor original del payload:", data.payload.expiration);
        setTokenExpiration(expirationDate);
      } else if (data.jsonData) {
        // Usuario funcionario - usar jsonData
        // Para funcionarios, podríamos usar un tiempo de expiración por defecto
        // o extraer de otro campo si está disponible
        const defaultExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas
        console.log("⏰ [HASH_AUTH] Funcionario - Expiración por defecto (24h):", defaultExpiration.toLocaleString());
        setTokenExpiration(defaultExpiration);
      } else {
        console.log("⚠️ [HASH_AUTH] No se pudo determinar el tipo de usuario para configurar expiración");
      }

      // Guardar el token de la API para futuras peticiones
      if (data.token_api) {
        setGlobalToken(data.token_api.access_token);
        console.log("Token global establecido en HashAuthProvider");
      }

      // Determinar y guardar el tipo de usuario
      let userType = null;
      console.log("🔍 Procesando tipo de usuario...");
      console.log("🔍 Estructura completa de data recibida:", data);
      
      if (data.isPayload && data.payload) {
        userType = data.payload.userType;
        console.log("🔍 Ciudadano detectado - guardando externalId:", data.payload.externalId);
        // Para ciudadanos, guardar el externalId inmediatamente
        SessionStore.getState().setExternalId(data.payload.externalId);
      } else if (data.jsonData) {
        userType = data.jsonData.Data.USER_TYPE?.toLowerCase() || 'funcionario';
        console.log("🔍 Funcionario detectado - guardando USER_ID como externalId:", data.jsonData.Data.USER_ID);
        // Para funcionarios, guardar el USER_ID como externalId
        if (data.jsonData.Data.USER_ID) {
          SessionStore.getState().setExternalId(data.jsonData.Data.USER_ID);
        }
      } else {
        console.log("❌ No se pudo determinar el tipo de usuario - estructura de data:", data);
        console.log("❌ Propiedades disponibles:", Object.keys(data));
      }
      
      if (userType) {
        console.log("✅ Tipo de usuario determinado:", userType);
        SessionStore.getState().setUserType(userType);
        // También actualizar el flag official
        SessionStore.getState().setOfficial(userType === 'funcionario');
      } else {
        console.log("❌ No se pudo determinar el tipo de usuario");
      }
    },
    onError: (error: any) => {
      console.error("Error completo en mutateHash:", error);
      const errorMessage = "Se ha producido un error generando el token";
      setError(errorMessage);
      toast.error(errorMessage, {
        autoClose: 3000,
        draggable: true,
        progress: undefined,
        hideProgressBar: true,
        className: "border-l-5 border-red-500 bg-white text-black shadow-md",
      });
    },
  });

  // Mutación para obtener datos del usuario
  const { mutateAsync: mutateToken } = useMutation({
    mutationFn: postPublicRequest<ResponsesTokenType>,
    onSuccess: (data: ResponsesTokenType) => {
      console.log("Usuario autenticado exitosamente (HashAuthProvider):", data[0]);
      setActiveUser(data[0]);
      setUserId(data[0].id);
      setError(null);
    },
    onError: (error: any) => {
      console.error("Error en mutateToken:", error);
      const errorMessage = "No se pudo obtener la información del usuario";
      setError(errorMessage);
      toast.error(errorMessage, {
        autoClose: 3000,
        draggable: true,
        progress: undefined,
        hideProgressBar: true,
        className: "border-l-5 border-red-500 bg-white text-black shadow-md",
      });
    },
  });

  const handleToken = useCallback(async () => {
    if (!token) return;

    console.log("Procesando token en HashAuthProvider:", token);

    if (token.isPayload && token.payload) {
      // Para ciudadanos: necesitamos hacer la segunda petición para obtener datos del usuario
      const externalId = token.payload.externalId;
      console.log("Ciudadano - ExternalId:", externalId);
      
      if (externalId) {
        await mutateToken({
          url: "/User/external",
          schema: CreateTokenSchema,
          body: { externalId },
          auth: token.token_api?.access_token,
        });
      } else {
        const errorMessage = "No se pudo obtener el ID del usuario";
        setError(errorMessage);
        toast.error(errorMessage, {
          autoClose: 3000,
          draggable: true,
          progress: undefined,
          hideProgressBar: true,
          className: "border-l-5 border-red-500 bg-white text-black shadow-md",
        });
      }
    } else if (token.jsonData) {
      // Para funcionarios: los datos ya están en la respuesta, crear usuario directamente
      const userData = token.jsonData.Data;
      console.log("Funcionario - Datos del usuario:", userData);
      
      if (userData && userData.USER_TYPE) {
        const user = {
          id: parseInt(userData.USER_ID || "0"),
          documentNumber: userData.documentNumber || "",
          firstName: userData.names || "",
          middleName: "",
          lastName: userData.lastName || "",
          secondLastName: "",
          email: userData.email || "",
          phone: "",
          whatsapp: "",
          officeId: 0,
          acceptsDataProcessing: true,
          acceptsTermsAndConditions: true,
          acceptanceDate: new Date(),
        };

        setActiveUser(user);
        setUserId(user.id);
        setError(null);
      } else {
        const errorMessage = "No se pudo determinar el tipo de usuario del token";
        setError(errorMessage);
        toast.error(errorMessage, {
          autoClose: 3000,
          draggable: true,
          progress: undefined,
          hideProgressBar: true,
          className: "border-l-5 border-red-500 bg-white text-black shadow-md",
        });
      }
    } else {
      const errorMessage = "No se pudo determinar el tipo de usuario del token";
      setError(errorMessage);
      toast.error(errorMessage, {
        autoClose: 3000,
        draggable: true,
        progress: undefined,
        hideProgressBar: true,
        className: "border-l-5 border-red-500 bg-white text-black shadow-md",
      });
    }
  }, [token, mutateToken, setActiveUser, setUserId]);

  const processHash = useCallback(async (hashToProcess: string) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      await mutateHash({
        url: "/Token/decrypt",
        schema: CreateHashSchema,
        body: { hash: hashToProcess },
      });
    } catch (error) {
      console.error("Error procesando hash:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [mutateHash]);

  // Efecto para detectar el hash en los parámetros de búsqueda
  useEffect(() => {
    const rawHash = searchParams.get("hash");

    if (rawHash) {
      const corrected = rawHash.replace(/ /g, "+");
      const decoded = decodeURIComponent(corrected);
      console.log("🔍 Hash detectado en HashAuthProvider:", decoded);
      console.log("🔍 Ruta actual:", location.pathname);
      
      // Procesar el hash automáticamente
      processHash(decoded);
    } else {
      
    }
  }, [searchParams, location.pathname, processHash]);

  // Efecto para manejar la autenticación cuando el token esté disponible
  useEffect(() => {
    if (token) {
      handleToken();
    }
  }, [token, handleToken]);

  // Determinar si hay un hash en la URL
  const hasHash = !!searchParams.get("hash");

  // Determinar si el usuario está autenticado
  const isAuthenticated = !!activeUser;

  const contextValue: HashAuthContextType = {
    isProcessing,
    isAuthenticated,
    user: activeUser,
    error,
    hasHash,
    processHash,
  };

  return (
    <HashAuthContext.Provider value={contextValue}>
      {children}
    </HashAuthContext.Provider>
  );
};

export const useHashAuth = (): HashAuthContextType => {
  const context = useContext(HashAuthContext);
  if (context === undefined) {
    throw new Error('useHashAuth must be used within a HashAuthProvider');
  }
  return context;
};
