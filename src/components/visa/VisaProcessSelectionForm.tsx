import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import Swal from "sweetalert2";

type VisaProcessSelectionFormProps = {
  onNext: () => void;
  onBack: () => void;
};

export const VisaProcessSelectionForm = ({ onNext, onBack }: VisaProcessSelectionFormProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      tramitadaPor: "TÍTULO PROPIO",
      primerNombre: "Pedro",
      segundoNombre: "Andres",
      primerApellido: "Pérez",
      segundoApellido: "Casas",
      numeroPasaporte: "AA12345678",
      fechaExpedicionPasaporte: "",
      fechaVencimientoPasaporte: "",
      paisNacimiento: "",
      ciudadNacimiento: "",
      fechaNacimiento: "",
      genero: "",
      paisResidencia: "",
      ciudadResidencia: "",
      lugarResidencia: "",
      otraNacionalidad: "",
      autoridad: ""
    }
  });

  // Mostrar modal informativo al cargar el componente
  useEffect(() => {
    Swal.fire({
      icon: 'warning',
      title: '<span style="font-size: 1.5rem; font-weight: bold;">Requisitos de la solicitud</span>',
      html: `
        <div class="text-left">
          <p class="font-semibold mb-3">Instrucciones generales:</p>
          <ol class="list-decimal list-inside space-y-2 text-sm">
            <li>Lea con detenimiento y diligencie la información que se solicita sin errores tipográficos o de digitación. Cualquier imprecisión o equivocación en la información que suministre en este formulario, da lugar a la inadmisión de la solicitud sin reembolso de valores pagados.</li>
            <li>Debe disponer de al menos 30 minutos para realizar su solicitud en línea.</li>
            <li>Para iniciar este proceso de solicitud en línea debe disponer de una foto de 3x4cm, a color, con fondo blanco, reciente, de frente, sin accesorios, rostro despejado, en formato JPG de máximo 300 KB. Documentos individuales en formato PDF, legibles, se sugiere en blanco y negro. El peso máximo permitido para el total de documentos adjuntados a una solicitud es de 5MB.</li>
            <li>Consulte los medios de pago en http://www.cancilleria.gov.co/tramites_servicios/visa/costos-medios-pago-oficinas-atencion</li>
            <li>Si ya había realizado su solicitud en línea y tiene el número de solicitud, puede actualizar su información ingresando la información requerida. Si no recuerda su número de solicitud contacte a Centro de Atención al Ciudadano +57 (1) 3826999 - Número gratuito nacional: 01 8000 938 000.</li>
            <li>Tenga en cuenta que, no deberá acudir a la Oficina de Visas en Bogotá a menos que la Autoridad de Visas lo requiera a través de notificación enviada al correo electrónico registrado en el formulario. El trámite de solicitud de visa será atendido en línea.</li>
            <li>Revise la guía para el diligenciamiento del formulario de solicitud en línea en este link</li>
            <li>Una visa no garantiza el ingreso al territorio colombiano, sólo permite que un extranjero viaje a un puerto de entrada en Colombia y solicite permiso para ingresar al país de conformidad con la visa que le ha sido expedida.</li>
            <li>La lista de países o territorios no implica el reconocimiento del nombre o de la condición jurídica de cada uno de ellos.</li>
          </ol>
        </div>
      `,
      width: '80%',
      confirmButtonText: 'Aceptar para continuar',
      confirmButtonColor: '#2563eb',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCloseButton: false
    });
  }, []);

  const onSubmit = (data: any) => {
    console.log(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <section
        id="visa-process-selection-form"
        aria-label="visa-process-selection-form"
        className="w-full"
      >

        <h2 className="mb-4 text-md font-normal">Datos documento</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          {/* Número de pasaporte */}
          <div>
            <label className="block text-sm font-medium mb-1">Número de pasaporte <span className="text-red-500">*</span></label>
            <Controller
              name="numeroPasaporte"
              control={control}
              rules={{ required: "El número de pasaporte es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="text" className="input w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* País de nacimiento */}
          <div>
            <label className="block text-sm font-medium mb-1">País de nacimiento <span className="text-red-500">*</span></label>
            <Controller
              name="paisNacimiento"
              control={control}
              rules={{ required: "El país de nacimiento es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Peru">Perú</option>
                    <option value="Brasil">Brasil</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Chile">Chile</option>
                    <option value="Mexico">México</option>
                    <option value="Estados Unidos">Estados Unidos</option>
                    <option value="España">España</option>
                    <option value="Francia">Francia</option>
                    <option value="Alemania">Alemania</option>
                    <option value="Italia">Italia</option>
                    <option value="Reino Unido">Reino Unido</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Fecha de expedición pasaporte */}
          <div>
            <label className="block text-sm font-medium mb-1">Fecha de expedición pasaporte <span className="text-red-500">*</span></label>
            <Controller
              name="fechaExpedicionPasaporte"
              control={control}
              rules={{ required: "La fecha de expedición es obligatoria" }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="date" placeholder="dd/mm/yyyy" className="input w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Fecha de vencimiento del pasaporte */}
          <div>
            <label className="block text-sm font-medium mb-1">Fecha de vencimiento del pasaporte <span className="text-red-500">*</span></label>
            <Controller
              name="fechaVencimientoPasaporte"
              control={control}
              rules={{ required: "La fecha de vencimiento es obligatoria" }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="date" placeholder="dd/mm/yyyy" className="input w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

           {/* Autoridad */}
           <div>
            <label className="block text-sm font-medium mb-1">Autoridad</label>
            <Controller
              name="autoridad"
              control={control}
              render={({ field }) => (
                <>
                  <input {...field} type="text" className="input w-full" />
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