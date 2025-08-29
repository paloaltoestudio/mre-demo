import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { postPublicRequest } from '../services/fetchingService';
import { CreateHashSchema, CreateTokenSchema } from '../schemas/Auth/hashSchemas';
import type { ResponseHashType, ResponsesTokenType } from '../types/auth/hashSchemas';
import { SessionStore } from '../stores/sessionStore';
import { useActiveUser } from './useActiveUser';
import { toast } from 'react-toastify';

interface UseHashAuthReturn {
  isProcessing: boolean;
  isAuthenticated: boolean;
  user: any;
  error: string | null;
  hasHash: boolean;
}

export const useHashAuth = (): UseHashAuthReturn => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { activeUser, setActiveUser } = useActiveUser();
  const [hash, setHash] = useState<string | null>();
  const [token, setToken] = useState<ResponseHashType>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mutación para procesar el hash
  const { mutateAsync: MutateHash } = useMutation({
    mutationFn: postPublicRequest<ResponseHashType>,
    onSuccess: (data: ResponseHashType) => {
      console.log("Response external data (useHashAuth):", data);
      console.log("Data structure (useHashAuth):", {
        isPayload: data.isPayload,
        hasPayload: !!data.payload,
        hasJsonData: !!data.jsonData,
        tokenApi: !!data.token_api
      });
      
      // Debug detallado de la estructura
      console.log("Debug completo de la respuesta (useHashAuth):", {
        isPayload: data.isPayload,
        payload: data.payload,
        jsonData: data.jsonData,
        token_api: data.token_api
      });
      
      // Debug adicional para externalId
      if (data.isPayload && data.payload) {
        console.log("🔍 Ciudadano detectado (useHashAuth) - externalId:", data.payload.externalId);
      } else if (data.jsonData && data.jsonData.Data) {
        if (data.jsonData.Data.isPayload && data.jsonData.Data.payload) {
          // Hash de ciudadano - el externalId está en jsonData.Data.payload
          console.log("🔍 Ciudadano detectado (useHashAuth) - externalId:", data.jsonData.Data.payload.externalId);
        } else if (data.jsonData.Data.USER_ID) {
          // Funcionario - USER_ID está directamente en jsonData.Data
          console.log("🔍 Funcionario detectado (useHashAuth) - USER_ID:", data.jsonData.Data.USER_ID);
          console.log("🔍 Datos completos del funcionario (useHashAuth):", data.jsonData.Data);
        } else {
          console.log("❌ [useHashAuth] Estructura de jsonData.Data no reconocida:", data.jsonData.Data);
        }
      } else {
        console.log("❌ No se pudo determinar el tipo de usuario (useHashAuth)");
      }
      
      setToken(data);
      setError(null);

      // Guardar el token de la API para futuras peticiones
      if (data.token_api) {
        SessionStore.getState().setGlobalToken(data.token_api.access_token);
      }

      // Determinar y guardar el tipo de usuario
      let userType = null;
      let externalId = null;
      console.log("🔍 Procesando tipo de usuario (useHashAuth)...");
      console.log("🔍 Estructura completa de data recibida (useHashAuth):", data);
      
      if (data.isPayload && data.payload) {
        // Hash directo (estructura antigua)
        userType = data.payload.userType;
        externalId = data.payload.externalId;
        console.log("🔍 Ciudadano detectado (estructura antigua) - guardando externalId:", externalId);
      } else if (data.jsonData && data.jsonData.Data) {
        if (data.jsonData.Data.isPayload && data.jsonData.Data.payload) {
          // Hash de ciudadano (nueva estructura)
          userType = data.jsonData.Data.payload.userType;
          externalId = data.jsonData.Data.payload.externalId;
          console.log("🔍 Ciudadano detectado (nueva estructura) - guardando externalId:", externalId);
        } else if (data.jsonData.Data.USER_ID) {
          // Funcionario
          userType = data.jsonData.Data.USER_TYPE?.toLowerCase() || 'funcionario';
          externalId = data.jsonData.Data.USER_ID;
          console.log("🔍 Funcionario detectado - guardando USER_ID como externalId:", externalId);
        } else {
          console.log("❌ [useHashAuth] No se pudo determinar el tipo de usuario en jsonData.Data:", data.jsonData.Data);
        }
      } else {
        console.log("❌ No se pudo determinar el tipo de usuario (useHashAuth) - estructura de data:", data);
        console.log("❌ Propiedades disponibles (useHashAuth):", Object.keys(data));
      }
      
      if (userType && externalId) {
        console.log("✅ Tipo de usuario determinado (useHashAuth):", userType);
        console.log("✅ ExternalId guardado (useHashAuth):", externalId);
        SessionStore.getState().setUserType(userType);
        SessionStore.getState().setExternalId(externalId);
        // También actualizar el flag official
        SessionStore.getState().setOfficial(userType === 'funcionario');
      } else {
        console.log("❌ No se pudo determinar el tipo de usuario o externalId (useHashAuth)");
      }
    },
    onError: (error: any) => {
      console.error("Error completo en MutateHash (useHashAuth):", error);
      console.error("Error response (useHashAuth):", error.response);
      console.error("Error data (useHashAuth):", error.response?.data);
      
      const errorMessage = "Ocurrió un error en la validación del hash";
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

  // Mutación para obtener datos del usuario ciudadano
  const { mutateAsync: MutateToken } = useMutation({
    mutationFn: postPublicRequest<ResponsesTokenType>,
    onSuccess: (data: ResponsesTokenType) => {
      console.log("Respuesta completa de MutateToken (useHashAuth):", data);
      console.log("Usuario ciudadano autenticado (useHashAuth):", data[0]);
      
      if (data && data[0]) {
        setActiveUser(data[0]);
        
        // Log de confirmación
        console.log("✅ Usuario ciudadano autenticado exitosamente en useHashAuth");
        console.log("🎯 Usuario autenticado y listo para usar en cualquier componente");
        
        setError(null);
      } else {
        const errorMessage = "Error: La respuesta de la API no contiene datos del usuario";
        setError(errorMessage);
        console.error(errorMessage + " en useHashAuth - data:", data);
        
        toast.error(errorMessage, {
          autoClose: 3000,
          draggable: true,
          progress: undefined,
          hideProgressBar: true,
          className: "border-l-5 border-red-500 bg-white text-black shadow-md",
        });
      }
    },
    onError: (error: any) => {
      console.error("Error completo en MutateToken (useHashAuth):", error);
      console.error("Error response (useHashAuth):", error.response);
      console.error("Error data (useHashAuth):", error.response?.data);
      
      const errorMessage = "Error: No se pudo autenticar al usuario";
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

  // Función para procesar el hash
  const handleHash = useCallback(async () => {
    if (hash) {
      setIsProcessing(true);
      try {
        await MutateHash({
          url: "/Token/decrypt",
          schema: CreateHashSchema,
          body: { hash: hash! },
        });
      } finally {
        setIsProcessing(false);
      }
    }
  }, [hash, MutateHash]);

  // Función para manejar la autenticación después de validar el hash
  const handleToken = useCallback(async () => {
    if (token) {
      console.log("handleToken ejecutándose con token (useHashAuth):", token);
      console.log("Token structure en handleToken (useHashAuth):", {
        isPayload: token.isPayload,
        hasPayload: !!token.payload,
        hasJsonData: !!token.jsonData,
        payloadContent: token.payload,
        jsonDataContent: token.jsonData
      });
      
      if (token.isPayload && token.payload) {
        // Para ciudadanos: necesitamos hacer la segunda petición para obtener datos del usuario
        const externalId = token.payload.externalId;
        console.log("Ciudadano - ExternalId para handleToken (useHashAuth):", externalId);
        console.log("Ciudadano - Token payload completo:", token.payload);
        
        if (externalId) {
          console.log("🔍 Iniciando petición a /User/external con externalId:", externalId);
          setIsProcessing(true);
          try {
            // Obtener el token global del store para la petición a /User/external
            const globalToken = SessionStore.getState().globalToken;
            console.log("🔑 Token global para /User/external:", globalToken ? "Disponible" : "No disponible");
            
            const result = await MutateToken({
              url: "/User/external",
              schema: CreateTokenSchema,
              body: { externalId },
              auth: globalToken, // Pasar el token de autorización
            });
            console.log("✅ Petición a /User/external exitosa:", result);
          } catch (error) {
            console.error("❌ Error en petición a /User/external:", error);
            throw error;
          } finally {
            setIsProcessing(false);
          }
        } else {
          const errorMessage = "No se pudo obtener el externalId del token de ciudadano";
          setError(errorMessage);
          console.error(errorMessage + " en useHashAuth");
          toast.error("Error: No se pudo obtener el ID del usuario", {
            autoClose: 3000,
            draggable: true,
            progress: undefined,
            hideProgressBar: true,
            className: "border-l-5 border-red-500 bg-white text-black shadow-md",
          });
        }
      } else if (token.jsonData && token.jsonData.Data) {
        if (token.jsonData.Data.isPayload && token.jsonData.Data.payload) {
          // Hash de ciudadano (nueva estructura) - necesitamos hacer la segunda petición
          const externalId = token.jsonData.Data.payload.externalId;
          console.log("Ciudadano (nueva estructura) - ExternalId para handleToken (useHashAuth):", externalId);
          console.log("Ciudadano (nueva estructura) - Token payload completo:", token.jsonData.Data.payload);
          
          if (externalId) {
            console.log("🔍 Iniciando petición a /User/external con externalId (nueva estructura):", externalId);
            setIsProcessing(true);
            try {
              // Obtener el token global del store para la petición a /User/external
              const globalToken = SessionStore.getState().globalToken;
              console.log("🔑 Token global para /User/external (nueva estructura):", globalToken ? "Disponible" : "No disponible");
              
              const result = await MutateToken({
                url: "/User/external",
                schema: CreateTokenSchema,
                body: { externalId },
                auth: globalToken, // Pasar el token de autorización
              });
              console.log("✅ Petición a /User/external exitosa (nueva estructura):", result);
            } catch (error) {
              console.error("❌ Error en petición a /User/external (nueva estructura):", error);
              throw error;
            } finally {
              setIsProcessing(false);
            }
          } else {
            const errorMessage = "No se pudo obtener el externalId del token de ciudadano (nueva estructura)";
            setError(errorMessage);
            console.error(errorMessage + " en useHashAuth");
            toast.error("Error: No se pudo obtener el ID del usuario", {
              autoClose: 3000,
              draggable: true,
              progress: undefined,
              hideProgressBar: true,
              className: "border-l-5 border-red-500 bg-white text-black shadow-md",
            });
          }
        } else {
          // Para funcionarios: los datos ya están en la respuesta, crear usuario directamente
          console.log("Funcionario - Creando usuario desde jsonData (useHashAuth)");
          const funcionarioData = token.jsonData.Data;
          
          // Crear objeto de usuario con el formato esperado
          const funcionarioUser = {
            id: parseInt(funcionarioData.USER_ID || "0"),
            documentNumber: funcionarioData.documentNumber || "",
            firstName: funcionarioData.names || "",
            middleName: "",
            lastName: funcionarioData.lastName || "",
            secondLastName: "",
            email: funcionarioData.email || "",
            phone: "",
            whatsapp: "",
            officeId: 0,
            acceptsDataProcessing: true,
            acceptsTermsAndConditions: true,
            acceptanceDate: new Date(),
          };
          
          console.log("Usuario funcionario creado (useHashAuth):", funcionarioUser);
          
          // Establecer el usuario activo directamente
          setActiveUser(funcionarioUser);
          
          // Log de confirmación
          console.log("✅ Usuario funcionario autenticado exitosamente en useHashAuth");
          console.log("🎯 Usuario autenticado y listo para usar en cualquier componente");
          
          setError(null);
        }
      } else {
        const errorMessage = "No se pudo determinar el tipo de usuario del token";
        setError(errorMessage);
        console.error(errorMessage + " en useHashAuth");
        console.error("Token completo en error (useHashAuth):", token);
        console.error("Condiciones fallidas (useHashAuth):", {
          isPayloadCondition: token.isPayload && token.payload,
          jsonDataCondition: token.jsonData,
          dataExists: true
        });
        toast.error("Error: No se pudo determinar el tipo de usuario", {
          autoClose: 3000,
          draggable: true,
          progress: undefined,
          hideProgressBar: true,
          className: "border-l-5 border-red-500 bg-white text-black shadow-md",
        });
      }
    }
  }, [token, MutateToken, setActiveUser]);

  // Efecto para detectar el hash en los parámetros de búsqueda
  useEffect(() => {
    const rawHash = searchParams.get("hash");

    if (rawHash) {
      const corrected = rawHash.replace(/ /g, "+");
      const decoded = decodeURIComponent(corrected);
      setHash(decoded);
      console.log("🔍 Hash detectado en useHashAuth:", decoded);
      console.log("🔍 Ruta actual:", location.pathname);
    } else {
      setHash(null);
    }
  }, [searchParams, location.pathname]);

  // Efecto para procesar el hash cuando esté disponible
  useEffect(() => {
    if (hash) {
      handleHash();
    }
  }, [hash, handleHash]);

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

  return {
    isProcessing: isProcessing || (hasHash && !isAuthenticated),
    isAuthenticated,
    user: activeUser,
    error,
    hasHash,
  };
};
