import { useState } from "react";
import { PassportRegisterForm } from "./PassportRegisterForm";
import { ApplicantsDataForm } from "./ApplicantsDataForm";
import { ApplicationDataForm } from "./ApplicationDataForm";
import { MinorDataForm } from "./MinorDataForm";
import { DinamicNav } from "../scheduling/DinamicNav";

const steps = [
  "Datos de Registro",
  "Datos del Solicitante",
  "Datos de la Solicitud",
  "Datos del Registro Civil"
];

export const PassportWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="w-full max-w-5xl mx-auto mt-8">
      <DinamicNav currentStep={currentStep} steps={steps} />
      <div className="mt-8">
        {currentStep === 1 && (
          <PassportRegisterForm onNext={() => setCurrentStep(2)} />
        )}
        {currentStep === 2 && (
          <ApplicantsDataForm onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} />
        )}
        {currentStep === 3 && (
          <ApplicationDataForm onNext={() => setCurrentStep(4)} onBack={() => setCurrentStep(2)} />
        )}
        {currentStep === 4 && <MinorDataForm onNext={() => setCurrentStep(5)} onBack={() => setCurrentStep(3)} />}
       
      </div>
    </div>
  );
}; 