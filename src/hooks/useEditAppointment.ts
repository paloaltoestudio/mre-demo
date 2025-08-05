import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { EditAppointmentRequest, EditAppointmentResponse } from "../types/dashboard/editAppointmentTypes";
import { axiosInstance } from "../configs/axios";

const editAppointment = async (data: EditAppointmentRequest): Promise<EditAppointmentResponse> => {
  const response = await axiosInstance.put("/Appointment/edit-appointment", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const useEditAppointment = () => {
  return useMutation({
    mutationFn: editAppointment,
    onSuccess: (data: EditAppointmentResponse) => {
      console.log("Cita editada exitosamente:", data);
      toast.success("Cita editada correctamente", {
        autoClose: 3000,
        draggable: true,
        progress: undefined,
        hideProgressBar: true,
        className: "border-l-5 border-green-500 bg-white text-black shadow-md",
      });
    },
    onError: (error: any) => {
      console.error("Error al editar la cita:", error);
      const errorMessage = error.response?.data?.message || "Error al editar la cita";
      toast.error(errorMessage, {
        autoClose: 3000,
        draggable: true,
        progress: undefined,
        hideProgressBar: true,
        className: "border-l-5 border-red-500 bg-white text-black shadow-md",
      });
    },
  });
}; 