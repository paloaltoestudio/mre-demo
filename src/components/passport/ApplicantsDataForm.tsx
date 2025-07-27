import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { customStyles } from "../common/reactSelectStyles";

type ApplicantsDataFormProps = {
  onNext: () => void;
  onBack: () => void;
};

export const ApplicantsDataForm = ({ onNext, onBack }: ApplicantsDataFormProps) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <section
        id="applicants-data-form"
        aria-label="applicants-data-form"
        className="w-full"
      >
        <h2 className="mb-4 text-md font-normal">Datos del Solicitante</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Tipo de Documento */}
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de Documento <span className="text-red-500">*</span></label>
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
            <label className="block text-sm font-medium mb-1">Número de Documento <span className="text-red-500">*</span></label>
            <Controller
              name="numeroDocumento"
              control={control}
              rules={{ required: "El número de documento es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="text" className="input w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Fecha de expedición del documento */}
          <div>
            <label className="block text-sm font-medium mb-1">Fecha de expedición del documento <span className="text-red-500">*</span></label>
            <Controller
              name="fechaExpedicionDocumento"
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

          {/* Correo Electrónico */}
          <div>
            <label className="block text-sm font-medium mb-1">Correo Electrónico <span className="text-red-500">*</span></label>
            <Controller
              name="correoElectronico"
              control={control}
              rules={{ required: "El correo electrónico es obligatorio", pattern: { value: /^\S+@\S+$/i, message: "Formato de correo inválido" } }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="email" className="input w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Lugar de expedición del documento */}
          <div>
            <label className="block text-sm font-medium mb-1">Lugar de expedición del documento <span className="text-red-500">*</span></label>
            <Controller
              name="lugarExpedicionDocumento"
              control={control}
              rules={{ required: "El lugar de expedición es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="Bogota">Bogotá</option>
                    <option value="Medellin">Medellín</option>
                    <option value="Cali">Cali</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
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
              rules={{ required: "La nacionalidad es obligatoria" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="Colombiana">Colombiana</option>
                    <option value="Venezolana">Venezolana</option>
                    <option value="Ecuatoriana">Ecuatoriana</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>
        </div>

        <h2 className="mb-4 text-md font-normal mt-8">Datos Personales</h2>
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
                </select>
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
                    <option value="Otro">Otro</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Tipo Sanguíneo */}
          <div>
            <label className="block text-sm font-medium mb-1">Tipo Sanguíneo</label>
            <Controller
              name="tipoSanguineo"
              control={control}
              render={({ field }) => (
                <select {...field} className="input w-full">
                  <option value="">Seleccionar</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              )}
            />
          </div>

          {/* Estatura */}
          <div>
            <label className="block text-sm font-medium mb-1">Estatura <span className="text-red-500">*</span></label>
            <Controller
              name="estatura"
              control={control}
              rules={{ required: "La estatura es obligatoria", pattern: { value: /^\d+(\.\d{1,2})?$/, message: "Formato de estatura inválido (ej: 1.75)" } }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="text" placeholder="ej: 1.75" className="input w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>
        </div>

        <h2 className="mb-4 text-md font-normal mt-8">Datos de Nacimiento</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Fecha de Nacimiento */}
          <div>
            <label className="block text-sm font-medium mb-1">Fecha de Nacimiento <span className="text-red-500">*</span></label>
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

          {/* País */}
          <div>
            <label className="block text-sm font-medium mb-1">País <span className="text-red-500">*</span></label>
            <Controller
              name="paisNacimiento"
              control={control}
              rules={{ required: "El país de nacimiento es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    {...field}
                    options={[
                      { value: "Colombia", label: "Colombia" },
                      { value: "Venezuela", label: "Venezuela" },
                      { value: "Ecuador", label: "Ecuador" },
                    ]}
                    styles={customStyles}
                    className="select_react"
                    placeholder="Seleccionar"
                    isClearable
                  />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Ciudad */}
          <div>
            <label className="block text-sm font-medium mb-1">Ciudad <span className="text-red-500">*</span></label>
            <Controller
              name="ciudadNacimiento"
              control={control}
              rules={{ required: "La ciudad de nacimiento es obligatoria" }}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    {...field}
                    options={[
                      { value: "Bogota", label: "Bogotá" },
                      { value: "Medellin", label: "Medellín" },
                      { value: "Cali", label: "Cali" },
                    ]}
                    styles={customStyles}
                    className="select_react"
                    placeholder="Seleccionar"
                    isClearable
                  />
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

export default ApplicantsDataForm; 