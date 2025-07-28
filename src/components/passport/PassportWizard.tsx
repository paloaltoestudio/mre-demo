import { useState } from "react";
import { ApplicantsResidentialForm } from "./ApplicantsResidentialForm";
import { ApplicantsDataForm } from "./ApplicantsDataForm";
import { ApplicationDataForm } from "./ApplicationDataForm";
import { MinorDataForm } from "./MinorDataForm";
import { DinamicNav } from "../scheduling/DinamicNav";
import PassportDataForm from "./PassportDataForm";

const steps = [
  "Datos de la Solicitud",
  "Datos del Solicitante",
  "Datos de Residencia y Contacto",
  "Datos del Pasaporte",
  "Datos del Registro Civil"
];

export const PassportWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="w-full max-w-5xl mx-auto mt-8">
      <h2 className="mb-4 text-lg font-semibold mt-8">Pasaporte en Línea</h2>
      <DinamicNav currentStep={currentStep} steps={steps} />
      <div className="mt-8">
        {currentStep === 1 && (
          <ApplicationDataForm onNext={() => setCurrentStep(2)} onBack={() => setCurrentStep(1)} />
        )}
        {currentStep === 2 && (
          <ApplicantsDataForm onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} />
        )}
        {currentStep === 3 && (
          <ApplicantsResidentialForm onNext={() => setCurrentStep(4)} onBack={() => setCurrentStep(2)} />
        )}
        {currentStep === 4 && (
          <PassportDataForm onNext={() => setCurrentStep(5)} onBack={() => setCurrentStep(3)} />
        )}
        
        {currentStep === 5 && <MinorDataForm onNext={() => setCurrentStep(6)} onBack={() => setCurrentStep(4)} />}
       
      </div>
    </div>
  );
}; 