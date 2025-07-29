import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import { ApplicantsResidentialForm } from "./ApplicantsResidentialForm";
import { ApplicantsDataForm } from "./ApplicantsDataForm";
import { ApplicationDataForm } from "./ApplicationDataForm";
import { MinorDataForm } from "./MinorDataForm";
import { DinamicNav } from "../scheduling/DinamicNav";
import PassportDataForm from "./PassportDataForm";

export const PassportWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [tipoDocumento, setTipoDocumento] = useState<string>("");

  // Definir los pasos dinámicamente según el tipo de documento
  const steps = [
    "Datos de la Solicitud",
    "Datos del Solicitante",
    "Datos de Residencia y Contacto",
    "Datos del Pasaporte",
    // Solo mostrar el paso si el usuario ya seleccionó tipo de documento y no es CC
    ...(tipoDocumento && tipoDocumento !== "CC" ? ["Datos del Registro Civil"] : [])
  ];

  // Sincronizar currentStep si el tipo de documento cambia y el paso de menor ya no debe mostrarse
  useEffect(() => {
    if (tipoDocumento === "CC" && currentStep > 4) {
      setCurrentStep(4); // Regresa al último paso válido
    }
  }, [tipoDocumento, currentStep]);

  // Función para mostrar el modal de confirmación
  const showFinalConfirmation = async (onContinue: () => void) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: '<span style="font-size: 1.5rem; font-weight: bold;">Señor Solicitante</span>',
      html: `<div style="text-align: center; margin-top: 1rem;">
        <p style="font-size:1.2em; font-weight: 500;">Se le advierte que su pasaporte será <b>CANCELADO</b> por estos motivos al finalizar la solicitud si el trámite es 100% en línea.</p>
        <p style="margin-top: 1.5em; font-size:1.1em;">Esta seguro que desea continuar?</p>
      </div>`,
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Regresar',
      customClass: {
        popup: 'swal2-border-radius',
        confirmButton: 'swal2-confirm-custom',
        cancelButton: 'swal2-cancel-custom',
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      width: '700px',
    });
    if (result.isConfirmed) {
      onContinue();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8">
      <h2 className="mb-4 text-lg font-semibold mt-8">Pasaporte en Línea</h2>
      <DinamicNav currentStep={currentStep} steps={steps} />
      <div className="mt-8">
        {currentStep === 1 && (
          <ApplicationDataForm onNext={() => setCurrentStep(2)} onBack={() => setCurrentStep(1)} />
        )}
        {currentStep === 2 && (
          <ApplicantsDataForm
            onNext={(data: any) => {
              setTipoDocumento(data?.tipoDocumento || "");
              setCurrentStep(3);
            }}
            onBack={() => setCurrentStep(1)}
          />
        )}
        {currentStep === 3 && (
          <ApplicantsResidentialForm onNext={() => setCurrentStep(4)} onBack={() => setCurrentStep(2)} />
        )}
        {currentStep === 4 && (
          <PassportDataForm
            onNext={() => {
              // Si el tipo de documento es CC, mostrar confirmación antes de finalizar
              if (tipoDocumento === "CC") {
                showFinalConfirmation(() => setCurrentStep(steps.length + 1));
              } else {
                setCurrentStep(5);
              }
            }}
            onBack={() => setCurrentStep(3)}
          />
        )}
        {/* Mostrar MinorDataForm solo si el tipo de documento NO es CC */}
        {currentStep === 5 && tipoDocumento !== "CC" && (
          <MinorDataForm
            onNext={() => {
              showFinalConfirmation(() => setCurrentStep(steps.length + 1));
            }}
            onBack={() => setCurrentStep(4)}
          />
        )}
      </div>
    </div>
  );
}; 