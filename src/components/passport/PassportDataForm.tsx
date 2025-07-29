import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { customStyles } from "../common/reactSelectStyles";

type PassportDataFormProps = {
  onNext: () => void;
  onBack: () => void;
};

export const PassportDataForm = ({ onNext, onBack }: PassportDataFormProps) => {
  const { control, handleSubmit, formState: { errors }, watch } = useForm();
  console.log(errors, watch());
  const onSubmit = (data: any) => {
    console.log(data);
    onNext();
  };

  // Watch passport status to conditionally show fields
  const hasPassport = watch("hasPassport");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <section
        id="passport-data-form"
        aria-label="passport-data-form"
        className="w-full"
      >

        <h2 className="mb-4 text-md font-normal mt-8">Datos Pasaporte</h2>
        <div className="flex gap-4 mb-2">
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

          {hasPassport === "yes" && (    
          <div className="w-50">
            <label className="block text-sm font-medium mb-1">Motivo del Cambio <span className="text-red-500">*</span></label>
            <Controller
              name="motivoCambio"
              control={control}
              rules={{ required: "El motivo del cambio es requerido" }}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    {...field}
                    options={[
                      { value: "daños", label: "Daños" },
                      { value: "paginas", label: "Páginas Insuficientes" },
                      { value: "perdida", label: "Pérdida" },
                      { value: "voluntario", label: "Voluntario" },
                      { value: "hurto", label: "Hurto" },
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
          )}
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

export default PassportDataForm; 