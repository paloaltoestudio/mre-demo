import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { CreateTraceabilityLogRequest, TraceabilityLogResponse, TraceabilityEvent } from "../types/traceability/traceabilityTypes";
import { axiosInstance } from "../configs/axios";
import { SessionStore } from "../stores/sessionStore";

const createTraceabilityLog = async (data: CreateTraceabilityLogRequest): Promise<TraceabilityLogResponse> => {
  const response = await axiosInstance.post("/Traceability/CreateTraceabilityLog", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const useTraceabilityLog = () => {
  const { userId } = SessionStore();

  const { mutateAsync: logEvent, isPending } = useMutation({
    mutationFn: createTraceabilityLog,
    onError: (error: any) => {
      console.error("Error al registrar log de trazabilidad:", error);
      // No mostramos toast de error para no molestar al usuario
    },
  });

  const logTraceabilityEvent = async (event: TraceabilityEvent) => {
    try {
      const userIp = await getUserIP();
      
      const logData: CreateTraceabilityLogRequest = {
        procedure: event.procedure,
        user: userId?.toString() || "anonymous",
        timestamp: new Date().toISOString(),
        modifiedFields: event.modifiedFields ? JSON.stringify(event.modifiedFields) : "",
        procedureStatus: event.procedureStatus,
        observations: event.observations || "",
        ip: userIp,
      };

      await logEvent(logData);
    } catch (error) {
      console.error("Error al registrar evento de trazabilidad:", error);
    }
  };

  return {
    logTraceabilityEvent,
    isPending,
  };
};

// Función para obtener la IP del usuario
const getUserIP = async (): Promise<string> => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Error al obtener IP:", error);
    return "unknown";
  }
}; 