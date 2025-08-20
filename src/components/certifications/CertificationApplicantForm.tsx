import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useCertificationStore } from "../../stores/certificationStore";

type CertificationApplicantFormProps = {
  onNext: (data: any) => void;
  onBack: () => void;
};

export const CertificationApplicantForm = ({ onNext, onBack }: CertificationApplicantFormProps) => {
  const {
    certificateType,
    tipoDocumento,
    numeroDocumento,
    nacionalidad,
    lugarExpedicionDocumento,
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    fechaNacimiento,
    genero,
    estadoCivil,
    direccion,
    ciudad,
    departamento,
    pais,
    telefono,
    email,
    particula,
    autorizacionTercero,
    hasPassport,
    numeroPasaporte,
    fechaExpedicionPasaporte,
    fechaVencimientoPasaporte,
    autoridadPasaporte,
    pasaporte,
    fechaExpedicion,
    setCertificateType,
    setTipoDocumento,
    setNumeroDocumento,
    setNacionalidad,
    setLugarExpedicionDocumento,
    setPrimerNombre,
    setSegundoNombre,
    setPrimerApellido,
    setSegundoApellido,
    setFechaNacimiento,
    setGenero,
    setEstadoCivil,
    setDireccion,
    setCiudad,
    setDepartamento,
    setPais,
    setTelefono,
    setEmail,
    setParticula,
    setAutorizacionTercero,
    setHasPassport,
    setNumeroPasaporte,
    setFechaExpedicionPasaporte,
    setFechaVencimientoPasaporte,
    setAutoridadPasaporte,
    setPasaporte,
    setFechaExpedicion,
  } = useCertificationStore();

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      certificateType,
      tipoDocumento,
      numeroDocumento,
      nacionalidad,
      lugarExpedicionDocumento,
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      fechaNacimiento,
      genero,
      estadoCivil,
      direccion,
      ciudad,
      departamento,
      pais,
      telefono,
      email,
      hasPassport,
      numeroPasaporte,
      fechaExpedicionPasaporte,
      fechaVencimientoPasaporte,
      autoridadPasaporte,
      particula,
      autorizacionTercero,
      pasaporte,
      fechaExpedicion,
    }
  });
  const [showPassportVisualization, setShowPassportVisualization] = useState(false);

  const onSubmit = (data: any) => {
    console.log('Datos del formulario:', data);
    
    // Guardar todos los datos en el store
    setCertificateType(data.certificateType);
    setTipoDocumento(data.tipoDocumento);
    setNumeroDocumento(data.numeroDocumento);
    setNacionalidad(data.nacionalidad);
    setLugarExpedicionDocumento(data.lugarExpedicionDocumento);
    setPrimerNombre(data.primerNombre);
    setSegundoNombre(data.segundoNombre);
    setPrimerApellido(data.primerApellido);
    setSegundoApellido(data.segundoApellido);
    setFechaNacimiento(data.fechaNacimiento);
    setGenero(data.genero);
    setEstadoCivil(data.estadoCivil);
    setDireccion(data.direccion);
    setCiudad(data.ciudad);
    setDepartamento(data.departamento);
    setPais(data.pais);
    setTelefono(data.telefono);
    setEmail(data.email);
    setHasPassport(data.hasPassport);
    setNumeroPasaporte(data.numeroPasaporte);
    setFechaExpedicionPasaporte(data.fechaExpedicionPasaporte);
    setFechaVencimientoPasaporte(data.fechaVencimientoPasaporte);
    setAutoridadPasaporte(data.autoridadPasaporte);
    setParticula(data.particula);
    setAutorizacionTercero(data.autorizacionTercero);
    setPasaporte(data.pasaporte);
    setFechaExpedicion(data.fechaExpedicion);
    
    // Verificar que los datos se guardaron en el store
    console.log('Datos guardados en el store - certificateType:', data.certificateType);
    console.log('Datos guardados en el store - nacionalidad:', data.nacionalidad);
    
    onNext(data);
  };

  // Watch passport status to conditionally show fields
  const hasPassportValue = watch("hasPassport");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <section
        id="certification-applicant-form"
        aria-label="certification-applicant-form"
        className="w-full"
      >
        <h2 className="mb-4 text-md font-normal">Datos de la certificación</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Tipo de certificado */}
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de certificado <span className="text-red-500">*</span></label>
            <Controller
              name="certificateType"
              control={control}
              rules={{ required: "El tipo de certificado es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="CERTIFICACIONES">Certificaciones</option>
                    <option value="CERTIFICADO_EXISTENCIA_LEGAL_SOCIEDADES">Certificados de existencia legal de sociedades</option>
                    <option value="CERTIFICADO_FE_DE_VIDA">Certificados Fe de Vida</option>
                    <option value="CERTIFICADO_RESIDENCIA_MENOR">Certificados de residencia para la salida del país de un menor de edad</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>
        </div>

        <h2 className="mb-4 text-md font-normal mt-8">Datos del solicitante</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Tipo de Documento */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tipo de documento <span className="text-red-500">*</span>
            </label>
            <Controller
              name="tipoDocumento"
              control={control}
              rules={{ required: "El tipo de documento es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="CC">Cédula de Ciudadanía</option>
                    <option value="TI">Tarjeta de Identidad</option>
                    <option value="RC">Registro Civil</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Número de Documento */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Número de documento <span className="text-red-500">*</span>
            </label>
            <Controller
              name="numeroDocumento"
              control={control}
              rules={{ required: "El número de documento es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="text" className="input w-full" />
                  {fieldState.error && (
                    <span className="text-red-500 text-xs">
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>

          {/* Nacionalidad */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Nacionalidad <span className="text-red-500">*</span>
            </label>
            <Controller
              name="nacionalidad"
              control={control}
              rules={{ required: "La nacionalidad es obligatoria" }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="text" className="input w-full" />
                  {fieldState.error && (
                    <span className="text-red-500 text-xs">
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>

          {/* Lugar de expedición del documento */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Lugar de expedición del documento <span className="text-red-500">*</span>
            </label>
            <Controller
              name="lugarExpedicionDocumento"
              control={control}
              rules={{ required: "El lugar de expedición es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="text" className="input w-full" />
                  {fieldState.error && (
                    <span className="text-red-500 text-xs">
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>

          {/* Primer nombre */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Primer nombre <span className="text-red-500">*</span>
            </label>
            <Controller
              name="primerNombre"
              control={control}
              rules={{ required: "El primer nombre es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="text" className="input w-full" />
                  {fieldState.error && (
                    <span className="text-red-500 text-xs">
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>

          {/* Segundo nombre */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Segundo nombre 
            </label>
            <Controller
              name="segundoNombre"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="text" className="input w-full" />
                  {fieldState.error && (
                    <span className="text-red-500 text-xs">
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>

          {/* Primer apellido */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Primer apellido <span className="text-red-500">*</span>
            </label>
            <Controller
              name="primerApellido"
              control={control}
              rules={{ required: "El primer apellido es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="text" className="input w-full" />
                  {fieldState.error && (
                    <span className="text-red-500 text-xs">
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>

          {/* Partícula */}
          <div>
            <label className="block text-sm font-medium mb-1">Partícula</label>
            <Controller
              name="particula"
              control={control}
              render={({ field }) => (
                <select {...field} className="input w-full">
                  <option value="">Seleccionar</option>
                  <option value="de">de</option>
                  <option value="del">del</option>
                  <option value="la">la</option>
                  <option value="las">las</option>
                  <option value="los">los</option>
                </select>
              )}
            />
          </div>

          {/* Segundo apellido */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Segundo apellido
            </label>
            <Controller
              name="segundoApellido"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" className="input w-full" />
              )}
            />
          </div>

          
        </div>

        {/* Con autorización de tercero */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Con autorización de tercero</label>
          <div className="flex items-center gap-4">
            <Controller
              name="autorizacionTercero"
              control={control}
              rules={{ required: "Debe indicar si tiene autorización de tercero" }}
              render={({ field, fieldState }) => (
                <>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...field}
                      value="si"
                      className="radio radio-primary"
                    />
                    <span>Si</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...field}
                      value="no"
                      className="radio radio-primary"
                    />
                    <span>No</span>
                  </label>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>
        </div>

        <h2 className="mb-4 text-md font-normal mt-8">Datos del pasaporte</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* ¿Tiene pasaporte Colombiano? */}
          <div>
            <label className="block text-sm font-medium mb-2">¿Tiene pasaporte Colombiano?</label>
            <div className="flex items-center gap-4">
              <Controller
                name="hasPassport"
                control={control}
                rules={{ required: "Debe indicar si tiene pasaporte" }}
                render={({ field, fieldState }) => (
                  <>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        {...field}
                        value="si"
                        className="radio radio-primary"
                      />
                      <span>Si</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        {...field}
                        value="no"
                        className="radio radio-primary"
                      />
                      <span>No</span>
                    </label>
                    {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {/* Campos condicionales si tiene pasaporte */}
        {hasPassportValue === "si" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Pasaporte */}
            <div>
              <label className="block text-sm font-medium mb-1">Pasaporte</label>
              <Controller
                name="pasaporte"
                control={control}
                render={({ field }) => (
                  <input {...field} type="text" className="input w-full" />
                )}
              />
            </div>

            {/* Fecha de expedición */}
            <div>
              <label className="block text-sm font-medium mb-1">Fecha de expedición</label>
              <Controller
                name="fechaExpedicion"
                control={control}
                render={({ field }) => (
                  <input {...field} type="date" placeholder="dd/mm/yyyy" className="input w-full" />
                )}
              />
            </div>
          </div>
        )}

        {/* Botón Visualizar pasaporte */}
        {hasPassportValue === "si" && (
          <div className="mb-6">
            <button
              type="button"
              onClick={() => setShowPassportVisualization(!showPassportVisualization)}
              className="bg-blue-600 text-white rounded-full px-6 py-2 hover:bg-blue-700"
            >
              Visualizar pasaporte
            </button>
          </div>
        )}

        {/* Visualización pasaporte */}
        {showPassportVisualization && hasPassportValue === "si" && (
          <div className="mb-8">
            <h3 className="text-md font-normal mb-4">Visualización pasaporte</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-gray-500 text-sm">
                    <div className="mb-2">REPUBLICA DE COLOMBIA</div>
                    <div className="mb-2">PASAPORTE / PASSPORT</div>
                    <div className="text-xs opacity-50">
                      [Imagen del pasaporte con datos personales]
                    </div>
                    <div className="mt-4 text-xs opacity-30">
                      [Zona de lectura mecánica - MRZ]
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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