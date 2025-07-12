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
      window.location.href = "https://www.iaidentity.com/FrontCancilleria/security/login";
    }
  }, [searchParams]);

  const { mutateAsync: MutateHash } = useMutation({
    mutationFn: postPublicRequest<ResponseHashType>,
    onSuccess: (data: ResponseHashType) => {
      console.log("token hash", data);
      setToken(data);
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
      // En caso de error, redirigir a la app externa
      setTimeout(() => {
        window.location.href = "https://www.iaidentity.com/FrontCancilleria/security/login";
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
      // En caso de error, redirigir a la app externa
      setTimeout(() => {
        window.location.href = "https://www.iaidentity.com/FrontCancilleria/security/login";
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
      await MutateToken({
        url: "/User/external",
        schema: CreateTokenSchema,
        body: { externalId: token?.externalId! },
      });
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