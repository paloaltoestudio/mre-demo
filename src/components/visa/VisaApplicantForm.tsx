import { useForm, Controller } from "react-hook-form";

type VisaApplicantFormProps = {
  onNext: (data: any) => void;
  onBack: () => void;
};

export const VisaApplicantForm = ({ onNext, onBack }: VisaApplicantFormProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      numeroRegistroSolicitud: "",
      numeroPasaporte: "AA12345678",
      nacionalidad: "ECUATORIANA",
      solicitudDe: "VISA",
      categoriaVisa: "TRABAJADOR",
      claseVisa: "VISITANTE",
      tipoSolicitud: "INDIVIDUAL",
      tipoSolicitante: "TITULAR PRINCIPAL",
      tramitadaPor: "DIRECTAMENTE POR EXTRANJERO"
    }
  });

  const onSubmit = (data: any) => {
    console.log(data);
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <section
        id="visa-applicant-form"
        aria-label="visa-applicant-form"
        className="w-full"
      >
        

        {/* Solicitud */}
        <h3 className="mb-4 text-md font-normal">Solicitud</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Número de Pasaporte */}
          <div>
            <label className="block text-sm font-medium mb-1">Número de Pasaporte <span className="text-red-500">*</span></label>
            <Controller
              name="numeroPasaporte"
              control={control}
              disabled
              render={({ field }) => (
                <>
                  <input {...field} type="text" className="input w-full bg-gray-100 text-gray-500 cursor-not-allowed" />
                </>
              )}
            />
          </div>

          {/* Nacionalidad */}
          <div>
            <label className="block text-sm font-medium mb-1">Nacionalidad <span className="text-red-500">*</span></label>
            <Controller
              name="nacionalidad"
              control={control}
              disabled
              render={({ field }) => (
                <>
                  <input {...field} type="text" className="input w-full bg-gray-100 text-gray-500 cursor-not-allowed" />
                </>
              )}
            />
          </div>
        </div>

        {/* Nota informativa */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <div className="text-blue-600 text-xl">⚠️</div>
            <div className="text-sm text-blue-800">
              <strong>NOTA:</strong> si no conoce el tipo de visa o traspaso que requiere para ingresar a Colombia, por favor revise los{" "}
              <a href="#" className="text-blue-600 underline hover:text-blue-800">
                tipos de visa colombiana
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Solicitud de */}
          <div>
            <label className="block text-sm font-medium mb-1">Solicitud de <span className="text-red-500">*</span></label>
            <Controller
              name="solicitudDe"
              control={control}
              rules={{ required: "El tipo de solicitud es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="VISA">VISA</option>
                    <option value="TRASPASO">TRASPASO</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>
          
          {/* Clase de Visa */}
          <div>
            <label className="block text-sm font-medium mb-1">Clase de Visa <span className="text-red-500">*</span></label>
            <Controller
              name="claseVisa"
              control={control}
              rules={{ required: "La clase de visa es obligatoria" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="MIGRANTE">MIGRANTE</option>
                    <option value="RESIDENTE">RESIDENTE</option>
                    <option value="RESIDENTE ESPECIAL DE PAZ">RESIDENTE ESPECIAL DE PAZ</option>
                    <option value="VISITANTE">VISITANTE</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Categoría de la visa */}
          <div>
            <label className="block text-sm font-medium mb-1">Categoría de la visa <span className="text-red-500">*</span></label>
            <Controller
              name="categoriaVisa"
              control={control}
              rules={{ required: "La categoría de la visa es obligatoria" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                  <option value="Asistencia tecnica">Asistencia tecnica</option>
                  <option value="Caso no previstos">Caso no previstos</option>
                  <option value="Corresponsal permanente">Corresponsal permanente</option>
                  <option value="Cortesia">Cortesia</option>
                  <option value="Cubrimiento periodistico">Cubrimiento periodistico</option>
                  <option value="Emperesarios TLC">Emperesarios TLC</option>
                  <option value="Estudiante">Estudiante</option>
                  <option value="Estudiante/ voluntario religioso">Estudiante/ voluntario religioso</option>
                  <option value="Eventos">Eventos</option>
                  <option value="Fomento a la internacionalizacion">Fomento a la internacionalizacion</option>
                  <option value="Negocios">Negocios</option>
                  <option value="Nomada Digital">Nomada Digital</option>
                  <option value="Oficiales no acreditados">Oficiales no acreditados</option>
                  <option value="Prestado de servicios- obra o labor">Prestado de servicios- obra o labor</option>
                  <option value="Producciones cinematográficas o documentales de gran formato">Producciones cinematográficas o documentales de gran formato</option>
                  <option value="Práctica laboral">Práctica laboral</option>
                  <option value="Religioso">Religioso</option>
                  <option value="Rentista">Rentista</option>
                  <option value="Trabajados agricola de temporada">Trabajados agricola de temporada</option>
                  <option value="Tramistes administrativos y/o judiciales">Tramistes administrativos y/o judiciales</option>
                  <option value="Transito aeroportuario">Transito aeroportuario</option>
                  <option value="Tratamiento medico">Tratamiento medico</option>
                  <option value="Tripulante">Tripulante</option>
                  <option value="Turismo">Turismo</option>
                  <option value="Vacaciones y  trabajo">Vacaciones y  trabajo</option>
                  <option value="Visitante especial">Visitante especial</option>
                  <option value="Voluntarios coiperantes">Voluntarios coiperantes</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>


          {/* Tipo de Solicitud */}
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de Solicitud <span className="text-red-500">*</span></label>
            <Controller
              name="tipoSolicitud"
              control={control}
              rules={{ required: "El tipo de solicitud es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccione una opción</option>
                    <option value="Individual">Individual</option>
                    <option value="Grupo familiar">Grupo familiar</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Tipo de Solicitante */}
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de Solicitante <span className="text-red-500">*</span></label>
            <Controller
              name="tipoSolicitante"
              control={control}
              rules={{ required: "El tipo de solicitante es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="TITULAR PRINCIPAL">TITULAR PRINCIPAL</option>
                    <option value="TITULAR PRINCIPAL">TITULAR BENEFICIARIO</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Tramitada por */}
          <div>
            <label className="block text-sm font-medium mb-1">Tramitada por <span className="text-red-500">*</span></label>
            <Controller
              name="tramitadaPor"
              control={control}
              rules={{ required: "El campo tramitada por es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="DIRECTAMENTE POR EXTRANJERO">DIRECTAMENTE POR EXTRANJERO</option>
                    <option value="Apoderado">Apoderado</option>
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