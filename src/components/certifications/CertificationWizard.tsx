import { useState, useEffect } from "react";
import { DinamicNav } from "../scheduling/DinamicNav";
import { CertificationApplicantForm } from "./CertificationApplicantForm";
import { CertificationRequestForm } from "./CertificationRequestForm";
import { MinorDataForm } from "../passport/MinorDataForm";

export const CertificationWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [tipoDocumento, setTipoDocumento] = useState<string>("");

  // Definir los pasos dinámicamente según el tipo de documento
  const steps = [
    "Datos del solicitante",
    "Datos de la Solicitud",
    // Solo incluir el paso de menor si el usuario ya seleccionó tipo de documento y no es CC
    ...(tipoDocumento && tipoDocumento !== "CC" ? ["Datos del Registro Civil (En caso de Menor de Edad)"] : [])
  ];

  // Sincronizar currentStep si el tipo de documento cambia y el paso de menor ya no debe mostrarse
  useEffect(() => {
    if (tipoDocumento === "CC" && currentStep > 3) {
      setCurrentStep(3); // Regresa al último paso válido
    }
  }, [tipoDocumento, currentStep]);

  return (
    <div className="w-full max-w-5xl mx-auto mt-8">
      <h2 className="mb-4 text-lg font-semibold mt-8">Certificaciones en Línea</h2>
      <DinamicNav currentStep={currentStep} steps={steps} />
      <div className="mt-8">
        {currentStep === 1 && (
          <CertificationApplicantForm
            onNext={(data: any) => {
              setTipoDocumento(data?.tipoDocumento || "");
              setCurrentStep(2);
            }}
            onBack={() => setCurrentStep(1)}
          />
        )}
        {currentStep === 2 && (
          <CertificationRequestForm
            onNext={() => {
              // Si el tipo de documento es CC, saltar el paso de menor
              if (tipoDocumento === "CC") {
                // setCurrentStep(steps.length + 1); // Finalizar o avanzar fuera del flujo
                setCurrentStep(2);
              } else {
                setCurrentStep(2);
              }
            }}
            onBack={() => setCurrentStep(1)}
          />
        )}
        {/* Mostrar MinorDataForm solo si el tipo de documento NO es CC */}
        {currentStep === 3 && tipoDocumento !== "CC" && (
          <MinorDataForm
            onNext={() => setCurrentStep(steps.length + 1)}
            onBack={() => setCurrentStep(2)}
          />
        )}
      </div>
    </div>
  );
}; 