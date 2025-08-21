import { useState, useEffect } from "react";
import { DinamicNav } from "../scheduling/DinamicNav";
import { CertificationApplicantForm } from "./CertificationApplicantForm";
import { CertificationRequestForm } from "./CertificationRequestForm";
import { MinorDataForm } from "../passport/MinorDataForm";
import LiquidationStep from './LiquidationStep';
import { useCertificationStore } from "../../stores/certificationStore";
import { SessionStore } from "../../stores/sessionStore";
import { useNavigate } from "react-router-dom";

export const CertificationWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [tipoDocumento, setTipoDocumento] = useState<string>("");
  const { getAllData } = useCertificationStore();
  const { userId } = SessionStore();

  // Definir los pasos dinámicamente según el tipo de documento
  const steps = [
    "Datos del solicitante",
    "Datos de la Solicitud",
    // Solo incluir el paso de menor si el usuario ya seleccionó tipo de documento y no es CC
    ...(tipoDocumento && tipoDocumento !== "CC" ? ["Datos del Registro Civil (En caso de Menor de Edad)"] : []),
    "Liquidación"
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
              // Si el tipo de documento es CC, ir directamente a liquidación (paso 3)
              // Si no es CC, ir al paso de menor (paso 3), y luego liquidación será paso 4
              if (tipoDocumento === "CC") {
                setCurrentStep(3); // Liquidación
              } else {
                setCurrentStep(3); // Datos del menor
              }
            }}
            onBack={() => setCurrentStep(1)}
          />
        )}
        {/* Mostrar MinorDataForm solo si el tipo de documento NO es CC */}
        {currentStep === 3 && tipoDocumento !== "CC" && (
          <MinorDataForm
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        )}
        {/* Paso de liquidación - el último paso */}
        {currentStep === (tipoDocumento === "CC" ? 3 : 4) && (
          <LiquidationStep
            onNext={() => {
              console.log('Certificación completada exitosamente');
            // Redirigir al home (/home) 
            navigate("/home");
            }}
            onBack={() => setCurrentStep(tipoDocumento === "CC" ? 2 : 3)}
          />
        )}
      </div>
    </div>
  );
}; 