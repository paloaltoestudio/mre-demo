import { useState, useEffect } from "react";
import { DinamicNav } from "../scheduling/DinamicNav";
import { VisaApplicantForm } from "./VisaApplicantForm";
import { VisaProcessSelectionForm } from "./VisaProcessSelectionForm";
import { VisaPersonalDataForm } from "./VisaPersonalDataForm";
import { VisaAdditionalInformationForm } from "./VisaAdditionalInformationForm";
import LaborInformationForm from './LaborInformationForm';
import { VisaSoportesForm } from "./VisaSoportesForm";
import { VisaSummaryForm } from "./VisaSummaryForm";
import type { AdditionalInformationData } from '../../types/visa/additionalInformationTypes';
import type { SoportesData } from '../../types/visa/soportesTypes';
import { useVisaStore } from '../../stores/visaStore';

export const VisaWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [tipoDocumento, setTipoDocumento] = useState<string>("");
  
  // Obtener el estado del store para debugging
  const storeState = useVisaStore((state) => state);

  // Definir los pasos dinámicamente según el tipo de documento
  const steps = [
    "Datos del documento",
    "Datos de la solicitud",
    "Datos del solicitante",
    // Solo incluir el paso de menor si el usuario ya seleccionó tipo de documento y no es CC
    ...(tipoDocumento && tipoDocumento !== "CC" ? ["Datos del Registro Civil (En caso de Menor de Edad)"] : []),
    "Información Laboral",
    "Información Adicional",
    "Soportes",
    "Resumen de la Solicitud",
  ];

  // Sincronizar currentStep si el tipo de documento cambia y el paso de menor ya no debe mostrarse
  useEffect(() => {
    if (tipoDocumento === "CC" && currentStep > 3) {
      setCurrentStep(3); // Regresa al último paso válido
    }
  }, [tipoDocumento, currentStep]);

  // Monitorear cambios en el store para debugging
  useEffect(() => {
    console.log('Store actualizado en wizard:', storeState);
    console.log('Nacionalidad en wizard:', storeState.nacionalidad);
  }, [storeState]);

  const handleNext = (data: AdditionalInformationData | SoportesData | any) => {
    console.log('Next step data:', data);
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h2 className="mb-4 text-lg font-medium">Visa en Línea</h2>
      <DinamicNav currentStep={currentStep} steps={steps} />
      <div className="mt-8">
        {currentStep === 1 && (
          <VisaProcessSelectionForm
            onNext={(data: any) => {
              console.log('Datos recibidos del paso 1:', data);
              console.log('Nacionalidad recibida:', data?.nacionalidad);
              setCurrentStep(2);
            }}
            onBack={() => setCurrentStep(1)}
          />
        )}
        {currentStep === 2 && (
          <VisaApplicantForm
            onNext={(data: any) => {
              setTipoDocumento(data?.tipoDocumento || "");
              setCurrentStep(3);
            }}
            onBack={() => setCurrentStep(1)}
          />
        )}
        {currentStep === 3 && (
          <VisaPersonalDataForm
            onNext={(data: any) => {
              console.log(data);
              // Si el tipo de documento es CC, ir al paso de información adicional, sino ir al paso de menor
              if (tipoDocumento === "CC") {
                setCurrentStep(4);
              } else {
                setCurrentStep(4);
              }
            }}
            onBack={() => setCurrentStep(2)}
          />
        )}
        
        {currentStep === 4 && (
          <LaborInformationForm onNext={handleNext} onBack={handleBack} />
        )}
        
        {currentStep === 5 && (
          <>
            {console.log('Renderizando paso 5 - Información Adicional')}
            {console.log('Estado actual del store:', storeState)}
            {console.log('Nacionalidad en store del wizard:', storeState.nacionalidad)}
            <VisaAdditionalInformationForm 
              onNext={() => setCurrentStep(6)} 
              onBack={() => setCurrentStep(4)} 
            />
          </>
        )}
        
        {currentStep === 6 && (
          <>
            {console.log('Renderizando paso 6 - Soportes')}
            <VisaSoportesForm 
              onNext={() => setCurrentStep(7)} 
              onBack={() => setCurrentStep(5)} 
            />
          </>
        )}
        
        {currentStep === 7 && (
          <>
            {console.log('Renderizando paso 7 - Resumen de la Solicitud')}
            <VisaSummaryForm 
              onNext={() => {
                // Aquí se podría implementar la lógica para enviar la solicitud
                console.log('Solicitud registrada exitosamente');
                // Redirigir a una página de confirmación o dashboard
              }} 
              onBack={() => setCurrentStep(6)} 
              onEdit={(step: number) => setCurrentStep(step)}
              onExit={() => {
                // Aquí se podría implementar la lógica para salir del flujo
                console.log('Usuario salió del flujo de visa');
                // Redirigir al dashboard principal
              }}
            />
          </>
        )}
        
      </div>
    </div>
  );
}; 