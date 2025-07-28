import { useForm, Controller } from "react-hook-form";
import Swal from 'sweetalert2';
import { useEffect } from 'react';

type ApplicationDataFormProps = {
  onNext: () => void;
  onBack: () => void;
};

export const ApplicationDataForm = ({ onNext, onBack }: ApplicationDataFormProps) => {
  const { control, handleSubmit, formState: {  }, watch } = useForm();

  useEffect(() => {
    Swal.fire({
      icon: 'warning',
      width: '1000px',
      title: '<span style="font-size: 1.5rem; font-weight: bold;">Señor Solicitante</span>',
      html: `
        <div style="text-align: left; margin-top: 1rem;">
          <p style="font-weight: 500;">Antes de formalizar tenga en cuenta lo siguiente:</p><br>
          <ul style="margin-left: 1.2em; margin-bottom: 1em;">
            <li>En la Captura Doc. ID debe escanear el registro civil para menores de edad y la cédula o contraseña para mayores de edad, según sea el caso.</li>
            <li>En la captura de soportes: Para menores de edad escanea la cédula de alguno o ambos padres y la tarjeta de identidad, de ser necesario.</li>
            <li>Para mayores de edad no es obligatorio escanear otros documentos soporte fuera de la cédula colombiana vigente, pero puede hacerlo si lo requiere. Si el trámite se hace con contraseña debe adjuntar los soportes establecidos en la Resolución de Requisitos.</li>
          </ul>
          <p>Para mayor información: <a href="https://www.cancilleria.gov.co/tramites_servicios/pasaportes/requisitos" target="_blank" rel="noopener noreferrer">https://www.cancilleria.gov.co/tramites_servicios/pasaportes/requisitos</a></p>
        </div>
      `,
      confirmButtonText: 'Continuar',
      customClass: {
        popup: 'swal2-border-radius',
        confirmButton: 'swal2-confirm-custom',
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  }, []);

  const onSubmit = (data: any) => {
    console.log(data);
    onNext();
  };

  // Watch passport status to conditionally show fields
  const hasPassport = watch("hasPassport");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <section
        id="application-data-form"
        aria-label="application-data-form"
        className="w-full"
      >
        <h2 className="mb-4 text-lg font-semibold">Datos de la solicitud</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Procedure type */}
          <div>
            <label className="block text-sm font-medium mb-1">Trámite <span className="text-red-500">*</span></label>
            <Controller
              name="procedure"
              control={control}
              rules={{ required: "El trámite es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="ordinario">Pasaporte Ordinario</option>
                    <option value="ejecutivo">Pasaporte Ejecutivo</option>
                    <option value="fronterizo">Pasaporte Fronterizos</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Service office */}
          <div>
            <label className="block text-sm font-medium mb-1">Oficina de atención <span className="text-red-500">*</span></label>
            <Controller
              name="serviceOffice"
              control={control}
              rules={{ required: "La oficina de atención es obligatoria" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="1">Consulado General BOG 01</option>
                    <option value="2">Consulado General BOG 02</option>
                    <option value="3">Consulado General BOG 03</option>
                    <option value="4">Consulado General BOG 04</option>
                    <option value="5">Consulado General BOG 05</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>
        </div>

        <div className="flex gap-5 justify-end mt-8">
          <button
            type="button"
            onClick={onBack}
            className="text-[#3466cc] border-2 border-[#3466cc] hover:text-white hover:border-[#e9e9e9] font-medium py-2 px-4 rounded-full hover:cursor-pointer hover:bg-[#d1d1d1] duration-150"
          >
            Regresar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-full px-6 py-2 hover:bg-blue-700"
          >
            Siguiente
          </button>
        </div>
      </section>
    </form>
  );
};

export default ApplicationDataForm; 