import { useForm, Controller } from "react-hook-form";

type MinorDataFormProps = {
  onNext: () => void;
  onBack: () => void;
};

export const MinorDataForm = ({ onNext, onBack }: MinorDataFormProps) => {
  const { control, handleSubmit, formState: { errors }, watch } = useForm();

  
  // Watch checkbox states to conditionally show fields
  const hasFatherData = watch("hasFatherData");
  const hasMotherData = watch("hasMotherData");
  const hasTutorData = watch("hasTutorData");
  const isCompanion = watch("isCompanion");

  const onSubmit = (data: any) => {
    console.log(data);
    onNext()
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <section
        id="minor-data-form"
        aria-label="minor-data-form"
        className="w-full"
      >
        <h2 className="mb-4 text-lg font-semibold">Datos del Menor de Edad</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Notary/Registry/Consulate */}
          <div>
            <label className="block text-sm font-medium mb-1">Notaría / Registraduría / Consulado <span className="text-red-500">*</span></label>
            <Controller
              name="notaryRegistryConsulate"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="notaria">Notaría</option>
                    <option value="registraduria">Registraduría</option>
                    <option value="consulado">Consulado</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Registry office city */}
          <div>
            <label className="block text-sm font-medium mb-1">Ciudad de Oficina de Registro <span className="text-red-500">*</span></label>
            <Controller
              name="registryOfficeCity"
              control={control}
              rules={{ required: "La ciudad de oficina de registro es obligatoria" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="bogota">Bogotá</option>
                    <option value="medellin">Medellín</option>
                    <option value="cali">Cali</option>
                    <option value="barranquilla">Barranquilla</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>
        </div>

        {/* Instructional note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>NOTA:</strong> Con solo un grupo de datos ya ingresados no es necesario el otro, puede ser DATOS DE LA MADRE o DATOS DEL PADRE o ingresar los dos (mínimo uno de los dos).
          </p>
        </div>

        {/* Father's data section */}
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-3">Datos del padre <span className="text-red-500">*</span></h3>
          <div className="flex items-center gap-4 mb-4">
          <Controller
              name="hasFatherData"
              control={control}
              rules={{ required: "Debe indicar si tiene pasaporte" }}
              render={({ field, fieldState }) => (
                <>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...field}
                      value="yes"
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
                  {fieldState.error && <span className="text-red-500 text-xs d-block">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Father's detailed data - only show if hasFatherData is 'yes' */}
          {hasFatherData === "yes" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 border border-gray-200 rounded-lg">
              <h4 className="md:col-span-3 text-sm font-medium mb-3">Datos del padre (En caso de Menor de Edad)</h4>
              
              {/* Document type */}
              <div>
                <label className="block text-sm font-medium mb-1">Tipo de Documento <span className="text-red-500">*</span></label>
                <Controller
                  name="fatherDocumentType"
                  control={control}
                  rules={{ required: "El tipo de documento es obligatorio" }}
                  render={({ field, fieldState }) => (
                    <>
                      <select {...field} className="input w-full">
                        <option value="">Seleccionar</option>
                        <option value="CC">Cédula de Ciudadanía</option>
                        <option value="TI">Tarjeta de Identidad</option>
                        <option value="CE">Cédula de Extranjería</option>
                        <option value="PA">Pasaporte</option>
                      </select>
                      {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                    </>
                  )}
                />
              </div>

              {/* Document number */}
              <div>
                <label className="block text-sm font-medium mb-1">Número de Documento <span className="text-red-500">*</span></label>
                <Controller
                  name="fatherDocumentNumber"
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

              {/* Nationality */}
              <div>
                <label className="block text-sm font-medium mb-1">Nacionalidad <span className="text-red-500">*</span></label>
                <Controller
                  name="fatherNationality"
                  control={control}
                  rules={{ required: "La nacionalidad es obligatoria" }}
                  render={({ field, fieldState }) => (
                    <>
                      <input {...field} type="text" className="input w-full" />
                      {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                    </>
                  )}
                />
              </div>

              {/* First name */}
              <div>
                <label className="block text-sm font-medium mb-1">Primer Nombre <span className="text-red-500">*</span></label>
                <Controller
                  name="fatherFirstName"
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

              {/* Second name */}
              <div>
                <label className="block text-sm font-medium mb-1">Segundo Nombre</label>
                <Controller
                  name="fatherSecondName"
                  control={control}
                  render={({ field }) => (
                    <input {...field} type="text" className="input w-full" />
                  )}
                />
              </div>

              {/* First last name */}
              <div>
                <label className="block text-sm font-medium mb-1">Primer Apellido <span className="text-red-500">*</span></label>
                <Controller
                  name="fatherFirstLastName"
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

              {/* Particle */}
              <div>
                <label className="block text-sm font-medium mb-1">Partícula</label>
                <Controller
                  name="fatherParticle"
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

              {/* Second last name */}
              <div>
                <label className="block text-sm font-medium mb-1">Segundo Apellido</label>
                <Controller
                  name="fatherSecondLastName"
                  control={control}
                  render={({ field }) => (
                    <input {...field} type="text" className="input w-full" />
                  )}
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium mb-1">¿Es el padre el acompañante del menor de edad? <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2">
                <Controller
                  name="isCompanion"
                  control={control}
                  rules={{ required: "Debe indicar si es acompañante" }}
                  render={({ field, fieldState }) => (
                    <>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          {...field}
                          value="yes"
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
                      {fieldState.error && <span className="text-red-500 text-xs d-block">{fieldState.error.message}</span>}
                    </>
                  )}
                />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mother's data section */}
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-3">Datos de la madre <span className="text-red-500">*</span></h3>
          <div className="flex items-center gap-4 mb-4">
          <Controller
              name="hasMotherData"
              control={control}
              rules={{ required: "Debe indicar si tiene pasaporte" }}
              render={({ field, fieldState }) => (
                <>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...field}
                      value="yes"
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
                  {fieldState.error && <span className="text-red-500 text-xs d-block">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Mother's detailed data - only show if hasMotherData is 'yes' */}
          {hasMotherData === "yes" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 border border-gray-200 rounded-lg">
              <h4 className="md:col-span-3 text-sm font-medium mb-3">Datos de la madre (En caso de Menor de Edad)</h4>
              
              {/* Document type */}
              <div>
                <label className="block text-sm font-medium mb-1">Tipo de Documento <span className="text-red-500">*</span></label>
                <Controller
                  name="motherDocumentType"
                  control={control}
                  rules={{ required: "El tipo de documento es obligatorio" }}
                  render={({ field, fieldState }) => (
                    <>
                      <select {...field} className="input w-full">
                        <option value="">Seleccionar</option>
                        <option value="CC">Cédula de Ciudadanía</option>
                        <option value="TI">Tarjeta de Identidad</option>
                        <option value="CE">Cédula de Extranjería</option>
                        <option value="PA">Pasaporte</option>
                      </select>
                      {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                    </>
                  )}
                />
              </div>

              {/* Document number */}
              <div>
                <label className="block text-sm font-medium mb-1">Número de Documento <span className="text-red-500">*</span></label>
                <Controller
                  name="motherDocumentNumber"
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

              {/* Nationality */}
              <div>
                <label className="block text-sm font-medium mb-1">Nacionalidad <span className="text-red-500">*</span></label>
                <Controller
                  name="motherNationality"
                  control={control}
                  rules={{ required: "La nacionalidad es obligatoria" }}
                  render={({ field, fieldState }) => (
                    <>
                      <input {...field} type="text" className="input w-full" />
                      {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                    </>
                  )}
                />
              </div>

              {/* First name */}
              <div>
                <label className="block text-sm font-medium mb-1">Primer Nombre <span className="text-red-500">*</span></label>
                <Controller
                  name="motherFirstName"
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

              {/* Second name */}
              <div>
                <label className="block text-sm font-medium mb-1">Segundo Nombre</label>
                <Controller
                  name="motherSecondName"
                  control={control}
                  render={({ field }) => (
                    <input {...field} type="text" className="input w-full" />
                  )}
                />
              </div>

              {/* First last name */}
              <div>
                <label className="block text-sm font-medium mb-1">Primer Apellido <span className="text-red-500">*</span></label>
                <Controller
                  name="motherFirstLastName"
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

              {/* Particle */}
              <div>
                <label className="block text-sm font-medium mb-1">Partícula</label>
                <Controller
                  name="motherParticle"
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

              {/* Second last name */}
              <div>
                <label className="block text-sm font-medium mb-1">Segundo Apellido</label>
                <Controller
                  name="motherSecondLastName"
                  control={control}
                  render={({ field }) => (
                    <input {...field} type="text" className="input w-full" />
                  )}
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium mb-1">¿Es la madre la acompañante del menor de edad? <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2">
                <Controller
                  name="isCompanion"
                  control={control}
                  rules={{ required: "Debe indicar si es acompañante" }}
                  render={({ field, fieldState }) => (
                    <>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          {...field}
                          value="yes"
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
                      {fieldState.error && <span className="text-red-500 text-xs d-block">{fieldState.error.message}</span>}
                    </>
                  )}
                />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tutors's data section */}
        <h3 className="text-md font-semibold mb-3">Datos del tutor legal <span className="text-red-500">*</span></h3>
        <div className="flex items-center gap-4 mb-4">
          <Controller
              name="hasTutorData"
              control={control}
              rules={{ required: "Debe indicar si tiene tutor" }}
              render={({ field, fieldState }) => (
                <>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...field}
                      value="yes"
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
                  {fieldState.error && <span className="text-red-500 text-xs d-block">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

        {hasTutorData === "yes" &&(
          <div className="mb-6">
            <h3 className="text-md font-semibold mb-3">Datos del Tutor Legal (En caso de Menor de Edad)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-lg">
              {/* Document type */}
              <div>
                <label className="block text-sm font-medium mb-1">Tipo de Documento <span className="text-red-500">*</span></label>
                <Controller
                  name="guardianDocumentType"
                  control={control}
                  rules={{ required: "El tipo de documento es obligatorio" }}
                  render={({ field, fieldState }) => (
                    <>
                      <select {...field} className="input w-full">
                        <option value="">Seleccionar</option>
                        <option value="CC">Cédula de Ciudadanía</option>
                        <option value="TI">Tarjeta de Identidad</option>
                        <option value="CE">Cédula de Extranjería</option>
                        <option value="PA">Pasaporte</option>
                      </select>
                      {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                    </>
                  )}
                />
              </div>

              {/* Document number */}
              <div>
                <label className="block text-sm font-medium mb-1">Número de Documento <span className="text-red-500">*</span></label>
                <Controller
                  name="guardianDocumentNumber"
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

              {/* Nationality */}
              <div>
                <label className="block text-sm font-medium mb-1">Nacionalidad <span className="text-red-500">*</span></label>
                <Controller
                  name="guardianNationality"
                  control={control}
                  rules={{ required: "La nacionalidad es obligatoria" }}
                  render={({ field, fieldState }) => (
                    <>
                      <input {...field} type="text" className="input w-full" />
                      {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                    </>
                  )}
                />
              </div>

              {/* First name */}
              <div>
                <label className="block text-sm font-medium mb-1">Primer Nombre <span className="text-red-500">*</span></label>
                <Controller
                  name="guardianFirstName"
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

              {/* Second name */}
              <div>
                <label className="block text-sm font-medium mb-1">Segundo Nombre</label>
                <Controller
                  name="guardianSecondName"
                  control={control}
                  render={({ field }) => (
                    <input {...field} type="text" className="input w-full" />
                  )}
                />
              </div>

              {/* First last name */}
              <div>
                <label className="block text-sm font-medium mb-1">Primer Apellido <span className="text-red-500">*</span></label>
                <Controller
                  name="guardianFirstLastName"
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

              {/* Particle */}
              <div>
                <label className="block text-sm font-medium mb-1">Partícula</label>
                <Controller
                  name="guardianParticle"
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

              {/* Second last name */}
              <div>
                <label className="block text-sm font-medium mb-1">Segundo Apellido</label>
                <Controller
                  name="guardianSecondLastName"
                  control={control}
                  render={({ field }) => (
                    <input {...field} type="text" className="input w-full" />
                  )}
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium mb-1">¿Es el tutor el acompañante del menor de edad? <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2">
                <Controller
                  name="isCompanion"
                  control={control}
                  rules={{ required: "Debe indicar si es acompañante" }}
                  render={({ field, fieldState }) => (
                    <>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          {...field}
                          value="yes"
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
                      {fieldState.error && <span className="text-red-500 text-xs d-block">{fieldState.error.message}</span>}
                    </>
                  )}
                />
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

export default MinorDataForm; 