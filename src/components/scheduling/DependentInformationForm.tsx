import { DependentsCard } from "./DependentsCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useFormContext } from "react-hook-form";
import { CancelBtn } from "./CancelBtn";
import { useEditAppointment } from "../../hooks/useEditAppointment";
import { useBookingTimerStore } from "../../stores/bookingTimerStore";
import type { DependentData } from "../../types/dashboard/editAppointmentTypes";

type DependentInformationFormProps = {
  setView: (step: number) => void;
};

export const DependentInformationForm = ({
  setView,
}: DependentInformationFormProps) => {
  const { watch } = useFormContext();
  const countDependents = watch("dependientesCount") || 0;
  const { mutateAsync: editAppointment, isPending } = useEditAppointment();
  const { preAppointmentId } = useBookingTimerStore();

  const handleContinue = async () => {
    if (!preAppointmentId) {
      console.error("No hay preAppointmentId disponible");
      return;
    }

    try {
      // Recopilar datos de dependientes del formulario
      const dependentsData: DependentData[] = [];
      
      for (let i = 0; i < countDependents; i++) {
        const relationshipType = watch(`parent-${i}`);
        const documentType = watch(`type-document-${i}`);
        const documentNumber = watch(`document-number-dependent-${i}`);
        const firstNames = watch(`names-${i}`);
        const lastNames = watch(`last-names-${i}`);

        if (relationshipType && documentType && documentNumber && firstNames && lastNames) {
          dependentsData.push({
            relationshipTypeId: relationshipType.id,
            documentTypeId: documentType,
            documentNumber: documentNumber.toString(),
            firstNames,
            lastNames,
          });
        }
      }

      // Editar la cita con los datos de dependientes
      await editAppointment({
        appointmentId: preAppointmentId,
        dependents: dependentsData,
      });

      // Si la edición es exitosa, continuar al siguiente paso
      setView(5);
    } catch (error) {
      console.error("Error al editar la cita con dependientes:", error);
      // El error ya se maneja en el hook useEditAppointment
    }
  };

  return (
    <section
      id="select-dependent-form"
      aria-label="select-dependent-form"
      className="w-full"
    >
      <h2 className="mb-4 text-lg font-semibold">
        Ingresa los datos de tus dependientes
      </h2>

      <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-start h-auto gap-10">
        {Array.from({ length: parseInt(countDependents) }).map((_, index) => (
          <DependentsCard key={index} aggregate={index} />
        ))}
      </div>

      <div className="w-full flex gap-5 items-end justify-end mt-10 mb-10">
        <CancelBtn />

        <button
          type="button"
          onClick={() => {
            setView(3);
          }}
          className="text-[#3466cc] border-2 border-[#3466cc] hover:text-white hover:border-[#e9e9e9] font-medium py-2 px-4 rounded-full hover:cursor-pointer hover:bg-[#d1d1d1] duration-150"
        >
          Regresar
        </button>
        <button
          type="button"
          onClick={handleContinue}
          disabled={isPending}
          className="bg-[#3466cc] border-[#3466cc] border-2 text-white font-medium py-2 px-4 rounded-full hover:cursor-pointer hover:bg-[#3467cce8] duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Guardando..." : "Continuar"}
          <span className="ml-2">
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </button>
      </div>
    </section>
  );
};
