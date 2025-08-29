import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { postPublicRequest } from "../services/fetchingService";
import { CreateHashSchema, CreateTokenSchema } from "../schemas/Auth/hashSchemas";
import type {
  ResponseHashType,
  ResponsesTokenType,
} from "../types/auth/hashSchemas";
import { useActiveUser } from "../hooks/useActiveUser";
import { SessionStore } from "../stores/sessionStore";
import { ENV_CONFIG } from "../configs/environment";

export const AuthCallbackView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [hash, setHash] = useState<string | null>();
  const [token, setToken] = useState<ResponseHashType>();
  const { setActiveUser } = useActiveUser();
  const { setUserId } = SessionStore();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const rawHash = searchParams.get("hash");

    if (rawHash) {
      const corrected = rawHash.replace(/ /g, "+");
      const decoded = decodeURIComponent(corrected);
      setHash(decoded);
    } else {
      // Si no hay hash, redirigir a la app externa
      window.location.href = ENV_CONFIG.AUTH_REDIRECT_URL;
    }
  }, [searchParams]);

  const { mutateAsync: MutateHash } = useMutation({
    mutationFn: postPublicRequest<ResponseHashType>,
    onSuccess: (data: ResponseHashType) => {
      console.log("token hash", data);
      console.log("Data structure (AuthCallback):", {
        isPayload: data.isPayload,
        hasPayload: !!data.payload,
        hasJsonData: !!data.jsonData,
        tokenApi: !!data.token_api
      });
      setToken(data);

      // Guardar el token de la API para futuras peticiones
      if (data.token_api) {
        SessionStore.getState().setGlobalToken(data.token_api.access_token);
        
        // Configurar expiración del token usando token_api.expires_in
        if (data.token_api.expires_in) {
          const expirationDate = new Date(data.token_api.expires_in);
          console.log("⏰ [AUTH CALLBACK] Configurando expiración del token_api:", expirationDate.toLocaleString());
          console.log("⏰ [AUTH CALLBACK] Valor original del token_api:", data.token_api.expires_in);
          SessionStore.getState().setTokenExpiration(expirationDate);
        } else {
          console.log("⚠️ [AUTH CALLBACK] No hay fecha de expiración en token_api");
        }
      }

      // Determinar y guardar el tipo de usuario
      let userType = null;
      console.log("🔍 Procesando tipo de usuario (AuthCallback)...");
      console.log("🔍 Estructura completa de data recibida (AuthCallback):", data);
      
      if (data.isPayload && data.payload) {
        userType = data.payload.userType;
        console.log("🔍 Ciudadano detectado (AuthCallback) - guardando externalId:", data.payload.externalId);
        // Para ciudadanos, guardar el externalId inmediatamente
        SessionStore.getState().setExternalId(data.payload.externalId);
      } else if (data.jsonData) {
        userType = data.jsonData.Data.USER_TYPE?.toLowerCase() || 'funcionario';
        console.log("🔍 Funcionario detectado (AuthCallback) - guardando USER_ID como externalId:", data.jsonData.Data.USER_ID);
        // Para funcionarios, guardar el USER_ID como externalId
        if (data.jsonData.Data.USER_ID) {
          SessionStore.getState().setExternalId(data.jsonData.Data.USER_ID);
        }
      } else {
        console.log("❌ No se pudo determinar el tipo de usuario (AuthCallback) - estructura de data:", data);
        console.log("❌ Propiedades disponibles (AuthCallback):", Object.keys(data));
      }
      
      if (userType) {
        console.log("✅ Tipo de usuario determinado (AuthCallback):", userType);
        SessionStore.getState().setUserType(userType);
        // También actualizar el flag official
        SessionStore.getState().setOfficial(userType === 'funcionario');
      } else {
        console.log("❌ No se pudo determinar el tipo de usuario (AuthCallback)");
      }
    },
    onError: (error: any) => {
      console.error("Error completo en MutateHash (AuthCallback):", error);
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
      // En caso de error, redirigir a la app externa
      setTimeout(() => {
        window.location.href = ENV_CONFIG.AUTH_REDIRECT_URL;
      }, 2000);
    },
  });

  const { mutateAsync: MutateToken } = useMutation({
    mutationFn: postPublicRequest<ResponsesTokenType>,
    onSuccess: (data: ResponsesTokenType) => {
      setActiveUser(data[0]);
      setUserId(data[0].id);
      setIsProcessing(false);
      // Redirigir al dashboard después de procesar exitosamente
      navigate("/dashboard/appointments/");
    },
    onError: (error: any) => {
      console.error("Error completo en MutateToken (AuthCallback):", error);
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
      // En caso de error, redirigir a la app externa
      setTimeout(() => {
        window.location.href = ENV_CONFIG.AUTH_REDIRECT_URL;
      }, 2000);
    },
  });

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
      console.log("handleToken ejecutándose con token (AuthCallback):", token);
      console.log("Token structure en handleToken (AuthCallback):", {
        isPayload: token.isPayload,
        hasPayload: !!token.payload,
        hasJsonData: !!token.jsonData,
        payloadContent: token.payload,
        jsonDataContent: token.jsonData
      });
      
      if (token.isPayload && token.payload) {
        // Para ciudadanos: necesitamos hacer la segunda petición para obtener datos del usuario
        const externalId = token.payload.externalId;
        console.log("Ciudadano - ExternalId para handleToken (AuthCallback):", externalId);
        
        if (externalId) {
          await MutateToken({
            url: "/User/external",
            schema: CreateTokenSchema,
            body: { externalId },
          });
        } else {
          console.error("No se pudo obtener el externalId del token de ciudadano en AuthCallback");
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
        console.log("Funcionario - Creando usuario desde jsonData (AuthCallback)");
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
        
        console.log("Usuario funcionario creado (AuthCallback):", funcionarioUser);
        
        // Establecer el usuario activo directamente
        setActiveUser(funcionarioUser);
        setUserId(funcionarioUser.id);
        
        // Redirigir al dashboard después de procesar exitosamente
        setIsProcessing(false);
        navigate("/dashboard/appointments/");
      } else {
        console.error("No se pudo determinar el tipo de usuario del token en AuthCallback");
        console.error("Token completo en error (AuthCallback):", token);
        console.error("Condiciones fallidas (AuthCallback):", {
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Procesando autenticación...
        </h2>
        <p className="text-gray-600">
          {isProcessing ? "Validando credenciales..." : "Redirigiendo al dashboard..."}
        </p>
      </div>
    </div>
  );
}; 