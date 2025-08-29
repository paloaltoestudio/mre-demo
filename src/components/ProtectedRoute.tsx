import { useEffect, useState } from "react";
import { useActiveUser } from "../hooks/useActiveUser";
import { useSearchParams } from "react-router-dom";
import { ENV_CONFIG } from "../configs/environment";


import type {
  ResponseHashType,
  ResponsesTokenType,
} from "../types/auth/hashSchemas";

import {
  CreateHashSchema,
  CreateTokenSchema,
} from "../schemas/Auth/hashSchemas";

import { useMutation } from "@tanstack/react-query";
import {
  postPublicRequest,
} from "../services/fetchingService";
import { SessionStore } from "../stores/sessionStore";
import { useTokenExpiration } from "../hooks/useTokenExpiration";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [hash, setHash] = useState<string | null>();
  const [token, setToken] = useState<ResponseHashType>();

  
  const { hasActiveUser } = useActiveUser();
  const [searchParams] = useSearchParams();
  const { setTokenExpiration: setExpiration } = useTokenExpiration();
  const { setActiveUser, setTokenExpiration } = useActiveUser();

  useEffect(() => {
    // Permitir acceso temporal si hay hash en la URL (para procesar autenticación)
    const hasHash = searchParams.get("hash");
    
    if (!hasActiveUser && !hasHash) {
      // Redirigir a la aplicación externa de autenticación
      window.location.href = ENV_CONFIG.AUTH_REDIRECT_URL;
    }
  }, [hasActiveUser, searchParams]);

  // Si no hay usuario activo y no hay hash, no renderizar nada (se está redirigiendo)
  // const hasHash = searchParams.get("hash");
  // const isDashboardWithHash = (location.pathname === "/dashboard/appointments" || location.pathname === "/dashboard/appointments/") && hasHash;
  
  // if (!hasActiveUser && !isDashboardWithHash) {
  //   return null;
  // }





  useEffect(() => {
    const rawHash = searchParams.get("hash");

    if (rawHash) {
      const corrected = rawHash.replace(/ /g, "+");
      const decoded = decodeURIComponent(corrected);
      setHash(decoded);
    } else {
      setHash(null);
    }


  }, [searchParams]);

  useEffect(() => {
    if (hash) {
      handleHash();
    }
  }, [hash]);
  useEffect(() => {
    if (token) {
      handleToken();
    }
  }, [token]);

  const { mutateAsync: MutateHash } = useMutation({
    mutationFn: postPublicRequest<ResponseHashType>,
    onSuccess: (data: ResponseHashType) => {
      console.log("Response external data", data);
      console.log("Data structure:", {
        isPayload: data.isPayload,
        hasPayload: !!data.payload,
        hasJsonData: !!data.jsonData,
        tokenApi: !!data.token_api
      });
      
      // Debug detallado de la estructura
      console.log("Debug completo de la respuesta:", {
        isPayload: data.isPayload,
        payload: data.payload,
        jsonData: data.jsonData,
        token_api: data.token_api
      });
      
      // Debug adicional para externalId
      if (data.isPayload && data.payload) {
        console.log("🔍 Ciudadano detectado - externalId:", data.payload.externalId);
      } else if (data.jsonData) {
        console.log("🔍 Funcionario detectado - USER_ID:", data.jsonData.Data.USER_ID);
      } else {
        console.log("❌ No se pudo determinar el tipo de usuario");
      }
      setToken(data);

      // Configurar expiración del token basado en el tipo de usuario
      console.log("⏰ [APPOINTMENTS] Configurando expiración del token...");
      
      // PRIORIDAD: Usar token_api.expires_in (expiración real del token de la API)
      if (data.token_api && data.token_api.expires_in) {
        const expirationDate = new Date(data.token_api.expires_in);
        console.log("⏰ [APPOINTMENTS] Usando expiración del token_api.expires_in:", expirationDate.toLocaleString());
        console.log("⏰ [APPOINTMENTS] Valor original del token_api:", data.token_api.expires_in);
        setTokenExpiration(expirationDate);
        setExpiration(expirationDate);
      } else if (data.isPayload && data.payload && data.payload.expiration) {
        // FALLBACK: Usar payload.expiration solo si no hay token_api
        const expirationDate = new Date(data.payload.expiration);
        console.log("⚠️ [APPOINTMENTS] Fallback - Usando expiración del payload:", expirationDate.toLocaleString());
        console.log("⚠️ [APPOINTMENTS] Valor original del payload:", data.payload.expiration);
        setTokenExpiration(expirationDate);
        setExpiration(expirationDate);
      } else if (data.jsonData) {
        // Usuario funcionario - usar jsonData
        // Para funcionarios, podríamos usar un tiempo de expiración por defecto
        // o extraer de otro campo si está disponible
        const defaultExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas
        console.log("⏰ [APPOINTMENTS] Funcionario - Expiración por defecto (24h):", defaultExpiration.toLocaleString());
        setTokenExpiration(defaultExpiration);
        setExpiration(defaultExpiration);
      } else {
        console.log("⚠️ [APPOINTMENTS] No se pudo determinar el tipo de usuario para configurar expiración");
      }

      // Guardar el token de la API para futuras peticiones
      if (data.token_api) {
        SessionStore.getState().setGlobalToken(data.token_api.access_token);
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
      console.error("Error completo en MutateHash:", error);
      console.error("Error response:", error.response);
      console.error("Error data:", error.response?.data);
      
      toast.error("Ocurrió un error en la generación del token", {
        icon: (
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="text-red-500"
          />
        ),
        autoClose: 1000,
        draggable: true,
        progress: undefined,
        hideProgressBar: true,
        className: "border-l-5 border-red-500 bg-white text-black shadow-md",
      });
      // Redirigir a la app externa después de mostrar el error
      setTimeout(() => {
        window.location.href = ENV_CONFIG.AUTH_REDIRECT_URL;
      }, 2000);
    },
  });

  const {
    setUserId,
    setExternalId,

  } = SessionStore();
  const { mutateAsync: MutateToken } = useMutation({
    mutationFn: postPublicRequest<ResponsesTokenType>,
    onSuccess: (data: ResponsesTokenType) => {
      setActiveUser(data[0]);
      setUserId(data[0].id);
    },
    onError: () => {
      toast.error("Ocurrió un error en la generación del token", {
        icon: (
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="text-red-500"
          />
        ),
        autoClose: 1000,
        draggable: true,
        progress: undefined,
        hideProgressBar: true,
        className: "border-l-5 border-red-500 bg-white text-black shadow-md",
      });

      // Redirigir a la app externa después de mostrar el error
      setTimeout(() => {
        window.location.href = ENV_CONFIG.AUTH_REDIRECT_URL;
      }, 2000);
    },
  });

  const handleHash = async () => {
    if (hash) {
      await MutateHash({
        url: "/Token/decrypt",
        schema: CreateHashSchema,
        body: { hash: hash! },
      });
    }
  };

  const handleToken = async () => {
    if (token) {
      console.log("handleToken ejecutándose con token:", token);
      console.log("Token structure en handleToken:", {
        isPayload: token.isPayload,
        hasPayload: !!token.payload,
        hasJsonData: !!token.jsonData,
        payloadContent: token.payload,
        jsonDataContent: token.jsonData
      });
      
      if (token.isPayload && token.payload) {
        // Para ciudadanos: necesitamos hacer la segunda petición para obtener datos del usuario
        const externalId = token.payload.externalId;
        console.log("Ciudadano - ExternalId para handleToken:", externalId);
        
        if (externalId) {
      await MutateToken({
        url: "/User/external",
        schema: CreateTokenSchema,
            body: { externalId },
          });
        } else {
          console.error("No se pudo obtener el externalId del token de ciudadano");
          toast.error("Error: No se pudo obtener el ID del usuario", {
            autoClose: 3000,
            draggable: true,
            progress: undefined,
            hideProgressBar: true,
            className: "border-l-5 border-red-500 bg-white text-black shadow-md",
          });
        }
      } else if (token.jsonData) {
        // Para funcionarios: los datos ya están en la respuesta, crear usuario directamente
        console.log("Funcionario - Creando usuario desde jsonData");
        const funcionarioData = token.jsonData.Data;
        
        // Crear objeto de usuario con el formato esperado
        const funcionarioUser = {
          id: parseInt(funcionarioData.USER_ID || "0"),
          documentNumber: funcionarioData.documentNumber,
          firstName: funcionarioData.names,
          middleName: "",
          lastName: funcionarioData.lastName,
          secondLastName: "",
          email: funcionarioData.email,
          phone: "",
          whatsapp: "",
          officeId: 0,
          acceptsDataProcessing: true,
          acceptsTermsAndConditions: true,
          acceptanceDate: new Date(),
        };
        
        console.log("Usuario funcionario creado:", funcionarioUser);
        
        // Establecer el usuario activo directamente
        setActiveUser(funcionarioUser as any);
        setUserId(funcionarioUser.id);
        if (funcionarioData.USER_ID) {
          setExternalId(funcionarioData.USER_ID);
        }
        
        // No necesitamos hacer la segunda petición para funcionarios
      } else {
        console.error("No se pudo determinar el tipo de usuario del token");
        console.error("Token completo en error:", token);
        console.error("Condiciones fallidas:", {
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
  };




  

  return <>{children}</>;
}; 