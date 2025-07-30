import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
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
      numeroPasaporte: "123456789",
      fechaExpedicionPasaporte: "",
      fechaVencimientoPasaporte: "",
      paisNacimiento: "",
      ciudadNacimiento: "",
      fechaNacimiento: "",
      genero: "",
      paisResidencia: "",
      ciudadResidencia: "",
      lugarResidencia: "",
      otraNacionalidad: ""
    }
  });

  // Mostrar modal informativo al cargar el componente
  useEffect(() => {
    Swal.fire({
      title: '<div class="flex items-center gap-3"><div class="text-blue-600 text-4xl">⚠️</div><span class="text-xl font-bold">Requisitos de la solicitud</span></div>',
      html: `
        <div class="text-left">
          <p class="font-semibold mb-3">Instrucciones generales:</p>
          <ol class="list-decimal list-inside space-y-2 text-sm">
            <li>Contar con un pasaporte o documento de viaje vigente, en buen estado y con espacio libre para visados.</li>
            <li>Llenar el formulario electrónico de solicitud de visa.</li>
            <li>Todos los documentos requisitos diferentes a documentos de identidad o de viaje deberán tener una fecha de expedición no mayor a tres meses antes del registro de la solicitud.</li>
            <li>Todos los documentos provenientes del exterior deberán contar con apostilla o legalización y traducción oficial al castellano cuando no se encuentre en este idioma. La traducción oficial debe estar legalizada o apostillada según el caso.</li>
            <li>En el caso de requerirse la presentación de los extractos bancarios, estos los podrá presentar sin apostilla o legalización y sin traducción al castellano, si su contenido puede ser establecido claramente por el oficial de visa.</li>
            <li>En el caso de requerirse la presentación de los antecedentes judiciales, cuando la solicitud de esta visa se presente ante un consulado de Colombia con sede en el país de origen del extranjero, bastará la certificación de antecedentes judiciales o penales conforme a los procedimientos establecidos en ese país. Cuando la solicitud se presente ante el Grupo Interno de Trabajo de Visa e Inmigración, podrá presentar los antecedentes judiciales o penales certificados por el consulado del país de origen acreditado en Colombia o apostillados y legalizados según el caso.</li>
          </ol>
        </div>
      `,
      width: '800px',
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
        <h2 className="mb-4 text-md font-normal">Selección del trámite solicitud visa</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
                    <option value="TÍTULO PROPIO">TÍTULO PROPIO</option>
                    <option value="TÍTULO DE TERCERO">TÍTULO DE TERCERO</option>
                    <option value="PODER ESPECIAL">PODER ESPECIAL</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>
        </div>

        <hr className="border-gray-200 mb-8" />

        <h2 className="mb-4 text-md font-normal">Datos personales del titular de la solicitud</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Primer Nombre */}
          <div>
            <label className="block text-sm font-medium mb-1">Primer Nombre <span className="text-red-500">*</span></label>
            <Controller
              name="primerNombre"
              control={control}
              rules={{ required: "El primer nombre es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="text" className="input w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Segundo Nombre */}
          <div>
            <label className="block text-sm font-medium mb-1">Segundo Nombre</label>
            <Controller
              name="segundoNombre"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" className="input w-full" />
              )}
            />
          </div>

          {/* Primer Apellido */}
          <div>
            <label className="block text-sm font-medium mb-1">Primer Apellido <span className="text-red-500">*</span></label>
            <Controller
              name="primerApellido"
              control={control}
              rules={{ required: "El primer apellido es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="text" className="input w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Segundo Apellido */}
          <div>
            <label className="block text-sm font-medium mb-1">Segundo Apellido</label>
            <Controller
              name="segundoApellido"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" className="input w-full" />
              )}
            />
          </div>

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

          {/* Ciudad de nacimiento */}
          <div>
            <label className="block text-sm font-medium mb-1">Ciudad de nacimiento <span className="text-red-500">*</span></label>
            <Controller
              name="ciudadNacimiento"
              control={control}
              rules={{ required: "La ciudad de nacimiento es obligatoria" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="Bogota">Bogotá</option>
                    <option value="Medellin">Medellín</option>
                    <option value="Cali">Cali</option>
                    <option value="Barranquilla">Barranquilla</option>
                    <option value="Cartagena">Cartagena</option>
                    <option value="Bucaramanga">Bucaramanga</option>
                    <option value="Pereira">Pereira</option>
                    <option value="Manizales">Manizales</option>
                    <option value="Ibague">Ibagué</option>
                    <option value="Villavicencio">Villavicencio</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Fecha de nacimiento */}
          <div>
            <label className="block text-sm font-medium mb-1">Fecha de nacimiento <span className="text-red-500">*</span></label>
            <Controller
              name="fechaNacimiento"
              control={control}
              rules={{ required: "La fecha de nacimiento es obligatoria" }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="date" placeholder="dd/mm/yyyy" className="input w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Género */}
          <div>
            <label className="block text-sm font-medium mb-1">Género <span className="text-red-500">*</span></label>
            <Controller
              name="genero"
              control={control}
              rules={{ required: "El género es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="No binario">No binario</option>
                    <option value="Prefiero no decir">Prefiero no decir</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* País de residencia */}
          <div>
            <label className="block text-sm font-medium mb-1">País de residencia <span className="text-red-500">*</span></label>
            <Controller
              name="paisResidencia"
              control={control}
              rules={{ required: "El país de residencia es obligatorio" }}
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

          {/* Ciudad de residencia */}
          <div>
            <label className="block text-sm font-medium mb-1">Ciudad de residencia <span className="text-red-500">*</span></label>
            <Controller
              name="ciudadResidencia"
              control={control}
              rules={{ required: "La ciudad de residencia es obligatoria" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="Bogota">Bogotá</option>
                    <option value="Medellin">Medellín</option>
                    <option value="Cali">Cali</option>
                    <option value="Barranquilla">Barranquilla</option>
                    <option value="Cartagena">Cartagena</option>
                    <option value="Bucaramanga">Bucaramanga</option>
                    <option value="Pereira">Pereira</option>
                    <option value="Manizales">Manizales</option>
                    <option value="Ibague">Ibagué</option>
                    <option value="Villavicencio">Villavicencio</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Lugar de residencia */}
          <div>
            <label className="block text-sm font-medium mb-1">Lugar de residencia <span className="text-red-500">*</span></label>
            <Controller
              name="lugarResidencia"
              control={control}
              rules={{ required: "El lugar de residencia es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="Urbano">Urbano</option>
                    <option value="Rural">Rural</option>
                    <option value="Semiurbano">Semiurbano</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Otra nacionalidad */}
          <div>
            <label className="block text-sm font-medium mb-1">Otra nacionalidad</label>
            <Controller
              name="otraNacionalidad"
              control={control}
              render={({ field }) => (
                <select {...field} className="input w-full">
                  <option value="">Seleccionar</option>
                  <option value="Colombiana">Colombiana</option>
                  <option value="Venezolana">Venezolana</option>
                  <option value="Ecuatoriana">Ecuatoriana</option>
                  <option value="Peruana">Peruana</option>
                  <option value="Brasileña">Brasileña</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Chilena">Chilena</option>
                  <option value="Mexicana">Mexicana</option>
                  <option value="Estadounidense">Estadounidense</option>
                  <option value="Española">Española</option>
                  <option value="Francesa">Francesa</option>
                  <option value="Alemana">Alemana</option>
                  <option value="Italiana">Italiana</option>
                  <option value="Británica">Británica</option>
                </select>
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