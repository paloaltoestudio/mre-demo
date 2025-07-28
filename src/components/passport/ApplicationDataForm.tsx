import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { customStyles } from "../common/reactSelectStyles";

type ApplicationDataFormProps = {
  onNext: () => void;
  onBack: () => void;
};

export const ApplicationDataForm = ({ onNext, onBack }: ApplicationDataFormProps) => {
  const { control, handleSubmit, formState: {  }, watch } = useForm();

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
                    <option value="renovacion">Renovación de Pasaporte</option>
                    <option value="primera_vez">Primera Vez</option>
                    <option value="duplicado">Duplicado</option>
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

        <h2 className="mb-4 text-lg font-semibold mt-8">Datos Pasaporte</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          {/* Has passport? */}
          <div>
            <label className="block text-sm font-medium mb-1">¿Tiene pasaporte? <span className="text-red-500">*</span></label>
            <Controller
              name="hasPassport"
              control={control}
              rules={{ required: "Debe indicar si tiene pasaporte" }}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        {...field}
                        value="yes"
                        className="w-4 h-4 text-blue-600"
                      />
                      <span>Si</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        {...field}
                        value="no"
                        className="w-4 h-4 text-blue-600"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Passport number - only show if has passport */}
          {hasPassport === "yes" && (
            <div>
              <label className="block text-sm font-medium mb-1">Número de Pasaporte</label>
              <Controller
                name="passportNumber"
                control={control}
                render={({ field }) => (
                  <input {...field} type="text" className="input w-full" />
                )}
              />
            </div>
          )}

          {/* Passport issuance date - only show if has passport */}
          {hasPassport === "yes" && (
            <div>
              <label className="block text-sm font-medium mb-1">Fecha de Expedición del pasaporte</label>
              <Controller
                name="passportIssuanceDate"
                control={control}
                render={({ field }) => (
                  <input {...field} type="date" placeholder="dd/mm/yyyy" className="input w-full" />
                )}
              />
            </div>
          )}

          {/* Verification digit - only show if has passport */}
          {hasPassport === "yes" && (
            <div>
              <label className="block text-sm font-medium mb-1">Dígito de Verificación (Últimos 2 dígitos OCR)</label>
              <Controller
                name="verificationDigit"
                control={control}
                render={({ field }) => (
                  <input {...field} type="text" className="input w-full" />
                )}
              />
            </div>
          )}

        </div>

        <h2 className="mb-4 text-lg font-semibold mt-8">Datos de Residencia y Contacto</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Country */}
          <div>
            <label className="block text-sm font-medium mb-1">País <span className="text-red-500">*</span></label>
            <Controller
              name="country"
              control={control}
              rules={{ required: "El país es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    {...field}
                    options={[
                      { value: "Colombia", label: "Colombia" },
                      { value: "Venezuela", label: "Venezuela" },
                      { value: "Ecuador", label: "Ecuador" },
                      { value: "Peru", label: "Perú" },
                      { value: "Chile", label: "Chile" },
                    ]}
                    styles={customStyles}
                    placeholder="Seleccionar"
                    isClearable
                  />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium mb-1">Ciudad <span className="text-red-500">*</span></label>
            <Controller
              name="city"
              control={control}
              rules={{ required: "La ciudad es obligatoria" }}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    {...field}
                    options={[
                      { value: "Bogota", label: "Bogotá" },
                      { value: "Medellin", label: "Medellín" },
                      { value: "Cali", label: "Cali" },
                      { value: "Barranquilla", label: "Barranquilla" },
                      { value: "Cartagena", label: "Cartagena" },
                    ]}
                    styles={customStyles}
                    placeholder="Seleccionar"
                    isClearable
                  />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">Dirección <span className="text-red-500">*</span></label>
            <Controller
              name="address"
              control={control}
              rules={{ required: "La dirección es obligatoria" }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="text" className="input w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Country code */}
          <div>
            <label className="block text-sm font-medium mb-1">Indicativo del país <span className="text-red-500">*</span></label>
            <Controller
              name="countryCode"
              control={control}
              rules={{ required: "El indicativo del país es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <select {...field} className="input w-full">
                    <option value="">Seleccionar</option>
                    <option value="+57">+57 (Colombia)</option>
                    <option value="+58">+58 (Venezuela)</option>
                    <option value="+593">+593 (Ecuador)</option>
                    <option value="+51">+51 (Perú)</option>
                    <option value="+56">+56 (Chile)</option>
                  </select>
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Teléfono <span className="text-red-500">*</span></label>
            <Controller
              name="phone"
              control={control}
              rules={{ required: "El teléfono es obligatorio" }}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} type="tel" className="input w-full" />
                  {fieldState.error && <span className="text-red-500 text-xs">{fieldState.error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Postal code */}
          <div>
            <label className="block text-sm font-medium mb-1">Código Postal</label>
            <Controller
              name="postalCode"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" className="input w-full" />
              )}
            />
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-300 text-gray-800 rounded-full px-6 py-2 hover:bg-gray-400"
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