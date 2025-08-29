import { useFormContext } from "react-hook-form";
import { SessionStore } from "../../../stores/sessionStore";
import { useEffect, useState, useCallback, useRef } from "react";
import { useSendOTP } from "../../../hooks/Auth/useSendOTP";
import type { ResponseTokenType } from "../../../types/auth/hashSchemas";

type MethodType = "email" | "sms" | "whatsapp";

type VerificationMethodProps = {
  submitted?: string;
};

export const VerificationMethod = ({ submitted }: VerificationMethodProps) => {
  const { activeUser, userId, setOtp } = SessionStore();
  const methods = useFormContext();
  const selectedMethod = methods.watch("method");
  const isFormValid = !!selectedMethod;
  const [methodList, setMethodList] = useState<MethodType[]>([]);
  const [sessionUser, setSessionUser] = useState<ResponseTokenType>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasSubmittedRef = useRef(false);
  const { sendOTP, isPending } = useSendOTP({ setOtp, shouldNavigate: true });
  

  
  // Log isPending to avoid unused variable warning
  console.log("OTP sending status:", isPending);

  const handleSendOTP = useCallback(async (userId: string, submitted: string) => {
    console.log("🚀 handleSendOTP iniciando con:", { userId, submitted, isSubmitting });
    if (isSubmitting) {
      console.log("⚠️ Ya se está enviando, ignorando");
      return; // Ya se está enviando, ignorar llamada duplicada
    }
    setIsSubmitting(true);
    
    // Si hay un error previo, limpiarlo antes de reintentar
    if (error) {
      setError(null);
    }
    
    try {
      console.log("📤 Enviando OTP...");
      await sendOTP(userId.toString(), submitted);
      console.log("✅ OTP enviado exitosamente");
      // Solo mantener hasSubmittedRef como true si fue exitoso
      hasSubmittedRef.current = true;
    } catch (err) {
      console.log("❌ Error enviando OTP:", err);
      setError("Error al enviar el código. Por favor intenta nuevamente.");
      // NO resetear hasSubmittedRef aquí para evitar loop infinito
      // El usuario deberá hacer clic manualmente en el botón para reintentar
    } finally {
      console.log("🏁 Finalizando handleSendOTP");
      setIsSubmitting(false);
    }
  }, [sendOTP, error]);

  useEffect(() => {
    console.log("🔍 useEffect ejecutándose:", { 
      submitted, 
      userId, 
      isSubmitting, 
      hasSubmitted: hasSubmittedRef.current,
      activeUser: !!activeUser,
      sessionUser: !!sessionUser
    });
    
    // Log del estado completo del store
    const storeState = SessionStore.getState();
    console.log("🔧 Estado completo del store:", {
      userId: storeState.userId,
      activeUser: storeState.activeUser ? {
        id: storeState.activeUser.id,
        documentNumber: storeState.activeUser.documentNumber,
        email: storeState.activeUser.email
      } : null,
      userType: storeState.userType,
      official: storeState.official
    });
    
    // Solo ejecutar automáticamente la primera vez:
    // 1. Hay datos válidos
    // 2. No se está enviando actualmente
    // 3. No se ha enviado ya exitosamente
    // 4. NO hay error activo (para evitar loops infinitos)
    if (submitted?.trim() && userId && !isSubmitting && !hasSubmittedRef.current && !error) {
      console.log("✅ Ejecutando handleSendOTP automáticamente");
      hasSubmittedRef.current = true;
      handleSendOTP(userId.toString(), submitted);
    } else {
      console.log("❌ No ejecutando automáticamente:", { 
        hasSubmitted: !!submitted?.trim(), 
        hasuserId: !!userId, 
        isNotSubmitting: !isSubmitting,
        alreadySubmitted: hasSubmittedRef.current,
        hasError: !!error
      });
      
      // Debug adicional para entender por qué no se ejecuta
      if (!userId) {
        console.error("❌ userId es null/undefined. Store state:", {
          userId,
          activeUser: activeUser ? {
            id: activeUser.id,
            documentNumber: activeUser.documentNumber,
            email: activeUser.email
          } : null
        });
      }
    }
  }, [submitted, userId, isSubmitting, handleSendOTP, activeUser, sessionUser, error]);

  useEffect(() => {
    const methods: string[] = [];
    if (activeUser) {
      const { email, phone, whatsapp } = activeUser;

      if (email?.trim()) methods.push("email");
      if (phone?.trim()) methods.push("sms");
      if (whatsapp?.trim()) methods.push("whatsapp");

      setSessionUser(activeUser);
      setMethodList([...new Set(methods)] as MethodType[]);
    }
  }, [activeUser]);



  const maskEmail = (email: string) => {
    const [name, domain] = email.split("@");

    if (name.length < 2) return email;

    const masked = name[0] + "*".repeat(name.length - 1);
    return `${masked}@${domain}`;
  };

  const maskPhone = (phone: string) => {
    if (phone.length <= 6) return phone;

    const start = phone.slice(0, 3);
    const end = phone.slice(-3);
    const masked = "*".repeat(phone.length - 6);

    return `${start}${masked}${end}`;
  };

  return (
    <div className="mb-4 w-full">
      <div id="method-title" className="border-b-2 border-gray-300 w-full">
        <h2 className="text-center p-4 font-normal text-lg text-gray-800">
          Validación de identidad
        </h2>
      </div>

      <h3 className="mt-5 mb-5 font-medium text-center w-full">
        Elige donde deseas recibir el código de verificación
      </h3>

      <div className="flex flex-col items-center justify-center gap-4 p-5">
        {methodList.map((method) => (
          <div
            key={method}
            className="border border-gray-300 p-2 w-full rounded-md flex gap-2"
          >
            <input
              type="radio"
              id={method}
              value={JSON.stringify({
                type: method,
                value:
                  method === "email"
                    ? maskEmail(sessionUser?.email || "")
                    : maskPhone(sessionUser?.phone || ""),
              })}
              {...methods.register("method", {
                required: "Debe seleccionar un método de verificación",
              })}
            />
            <div className="flex flex-col">
              <label htmlFor={method}>
                {method === "email"
                  ? "Correo electrónico"
                  : method === "sms"
                  ? "SMS"
                  : "WhatsApp"}
              </label>
              <span className="">
                {method === "email"
                  ? maskEmail(sessionUser?.email || "")
                  : method === "sms"
                  ? maskPhone(sessionUser?.phone || "")
                  : maskPhone(sessionUser?.whatsapp || "")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* {isSubmitting && (
        <div className="w-11/12 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <p className="text-sm text-blue-700">
            Estamos enviando el código de verificación. Por favor espera un momento...
          </p>
        </div>
      )} */}

      {error && (
        <div className="w-11/12 p-3 mx-auto bg-red-50 border border-red-200 rounded-lg text-center">
        <p className="text-sm text-red-700 mb-3">
          {error}
        </p>
      </div>
      )}

      <div
        id="buttons-login"
        className="w-full flex flex-col justify-center items-center gap-3"
      >
        <button
          className={`w-11/12 p-2 flex flex-col justify-center items-center mt-2 rounded-full transition-all duration-200 ${
            isSubmitting
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : isFormValid
              ? "text-md bg-[#3366cc] text-white hover:bg-[#3342cc] hover:cursor-pointer"
              : "bg-gray-300 text-gray-400 text-md cursor-not-allowed"
          }`}
          type="submit"
          disabled={isSubmitting || !isFormValid}
          onClick={() => {
            // Si hay un error, resetear el estado para permitir reintento
            if (error && submitted?.trim() && userId) {
              hasSubmittedRef.current = false;
              setError(null);
              handleSendOTP(userId.toString(), submitted);
            }
          }}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Solicitando código...
            </div>
          ) : error ? (
            "Reintentar envío"
          ) : (
            "Continuar"
          )}
        </button>
      </div>
    </div>
  );
};
