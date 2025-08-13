import { useState, useEffect } from "react";
import { DinamicNav } from "../scheduling/DinamicNav";
import { CertificationApplicantForm } from "./CertificationApplicantForm";
import { CertificationRequestForm } from "./CertificationRequestForm";
import { MinorDataForm } from "../passport/MinorDataForm";
import LiquidationStep from './LiquidationStep';

const Liquidacion = () => (
  <div>
    <h2>Liquidar trámite</h2>
    <div>
      <h3>Información de solicitud</h3>
      <p>Num.solicitud: 67535467</p>
      <p>Trámite: Certificaciones/Certificación</p>
      <p>Oficina: C. México</p>
      <p>Estado del trámite: En liquidación</p>
    </div>
    <div>
      <h3>Liquidación de pago</h3>
      <p>Nombres y apellidos: Mariano Ramirez López</p>
      <p>Nacionalidad: Colombia</p>
      <p>Tipo de documento: Cédula de ciudadanía</p>
      <p>Fecha de liquidación: dd/mm/yyyy hh:mm AM/PM</p>
      <p>Número de documento: 093638293</p>
      <table>
        <thead>
          <tr>
            <th>Concepto de Recaudo</th>
            <th>Moneda Reporte (USD)</th>
            <th>Moneda Local (USD)</th>
            <th>Seleccionar concepto</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tipo concepto</td>
            <td>$0</td>
            <td>$0</td>
            <td><input type="text" /></td>
          </tr>
          <tr>
            <td>Otros conceptos agregados</td>
            <td>$0</td>
            <td>$0</td>
            <td><input type="text" /></td>
          </tr>
        </tbody>
      </table>
      <p>Total a pagar: $0000.00</p>
    </div>
    <div>
      <h3>Descuento</h3>
      <p>¿Desea aplicar descuento?</p>
      <label><input type="radio" name="descuento" value="si" /> Sí</label>
      <label><input type="radio" name="descuento" value="no" /> No</label>
      <p>Para aplicar debe tener la documentación requerida según la normativa.</p>
    </div>
    <div>
      <button>Regresar</button>
      <button>Siguiente</button>
    </div>
  </div>
);

export const CertificationWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [tipoDocumento, setTipoDocumento] = useState<string>("");

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
              // Si el tipo de documento es CC, saltar el paso de menor
              if (tipoDocumento === "CC") {
                // setCurrentStep(steps.length + 1); // Finalizar o avanzar fuera del flujo
                setCurrentStep(3);
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
        {currentStep === steps.length && (
          <LiquidationStep
            onNext={() => setCurrentStep(steps.length + 1)}
            onBack={() => setCurrentStep(steps.length - 1)}
          />
        )}
      </div>
    </div>
  );
}; 