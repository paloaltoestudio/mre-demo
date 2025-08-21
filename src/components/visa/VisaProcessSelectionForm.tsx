import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useVisaStore } from "../../stores/visaStore";

type VisaProcessSelectionFormProps = {
  onNext: (data: any) => void;
  onBack: () => void;
};

export const VisaProcessSelectionForm = ({ onNext, onBack }: VisaProcessSelectionFormProps) => {
  // Mover todos los hooks al nivel superior del componente
  const setNumeroPasaporte = useVisaStore((state) => state.setNumeroPasaporte);
  const setNacionalidad = useVisaStore((state) => state.setNacionalidad);
  
  const { control, handleSubmit } = useForm({
    defaultValues: {
      tramitadaPor: useVisaStore((state) => state.tramitadaPor) || "TÍTULO PROPIO",
      primerNombre: useVisaStore((state) => state.primerNombre) || "Pedro",
      segundoNombre: useVisaStore((state) => state.segundoNombre) || "Andres",
      primerApellido: useVisaStore((state) => state.primerApellido) || "Pérez",
      segundoApellido: useVisaStore((state) => state.segundoApellido) || "Casas",
      numeroPasaporte: useVisaStore((state) => state.numeroPasaporte) || "AA12345678",
      fechaExpedicionPasaporte: useVisaStore((state) => state.fechaExpedicionPasaporte) || "",
      fechaVencimientoPasaporte: useVisaStore((state) => state.fechaVencimientoPasaporte) || "",
      nacionalidad: useVisaStore((state) => state.nacionalidad) || "",
      ciudadNacimiento: useVisaStore((state) => state.ciudadNacimiento) || "",
      fechaNacimiento: useVisaStore((state) => state.fechaNacimiento) || "",
      genero: useVisaStore((state) => state.genero) || "",
      paisResidencia: useVisaStore((state) => state.paisResidencia) || "",
      ciudadResidencia: useVisaStore((state) => state.ciudadResidencia) || "",
      lugarResidencia: useVisaStore((state) => state.lugarResidencia) || "",
      otraNacionalidad: useVisaStore((state) => state.otraNacionalidad) || "",
      autoridad: useVisaStore((state) => state.autoridad) || ""
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
    console.log('Datos del formulario:', data);
    
    // Guardar en el store usando los setters disponibles
    setNumeroPasaporte(data.numeroPasaporte);
    setNacionalidad(data.nacionalidad);
    
    // Para los campos que no tienen setters específicos, usar setState
    useVisaStore.setState({
      fechaExpedicionPasaporte: data.fechaExpedicionPasaporte,
      fechaVencimientoPasaporte: data.fechaVencimientoPasaporte,
      autoridad: data.autoridad
    });
    
    console.log('Nacionalidad guardada en store:', data.nacionalidad);
    
    // Verificar que se guardó correctamente
    const storeState = useVisaStore.getState();
    console.log('Estado del store después de guardar:', storeState);
    console.log('Nacionalidad en store después de guardar:', storeState.nacionalidad);
    
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <section
        id="visa-process-selection-form"
        aria-label="visa-process-selection-form"
        className="w-full"
      >
        

        <h2 className="mb-4 text-md font-bold">Datos documento</h2>

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
            <label className="block text-sm font-medium mb-1">Nacionalidad <span className="text-red-500">*</span></label>
            <Controller
              name="nacionalidad"
              control={control}
              rules={{ required: "La nacionalidad es obligatoria" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="Venezolano">Venezolano</option>
                    <option value="Ecuatoriano">Ecuatoriano</option>
                    <option value="Peruano">Peruano</option>
                    <option value="Brasileño">Brasileño</option>
                    <option value="Argentino">Argentino</option>
                    <option value="Chileno">Chileno</option>
                    <option value="Mexicano">Mexicano</option>
                    <option value="Estadounidense">Estadounidense</option>
                    <option value="Español">Español</option>
                    <option value="Francés">Francés</option>
                    <option value="Alemán">Alemán</option>
                    <option value="Italiano">Italiano</option>
                    <option value="Británico">Británico</option>
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